import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const orders = [
  { id: "1", stock: "AAPL", type: "Buy", quantity: 10, price: 170.5, date: "2024-07-20", status: "Completed" },
  { id: "2", stock: "MSFT", type: "Sell", quantity: 5, price: 421.0, date: "2024-07-19", status: "Completed" },
  { id: "3", stock: "GOOGL", type: "Buy", quantity: 2, price: 149.8, date: "2024-07-18", status: "Completed" },
  { id: "4", stock: "TSLA", type: "Buy", quantity: 3, price: 182.0, date: "2024-07-17", status: "Pending" },
  { id: "5", stock: "AMZN", type: "Sell", quantity: 7, price: 186.0, date: "2024-07-16", status: "Completed" },
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Order History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stock</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.stock}</TableCell>
                  <TableCell className={order.type === "Buy" ? "text-green-500" : "text-red-500"}>
                    {order.type}
                  </TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>${order.price.toFixed(2)}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
