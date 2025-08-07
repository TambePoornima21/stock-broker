"use client";

import Navbar from "../../components/Navbar";
import "./Portfolio.css";

// Example stock prices for current and previous day
const STOCK_PRICES = {
  AAPL: { current: 170.25, prev: 168.75 },
  GOOGL: { current: 155.8, prev: 156.55 },
  MSFT: { current: 420.1, prev: 418.0 },
  AMZN: { current: 185.5, prev: 184.6 },
  TSLA: { current: 175.0, prev: 178.2 },
};

function Portfolio({ portfolio, orders }) {
  // Calculate total invested amount (sum of all buy orders)
  let totalValue = 0;
  let totalCurrentValue = 0;
  let totalPrevValue = 0;

  Object.entries(portfolio).forEach(([symbol, qty]) => {
    const priceObj = STOCK_PRICES[symbol];
    if (!priceObj) return;
    totalCurrentValue += qty * priceObj.current;
    totalPrevValue += qty * priceObj.prev;
  });

  orders.forEach((order) => {
    if (order.type === "Buy") {
      totalValue += order.price * order.quantity;
    } else if (order.type === "Sell") {
      totalValue -= order.price * order.quantity;
    }
  });

  const totalReturns = totalCurrentValue - totalValue;
  const oneDayReturns = totalCurrentValue - totalPrevValue;

  return (
    <div className="portfolio-page">
      <Navbar />
      <div className="page-content">
        <h1>Portfolio</h1>
        <div className="portfolio-summary">
          <h2>Summary</h2>
          <p>
            <strong>Total Invested:</strong>{" "}
            <span className="total-invested">${totalValue.toFixed(2)}</span>
          </p>
          <p>
            <strong>Current Value:</strong>{" "}
            <span className="total-value">${totalCurrentValue.toFixed(2)}</span>
          </p>
          <p>
            <strong>One Day Returns:</strong>{" "}
            <span className={oneDayReturns >= 0 ? "positive" : "negative"}>
              ${oneDayReturns.toFixed(2)}
            </span>
          </p>
          <p>
            <strong>Total Returns:</strong>{" "}
            <span className={totalReturns >= 0 ? "positive" : "negative"}>
              ${totalReturns.toFixed(2)}
            </span>
          </p>
        </div>
        <div className="owned-stocks-table-container">
          <h2>Current Holdings</h2>
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Current Price</th>
                <th>Current Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(portfolio).length === 0 ? (
                <tr>
                  <td colSpan={4} className="no-stocks">No holdings yet.</td>
                </tr>
              ) : (
                Object.entries(portfolio).map(([symbol, qty]) => (
                  <tr key={symbol}>
                    <td>{symbol}</td>
                    <td>{qty}</td>
                    <td>${STOCK_PRICES[symbol]?.current.toFixed(2) || "N/A"}</td>
                    <td>
                      ${STOCK_PRICES[symbol] ? (qty * STOCK_PRICES[symbol].current).toFixed(2) : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
