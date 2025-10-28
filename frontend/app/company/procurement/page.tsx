"use client"

import { useEffect, useState } from "react"
import { CompanyLayout } from "@/components/company/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { apiGet, apiPost } from "@/lib/api"

interface Txn {
  _id: string
  listingId: { cropName: string }
  farmerId: { name: string }
  companyId: string
  amount: number
  paymentStatus: "initiated" | "completed" | "failed" | "refunded"
  paymentMethod: string
  createdAt: string
}

export default function ProcurementPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Txn[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    if (!user?.id) return
    setLoading(true)
    try {
      const data = await apiGet<Txn[]>(`/api/transactions?companyId=${user.id}`)
      setOrders(data)
    } catch (e: any) {
      setError(e?.message || "Failed to load transactions")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [user?.id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "in-transit":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Procurement</h1>
          <p className="text-muted-foreground">Track your orders and deliveries</p>
        </div>

        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order._id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{order.listingId?.cropName}</h3>
                      <Badge className={order.paymentStatus === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {order.paymentStatus}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{order.farmerId?.name}</p>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Amount</p>
                        <p className="font-semibold text-accent">${order.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Method</p>
                        <p className="font-semibold">{order.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Created</p>
                        <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Txn ID</p>
                        <p className="font-semibold text-sm">{order._id}</p>
                      </div>
                    </div>
                  </div>
                  {order.paymentStatus === "initiated" && (
                    <Button variant="outline" size="sm" onClick={async () => {
                      try {
                        await apiPost(`/api/transactions/${order._id}/complete`, {})
                        await load()
                        alert("Payment completed and farmer credited")
                      } catch (e: any) {
                        alert(e?.message || "Payment failed")
                      }
                    }}>
                      Pay Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CompanyLayout>
  )
}
