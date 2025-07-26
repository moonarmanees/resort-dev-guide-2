// client/src/components/Layout.jsx
import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* --- Tailwind Navbar --- */}
      <nav className="bg-gray-100 p-4 shadow-md" role="navigation">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/">
            <Header title="My App" />
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsNavOpen(!isNavOpen)} aria-label="Toggle navigation">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>

          {/* Menu - uses state to toggle on mobile */}
          <div className={`w-full md:flex md:items-center md:w-auto ${isNavOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col md:flex-row md:ml-auto mt-4 md:mt-0 md:space-x-8 items-center">
              <li>
                <Link className="block py-2 px-4 hover:text-blue-600" to="/">Home</Link>
              </li>
              <li>
                <Link className="block py-2 px-4 hover:text-blue-600" to="/about">About</Link>
              </li>
              <li>
                {isLoggedIn ? (
                  <button onClick={() => { logout(); navigate('/'); }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
                ) : (
                  <button onClick={() => { login(); navigate('/admin'); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Login</button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main id="main-content" className="container mx-auto p-4 flex-grow">
        <Outlet />
      </main>

      <Footer text="My Awesome App" />
    </div>
  );
}