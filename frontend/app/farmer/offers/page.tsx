"use client"

import { useState } from "react"
import { FarmerLayout } from "@/components/farmer/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

interface Offer {
  id: string
  buyerName: string
  crop: string
  quantity: number
  unit: string
  pricePerUnit: number
  totalPrice: number
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: "1",
      buyerName: "Fresh Foods Inc",
      crop: "Tomatoes",
      quantity: 50,
      unit: "kg",
      pricePerUnit: 28,
      totalPrice: 1400,
      status: "pending",
      createdAt: "2024-10-22",
    },
    {
      id: "2",
      buyerName: "Local Market",
      crop: "Tomatoes",
      quantity: 30,
      unit: "kg",
      pricePerUnit: 25,
      totalPrice: 750,
      status: "accepted",
      createdAt: "2024-10-21",
    },
  ])

  const handleAcceptOffer = (id: string) => {
    setOffers(offers.map((o) => (o.id === id ? { ...o, status: "accepted" } : o)))
  }

  const handleRejectOffer = (id: string) => {
    setOffers(offers.map((o) => (o.id === id ? { ...o, status: "rejected" } : o)))
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
    <FarmerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Offers</h1>
          <p className="text-muted-foreground">Review and manage buyer offers</p>
        </div>

        <div className="grid gap-4">
          {offers.map((offer) => (
            <Card key={offer.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{offer.buyerName}</h3>
                      <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{offer.crop}</p>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Quantity</p>
                        <p className="font-semibold">
                          {offer.quantity} {offer.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Price per Unit</p>
                        <p className="font-semibold">${offer.pricePerUnit}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Price</p>
                        <p className="font-semibold text-primary">${offer.totalPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="font-semibold">{offer.createdAt}</p>
                      </div>
                    </div>
                  </div>
                  {offer.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAcceptOffer(offer.id)} className="gap-2">
                        <Check className="w-4 h-4" />
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleRejectOffer(offer.id)} className="gap-2">
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
    </FarmerLayout>
  )
}
