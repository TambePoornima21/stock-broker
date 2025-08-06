"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Login.css";

function Login({ setIsAuthenticated }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.target);
    const submittedForm = {
      username: formData.get("username") || "",
      password: formData.get("password") || ""
    };
    setForm(submittedForm);
    try {
      // Call backend login endpoint
      //Added login API URL here
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedForm)
      });
      if (!response.ok) {
        throw new Error("Invalid username or password.");
      }
      // Parse response and handle token or user data if needed
      const data = await response.json().catch(() => ({}));
      // Optionally store token: localStorage.setItem('token', data.token);
      if (data && (data.success || data.token)) {
        setIsAuthenticated(true);
        navigate("/home");
      } else {
        // If backend does not return a success flag, still navigate on 200
        setIsAuthenticated(true);
        navigate("/home");
      }
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="page-content">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
        <div className="register-link">
          <span>Not a member?</span>
          <button type="button" onClick={handleRegisterRedirect}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
