"use client"

import { useEffect, useMemo, useState } from "react"
import { FarmerLayout } from "@/components/farmer/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { apiGet } from "@/lib/api"

interface Txn {
  _id: string
  amount: number
  paymentStatus: string
  createdAt: string
  listingId?: { cropName?: string }
}

export default function WalletPage() {
  const { user } = useAuth()
  const [balance, setBalance] = useState(0)
  const [txns, setTxns] = useState<Txn[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return
    ;(async () => {
      try {
        const farmer = await apiGet<any>(`/api/farmers/${user.id}`)
        setBalance(farmer.walletBalance || 0)
        const t = await apiGet<Txn[]>(`/api/transactions?farmerId=${user.id}`)
        setTxns(t)
      } finally {
        setLoading(false)
      }
    })()
  }, [user?.id])

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
              <Button variant="outline" size="sm">
                Add Funds
              </Button>
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-2">
            {txns.map((tx) => (
              <Card key={tx._id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${tx.paymentStatus === "completed" ? "bg-green-100" : "bg-yellow-100"}`}>
                        {tx.paymentStatus === "completed" ? (
                          <ArrowDownLeft className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{tx.listingId?.cropName || "Transaction"}</p>
                        <p className="text-xs text-muted-foreground">{new Date(tx.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${tx.paymentStatus === "completed" ? "text-green-600" : "text-yellow-700"}`}>
                      +${tx.amount}
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
