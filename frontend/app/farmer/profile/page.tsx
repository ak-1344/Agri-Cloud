"use client"

import { useState } from "react"
import { FarmerLayout } from "@/components/farmer/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Farmer",
    email: "john@farm.com",
    phone: "+1 (555) 123-4567",
    location: "California, USA",
    farmName: "Green Valley Farm",
    cropTypes: "Tomatoes, Lettuce, Carrots",
    yearsExperience: "15",
  })

  const [editData, setEditData] = useState(profile)

  const handleSave = () => {
    setProfile(editData)
    setIsEditing(false)
  }

  return (
    <FarmerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Manage your account information</p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit"}</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  value={isEditing ? editData.name : profile.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  value={isEditing ? editData.email : profile.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={isEditing ? editData.phone : profile.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={isEditing ? editData.location : profile.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Farm Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Farm Name</label>
                <Input
                  value={isEditing ? editData.farmName : profile.farmName}
                  onChange={(e) => setEditData({ ...editData, farmName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Years of Experience</label>
                <Input
                  value={isEditing ? editData.yearsExperience : profile.yearsExperience}
                  onChange={(e) => setEditData({ ...editData, yearsExperience: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Crop Types</label>
                <Input
                  value={isEditing ? editData.cropTypes : profile.cropTypes}
                  onChange={(e) => setEditData({ ...editData, cropTypes: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {isEditing && (
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        )}
      </div>
    </FarmerLayout>
  )
}
