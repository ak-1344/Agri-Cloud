"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

interface ModerationItem {
  id: string
  type: "listing" | "review" | "user"
  content: string
  reportedBy: string
  reason: string
  status: "pending" | "approved" | "rejected"
  reportedAt: string
}

export default function ModerationPage() {
  const [items, setItems] = useState<ModerationItem[]>([
    {
      id: "1",
      type: "listing",
      content: "Tomatoes - 100kg",
      reportedBy: "Fresh Foods Inc",
      reason: "Suspicious pricing",
      status: "pending",
      reportedAt: "2024-10-22",
    },
    {
      id: "2",
      type: "review",
      content: "Great quality produce!",
      reportedBy: "Anonymous",
      reason: "Spam review",
      status: "pending",
      reportedAt: "2024-10-21",
    },
    {
      id: "3",
      type: "user",
      content: "Sunny Acres Farm",
      reportedBy: "System",
      reason: "Incomplete verification",
      status: "approved",
      reportedAt: "2024-10-20",
    },
  ])

  const handleApprove = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, status: "approved" } : item)))
  }

  const handleReject = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, status: "rejected" } : item)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Moderation</h1>
          <p className="text-muted-foreground">Review reported content and users</p>
        </div>

        <div className="grid gap-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{item.type}</Badge>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.content}</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Reported By</p>
                        <p className="font-semibold">{item.reportedBy}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Reason</p>
                        <p className="font-semibold">{item.reason}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="font-semibold">{item.reportedAt}</p>
                      </div>
                    </div>
                  </div>
                  {item.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleApprove(item.id)} className="gap-2">
                        <Check className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleReject(item.id)} className="gap-2">
                        <X className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
