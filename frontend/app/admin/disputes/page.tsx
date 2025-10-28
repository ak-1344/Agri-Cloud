"use client"

import { AdminLayout } from "@/components/admin/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Dispute {
  id: string
  plaintiff: string
  defendant: string
  amount: number
  reason: string
  status: "open" | "resolved" | "escalated"
  createdAt: string
}

export default function DisputesPage() {
  const disputes: Dispute[] = [
    {
      id: "1",
      plaintiff: "Fresh Foods Inc",
      defendant: "Green Valley Farm",
      amount: 500,
      reason: "Quality mismatch",
      status: "open",
      createdAt: "2024-10-22",
    },
    {
      id: "2",
      plaintiff: "Local Market",
      defendant: "Sunny Acres",
      amount: 200,
      reason: "Late delivery",
      status: "resolved",
      createdAt: "2024-10-20",
    },
    {
      id: "3",
      plaintiff: "Green Grocers",
      defendant: "Fresh Harvest",
      amount: 1000,
      reason: "Payment dispute",
      status: "escalated",
      createdAt: "2024-10-18",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "escalated":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Disputes</h1>
          <p className="text-muted-foreground">Manage platform disputes and conflicts</p>
        </div>

        <div className="grid gap-4">
          {disputes.map((dispute) => (
            <Card key={dispute.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">
                        {dispute.plaintiff} vs {dispute.defendant}
                      </h3>
                      <Badge className={getStatusColor(dispute.status)}>{dispute.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{dispute.reason}</p>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Amount</p>
                        <p className="font-semibold">${dispute.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Dispute ID</p>
                        <p className="font-semibold">{dispute.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Created</p>
                        <p className="font-semibold">{dispute.createdAt}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Days Open</p>
                        <p className="font-semibold">4</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm">Resolve</Button>
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
