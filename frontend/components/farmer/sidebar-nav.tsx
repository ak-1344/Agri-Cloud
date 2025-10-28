"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Wallet, User, ShoppingCart, MessageSquare, Home } from "lucide-react"

const navItems = [
  { href: "/farmer/dashboard", label: "Dashboard", icon: Home },
  { href: "/farmer/listings", label: "My Listings", icon: ShoppingCart },
  { href: "/farmer/offers", label: "Offers", icon: MessageSquare },
  { href: "/farmer/orders", label: "Orders", icon: BarChart3 },
  { href: "/farmer/wallet", label: "Wallet", icon: Wallet },
  { href: "/farmer/profile", label: "Profile", icon: User },
]

export function SidebarNav() {
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
              isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
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
