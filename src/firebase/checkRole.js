import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const checkUserRole = async (userId) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const userData = userSnap.data();
        return userData.role === "VIP";
    }
    return false;
};

export { checkUserRole };
