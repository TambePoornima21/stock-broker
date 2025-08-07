"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import "./Stocks.css";

function Stocks({ userId }) {
  const [selectedStock, setSelectedStock] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [balance, setBalance] = useState(0);
  const [portfolio, setPortfolio] = useState({});
  const [stocks, setStocks] = useState([]);

  // 🔁 Fetch stocks, balance, and portfolio once when component mounts
  useEffect(() => {
    axios.get("http://localhost:8084/stocks")
      .then(res => setStocks(res.data))
      .catch(err => console.error("Error fetching stocks:", err));

    axios.get(`http://localhost:8084/funds/balance/${userId}`)
      .then(res => setBalance(res.data))
      .catch(err => console.error("Error fetching balance:", err));

    axios.get(`http://localhost:8084/portfolio/${userId}`)
      .then(res => {
        const map = {};
        res.data.forEach(item => {
          map[item.stockSymbol] = item.quantity;
        });
        setPortfolio(map);
      })
      .catch(err => console.error("Error fetching portfolio:", err));
  }, [userId]);

  const handleStockChange = (e) => setSelectedStock(e.target.value);
  const handleQuantityChange = (e) => setQuantity(Number(e.target.value));
  const displayStock = stocks.find((stock) => stock.symbol === selectedStock);

  const handleBuy = (stock) => {
    const totalCost = stock.price * quantity;
    if (totalCost > balance) {
      alert("Insufficient funds!");
      return;
    }

    axios.post("http://localhost:8084/stocks/buy", null, {
      params: {
        userId,
        symbol: stock.symbol,
        stockName: stock.name,
        quantity,
        price: stock.price,
      },
    })
      .then(() => {
        alert(`Bought ${quantity} shares of ${stock.symbol}`);
        setBalance(prev => prev - totalCost);
        setPortfolio(prev => ({
          ...prev,
          [stock.symbol]: (prev[stock.symbol] || 0) + quantity,
        }));
      })
      .catch(err => {
        console.error("Buy failed:", err);
        alert("Failed to buy stock. Try again.");
      });
  };

  const handleSell = (stock) => {
    const owned = portfolio[stock.symbol] || 0;
    if (quantity > owned) {
      alert("You don't own enough shares to sell!");
      return;
    }

    // ❗ Replace this with backend API for sell when ready
    alert(`Sold ${quantity} shares of ${stock.symbol}`);
    setBalance(prev => prev + quantity * stock.price);
    setPortfolio(prev => ({
      ...prev,
      [stock.symbol]: prev[stock.symbol] - quantity,
    }));
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

        {selectedStock && displayStock ? (
          <div className="stock-details card">
            <h3>{displayStock.name} ({displayStock.symbol})</h3>
            <p>Current Price: <span className="price">${displayStock.price.toFixed(2)}</span></p>
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="quantity-input">Quantity:&nbsp;</label>
              <input
                id="quantity-input"
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                style={{
                  width: "80px",
                  padding: "6px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
            </div>
            <div className="stock-actions">
              <button onClick={() => handleBuy(displayStock)}>Buy</button>
              <button onClick={() => handleSell(displayStock)}>Sell</button>
            </div>
          </div>
        ) : (
          <p className="select-prompt">Please select a stock to view its details.</p>
        )}
      </div>
    </div>
  );
}

export default Stocks;
