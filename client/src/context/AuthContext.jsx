// client/src/context/AuthContext.jsx

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // 1. Initialize state by reading from localStorage.
  //    The function inside useState runs only once on initial render.
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // 2. Update localStorage when logging in.
  const login = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setLoggedIn(true);
  };

  // 3. Update localStorage when logging out.
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}