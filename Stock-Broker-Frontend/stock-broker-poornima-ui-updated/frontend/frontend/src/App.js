"use client";

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Stocks from "./pages/Stocks/Stocks";
import Orders from "./pages/Orders/Orders";
import Fund from "./pages/Fund/Fund";
import Portfolio from "./pages/Portfolio/Portfolio";
import Profile from "./pages/Profile/Profile";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // {username, email, phone, address, memberSince, password}
  const [orders, setOrders] = useState([]);
  const [balance, setBalance] = useState(5000.0);
  const [portfolio, setPortfolio] = useState({}); // {symbol: quantity}

  // Registration handler
  const handleRegister = (userData) => {
    setUser({
      ...userData,
      memberSince: new Date().toISOString().split("T")[0],
    });
    setIsAuthenticated(true);
  };

  // Login handler
  const handleLogin = (loginData) => {
    if (
      user &&
      loginData.username === user.username &&
      loginData.password === user.password
    ) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Add order from Stocks
  const addOrder = (order) => {
    setOrders([...orders, { ...order, id: orders.length + 1 }]);
    // Update portfolio
    setPortfolio((prev) => {
      const qty = prev[order.stock] || 0;
      return {
        ...prev,
        [order.stock]:
          order.type === "Buy"
            ? qty + order.quantity
            : Math.max(0, qty - order.quantity),
      };
    });
    // Update balance
    setBalance((prev) =>
      order.type === "Buy"
        ? prev - order.price * order.quantity
        : prev + order.price * order.quantity
    );
  };

  // Deposit/Withdraw funds
  const deposit = (amount) => setBalance((prev) => prev + amount);
  const withdraw = (amount) => setBalance((prev) => prev - amount);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <Home onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated && user ? (
                <Profile user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/stocks"
            element={
              isAuthenticated ? (
                <Stocks
                  addOrder={addOrder}
                  balance={balance}
                  portfolio={portfolio}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/orders"
            element={
              isAuthenticated ? (
                <Orders orders={orders} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/fund"
            element={
              isAuthenticated ? (
                <Fund
                  balance={balance}
                  deposit={deposit}
                  withdraw={withdraw}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/portfolio"
            element={
              isAuthenticated ? (
                <Portfolio portfolio={portfolio} orders={orders} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
