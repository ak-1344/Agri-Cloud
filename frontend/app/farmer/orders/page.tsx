"use client"

import { FarmerLayout } from "@/components/farmer/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: string
  buyerName: string
  crop: string
  quantity: number
  unit: string
  totalPrice: number
  status: "pending" | "shipped" | "delivered"
  createdAt: string
}

export default function OrdersPage() {
  const orders: Order[] = [
    {
      id: "1",
      buyerName: "Fresh Foods Inc",
      crop: "Tomatoes",
      quantity: 50,
      unit: "kg",
      totalPrice: 1400,
      status: "shipped",
      createdAt: "2024-10-22",
    },
    {
      id: "2",
      buyerName: "Local Market",
      crop: "Tomatoes",
      quantity: 30,
      unit: "kg",
      totalPrice: 750,
      status: "delivered",
      createdAt: "2024-10-21",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <FarmerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Track your orders and shipments</p>
        </div>

        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{order.buyerName}</h3>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{order.crop}</p>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Quantity</p>
                        <p className="font-semibold">
                          {order.quantity} {order.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Price</p>
                        <p className="font-semibold text-primary">${order.totalPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Order ID</p>
                        <p className="font-semibold">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="font-semibold">{order.createdAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </FarmerLayout>
  )
}
