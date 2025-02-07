import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "clowtruyen-448900.firebaseapp.com",
    projectId: "clowtruyen-448900",
    storageBucket: "clowtruyen-448900.appspot.com",
    messagingSenderId: "463029945",
    appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup };
