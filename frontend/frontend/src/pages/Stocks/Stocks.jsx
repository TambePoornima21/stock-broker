"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import "./Stocks.css";

function Stocks() {
  const [selectedStock, setSelectedStock] = useState("");
  const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 170.25, change: "+1.50" },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc. (Class A)",
      price: 155.8,
      change: "-0.75",
    },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 420.1, change: "+2.10" },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 185.5, change: "+0.90" },
    { symbol: "TSLA", name: "Tesla Inc.", price: 175.0, change: "-3.20" },
  ];

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  const displayStock = stocks.find((stock) => stock.symbol === selectedStock);

  return (
    <div className="stocks-page">
      <Navbar />
      <div className="page-content">
        <h1>Stocks</h1>
        <p>View real-time stock prices and market data.</p>

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
            <p>Market Cap: $X.XX Trillion</p> {/* Placeholder */}
            <p>Volume: Y.YY Million</p> {/* Placeholder */}
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
