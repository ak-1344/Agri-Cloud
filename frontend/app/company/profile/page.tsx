"use client"

import { useState } from "react"
import { CompanyLayout } from "@/components/company/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    companyName: "Fresh Foods Inc",
    email: "contact@freshfoods.com",
    phone: "+1 (555) 987-6543",
    location: "New York, USA",
    industry: "Food Distribution",
    employees: "50-100",
    registrationNumber: "REG-2020-12345",
  })

  const [editData, setEditData] = useState(profile)

  const handleSave = () => {
    setProfile(editData)
    setIsEditing(false)
  }

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Company Profile</h1>
            <p className="text-muted-foreground">Manage your company information</p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit"}</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Company Name</label>
                <Input
                  value={isEditing ? editData.companyName : profile.companyName}
                  onChange={(e) => setEditData({ ...editData, companyName: e.target.value })}
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
            <CardTitle>Business Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Industry</label>
                <Input
                  value={isEditing ? editData.industry : profile.industry}
                  onChange={(e) => setEditData({ ...editData, industry: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Number of Employees</label>
                <Input
                  value={isEditing ? editData.employees : profile.employees}
                  onChange={(e) => setEditData({ ...editData, employees: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Registration Number</label>
                <Input
                  value={isEditing ? editData.registrationNumber : profile.registrationNumber}
                  onChange={(e) => setEditData({ ...editData, registrationNumber: e.target.value })}
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
    </CompanyLayout>
  )
}
