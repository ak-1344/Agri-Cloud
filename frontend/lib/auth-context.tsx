"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserType = "farmer" | "company" | "admin" | null

interface User {
  id: string
  email?: string
  phone?: string
  name: string
  userType: UserType
  verified?: boolean
}

interface AuthContextType {
  user: User | null
  userType: UserType
  isLoading: boolean
  login: (identifier: string, password: string, userType: UserType) => Promise<void>
  signup: (args: { email?: string; phone?: string; password: string; name: string; userType: UserType }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("agroconnect_user")
    const storedToken = localStorage.getItem("agroconnect_token")
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("agroconnect_user")
        localStorage.removeItem("agroconnect_token")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (identifier: string, _password: string, userType: UserType) => {
    setIsLoading(true)
    try {
      const { apiPost } = await import("./api")
      const payload =
        userType === "farmer"
          ? { role: "farmer", phone: identifier }
          : { role: "company", email: identifier }
      const data = await apiPost<any>("/api/auth/demo-login", payload)
      const u: User = { id: data.user.id, name: data.user.name, userType }
      setUser(u)
      localStorage.setItem("agroconnect_user", JSON.stringify(u))
      localStorage.setItem("agroconnect_token", data.token)
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async ({ email, phone, password: _password, name, userType }: { email?: string; phone?: string; password: string; name: string; userType: UserType }) => {
    setIsLoading(true)
    try {
      // create or upsert demo user via backend to ensure ids exist
      const { apiPost } = await import("./api")
      const payload =
        userType === "farmer"
          ? { role: "farmer", phone }
          : userType === "company"
          ? { role: "company", email }
          : { role: "company", email } // fallback for admin not supported in demo
      const data = await apiPost<any>("/api/auth/demo-login", payload)
      const u: User = { id: data.user.id, name: name || data.user.name, userType, email, phone }
      setUser(u)
      localStorage.setItem("agroconnect_user", JSON.stringify(u))
      localStorage.setItem("agroconnect_token", data.token)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("agroconnect_user")
  }

  return (
    <AuthContext.Provider value={{ user, userType: user?.userType || null, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
