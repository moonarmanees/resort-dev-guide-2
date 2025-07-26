import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import PrivateRoute from './components/PrivateRoute';
import './index.css'


const Home      = lazy(() => import('./pages/Home'));
const About     = lazy(() => import('./pages/About'));
const Counter   = lazy(() => import('./components/Counter'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Settings  = lazy(() => import('./pages/admin/Settings'));
const NotFound  = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Layout />}>
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
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading…</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>

      {/* Protected admin routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<div>Loading Dashboard…</div>}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<div>Loading Settings…</div>}>
              <Settings />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
