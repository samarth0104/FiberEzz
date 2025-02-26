import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Footer() {
    const navigation = useNavigation();
    const route = useRoute();

    const getButtonColor = (screenName: string) => {
        return route.name === screenName ? "#537895" : "white";
    };

    return (
        <View style={styles.container}>
            {/* Home */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home" as never)}>
                <Icon name="home" size={24} color={getButtonColor("Home")} />
                <Text style={[styles.text, { color: getButtonColor("Home") }]}>Home</Text>
            </TouchableOpacity>

            {/* My Plans */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Plans" as never)}>
                <Icon name="assignment" size={24} color={getButtonColor("Plans")} />
                <Text style={[styles.text, { color: getButtonColor("Plans") }]}>My Plans</Text>
            </TouchableOpacity>

            {/* My Orders */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyOrders" as never)}>
                <Icon name="receipt" size={24} color={getButtonColor("MyOrders")} />
                <Text style={[styles.text, { color: getButtonColor("MyOrders") }]}>My Orders</Text>
            </TouchableOpacity>

            {/* Support */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Support" as never)}>
                <Icon name="support-agent" size={24} color={getButtonColor("Support")} />
                <Text style={[styles.text, { color: getButtonColor("Support") }]}>Support</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#09203F",
        paddingVertical: 10,
    },
    button: {
        alignItems: "center",
    },
    text: {
        fontSize: 14,
        marginTop: 4,
    },
});
