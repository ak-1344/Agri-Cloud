"use client"

import { SignupForm } from "@/components/auth/signup-form"
import Link from "next/link"

export default function AdminSignupPage() {
  return (
    <div className="animated-bg min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">⚙️ Admin Portal</h1>
          <p className="text-muted-foreground">Create your admin account</p>
        </div>
        <SignupForm userType="admin" />
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/admin/login" className="text-secondary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
