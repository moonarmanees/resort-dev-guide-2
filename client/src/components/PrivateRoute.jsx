import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();

  console.log('[PrivateRoute] isLoggedIn =', isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/" replace />;
}
