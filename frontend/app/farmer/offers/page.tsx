"use client"

import { useEffect, useState } from "react"
import { FarmerLayout } from "@/components/farmer/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { apiGet, apiPatch } from "@/lib/api"

interface ApiOffer {
  _id: string
  listingId: { cropName: string, unit?: string, quantity?: number }
  companyId: { companyName: string }
  bidAmount: number
  quantity?: number
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

export default function OffersPage() {
  const { user } = useAuth()
  const [offers, setOffers] = useState<ApiOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id) return
    ;(async () => {
      try {
        const data = await apiGet<ApiOffer[]>(`/api/farmers/${user.id}/bids`)
        setOffers(data)
      } catch (e: any) {
        setError(e?.message || "Failed to load offers")
      } finally {
        setLoading(false)
      }
    })()
  }, [user?.id])

  const handleAcceptOffer = async (id: string) => {
    try {
      const updated = await apiPatch(`/api/bids/${id}/accept`)
      setOffers((prev) => prev.map((o) => (o._id === id ? { ...o, status: "accepted" } as any : o)))
      alert("Offer accepted. Transaction created.")
    } catch (e: any) {
      alert(e?.message || "Failed to accept offer")
    }
  }

  const handleRejectOffer = async (id: string) => {
    try {
      await apiPatch(`/api/bids/${id}/reject`)
      setOffers((prev) => prev.map((o) => (o._id === id ? { ...o, status: "rejected" } as any : o)))
    } catch (e: any) {
      alert(e?.message || "Failed to reject offer")
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
    <FarmerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Offers</h1>
          <p className="text-muted-foreground">Review and manage buyer offers</p>
        </div>

        <div className="grid gap-4">
          {offers.map((offer) => (
            <Card key={offer._id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{offer.companyId?.companyName}</h3>
                      <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{offer.listingId?.cropName}</p>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Quantity</p>
                        <p className="font-semibold">{offer.quantity || offer.listingId?.quantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Price per Unit</p>
                        <p className="font-semibold">${offer.bidAmount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Price</p>
                        <p className="font-semibold text-primary">${(offer.quantity || 1) * offer.bidAmount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="font-semibold">{new Date(offer.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  {offer.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAcceptOffer(offer._id)} className="gap-2">
                        <Check className="w-4 h-4" />
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleRejectOffer(offer._id)} className="gap-2">
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
