"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

function Profile({ onLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const userId = localStorage.getItem("userId"); // or get it from props/context

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8084/profile/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user profile", err);
      });
  }, [userId]);

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem("userId"); // optional
    navigate("/welcome"); // Or '/login'
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <Navbar />
      <div className="page-content">
        <h1>My Profile</h1>
        <p>View and manage your personal information.</p>

        <div className="profile-details card">
          <div className="profile-item">
            <span className="label">Name:</span>
            <span className="value">{user.username}</span>
          </div>
          <div className="profile-item">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="profile-item">
            <span className="label">Phone:</span>
            <span className="value">{user.phone || "N/A"}</span>
          </div>
          <div className="profile-item">
            <span className="label">Address:</span>
            <span className="value">{user.address || "N/A"}</span>
          </div>
          <div className="profile-item">
            <span className="label">Member Since:</span>
            <span className="value">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
            </span>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;