import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Footer from "./footer";
import Menu from "./menu";
export default function MyOrders() {
    return (

        <View style={styles.container}>
            <Menu />
            <View style={styles.content}>
                <Text>My Orders Screen</Text>
            </View>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
