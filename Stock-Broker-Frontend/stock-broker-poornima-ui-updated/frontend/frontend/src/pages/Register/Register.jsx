"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Register.css";

function Register({ onRegister }) {
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
    onRegister(userData);
    navigate("/home");
  };

  return (
    <div className="register-page">
      <Navbar />
      <div className="page-content">
        <h1>Register</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="rePassword"
            placeholder="Re-enter Password"
            value={form.rePassword}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address (include 6 digit postal code)"
            value={form.address}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
