import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Footer from "./footer";

export default function Support() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>Support Screen</Text>
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
