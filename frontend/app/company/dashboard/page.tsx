import { CompanyLayout } from "@/components/company/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Store, Gavel, Truck, TrendingDown } from "lucide-react"

export default function CompanyDashboardPage() {
  return (
    <CompanyLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your sourcing portal</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Store className="w-4 h-4" />
                Available Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">In marketplace</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Gavel className="w-4 h-4" />
                Active Bids
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Pending response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Truck className="w-4 h-4" />
                In Transit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Arriving soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Total Spent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,820</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/company/marketplace" className="block">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Browse Marketplace
                </Button>
              </Link>
              <Link href="/company/bids" className="block">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Place New Bid
                </Button>
              </Link>
              <Link href="/company/procurement" className="block">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Track Orders
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
                <p className="font-medium">Bid accepted by Green Valley Farm</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Order in transit from Sunny Acres</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Payment processed: $1,200</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CompanyLayout>
  )
}
