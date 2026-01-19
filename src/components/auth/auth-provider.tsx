'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredAuth() {
  if (typeof window !== 'undefined') {
    const storedUsername = localStorage.getItem('api_username');
    const storedPassword = localStorage.getItem('api_password');
    if (storedUsername && storedPassword) {
      return { username: storedUsername, isAuthenticated: true };
    }
  }
  return { username: null, isAuthenticated: false };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState(() => getStoredAuth());

  const login = (username: string, password: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('api_username', username);
      localStorage.setItem('api_password', password);
      setAuthState({ isAuthenticated: true, username });
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('api_username');
      localStorage.removeItem('api_password');
      setAuthState({ isAuthenticated: false, username: null });
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
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
