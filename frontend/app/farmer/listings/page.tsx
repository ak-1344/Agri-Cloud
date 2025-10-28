"use client"

import { useEffect, useState } from "react"
import { FarmerLayout } from "@/components/farmer/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Edit2, Flag } from "lucide-react"
import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"

interface ApiListing {
  _id: string
  cropName: string
  quantity: number
  unit: string
  pricePerUnit: number
  status: string
}

export default function ListingsPage() {
  const { user } = useAuth()
  const [listings, setListings] = useState<ApiListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ cropName: "", quantity: 0, unit: "kg", pricePerUnit: 0 })

  async function load() {
    if (!user?.id) return
    setLoading(true)
    try {
      const data = await apiGet<ApiListing[]>(`/api/listings?farmerId=${user.id}`)
      setListings(data)
    } catch (e: any) {
      setError(e?.message || "Failed to load listings")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [user?.id])

  const handleAddListing = async () => {
    if (!formData.cropName || formData.quantity <= 0 || formData.pricePerUnit <= 0) return
    try {
      await apiPost<ApiListing>("/api/listings", {
        farmerId: user?.id,
        cropName: formData.cropName,
        quantity: formData.quantity,
        unit: formData.unit,
        pricePerUnit: formData.pricePerUnit,
        qualityGrade: "A",
      })
      setFormData({ cropName: "", quantity: 0, unit: "kg", pricePerUnit: 0 })
      setShowForm(false)
      await load()
    } catch (e: any) {
      setError(e?.message || "Failed to create listing")
    }
  }

  const handleDeleteListing = async (_id: string) => {
    try {
      await apiDelete(`/api/listings/${_id}`)
      setListings((prev) => prev.filter((l) => l._id !== _id))
    } catch (e: any) {
      alert(e?.message || "Failed to delete listing")
    }
  }

  const handleEditListing = async (l: ApiListing) => {
    const cropName = window.prompt("Crop name", l.cropName) || l.cropName
    const quantity = Number(window.prompt("Quantity", String(l.quantity)) || l.quantity)
    const unit = window.prompt("Unit (kg/quintal/ton)", l.unit) || l.unit
    const pricePerUnit = Number(window.prompt("Price per unit", String(l.pricePerUnit)) || l.pricePerUnit)
    try {
      const updated = await apiPatch<ApiListing>(`/api/listings/${l._id}`, {
        cropName,
        quantity,
        unit,
        pricePerUnit,
      })
      setListings((prev) => prev.map((it) => (it._id === l._id ? updated : it)))
    } catch (e: any) {
      alert(e?.message || "Failed to update listing")
    }
  }

  const handleMarkSold = async (_id: string) => {
    try {
      const res = await apiPatch(`/api/listings/${_id}/mark-sold`)
      setListings((prev) => prev.map((it) => (it._id === _id ? { ...it, status: "pending" } : it)))
    } catch (e: any) {
      alert(e?.message || "Failed to mark as sold")
    }
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
                    value={formData.cropName}
                    onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
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
              {error && <div className="text-sm text-destructive">{error}</div>}
              <div className="flex gap-2">
                <Button onClick={handleAddListing}>Create Listing</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
        {error && !showForm && <div className="text-sm text-destructive">{error}</div>}

        <div className="grid gap-4">
          {listings.map((listing) => (
            <Card key={listing._id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{listing.cropName}</h3>
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
                    <Button variant="outline" size="sm" title="Edit" onClick={() => handleEditListing(listing)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" title="Delete" onClick={() => handleDeleteListing(listing._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" title="Mark Sold" onClick={() => handleMarkSold(listing._id)}>
                      <Flag className="w-4 h-4" />
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
