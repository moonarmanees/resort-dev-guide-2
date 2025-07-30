// client/src/components/Layout.jsx
import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';

export default function Layout({ siteName, navLinks }) {
  const { isLoggedIn, user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to home after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* --- Header & Navbar --- */}
      <header className="bg-white shadow-sm" role="navigation">
        <nav className="container mx-auto flex items-center justify-between p-4">
          <Link to="/" className="text-xl font-semibold text-gray-800">
            {siteName}
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsNavOpen(!isNavOpen)} aria-label="Toggle navigation">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>

          {/* Desktop Menu & Auth Buttons */}
          <div className={`w-full md:flex md:items-center md:w-auto ${isNavOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col md:flex-row md:ml-auto items-center mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-6">
              {/* Regular Navigation Links */}
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                    onClick={() => setIsNavOpen(false)} // Close mobile menu on click
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
              
              {/* Authentication Section */}
              <li>
                {loading ? (
                  <span className="text-gray-500">Loading...</span>
                ) : isLoggedIn ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 hidden sm:inline">
                      Welcome, {user?.email}
                    </span>
                    <button 
                      onClick={handleLogout} 
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Link 
                      to="/login" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                      onClick={() => setIsNavOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
                      onClick={() => setIsNavOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* --- Main Content --- */}
      <main id="main-content" className="container mx-auto p-4 flex-grow">
        <Outlet />
      </main>

      {/* --- Footer --- */}
      <footer className="bg-white p-4 text-center text-gray-500">
        &copy; {new Date().getFullYear()} {siteName}. All Rights Reserved.
      </footer>
    </div>
  );
}

// Define default props and types for validation
Layout.propTypes = {
  siteName: PropTypes.string,
  navLinks: PropTypes.arrayOf(PropTypes.shape({
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })),
};

Layout.defaultProps = {
  siteName: 'My Website',
  navLinks: [
    { to: '/', text: 'Home' },
    { to: '/about', text: 'About' },
    { to: '/services', text: 'Services' },
    { to: '/contact', text: 'Contact' },
  ],
};