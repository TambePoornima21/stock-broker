import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">StockApp</div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/home" className={getLinkClass("/home")}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/stocks" className={getLinkClass("/stocks")}>
            Stocks
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/orders" className={getLinkClass("/orders")}>
            Orders
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/fund" className={getLinkClass("/fund")}>
            Fund
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/portfolio" className={getLinkClass("/portfolio")}>
            Portfolio
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className={getLinkClass("/profile")}>
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
