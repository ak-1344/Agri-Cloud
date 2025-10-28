"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Sprout, Building2, Shield, TrendingUp, Lock, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen light-animated-bg">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 fade-in">
          <div className="inline-flex items-center gap-2 mb-6">
            <Sprout className="w-12 h-12 text-primary" />
            <h1 className="text-6xl font-bold gradient-text">AgroConnect</h1>
          </div>
          <p className="text-2xl text-foreground/80 mb-4 max-w-3xl mx-auto">Connecting Farmers Directly with Buyers</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fair prices. Transparent transactions. Blockchain-secured escrow payments.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="enhanced-card border-2 stagger-item">
            <CardHeader>
              <TrendingUp className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Fair Market Prices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                AI-powered price recommendations based on real-time market data
              </p>
            </CardContent>
          </Card>

          <Card className="enhanced-card border-2 stagger-item">
            <CardHeader>
              <Lock className="w-10 h-10 text-accent mb-2" />
              <CardTitle>Secure Escrow</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Blockchain-based escrow ensures safe and transparent transactions
              </p>
            </CardContent>
          </Card>

          <Card className="enhanced-card border-2 stagger-item">
            <CardHeader>
              <Zap className="w-10 h-10 text-secondary mb-2" />
              <CardTitle>Instant Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Real-time updates via WhatsApp for bids, orders, and payments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Portal Selection */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Choose Your Portal</h2>
          <p className="text-muted-foreground">Select the portal that matches your role</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Farmer Portal */}
          <Card className="enhanced-card hover:shadow-xl transition-all cursor-pointer border-2 hover:border-primary stagger-item group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sprout className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Farmer Portal</CardTitle>
              <CardDescription>Sell your produce directly to buyers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• List crops with photos and details</li>
                <li>• Receive bids from verified buyers</li>
                <li>• Track orders and deliveries</li>
                <li>• Manage wallet and payments</li>
              </ul>
              <Link href="/farmer/login" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 btn-hover">Enter Farmer Portal</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Company Portal */}
          <Card className="enhanced-card hover:shadow-xl transition-all cursor-pointer border-2 hover:border-accent stagger-item group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Company Portal</CardTitle>
              <CardDescription>Source quality produce efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Browse verified farmer listings</li>
                <li>• Place competitive bids</li>
                <li>• Manage procurement pipeline</li>
                <li>• Track payments and invoices</li>
              </ul>
              <Link href="/company/login" className="block">
                <Button className="w-full bg-accent hover:bg-accent/90 btn-hover">Enter Company Portal</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Admin Portal */}
          <Card className="enhanced-card hover:shadow-xl transition-all cursor-pointer border-2 hover:border-secondary stagger-item group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription>Manage and monitor platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Monitor all transactions</li>
                <li>• Verify users and listings</li>
                <li>• Handle disputes efficiently</li>
                <li>• View analytics and insights</li>
              </ul>
              <Link href="/admin/login" className="block">
                <Button className="w-full bg-secondary hover:bg-secondary/90 btn-hover">Enter Admin Portal</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center text-sm text-muted-foreground stagger-item">
          <p className="mb-2">Powered by blockchain technology and AI-driven insights</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <span>MongoDB Integration Ready</span>
            <span>•</span>
            <span>Blockchain Escrow Support</span>
            <span>•</span>
            <span>Real-time Notifications</span>
          </div>
        </div>
      </div>
    </div>
  )
}
