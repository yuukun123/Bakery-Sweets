import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../api/config";
import "./Auth.css";

export default function Register() {
  const [form, setForm] = useState({
    username:"", firstname:"", lastname:"", email:"", phone:"",
    street:"", password:"", confirm_password:""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (field) => (e) => setForm({...form, [field]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) { setError("Passwords do not match"); return; }
    setLoading(true); setError("");
    try {
      await axios.post(`${BASE_URL}/auth/register`, form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally { setLoading(false); }
  };

  return (
    <div className="wrapper">
      <div className="form-box register" style={{display:"block"}}>
        <h2>Registration</h2>
        {error && <p className="error-msg">{error}</p>}
        <form id="registerForm" onSubmit={handleSubmit}>
          <div className="input-infor">
            <div className="left-input">
              {[["username","person-outline","User name"],["lastname","person-outline","Last name"],
                ["firstname","person-outline","First name"],["email","mail-outline","Email"],
                ["phone","call-outline","Phone number"]].map(([field,icon,label]) => (
                <div className="input-box" key={field}>
                  <span className="icon"><ion-icon name={icon}></ion-icon></span>
                  <input type={field==="email"?"email":field==="phone"?"number":"text"}
                    id={`register-${field}`} name={field} required
                    value={form[field]} onChange={set(field)} />
                  <label>{label}</label>
                </div>
              ))}
            </div>
            <div className="right-input">
              <div className="input-box">
                <span className="icon"><ion-icon name="location-outline"></ion-icon></span>
                <input type="text" name="street" required value={form.street} onChange={set("street")} />
                <label>Street</label>
              </div>
              {[["password","lock-closed-outline","Password"],["confirm_password","lock-closed-outline","Confirm Password"]].map(([field,icon,label]) => (
                <div className="input-box" key={field}>
                  <span className="icon"><ion-icon name={icon}></ion-icon></span>
                  <input type="password" name={field} required value={form[field]} onChange={set(field)} />
                  <label>{label}</label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="btn" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
          <div className="login-register">
            <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
