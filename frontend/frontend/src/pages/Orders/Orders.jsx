import Navbar from "../../components/Navbar";
import "./Orders.css";

function Orders() {
  const orders = [
    {
      id: 1,
      type: "Buy",
      stock: "AAPL",
      quantity: 10,
      price: 169.5,
      date: "2024-07-20",
    },
    {
      id: 2,
      type: "Sell",
      stock: "GOOGL",
      quantity: 5,
      price: 156.0,
      date: "2024-07-19",
    },
    {
      id: 3,
      type: "Buy",
      stock: "MSFT",
      quantity: 8,
      price: 418.0,
      date: "2024-07-18",
    },
    {
      id: 4,
      type: "Buy",
      stock: "AMZN",
      quantity: 12,
      price: 184.0,
      date: "2024-07-17",
    },
    {
      id: 5,
      type: "Sell",
      stock: "TSLA",
      quantity: 3,
      price: 178.0,
      date: "2024-07-16",
    },
  ];

  return (
    <div className="orders-page">
      <Navbar />
      <div className="page-content">
        <h1>Orders</h1>
        <p>Review your past buy and sell transactions.</p>

        {orders.length > 0 ? (
          <div className="orders-table-container card">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Type</th>
                  <th>Stock</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className={
                      order.type === "Buy" ? "buy-order" : "sell-order"
                    }
                  >
                    <td>{order.id}</td>
                    <td>{order.type}</td>
                    <td>{order.stock}</td>
                    <td>{order.quantity}</td>
                    <td>${order.price.toFixed(2)}</td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-orders">No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
