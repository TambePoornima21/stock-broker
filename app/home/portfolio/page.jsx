import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const portfolioHoldings = [
  {
    id: "1",
    stock: "AAPL",
    quantity: 20,
    avgPrice: 165.0,
    currentPrice: 175.0,
    value: 3500.0,
    pnl: 200.0,
    pnlPercent: 6.06,
  },
  {
    id: "2",
    stock: "GOOGL",
    quantity: 5,
    avgPrice: 145.0,
    currentPrice: 150.2,
    value: 751.0,
    pnl: 26.0,
    pnlPercent: 3.59,
  },
  {
    id: "3",
    stock: "AMZN",
    quantity: 12,
    avgPrice: 180.0,
    currentPrice: 185.7,
    value: 2228.4,
    pnl: 68.4,
    pnlPercent: 3.17,
  },
  {
    id: "4",
    stock: "TSLA",
    quantity: 8,
    avgPrice: 190.0,
    currentPrice: 180.1,
    value: 1440.8,
    pnl: -79.2,
    pnlPercent: -5.21,
  },
]

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Portfolio</h1>
      <Card>
        <CardHeader>
          <CardTitle>Current Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stock</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Avg. Price</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>P&L</TableHead>
                <TableHead>P&L (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioHoldings.map((holding) => (
                <TableRow key={holding.id}>
                  <TableCell className="font-medium">{holding.stock}</TableCell>
                  <TableCell>{holding.quantity}</TableCell>
                  <TableCell>${holding.avgPrice.toFixed(2)}</TableCell>
                  <TableCell>${holding.currentPrice.toFixed(2)}</TableCell>
                  <TableCell>${holding.value.toFixed(2)}</TableCell>
                  <TableCell className={holding.pnl >= 0 ? "text-green-500" : "text-red-500"}>
                    {holding.pnl >= 0 ? "+" : ""}
                    {holding.pnl.toFixed(2)}
                  </TableCell>
                  <TableCell className={holding.pnlPercent >= 0 ? "text-green-500" : "text-red-500"}>
                    {holding.pnlPercent >= 0 ? "+" : ""}
                    {holding.pnlPercent.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
