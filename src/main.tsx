import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 Add this
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/harmony-birthdate-calculator/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
