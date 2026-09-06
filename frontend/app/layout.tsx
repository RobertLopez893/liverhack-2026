import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { AuthProvider } from '../context/AuthContext';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Liverpool HR - Panel de Control",
  description: "Sistema de Gestión de Recursos Humanos Liverpool",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider> {/* Envuélvelo aquí */}
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
