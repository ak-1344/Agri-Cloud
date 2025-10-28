"use client"

import { CompanyLayout } from "@/components/company/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProcurementOrder {
  id: string
  farmerName: string
  crop: string
  quantity: number
  unit: string
  totalPrice: number
  status: "pending" | "confirmed" | "in-transit" | "delivered"
  deliveryDate: string
}

export default function ProcurementPage() {
  const orders: ProcurementOrder[] = [
    {
      id: "1",
      farmerName: "Green Valley Farm",
      crop: "Tomatoes",
      quantity: 50,
      unit: "kg",
      totalPrice: 1200,
      status: "confirmed",
      deliveryDate: "2024-10-25",
    },
    {
      id: "2",
      farmerName: "Sunny Acres",
      crop: "Lettuce",
      quantity: 30,
      unit: "kg",
      totalPrice: 420,
      status: "in-transit",
      deliveryDate: "2024-10-24",
    },
    {
      id: "3",
      farmerName: "Fresh Harvest",
      crop: "Carrots",
      quantity: 100,
      unit: "kg",
      totalPrice: 1200,
      status: "delivered",
      deliveryDate: "2024-10-22",
    },
  ]

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
            <Card key={order.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{order.crop}</h3>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{order.farmerName}</p>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Quantity</p>
                        <p className="font-semibold">
                          {order.quantity} {order.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Price</p>
                        <p className="font-semibold text-accent">${order.totalPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Expected Delivery</p>
                        <p className="font-semibold">{order.deliveryDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Order ID</p>
                        <p className="font-semibold text-sm">{order.id}</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CompanyLayout>
  )
}
