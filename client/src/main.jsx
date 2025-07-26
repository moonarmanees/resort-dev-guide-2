import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import CounterProvider from './context/CounterProvider'
import { AuthProvider } from './context/AuthContext'
import App from './App'
import './index.css'


// Vite injects BASE_URL (same as `base` above) into import.meta.env.BASE_URL
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <AuthProvider>
      <CounterProvider>
        <App />
      </CounterProvider>
    </AuthProvider>
  </BrowserRouter>
)
