import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import CounterProvider from './context/CounterProvider'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Vite injects BASE_URL (same as `base` above) into import.meta.env.BASE_URL
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <CounterProvider>
      <App />
    </CounterProvider>
  </BrowserRouter>
)
