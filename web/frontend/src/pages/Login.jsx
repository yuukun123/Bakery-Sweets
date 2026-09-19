import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === '123') {
      setAuth({ id: 1, role: 'admin', name: 'Admin User' }, 'mock-token');
      navigate('/');
    } else if (email && password) {
      setAuth({ id: 2, role: 'user', name: 'Customer User' }, 'mock-token');
      navigate('/');
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page" style={{ display: 'flex', justifyContent: 'center', padding: '50px 0' }}>
      <form onSubmit={handleLogin} style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '10px' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '10px' }} />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#d28f64', color: '#fff', border: 'none', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
}

