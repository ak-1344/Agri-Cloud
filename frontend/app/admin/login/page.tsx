"use client"

import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export default function AdminLoginPage() {
  return (
    <div className="animated-bg min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">⚙️ Admin Portal</h1>
          <p className="text-muted-foreground">Sign in to manage the platform</p>
        </div>
        <LoginForm userType="admin" />
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/admin/signup" className="text-secondary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
