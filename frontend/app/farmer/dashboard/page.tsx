import { FarmerLayout } from "@/components/farmer/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TrendingUp, Package, Wallet, MessageSquare } from "lucide-react"

export default function FarmerDashboardPage() {
  return (
    <FarmerLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your farm portal</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="w-4 h-4" />
                Active Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Tomatoes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Pending Offers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Fresh Foods Inc</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Wallet Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,150</div>
              <p className="text-xs text-muted-foreground">Available</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/farmer/listings" className="block">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Create New Listing
                </Button>
              </Link>
              <Link href="/farmer/offers" className="block">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  View Offers
                </Button>
              </Link>
              <Link href="/farmer/wallet" className="block">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Withdraw Funds
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">Offer received from Fresh Foods Inc</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Order delivered to Local Market</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Payment received: $750</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FarmerLayout>
  )
}
