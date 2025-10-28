"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserType = "farmer" | "company" | "admin" | null

interface User {
  id: string
  email: string
  name: string
  userType: UserType
  verified: boolean
}

interface AuthContextType {
  user: User | null
  userType: UserType
  isLoading: boolean
  login: (email: string, password: string, userType: UserType) => Promise<void>
  signup: (email: string, password: string, name: string, userType: UserType) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("agroconnect_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("agroconnect_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, userType: UserType) => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split("@")[0],
        userType,
        verified: true,
      }
      setUser(mockUser)
      localStorage.setItem("agroconnect_user", JSON.stringify(mockUser))
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string, userType: UserType) => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        userType,
        verified: false,
      }
      setUser(mockUser)
      localStorage.setItem("agroconnect_user", JSON.stringify(mockUser))
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
