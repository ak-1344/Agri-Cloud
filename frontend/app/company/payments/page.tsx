"use client"

import { CompanyLayout } from "@/components/company/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

interface Payment {
  id: string
  type: "payment" | "refund"
  amount: number
  description: string
  date: string
  status: "completed" | "pending"
}

export default function PaymentsPage() {
  const totalSpent = 2820
  const payments: Payment[] = [
    {
      id: "1",
      type: "payment",
      amount: 1200,
      description: "Tomatoes from Green Valley Farm",
      date: "2024-10-22",
      status: "completed",
    },
    {
      id: "2",
      type: "payment",
      amount: 420,
      description: "Lettuce from Sunny Acres",
      date: "2024-10-21",
      status: "completed",
    },
    {
      id: "3",
      type: "refund",
      amount: 100,
      description: "Partial refund - quality issue",
      date: "2024-10-20",
      status: "completed",
    },
    {
      id: "4",
      type: "payment",
      amount: 1200,
      description: "Carrots from Fresh Harvest",
      date: "2024-10-19",
      status: "pending",
    },
  ]

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Manage your transactions and payments</p>
        </div>

        <Card className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground">
          <CardContent className="pt-6">
            <p className="text-sm opacity-90">Total Spent This Month</p>
            <h2 className="text-4xl font-bold mt-2">${totalSpent.toLocaleString()}</h2>
            <div className="flex gap-2 mt-6">
              <Button variant="secondary" size="sm">
                Make Payment
              </Button>
              <Button variant="secondary" size="sm" variant="outline">
                View Invoice
              </Button>
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-lg font-semibold mb-4">Payment History</h3>
          <div className="space-y-2">
            {payments.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${payment.type === "payment" ? "bg-red-100" : "bg-green-100"}`}>
                        {payment.type === "payment" ? (
                          <ArrowUpRight className="w-4 h-4 text-red-600" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-xs text-muted-foreground">{payment.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${payment.type === "payment" ? "text-red-600" : "text-green-600"}`}>
                        {payment.type === "payment" ? "-" : "+"}${payment.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">{payment.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </CompanyLayout>
  )
}
