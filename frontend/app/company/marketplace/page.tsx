"use client"

import { useState } from "react"
import { CompanyLayout } from "@/components/company/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

interface Listing {
  id: string
  farmerName: string
  crop: string
  quantity: number
  unit: string
  pricePerUnit: number
  location: string
  quality: string
}

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [listings] = useState<Listing[]>([
    {
      id: "1",
      farmerName: "Green Valley Farm",
      crop: "Tomatoes",
      quantity: 100,
      unit: "kg",
      pricePerUnit: 25,
      location: "California",
      quality: "Premium",
    },
    {
      id: "2",
      farmerName: "Sunny Acres",
      crop: "Lettuce",
      quantity: 50,
      unit: "kg",
      pricePerUnit: 15,
      location: "Oregon",
      quality: "Standard",
    },
    {
      id: "3",
      farmerName: "Fresh Harvest",
      crop: "Carrots",
      quantity: 200,
      unit: "kg",
      pricePerUnit: 12,
      location: "Washington",
      quality: "Premium",
    },
  ])

  const filteredListings = listings.filter(
    (listing) =>
      listing.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.farmerName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

        <div className="grid gap-4">
          {filteredListings.map((listing) => (
            <Card key={listing.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{listing.crop}</h3>
                      <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">{listing.quality}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{listing.farmerName}</p>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Available</p>
                        <p className="font-semibold">
                          {listing.quantity} {listing.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Price per Unit</p>
                        <p className="font-semibold">${listing.pricePerUnit}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="font-semibold">{listing.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Value</p>
                        <p className="font-semibold text-accent">${listing.quantity * listing.pricePerUnit}</p>
                      </div>
                    </div>
                  </div>
                  <Button className="gap-2">Place Bid</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CompanyLayout>
  )
}
