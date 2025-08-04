import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

const stocks = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.0,
    change: 1.25,
    percentChange: 0.72,
    details: "Tech giant, iPhone manufacturer.",
  },
  {
    id: "2",
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 420.5,
    change: -0.75,
    percentChange: -0.18,
    details: "Software, cloud computing, gaming.",
  },
  {
    id: "3",
    symbol: "GOOGL",
    name: "Alphabet Inc. (Class A)",
    price: 150.2,
    change: 2.1,
    percentChange: 1.42,
    details: "Google search, Android, YouTube.",
  },
  {
    id: "4",
    symbol: "AMZN",
    price: 185.7,
    change: 0.9,
    percentChange: 0.49,
    details: "E-commerce, cloud services, digital streaming.",
  },
  {
    id: "5",
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 180.1,
    change: -3.5,
    percentChange: -1.9,
    details: "Electric vehicles, energy storage.",
  },
]

export default function StocksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Stocks & Market Data</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stocks.map((stock) => (
          <Card key={stock.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">{stock.symbol}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Details <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex flex-col items-start">
                    <span className="font-medium">{stock.name}</span>
                    <span className="text-sm text-muted-foreground">{stock.details}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>
              <p className={`text-sm ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {stock.change >= 0 ? "+" : ""}
                {stock.change.toFixed(2)} ({stock.percentChange.toFixed(2)}%)
              </p>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1">
                  Buy
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Sell
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
