"use client"

import { FarmerLayout } from "@/components/farmer/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

interface Transaction {
  id: string
  type: "credit" | "debit"
  amount: number
  description: string
  date: string
}

export default function WalletPage() {
  const balance = 3150
  const transactions: Transaction[] = [
    { id: "1", type: "credit", amount: 1400, description: "Payment from Fresh Foods Inc", date: "2024-10-22" },
    { id: "2", type: "credit", amount: 750, description: "Payment from Local Market", date: "2024-10-21" },
    { id: "3", type: "debit", amount: 100, description: "Platform fee", date: "2024-10-20" },
    { id: "4", type: "credit", amount: 1100, description: "Payment from Green Grocers", date: "2024-10-19" },
  ]

  return (
    <FarmerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Wallet</h1>
          <p className="text-muted-foreground">Manage your funds and transactions</p>
        </div>

        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="pt-6">
            <p className="text-sm opacity-90">Available Balance</p>
            <h2 className="text-4xl font-bold mt-2">${balance.toLocaleString()}</h2>
            <div className="flex gap-2 mt-6">
              <Button variant="secondary" size="sm">
                Withdraw
              </Button>
              <Button variant="secondary" size="sm" variant="outline">
                Add Funds
              </Button>
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-2">
            {transactions.map((tx) => (
              <Card key={tx.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${tx.type === "credit" ? "bg-green-100" : "bg-red-100"}`}>
                        {tx.type === "credit" ? (
                          <ArrowDownLeft className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${tx.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                      {tx.type === "credit" ? "+" : "-"}${tx.amount}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </FarmerLayout>
  )
}
