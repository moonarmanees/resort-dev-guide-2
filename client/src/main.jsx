import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'   // ← add this
import { CounterProvider } from './context/CounterContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <CounterProvider>
    <App />
  </CounterProvider>
  </BrowserRouter>
)

