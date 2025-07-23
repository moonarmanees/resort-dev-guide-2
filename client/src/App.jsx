import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Lazy‑load your page components
const Home     = lazy(() => import('./pages/Home'))
const About    = lazy(() => import('./pages/About'))
const Counter  = lazy(() => import('./components/Counter'))


export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout />
        }
      >
        {/* Wrap children in Suspense for loading states */}
        <Route
          index
          element={
            <Suspense fallback={<div>Loading Home…</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<div>Loading About…</div>}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="counter"
          element={
            <Suspense fallback={<div>Loading Counter…</div>}>
              <Counter />
            </Suspense>
          }
        />

      </Route>
    </Routes>
  )
}
