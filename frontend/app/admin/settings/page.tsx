"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function AdminSettings() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">System Settings</h1>
        <p className="text-muted-foreground">Configure platform settings and emergency controls</p>
      </div>

      {/* Platform Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Platform Configuration</CardTitle>
          <CardDescription>General platform settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3 border rounded-lg">
            <div>
              <p className="font-semibold">Maintenance Mode</p>
              <p className="text-sm text-muted-foreground">Temporarily disable platform access</p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
          <div className="flex justify-between items-center p-3 border rounded-lg">
            <div>
              <p className="font-semibold">Commission Rate</p>
              <p className="text-sm text-muted-foreground">Current: 2.5%</p>
            </div>
            <Button variant="outline">Edit</Button>
          </div>
          <div className="flex justify-between items-center p-3 border rounded-lg">
            <div>
              <p className="font-semibold">Minimum Order Value</p>
              <p className="text-sm text-muted-foreground">Current: ₹1,000</p>
            </div>
            <Button variant="outline">Edit</Button>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Controls */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle size={24} /> Emergency Controls
          </CardTitle>
          <CardDescription>Use with caution - these actions affect all users</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-100 bg-transparent">
            Pause All Transactions
          </Button>
          <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-100 bg-transparent">
            Freeze Escrow Releases
          </Button>
          <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-100 bg-transparent">
            Emergency Shutdown
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
