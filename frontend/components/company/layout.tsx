"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { CompanySidebarNav } from "./sidebar-nav"
import { PortalNavbar } from "@/components/portal-navbar"

export function CompanyLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.userType !== "company") {
      router.push("/company/login")
    }
  }, [user, router])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen light-animated-bg">
      <PortalNavbar portalName="Company Portal" portalColor="accent" />
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="sticky top-24">
            <CompanySidebarNav />
          </div>
        </aside>
        <main className="md:col-span-3">{children}</main>
      </div>
    </div>
  )
}
