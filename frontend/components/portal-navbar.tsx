"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sprout, LogOut } from "lucide-react"
import Link from "next/link"

interface PortalNavbarProps {
  portalName: string
  portalColor?: string
}

export function PortalNavbar({ portalName, portalColor = "primary" }: PortalNavbarProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const colorClasses = {
    primary: "text-primary border-primary/20",
    accent: "text-accent border-accent/20",
    secondary: "text-secondary border-secondary/20",
  }

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Sprout className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-xl font-bold text-foreground">AgroConnect</h1>
            <p className={`text-xs font-medium ${colorClasses[portalColor as keyof typeof colorClasses]}`}>
              {portalName}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
