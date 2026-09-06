"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock } from "lucide-react"
import { Footer } from "./footer"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";

interface LoginPageProps {
  onLogin: (token: string) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);

  export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const authContext = useAuth(); // Usa el hook para acceder a las funciones del contexto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const auth = getAuth();
    try {      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      
      // ¡Aquí está la conexión! Le pasamos el token a nuestro guardián.
      authContext.login(idToken); 

    } catch (error) {
      console.error("Error al iniciar sesión:", error);      
      setError("Correo o contraseña incorrectos. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: "#E8E4E1" }}>
        <div className="absolute top-0 left-0 w-80 h-80">
          <svg viewBox="0 0 320 320" className="w-full h-full">
            <defs>
              <linearGradient id="pinkGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#EC407A", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#F48FB1", stopOpacity: 0.8 }} />
              </linearGradient>
            </defs>
            <polygon points="0,0 0,160 160,0" fill="url(#pinkGradient1)" />
            <polygon points="0,0 0,80 80,0" fill="#E91E63" opacity="0.9" />
            <polygon points="0,80 0,160 80,80" fill="#F06292" opacity="0.7" />
            <polygon points="80,0 80,80 160,0" fill="#F8BBD0" opacity="0.6" />
            <polygon points="0,160 0,240 80,160" fill="#FCE4EC" opacity="0.5" />
            <polygon points="80,80 80,160 160,80" fill="#F8BBD0" opacity="0.4" />
            <polygon points="160,0 160,80 240,0" fill="#FCE4EC" opacity="0.3" />
          </svg>
        </div>

        <div className="absolute bottom-0 right-0 w-80 h-80">
          <svg viewBox="0 0 320 320" className="w-full h-full">
            <defs>
              <linearGradient id="pinkGradient2" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#EC407A", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#F48FB1", stopOpacity: 0.8 }} />
              </linearGradient>
            </defs>
            <polygon points="320,320 320,160 160,320" fill="url(#pinkGradient2)" />
            <polygon points="320,320 320,240 240,320" fill="#E91E63" opacity="0.9" />
            <polygon points="320,240 320,160 240,240" fill="#F06292" opacity="0.7" />
            <polygon points="240,320 240,240 160,320" fill="#F8BBD0" opacity="0.6" />
            <polygon points="320,160 320,80 240,160" fill="#FCE4EC" opacity="0.5" />
            <polygon points="240,240 240,160 160,240" fill="#F8BBD0" opacity="0.4" />
            <polygon points="160,320 160,240 80,320" fill="#FCE4EC" opacity="0.3" />
          </svg>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-full p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-12">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-6" style={{ color: "#E91E63", letterSpacing: "-0.02em" }}>
                Liverpool
              </h1>
              <h2 className="text-lg font-semibold text-gray-700 leading-tight">
                Acceso al Sistema de
                <br />
                Recursos Humanos
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Correo eléctronico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 bg-white border-gray-300 text-gray-700 placeholder:text-gray-400"
                />
              </div>

              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Constareña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-12 h-12 bg-white border-gray-300 text-gray-700 placeholder:text-gray-400"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#D81B60" }}
              >
                Iniciar Sesión
              </Button>
            </form>

            {error && (
              <p className="mt-4 text-center text-red-600">{error}</p>
            )}

            <div className="mt-6 text-center space-y-1">
              <button type="button" className="text-sm text-gray-500 hover:text-gray-700 block w-full underline">
                Olvidé mi contraseña
              </button>
              <button type="button" className="text-sm block w-full hover:underline" style={{ color: "#D81B60" }}>
                Correo o contraseña incorrectos.
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
