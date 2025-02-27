import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebaseConfig"; // Adjust path if needed
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Availability() {
    const [location, setLocation] = useState(null);
    const [homeLocations, setHomeLocations] = useState([]);
    const [towerLocations, setTowerLocations] = useState([]);
    const [fiberConnections, setFiberConnections] = useState([]);
    const [showFiber, setShowFiber] = useState(false);

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

                const homesSnapshot = await getDocs(collection(db, "FiberEzz"));
                const towersSnapshot = await getDocs(collection(db, "FiberTower"));

                const parseLocations = (snapshot) =>
                    snapshot.docs
                        .map((doc) => doc.data())
                        .filter((item) => item.location)
                        .map((item) => {
                            if (typeof item.location === "string") {
                                const coords = item.location.replace(/"/g, "").trim().split(",").map(parseFloat);
                                if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
                                    return {
                                        latitude: coords[0],
                                        longitude: coords[1],
                                        company: item.company?.toLowerCase() || "unknown",
                                    };
                                }
                            }
                            return null;
                        })
                        .filter((loc) => loc !== null);

                const homes = parseLocations(homesSnapshot);
                const towers = parseLocations(towersSnapshot);

                setHomeLocations(homes);
                setTowerLocations(towers);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();
    }, []);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const buildFiberNetwork = () => {
        const airtelHomes = homeLocations.filter(home => home.company === "airtel");
        const airtelTowers = towerLocations.filter(tower => tower.company === "airtel");

        if (airtelHomes.length === 0 || airtelTowers.length === 0) return;

        let edges = [];
        let visited = new Set();
        let graph = [];

        // Step 1: Find the closest Airtel tower to any Airtel home
        let initialHome = null;
        let initialTower = null;
        let minDistance = Infinity;

        airtelHomes.forEach(home => {
            airtelTowers.forEach(tower => {
                const distance = calculateDistance(home.latitude, home.longitude, tower.latitude, tower.longitude);
                if (distance < minDistance) {
                    minDistance = distance;
                    initialHome = home;
                    initialTower = tower;
                }
            });
        });

        // Start with the initial connection (first home to tower)
        visited.add(initialHome);
        graph.push({ from: initialHome, to: initialTower });

        // Step 2: Build the Minimum Spanning Tree (MST)
        while (visited.size < airtelHomes.length) {
            let nearestHome = null;
            let nearestNeighbor = null;
            let minEdgeDistance = Infinity;

            airtelHomes.forEach(home => {
                if (!visited.has(home)) return;

                airtelHomes.forEach(otherHome => {
                    if (visited.has(otherHome)) return;

                    const distance = calculateDistance(home.latitude, home.longitude, otherHome.latitude, otherHome.longitude);
                    if (distance < minEdgeDistance) {
                        minEdgeDistance = distance;
                        nearestHome = otherHome;
                        nearestNeighbor = home;
                    }
                });
            });

            if (nearestHome && nearestNeighbor) {
                visited.add(nearestHome);
                graph.push({ from: nearestHome, to: nearestNeighbor });
            }
        }

        setFiberConnections(graph);
        setShowFiber(true);
    };

    const providerColors = {
        airtel: "red",
        jio: "blue",
        bsnl: "black",
        act: "green",
        unknown: "gray",
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
                        latitudeDelta: 0.1, // Zoomed-in for better visibility
                        longitudeDelta: 0.1,
                    }}
                >
                    <Marker coordinate={location} title="You are here" pinColor="blue" />

                    {homeLocations.map((home, index) => (
                        <Marker key={`home-${index}`} coordinate={home}>
                            <MaterialIcons name="home" size={30} color={providerColors[home.company] || "gray"} />
                        </Marker>
                    ))}

                    {towerLocations.map((tower, index) => (
                        <Marker key={`tower-${index}`} coordinate={tower} >
                            <MaterialIcons name="cell-tower" size={30} color={providerColors[tower.company] || "gray"} />
                        </Marker>
                    ))}

                    {showFiber &&
                        fiberConnections.map((connection, index) => (
                            <Polyline
                                key={`fiber-${index}`}
                                coordinates={[
                                    { latitude: connection.from.latitude, longitude: connection.from.longitude },
                                    { latitude: connection.to.latitude, longitude: connection.to.longitude },
                                ]}
                                strokeColor="red"
                                strokeWidth={3}
                            />
                        ))}
                </MapView>
            ) : (
                <Text>Fetching location...</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={buildFiberNetwork}>
                <Text style={styles.buttonText}>Connect Airtel Fiber</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 10 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    map: { width: "100%", height: "60%" },
    button: { backgroundColor: "#537895", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, marginTop: 10 },
    buttonText: { color: "white", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});
