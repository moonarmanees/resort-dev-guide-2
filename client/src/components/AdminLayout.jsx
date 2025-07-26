// client/src/components/AdminLayout.jsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    // Main flex container for the admin layout
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-white shadow-md p-4" aria-label="Admin sidebar">
        <h2 className="text-2xl font-bold mb-4">Admin</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/admin" className="block p-2 rounded hover:bg-gray-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="settings" className="block p-2 rounded hover:bg-gray-200">
              Settings
            </Link>
          </li>
        </ul>
        {/* Logout button styled with Tailwind */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 text-red-600 border border-red-600 rounded px-4 py-2 hover:bg-red-600 hover:text-white transition-colors"
        >
          Logout
        </button>
      </nav>

      {/* Main admin content area */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}