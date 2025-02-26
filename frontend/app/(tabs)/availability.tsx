import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebaseConfig"; // Adjust path if needed
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Availability() {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [homeLocations, setHomeLocations] = useState<{ latitude: number; longitude: number; company: string }[]>([]);
    const [towerLocations, setTowerLocations] = useState<{ latitude: number; longitude: number }[]>([]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission Denied", "Allow location access to check availability.");
                return;
            }
            let userLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
            });
        })();
    }, []);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const db = getFirestore(app);

                // Fetch home locations
                const homesCollection = collection(db, "FiberEzz");
                const homesSnapshot = await getDocs(homesCollection);
                const homes = homesSnapshot.docs
                    .map(doc => doc.data())
                    .filter(home => home.location) // Ensure location exists
                    .map(home => {
                        if (typeof home.location === "string") {
                            const coords = home.location.replace(/"/g, "").trim().split(",").map(parseFloat);
                            if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
                                return {
                                    latitude: coords[0],
                                    longitude: coords[1],
                                    company: home.company ? home.company.toLowerCase() : "unknown" // Handle missing company
                                };
                            }
                        }
                        return null;
                    })
                    .filter(home => home !== null);

                // Fetch fiber tower locations
                const towersCollection = collection(db, "FiberTower");
                const towersSnapshot = await getDocs(towersCollection);
                const towers = towersSnapshot.docs
                    .map(doc => doc.data())
                    .filter(tower => tower.location) // Ensure location exists
                    .map(tower => {
                        if (typeof tower.location === "string") {
                            const coords = tower.location.replace(/"/g, "").trim().split(",").map(parseFloat);
                            if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
                                return { latitude: coords[0], longitude: coords[1] };
                            }
                        }
                        return null;
                    })
                    .filter(tower => tower !== null);

                setHomeLocations(homes);
                setTowerLocations(towers);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();
    }, []);

    // company colors mapping
    const providerColors: { [key: string]: string } = {
        airtel: "red",
        jio: "blue",
        bsnl: "black",
        act: "green",
        unknown: "gray", // Default color if company is missing
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Check Availability</Text>

            {location ? (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    {/* User Location */}
                    <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="You are here" pinColor="blue" />

                    {/* Home Locations */}
                    {homeLocations.map((home, index) => (
                        <Marker key={`home-${index}`} coordinate={home}>
                            <View style={{ alignItems: "center" }}>
                                <MaterialIcons name="home" size={30} color={providerColors[home.company] || "gray"} />
                            </View>
                        </Marker>
                    ))}

                    {/* Fiber Tower Locations */}
                    {towerLocations.map((tower, index) => (
                        <Marker key={`tower-${index}`} coordinate={tower}>
                            <View style={{ alignItems: "center" }}>
                                <MaterialIcons name="cell-tower" size={30} color="black" />
                            </View>
                        </Marker>
                    ))}
                </MapView>
            ) : (
                <Text>Fetching location...</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Checking Availability...")}>
                <Text style={styles.buttonText}>Check Availability</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    map: {
        width: "100%",
        height: "60%",
    },
    button: {
        backgroundColor: "#537895",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});
