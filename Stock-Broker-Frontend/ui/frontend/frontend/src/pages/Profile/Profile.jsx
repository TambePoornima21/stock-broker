"use client";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/welcome");
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="page-content">
        <h1>My Profile</h1>
        <p>View and manage your personal information.</p>
        <div className="profile-details card">
          <div className="profile-item">
            <span className="label">Username:</span>
            <span className="value">{user.username}</span>
          </div>
          <div className="profile-item">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="profile-item">
            <span className="label">Phone:</span>
            <span className="value">{user.phone}</span>
          </div>
          <div className="profile-item">
            <span className="label">Address:</span>
            <span className="value">{user.address}</span>
          </div>
          <div className="profile-item">
            <span className="label">Member Since:</span>
            <span className="value">{user.memberSince}</span>
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
