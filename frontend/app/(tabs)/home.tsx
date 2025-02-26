import React from "react";
import { View, StyleSheet } from "react-native";
import Menu from "./menu";
import Footer from "./footer";
import MainBody from "./mainBody";

export default function Home() {
    return (
        <View style={styles.container}>
            <Menu />
            <MainBody />
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
});
