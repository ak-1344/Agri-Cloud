"use client"

import { useState } from "react"
import { FarmerLayout } from "@/components/farmer/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Edit2 } from "lucide-react"

interface Listing {
  id: string
  crop: string
  quantity: number
  unit: string
  pricePerUnit: number
  description: string
  createdAt: string
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([
    {
      id: "1",
      crop: "Tomatoes",
      quantity: 100,
      unit: "kg",
      pricePerUnit: 25,
      description: "Fresh organic tomatoes",
      createdAt: "2024-10-20",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ crop: "", quantity: 0, unit: "kg", pricePerUnit: 0, description: "" })

  const handleAddListing = () => {
    if (formData.crop && formData.quantity > 0 && formData.pricePerUnit > 0) {
      const newListing: Listing = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setListings([...listings, newListing])
      setFormData({ crop: "", quantity: 0, unit: "kg", pricePerUnit: 0, description: "" })
      setShowForm(false)
    }
  }

  const handleDeleteListing = (id: string) => {
    setListings(listings.filter((l) => l.id !== id))
  }

  return (
    <FarmerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Listings</h1>
            <p className="text-muted-foreground">Manage your crop listings</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            New Listing
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Listing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Crop Name</label>
                  <Input
                    placeholder="e.g., Tomatoes"
                    value={formData.crop}
                    onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Quantity</label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Unit</label>
                  <Input
                    placeholder="kg"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Price per Unit</label>
                  <Input
                    type="number"
                    placeholder="25"
                    value={formData.pricePerUnit}
                    onChange={(e) => setFormData({ ...formData, pricePerUnit: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input
                  placeholder="Describe your crop..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddListing}>Create Listing</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {listings.map((listing) => (
            <Card key={listing.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{listing.crop}</h3>
                    <p className="text-sm text-muted-foreground">{listing.description}</p>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Quantity</p>
                        <p className="font-semibold">
                          {listing.quantity} {listing.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Price per Unit</p>
                        <p className="font-semibold">${listing.pricePerUnit}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Value</p>
                        <p className="font-semibold">${listing.quantity * listing.pricePerUnit}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteListing(listing.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
