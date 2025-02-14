import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            onLoginSuccess(); // Gọi callback khi đăng nhập thành công
        } catch (error) {
            setError("Đăng nhập thất bại! Vui lòng kiểm tra lại tài khoản.");
        }
    };

    return (
        <div>
            <h2>Đăng nhập</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
}

export default Login;
