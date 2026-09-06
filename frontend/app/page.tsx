"use client"

import { useState } from "react"
import { LoginPage } from "@/components/login-page"
import { DashboardPage } from "@/components/dashboard-page"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return <>{!isLoggedIn ? <LoginPage onLogin={() => setIsLoggedIn(true)} /> : <DashboardPage />}</>
}
