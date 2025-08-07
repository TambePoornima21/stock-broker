"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import "./Stocks.css";

function Stocks({ addOrder, balance, portfolio }) {
  const [selectedStock, setSelectedStock] = useState("");
  const [quantity, setQuantity] = useState(1);

  const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 170.25, change: "+1.50" },
    { symbol: "GOOGL", name: "Alphabet Inc. (Class A)", price: 155.8, change: "-0.75" },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 420.1, change: "+2.10" },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 185.5, change: "+0.90" },
    { symbol: "TSLA", name: "Tesla Inc.", price: 175.0, change: "-3.20" },
  ];

  const handleStockChange = (e) => setSelectedStock(e.target.value);
  const handleQuantityChange = (e) => setQuantity(Number(e.target.value));

  const displayStock = stocks.find((stock) => stock.symbol === selectedStock);

  const handleBuy = (stock) => {
    if (stock.price * quantity > balance) {
      alert("Insufficient funds!");
      return;
    }
    addOrder({
      type: "Buy",
      stock: stock.symbol,
      name: stock.name,
      quantity,
      price: stock.price,
      date: new Date().toLocaleDateString(),
    });
    alert(`Bought ${quantity} shares of ${stock.symbol}`);
  };

  const handleSell = (stock) => {
    const owned = portfolio[stock.symbol] || 0;
    if (quantity > owned) {
      alert("You don't own enough shares to sell!");
      return;
    }
    addOrder({
      type: "Sell",
      stock: stock.symbol,
      name: stock.name,
      quantity,
      price: stock.price,
      date: new Date().toLocaleDateString(),
    });
    alert(`Sold ${quantity} shares of ${stock.symbol}`);
  };

  return (
    <div className="stocks-page">
      <Navbar />
      <div className="page-content">
        <h1>Stocks</h1>
        <p>Balance: ${balance.toFixed(2)}</p>
        <div className="stock-selection">
          <label htmlFor="stock-select">Select a Stock:</label>
          <select
            id="stock-select"
            value={selectedStock}
            onChange={handleStockChange}
          >
            <option value="">-- Please choose an option --</option>
            {stocks.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.symbol} - {stock.name}
              </option>
            ))}
          </select>
        </div>
        {selectedStock && displayStock && (
          <div className="stock-details card">
            <h3>
              {displayStock.name} ({displayStock.symbol})
            </h3>
            <p>
              Current Price:{" "}
              <span className="price">${displayStock.price.toFixed(2)}</span>
            </p>
            <p>
              Change:{" "}
              <span
                className={
                  displayStock.change.startsWith("+") ? "positive" : "negative"
                }
              >
                {displayStock.change}
              </span>
            </p>
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="quantity-input">Quantity:&nbsp;</label>
              <input
                id="quantity-input"
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                style={{ width: "80px", padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
            <div className="stock-actions">
              <button onClick={() => handleBuy(displayStock)}>Buy</button>
              <button onClick={() => handleSell(displayStock)}>Sell</button>
            </div>
          </div>
        )}
        {!selectedStock && (
          <p className="select-prompt">
            Please select a stock from the dropdown to view its details.
          </p>
        )}
      </div>
    </div>
  );
}

export default Stocks;
