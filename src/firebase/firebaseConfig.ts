// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAPwLRCXtNrq1nvPKu2zFZj7BNpjO7srO0",
    authDomain: "test-2c3fd.firebaseapp.com",
    projectId: "test-2c3fd",
    storageBucket: "test-2c3fd.appspot.com",
    messagingSenderId: "954491198331",
    appId: "1:954491198331:web:db363a0bf8ae7e09f4bbde",
    measurementId: "G-XENW8ZPLZX"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
