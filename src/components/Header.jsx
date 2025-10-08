import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">MyShop</Link>
        </div>

        {/* Hamburger icon for mobile */}
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Navigation menu */}
        <nav className={`nav-menu ${isOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/product/1" onClick={() => setIsOpen(false)}>
            Product
          </Link>
          <Link to="/cart" onClick={() => setIsOpen(false)}>
            Cart
          </Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>
            Login
          </Link>
          <Link to="/signup" onClick={() => setIsOpen(false)}>
            Signup
          </Link>
        </nav>
      </div>
    </header>
  );
}
