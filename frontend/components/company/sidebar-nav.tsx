"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Store, Gavel, Truck, CreditCard, User } from "lucide-react"

const navItems = [
  { href: "/company/dashboard", label: "Dashboard", icon: Home },
  { href: "/company/marketplace", label: "Marketplace", icon: Store },
  { href: "/company/bids", label: "My Bids", icon: Gavel },
  { href: "/company/procurement", label: "Procurement", icon: Truck },
  { href: "/company/payments", label: "Payments", icon: CreditCard },
  { href: "/company/profile", label: "Profile", icon: User },
]

export function CompanySidebarNav() {
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
              isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted",
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
