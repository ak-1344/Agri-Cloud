"use client"

import { useEffect, useMemo, useState } from "react"
import { CompanyLayout } from "@/components/company/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { apiGet, apiPost } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"

interface ApiListing {
  _id: string
  cropName: string
  quantity: number
  unit: string
  pricePerUnit: number
  qualityGrade?: string
  harvestDate?: string
  farmerId?: { name?: string; location?: { district?: string; state?: string } }
}

export default function MarketplacePage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [listings, setListings] = useState<ApiListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await apiGet<ApiListing[]>("/api/listings")
        if (mounted) setListings(data)
      } catch (e: any) {
        setError(e?.message || "Failed to load listings")
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return listings.filter((l) => {
      const crop = l.cropName?.toLowerCase() || ""
      const farmer = (l.farmerId?.name || "").toLowerCase()
      return crop.includes(term) || farmer.includes(term)
    })
  }, [listings, searchTerm])

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground">Browse available produce from verified farmers</p>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search crops or farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {loading && <div className="text-sm text-muted-foreground">Loading listings...</div>}
        {error && <div className="text-sm text-destructive">{error}</div>}

        <div className="grid gap-4">
          {filtered.map((l) => {
            const farmerName = l.farmerId?.name || "Farmer"
            const location = [l.farmerId?.location?.district, l.farmerId?.location?.state]
              .filter(Boolean)
              .join(", ")
            return (
              <Card key={l._id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{l.cropName}</h3>
                        {l.qualityGrade && (
                          <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">{l.qualityGrade}</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{farmerName}</p>
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Available</p>
                          <p className="font-semibold">
                            {l.quantity} {l.unit}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Price per Unit</p>
                          <p className="font-semibold">${l.pricePerUnit}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="font-semibold">{location || "-"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Total Value</p>
                          <p className="font-semibold text-accent">${l.quantity * l.pricePerUnit}</p>
                        </div>
                      </div>
                    </div>
                    <Button className="gap-2" onClick={async () => {
                      const amountStr = window.prompt("Bid amount per unit")
                      const qtyStr = window.prompt("Quantity")
                      const bidAmount = Number(amountStr)
                      const quantity = Number(qtyStr)
                      if (!user?.id || !bidAmount || !quantity) return
                      try {
                        await apiPost("/api/bids", {
                          listingId: l._id,
                          companyId: user.id,
                          bidAmount,
                          quantity,
                        })
                        alert("Bid placed")
                      } catch (e: any) {
                        alert(e?.message || "Failed to place bid")
                      }
                    }}>Place Bid</Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </CompanyLayout>
  )
}
