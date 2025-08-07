import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8084/transactions/${userId}`)
        .then((response) => setOrders(response.data))
        .catch((error) => console.error("Error fetching orders:", error));
    }
  }, [userId]);

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
                    className={order.status === "SUCCESS" ? "buy-order" : "sell-order"}
                  >
                    <td>{order.id}</td>
                    <td>{order.status}</td>
                    <td>{order.stockSymbol}</td>
                    <td>{order.quantity}</td>
                    <td>${order.price.toFixed(2)}</td>
                    <td>{order.timestamp?.split("T")[0]}</td>
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
