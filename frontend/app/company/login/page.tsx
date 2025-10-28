"use client"

import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export default function CompanyLoginPage() {
  return (
    <div className="animated-bg min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent mb-2">🏢 Company Portal</h1>
          <p className="text-muted-foreground">Sign in to source quality produce</p>
        </div>
        <LoginForm userType="company" />
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/company/signup" className="text-accent hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
