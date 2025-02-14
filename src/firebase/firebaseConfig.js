import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAPwLRCXtNrq1nvPKu2zFZj7BNpjO7srO0",
    authDomain: "test-2c3fd.firebaseapp.com",
    projectId: "test-2c3fd",
    storageBucket: "test-2c3fd.appspot.com",
    messagingSenderId: "954491198331",
    appId: "1:954491198331:web:db363a0bf8ae7e09f4bbde",
    measurementId: "G-XENW8ZPLZX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, signOut, onAuthStateChanged };
