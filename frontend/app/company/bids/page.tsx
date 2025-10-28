"use client"

import { useState } from "react"
import { CompanyLayout } from "@/components/company/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

interface Bid {
  id: string
  farmerName: string
  crop: string
  quantity: number
  unit: string
  bidPrice: number
  totalBid: number
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

export default function BidsPage() {
  const [bids, setBids] = useState<Bid[]>([
    {
      id: "1",
      farmerName: "Green Valley Farm",
      crop: "Tomatoes",
      quantity: 50,
      unit: "kg",
      bidPrice: 24,
      totalBid: 1200,
      status: "pending",
      createdAt: "2024-10-22",
    },
    {
      id: "2",
      farmerName: "Sunny Acres",
      crop: "Lettuce",
      quantity: 30,
      unit: "kg",
      bidPrice: 14,
      totalBid: 420,
      status: "accepted",
      createdAt: "2024-10-21",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ crop: "", quantity: 0, bidPrice: 0 })

  const handlePlaceBid = () => {
    if (formData.crop && formData.quantity > 0 && formData.bidPrice > 0) {
      const newBid: Bid = {
        id: Math.random().toString(36).substr(2, 9),
        farmerName: "Selected Farmer",
        crop: formData.crop,
        quantity: formData.quantity,
        unit: "kg",
        bidPrice: formData.bidPrice,
        totalBid: formData.quantity * formData.bidPrice,
        status: "pending",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setBids([...bids, newBid])
      setFormData({ crop: "", quantity: 0, bidPrice: 0 })
      setShowForm(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Bids</h1>
            <p className="text-muted-foreground">Manage your bids and negotiations</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            New Bid
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Crop</label>
                  <Input
                    placeholder="e.g., Tomatoes"
                    value={formData.crop}
                    onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Quantity (kg)</label>
                  <Input
                    type="number"
                    placeholder="50"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Bid Price per Unit</label>
                  <Input
                    type="number"
                    placeholder="24"
                    value={formData.bidPrice}
                    onChange={(e) => setFormData({ ...formData, bidPrice: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handlePlaceBid}>Place Bid</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {bids.map((bid) => (
            <Card key={bid.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{bid.crop}</h3>
                      <Badge className={getStatusColor(bid.status)}>{bid.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{bid.farmerName}</p>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Quantity</p>
                        <p className="font-semibold">
                          {bid.quantity} {bid.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Bid Price per Unit</p>
                        <p className="font-semibold">${bid.bidPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Bid</p>
                        <p className="font-semibold text-accent">${bid.totalBid}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="font-semibold">{bid.createdAt}</p>
                      </div>
                    </div>
                  </div>
                  {bid.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Cancel
                      </Button>
                    </div>
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
