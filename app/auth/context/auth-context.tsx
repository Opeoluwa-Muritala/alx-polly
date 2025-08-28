'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    // This is a placeholder for actual authentication check
    const checkAuth = async () => {
      try {
        // Simulate checking auth state
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Auth check error:', error);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    // This is a placeholder for actual sign in logic
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setUser({
          id: '1',
          name: 'Test User',
          email: email,
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Sign in error:', error);
      setLoading(false);
      throw error;
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    // This is a placeholder for actual sign up logic
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setUser({
          id: '1',
          name: name,
          email: email,
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Sign up error:', error);
      setLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    // This is a placeholder for actual sign out logic
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setUser(null);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Sign out error:', error);
      setLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
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