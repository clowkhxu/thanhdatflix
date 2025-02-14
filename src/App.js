import React, { useState, useEffect } from "react";
import { auth, onAuthStateChanged, signOut } from "./firebase/firebaseConfig";
import { checkUserRole } from "./firebase/checkRole";
import Login from "./components/Login";

const App = () => {
    const [user, setUser] = useState(null);
    const [isVIP, setIsVIP] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const hasVIPAccess = await checkUserRole(currentUser.uid);
                setUser(currentUser);
                setIsVIP(hasVIPAccess);
            } else {
                setUser(null);
                setIsVIP(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p>Đang kiểm tra thông tin...</p>;

    if (!user || !isVIP) {
        return <Login onLogin={(user) => setUser(user)} />;
    }

    return (
        <div>
            <h1>Chào mừng {user.email} đến với CLOWPHIM!</h1>
            <p>Bạn có quyền truy cập vì bạn là VIP.</p>
            <button onClick={() => signOut(auth)}>Đăng xuất</button>
            {/* Nội dung trang web chính */}
        </div>
    );
};

export default App;
