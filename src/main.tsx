import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AuthProvider } from './context/AuthContext';
import { ServiceCartProvider } from './context/ServiceCartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ServiceCartProvider>
        <App />
      </ServiceCartProvider>
    </AuthProvider>
  </React.StrictMode>
);
