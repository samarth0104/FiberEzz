import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

export default function Menu() {
    return (
        <View style={styles.container}>
            {/* SVG Gradient Background */}
            <Svg height="100%" width="100%" style={styles.svgBackground}>
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0" stopColor="#09203F" stopOpacity="1" />
                        <Stop offset="1" stopColor="#09203F" stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grad)" />
            </Svg>

            {/* Content */}
            <View style={styles.content}>
                {/* Search Bar */}
                <TextInput style={styles.searchBar} placeholder="Search..." placeholderTextColor="#ccc" />

                {/* Profile Picture */}
                <Image
                    source={{ uri: "https://lh3.googleusercontent.com/a/AGNmyxYXaL7liQgqCtO3pmVRJYB_QHmSGEeY4dI2V04F=s96-c" }}
                    style={styles.profilePic}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60, // Adjust as needed
        justifyContent: "center",
        overflow: "hidden",
    },
    svgBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    searchBar: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        color: "#000",
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
    },
});
