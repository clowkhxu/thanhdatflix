import { useState, useEffect } from "react";
import { auth, db } from "./firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Login from "./components/Login";
import Home from "./pages/Home"; // Import trang Home.tsx

function App() {
    const [user, setUser] = useState < any > (null);
    const [isVIP, setIsVIP] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists() && userSnap.data().role === "VIP") {
                    setIsVIP(true);
                } else {
                    setIsVIP(false);
                    await signOut(auth);
                }
            } else {
                setIsVIP(false);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p>Đang kiểm tra quyền truy cập...</p>;

    if (!user || !isVIP) return <Login onLoginSuccess={() => window.location.reload()} />;

    return (
        <div>
            <button onClick={() => signOut(auth)}>Đăng xuất</button>
            <Home /> {/* Hiển thị trang Home.tsx */}
        </div>
    );
}

export default App;
