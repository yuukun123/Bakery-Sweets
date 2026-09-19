import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    alert("Registered successfully! Please login.");
    navigate('/login');
  };

  return (
    <div className="register-page" style={{ display: 'flex', justifyContent: 'center', padding: '50px 0' }}>
      <form onSubmit={handleRegister} style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2>Register</h2>
        <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required style={{ padding: '10px' }} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '10px' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '10px' }} />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#d28f64', color: '#fff', border: 'none', cursor: 'pointer' }}>Register</button>
      </form>
    </div>
  );
}
