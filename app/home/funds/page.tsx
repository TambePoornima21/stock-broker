import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FundsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Fund Management</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Balance</CardTitle>
            <CardDescription>Your available funds for trading.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">$5,000.00</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add Funds</CardTitle>
            <CardDescription>Deposit money into your trading account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deposit-amount">Amount</Label>
              <Input id="deposit-amount" type="number" placeholder="100.00" />
            </div>
            <Button className="w-full">Deposit Funds</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Withdraw Funds</CardTitle>
            <CardDescription>Withdraw money from your trading account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="withdraw-amount">Amount</Label>
              <Input id="withdraw-amount" type="number" placeholder="50.00" />
            </div>
            <Button className="w-full bg-transparent" variant="outline">
              Withdraw Funds
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
