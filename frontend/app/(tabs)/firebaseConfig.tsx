import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC-ivgcVAy9Y0dYV33M4_eOCKGnzn4kn-M",
    authDomain: "fiberezz-e8a6f.firebaseapp.com",
    projectId: "fiberezz-e8a6f",
    storageBucket: "fiberezz-e8a6f.firebasestorage.app",
    messagingSenderId: "33312628177",
    appId: "1:33312628177:web:3b7cb41381b41a044e94f0",
    measurementId: "G-KWH82Z283N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
