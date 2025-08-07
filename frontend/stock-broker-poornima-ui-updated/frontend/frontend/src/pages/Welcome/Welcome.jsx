"use client";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to Stock Broker App</h1>
      <p>Your trusted platform for managing investments.</p>
      <button onClick={handleGetStarted}>Get Started</button>
    </div>
  );
}

export default Welcome;
