"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Users, AlertCircle, Scale, BarChart3 } from "lucide-react"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/users", label: "User Management", icon: Users },
  { href: "/admin/moderation", label: "Moderation", icon: AlertCircle },
  { href: "/admin/disputes", label: "Disputes", icon: Scale },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
]

export function AdminSidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
              isActive ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-muted",
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
