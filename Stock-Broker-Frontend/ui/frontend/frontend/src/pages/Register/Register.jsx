// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Correct import for CRA routing
import "./Register.css"; // Import the CSS file for this component

// You might have a Navbar component, if so, uncomment and adjust path:
// import Navbar from "../components/Navbar"; 

export default function Register({ onRegister }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    rePassword: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => email.endsWith("@gmail.com");
  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const validatePostalCode = (address) => /\b\d{6}\b/.test(address);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (
      !form.username ||
      !form.password ||
      !form.rePassword ||
      !form.email ||
      !form.phone ||
      !form.address
    ) {
      setError("All fields are required.");
      return;
    }
    if (form.password !== form.rePassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Email must end with @gmail.com.");
      return;
    }
    if (!validatePhone(form.phone)) {
      setError("Phone must be exactly 10 digits.");
      return;
    }
    if (!validatePostalCode(form.address)) {
      setError("Address must include a valid 6 digit postal code.");
      return;
    }

    // Remove rePassword before saving
    const { rePassword, ...userData } = form;
    onRegister?.(userData); // Call the optional onRegister prop
    navigate("/home"); // Navigate using react-router-dom
  };

  return (
    <div className="register-page">
      {/* Uncomment and ensure your Navbar component is correctly imported */}
      {/* <Navbar /> */} 
      <div className="page-content">
        <h1>Register</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rePassword">Confirm Password:</label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              placeholder="Re-enter Password"
              value={form.rePassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address (include 6 digit postal code):</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address (include 6 digit postal code)"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
}
