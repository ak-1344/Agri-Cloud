"use client"

import { SignupForm } from "@/components/auth/signup-form"
import Link from "next/link"

export default function CompanySignupPage() {
  return (
    <div className="animated-bg min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent mb-2">🏢 Company Portal</h1>
          <p className="text-muted-foreground">Create your account to start sourcing</p>
        </div>
        <SignupForm userType="company" />
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/company/login" className="text-accent hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
