"use client"

import { useEffect, useMemo, useState } from "react"
import { CompanyLayout } from "@/components/company/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { apiDelete, apiGet, apiPatch } from "@/lib/api"

interface ApiBid {
  _id: string
  listingId: { cropName: string }
  companyId: { companyName: string }
  bidAmount: number
  quantity?: number
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

export default function BidsPage() {
  const { user } = useAuth()
  const [bids, setBids] = useState<ApiBid[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id) return
    ;(async () => {
      try {
        const data = await apiGet<ApiBid[]>(`/api/bids?companyId=${user.id}`)
        setBids(data)
      } catch (e: any) {
        setError(e?.message || "Failed to load bids")
      } finally {
        setLoading(false)
      }
    })()
  }, [user?.id])

  function statusClass(s: string) {
    switch (s) {
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
        <div>
          <h1 className="text-3xl font-bold">My Bids</h1>
          <p className="text-muted-foreground">Manage your bids and negotiations</p>
        </div>

        {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
        {error && <div className="text-sm text-destructive">{error}</div>}

        <div className="grid gap-4">
          {bids.map((bid) => (
            <Card key={bid._id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{bid.listingId?.cropName}</h3>
                      <Badge className={statusClass(bid.status)}>{bid.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{bid.companyId?.companyName}</p>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Quantity</p>
                        <p className="font-semibold">{bid.quantity || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Bid Price per Unit</p>
                        <p className="font-semibold">${bid.bidAmount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Bid</p>
                        <p className="font-semibold text-accent">${(bid.quantity || 1) * bid.bidAmount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="font-semibold">{new Date(bid.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  {bid.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        className="text-xs underline text-muted-foreground"
                        onClick={async () => {
                          const amountStr = window.prompt("New bid amount", String(bid.bidAmount))
                          const qtyStr = window.prompt("New quantity", String(bid.quantity || 0))
                          const bidAmount = Number(amountStr)
                          const quantity = Number(qtyStr)
                          if (!bidAmount) return
                          try {
                            await apiPatch(`/api/bids/${bid._id}`, { bidAmount, quantity })
                            setBids((prev) => prev.map((b) => (b._id === bid._id ? { ...b, bidAmount, quantity } : b)))
                          } catch (e: any) {
                            alert(e?.message || "Failed to update bid")
                          }
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-xs underline text-destructive"
                        onClick={async () => {
                          try {
                            await apiDelete(`/api/bids/${bid._id}`)
                            setBids((prev) => prev.filter((b) => b._id !== bid._id))
                          } catch (e: any) {
                            alert(e?.message || "Failed to cancel bid")
                          }
                        }}
                      >
                        Cancel
                      </button>
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
