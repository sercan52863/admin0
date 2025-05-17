
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminSettings from './pages/AdminSettings';
import AdminLogin from './pages/AdminLogin';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
    </Routes>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
