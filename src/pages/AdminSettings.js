
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, clearToken } from '../utils/auth';

export default function AdminSettings() {
  const [logo, setLogo] = useState(null);
  const [color, setColor] = useState("#ffffff");
  const [font, setFont] = useState("serif");
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate('/admin/login');
      return;
    }
    fetch('/.netlify/functions/getTheme')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setColor(data.themeColor || "#ffffff");
          setFont(data.fontFamily || "serif");
          setLogo(data.logoUrl || null);
        }
      });
  }, [navigate]);

  const handleLogout = () => {
    clearToken();
    navigate('/admin/login');
  };

  const handleSave = () => {
    fetch('/.netlify/functions/saveTheme', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        themeColor: color,
        fontFamily: font,
        logoUrl: logo,
      }),
    })
    .then(res => res.ok ? alert("✅ Ayarlar başarıyla kaydedildi!") : alert("❌ Kayıt başarısız."))
    .catch(() => alert("❌ Sunucuya ulaşılamadı!"));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ fontFamily: font, backgroundColor: color, minHeight: "100vh", padding: "2rem" }}>
      <h1>Velynt Admin Panel - Tema Ayarları</h1>
      <button onClick={handleLogout}>Çıkış Yap</button>

      <div>
        <label>Logo Yükle: </label>
        <input type="file" onChange={handleFileChange} />
        {logo && <img src={logo} alt="Logo" style={{ height: 60, marginTop: 10 }} />}
      </div>

      <div style={{ marginTop: 20 }}>
        <label>Renk: </label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>

      <div style={{ marginTop: 20 }}>
        <label>Yazı Tipi: </label>
        <select value={font} onChange={(e) => setFont(e.target.value)}>
          <option value="serif">Serif</option>
          <option value="sans-serif">Sans-serif</option>
          <option value="monospace">Monospace</option>
        </select>
      </div>

      <button style={{ marginTop: 30, padding: "10px 20px" }} onClick={handleSave}>Kaydet</button>
    </div>
  );
}
