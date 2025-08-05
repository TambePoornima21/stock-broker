import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import "./Home.css";

function Home({ onLogout }) {
  return (
    <div className="home-page">
      <Navbar />
      <div className="home-content">
        <h1>Welcome to Your Dashboard!</h1>
        <p>Explore the features of your stock broker application.</p>

        <div className="home-navigation-grid">
          <Link to="/stocks" className="nav-card">
            <h3>Stocks</h3>
            <p>View available stocks and market data.</p>
          </Link>
          <Link to="/orders" className="nav-card">
            <h3>Orders</h3>
            <p>Track your buy and sell transactions.</p>
          </Link>
          <Link to="/fund" className="nav-card">
            <h3>Fund</h3>
            <p>Manage your account balance and funds.</p>
          </Link>
          <Link to="/portfolio" className="nav-card">
            <h3>Portfolio</h3>
            <p>See your owned stocks and their performance.</p>
          </Link>
          <Link to="/profile" className="nav-card">
            <h3>Profile</h3>
            <p>Update your personal information and logout.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
