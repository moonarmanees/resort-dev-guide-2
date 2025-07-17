import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// <-- Make sure you import your provider from the right file:
import  CounterProvider from './context/CounterProvider.jsx'; // 👉 include the “.jsx” extension

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CounterProvider>
      <App />
    </CounterProvider>
  </BrowserRouter>
);
