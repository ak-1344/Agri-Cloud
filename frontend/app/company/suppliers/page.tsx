"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Phone } from "lucide-react"

export default function CompanySuppliers() {
  const suppliers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Punjab",
      rating: 4.5,
      crops: "Tomatoes, Onions",
      verified: true,
      phone: "+91 98765 43210",
    },
    {
      id: 2,
      name: "Priya Singh",
      location: "Haryana",
      rating: 4.2,
      crops: "Onions, Potatoes",
      verified: true,
      phone: "+91 98765 43211",
    },
    {
      id: 3,
      name: "Amit Patel",
      location: "Uttar Pradesh",
      rating: 4.8,
      crops: "Potatoes, Carrots",
      verified: true,
      phone: "+91 98765 43212",
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Supplier Directory</h1>
        <p className="text-muted-foreground">Manage your verified suppliers</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{supplier.name}</CardTitle>
                  <CardDescription>{supplier.crops}</CardDescription>
                </div>
                {supplier.verified && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">✓ Verified</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-yellow-500" fill="currentColor" />
                <span className="font-semibold">{supplier.rating}/5</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span>{supplier.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-muted-foreground" />
                  <span>{supplier.phone}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-accent hover:bg-accent/90">View Profile</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
