
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@velynt.com' && password === 'admin123') {
      setToken('velynt-jwt-token');
      navigate('/admin/settings');
    } else {
      alert('❌ Hatalı giriş. Email veya şifre yanlış.');
    }
  };

  return (
    <div style={{ padding: '3rem' }}>
      <h2>Velynt Admin Giriş</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Şifre:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button style={{ marginTop: 20 }} type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}
