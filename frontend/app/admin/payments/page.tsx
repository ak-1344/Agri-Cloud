"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AdminPayments() {
  const escrowTransactions = [
    { id: 1, from: "Fresh Foods Ltd", to: "Rajesh Kumar", amount: "₹7,800", status: "Completed", date: "2024-01-10" },
    { id: 2, from: "Green Mart", to: "Priya Singh", amount: "₹9,500", status: "Pending", date: "2024-01-12" },
    { id: 3, from: "Organic Traders", to: "Amit Patel", amount: "₹16,000", status: "Pending", date: "2024-01-14" },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Payments & Escrow</h1>
        <p className="text-muted-foreground">Manage escrow transactions and fund releases</p>
      </div>

      {/* Escrow Summary */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total in Escrow</p>
            <p className="text-3xl font-bold">₹2,45,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Pending Release</p>
            <p className="text-3xl font-bold">₹25,500</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Released (30d)</p>
            <p className="text-3xl font-bold">₹1,23,400</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Escrow Transactions</CardTitle>
          <CardDescription>Recent escrow fund movements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {escrowTransactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50">
                <div>
                  <p className="font-semibold">
                    {tx.from} → {tx.to}
                  </p>
                  <p className="text-sm text-muted-foreground">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">{tx.amount}</p>
                  <Badge
                    className={
                      tx.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
