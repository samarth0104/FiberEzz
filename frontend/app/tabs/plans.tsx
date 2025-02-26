import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Footer from "./footer";
import { MaterialIcons } from "@expo/vector-icons"; // Icons for plans

const plans = [
    { speed: "50 Mbps", type: "Limited (3000GB)", price: 700, icon: "network-check" },
    { speed: "50 Mbps", type: "Unlimited", price: 950, icon: "network-check" },
    { speed: "100 Mbps", type: "Limited (3000GB)", price: 1000, icon: "network-check" },
    { speed: "100 Mbps", type: "Unlimited", price: 1250, icon: "network-check" },
    { speed: "250 Mbps", type: "Limited (3000GB)", price: 1500, icon: "network-check" },
    { speed: "250 Mbps", type: "Unlimited", price: 1750, icon: "network-check" },
    // { speed: "500 Mbps", type: "Limited (3000GB)", price: 2000, icon: "network-check" },
    // { speed: "500 Mbps", type: "Unlimited", price: 2150, icon: "network-check" },
];

export default function Plans() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fiber Plans</Text>

            <FlatList
                data={plans}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2} // Display in two columns
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <View style={styles.planBox}>
                        <MaterialIcons name={item.icon} size={30} color="#537895" />
                        <Text style={styles.planSpeed}>{item.speed}</Text>
                        <Text style={styles.planType}>{item.type}</Text>
                        <Text style={styles.planPrice}>₹{item.price}</Text>

                        {/* Check Availability Button */}
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Check Availability</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
    },
    listContainer: {
        alignItems: "center",
        paddingBottom: 20,
    },
    planBox: {
        backgroundColor: "#f2f2f2",
        width: "45%",
        margin: 10,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        elevation: 5,
    },
    planSpeed: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 5,
    },
    planType: {
        fontSize: 14,
        color: "#555",
        marginVertical: 5,
    },
    planPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#09203F",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#09203F",
        paddingVertical: 2,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },

});
