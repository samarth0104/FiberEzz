import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebaseConfig"; // Ensure you have Firebase setup

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth(app);

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in:", userCredential.user);
            navigation.navigate("Home" as never); // Navigate to Home after successful login
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Login error:", error.message);
                alert(error.message); // Display actual error message from Firebase
            } else {
                console.error("Unknown error occurred:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        }

    };

    return (
        <LinearGradient colors={["#09203F", "#537895"]} style={styles.container}>
            <View style={styles.loginBox}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#333"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#333"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("SignUp" as never)}>
                    <Text style={styles.signupText}>New here? Sign Up</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loginBox: {
        width: 320,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: 20,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        backgroundColor: "#f1f1f1",
        color: "#333",
        fontSize: 16,
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    button: {
        width: "100%",
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    signupText: {
        marginTop: 15,
        color: "#007AFF",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});
