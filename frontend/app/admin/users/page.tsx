"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Shield, Ban } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  userType: "farmer" | "company" | "admin"
  status: "active" | "suspended" | "pending"
  joinDate: string
  transactions: number
}

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Farmer",
      email: "john@farm.com",
      userType: "farmer",
      status: "active",
      joinDate: "2024-01-15",
      transactions: 12,
    },
    {
      id: "2",
      name: "Fresh Foods Inc",
      email: "contact@freshfoods.com",
      userType: "company",
      status: "active",
      joinDate: "2024-02-20",
      transactions: 8,
    },
    {
      id: "3",
      name: "Sunny Acres",
      email: "sunny@acres.com",
      userType: "farmer",
      status: "pending",
      joinDate: "2024-10-20",
      transactions: 0,
    },
  ])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "farmer":
        return "bg-blue-100 text-blue-800"
      case "company":
        return "bg-purple-100 text-purple-800"
      case "admin":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Monitor and manage platform users</p>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <Badge className={getUserTypeColor(user.userType)}>{user.userType}</Badge>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Join Date</p>
                        <p className="font-semibold">{user.joinDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Transactions</p>
                        <p className="font-semibold">{user.transactions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">User ID</p>
                        <p className="font-semibold text-sm">{user.id}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                      <Shield className="w-4 h-4" />
                      Verify
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                      <Ban className="w-4 h-4" />
                      Suspend
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
