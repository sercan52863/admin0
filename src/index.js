
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminSettings from './pages/AdminSettings';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/admin/settings" element={<AdminSettings />} />
    </Routes>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
