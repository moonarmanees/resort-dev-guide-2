// client/src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import PrivateRoute from "./components/PrivateRoute";

// --- Lazy-loaded Page Components ---
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const LoginPage = lazy(() => import("./pages/LoginPage")); // Add import
const SignUpPage = lazy(() => import("./pages/SignUpPage")); // Add import
const Counter = lazy(() => import("./components/Counter"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

// --- Data for Layout Props ---
const navLinks = [
  { to: "/", text: "Home" },
  { to: "/about", text: "About Us" },
];

export default function App() {
  return (
    // A single Suspense wrapper provides a fallback for all lazy-loaded routes
    <Suspense
      fallback={<div className="container mx-auto p-4">Loading page...</div>}
    >
      <Routes>
        {/* --- Public Routes --- */}
        <Route
          path="/"
          element={<Layout siteName="My Awesome Site" navLinks={navLinks} />}
        >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="counter" element={<Counter />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* --- Protected Admin Routes --- */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
