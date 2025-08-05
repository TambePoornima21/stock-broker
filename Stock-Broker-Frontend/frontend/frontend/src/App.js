"use client";

import React from "react";
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
import "./App.css"; // App-specific CSS

function App() {
  // Simple authentication state for demonstration
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<Register onRegister={handleRegister} />}
          />
          {/* Protected routes */}
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
            path="/stocks"
            element={
              isAuthenticated ? <Stocks /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/orders"
            element={
              isAuthenticated ? <Orders /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/fund"
            element={
              isAuthenticated ? <Fund /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/portfolio"
            element={
              isAuthenticated ? <Portfolio /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <Profile onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />{" "}
          {/* Redirect unknown paths */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
