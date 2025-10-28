import { AdminLayout } from "@/components/admin/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, AlertCircle, Scale, TrendingUp } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage the AgroConnect platform</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">225</div>
              <p className="text-xs text-muted-foreground">3 pending verification</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Pending Moderation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Requires review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Scale className="w-4 h-4" />
                Open Disputes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">1 escalated</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$95,000</div>
              <p className="text-xs text-muted-foreground">+15% growth</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/users" className="block">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Manage Users
                </Button>
              </Link>
              <Link href="/admin/moderation" className="block">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Review Moderation Queue
                </Button>
              </Link>
              <Link href="/admin/disputes" className="block">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Handle Disputes
                </Button>
              </Link>
              <Link href="/admin/analytics" className="block">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm">Platform Status</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">Database</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">API Response</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Normal</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">Last Backup</p>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
