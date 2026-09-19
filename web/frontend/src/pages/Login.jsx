import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../api/config";
import useAuthStore from "../store/authStore";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, form);
      setUser(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <h2>Login</h2>
        {error && <p className="error-msg">{error}</p>}
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
            <input id="loginUserName" name="username" type="text" required
              value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} />
            <label>User name</label>
          </div>
          <div className="input-box">
            <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
            <input id="loginPassword" name="password" type="password" required
              value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
            <label>Password</label>
          </div>
          <button type="submit" className="btn" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
          <div className="login-register">
            <p>Don&apos;t have an account? <Link to="/register" className="register-link">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
