// client/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for an active session when the component mounts
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for changes in authentication state (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Clean up the subscription when the component unmounts
    return () => subscription.unsubscribe();
  }, []);

  // Properly handle signup with error handling
  const signUp = async (email, password) => {
    console.log('Attempting signup for:', email);
    
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password 
    });
    
    if (error) {
      console.error('Signup error:', error);
      throw error;
    }
    
    console.log('Signup successful:', data);
    return data;
  };

  // Properly handle login with error handling
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) {
      console.error('Login error:', error);
      throw error;
    }
    
    return data;
  };

  // Properly handle logout
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // The value provided to consuming components
  const value = {
    session,
    user: session?.user,
    isLoggedIn: !!session, // True if a session exists, false otherwise
    signUp,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}