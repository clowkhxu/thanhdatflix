import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore();

    const checkRoleAndRedirect = async (user) => {
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().role === "VIP") {
            navigate("/home");
        } else {
            setError("Bạn không có quyền truy cập");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await checkRoleAndRedirect(userCredential.user);
        } catch (err) {
            setError("Đăng nhập thất bại. Kiểm tra lại email và mật khẩu.");
        }
    };

    const handleGoogleLogin = adw
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await checkRoleAndRedirect(userCredential.user);
} catch (err) {
    setError("Đăng nhập bằng Google thất bại");
}
  };

return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold text-center mb-4">Đăng Nhập</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                    required
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <Button className="w-full" type="submit">Đăng nhập</Button>
            </form>
            <div className="text-center mt-4">
                <Button className="w-full bg-red-500" onClick={handleGoogleLogin}>Đăng nhập với Google</Button>
            </div>
        </div>
    </div>
);
};

export default Login;
