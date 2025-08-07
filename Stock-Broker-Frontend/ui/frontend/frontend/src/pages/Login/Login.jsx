"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // ✅ Import axios
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 🔁 Send POST request to backend login API
      const response = await axios.post("http://localhost:8084/auth/login", {
        email,
        password,
      });

      // ✅ Assuming the response contains a token or success message
      const token = response.data.token; // If JWT is returned
      localStorage.setItem("token", token); // Save token for future use

      onLogin(); // Notify parent of successful login
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          New User? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
