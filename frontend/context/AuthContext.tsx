"use client"

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Define la forma de los datos que compartiremos
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

// Creamos el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Creamos el "Proveedor", el componente que envolverá la app
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Para saber si estamos verificando el token inicial
  const router = useRouter();

  // Al cargar la app, revisa si ya teníamos un token guardado
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('authToken', newToken); // Guardamos el token para persistir la sesión
    setToken(newToken);
    router.push('/dashboard-page'); // Redirigimos al dashboard
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    router.push('/login-page'); // Redirigimos al login
  };

  const value = { token, login, logout, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Creamos un "Hook" para que los componentes accedan fácil al contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
