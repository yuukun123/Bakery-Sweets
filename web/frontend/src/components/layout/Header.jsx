import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useCartStore from "../../store/cartStore";
import { useState } from "react";
import "./Header.css";

export default function Header() {
  const { user, logout } = useAuthStore();
  const { totalItems, toggleCart } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/search?term=${encodeURIComponent(search.trim())}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="header">
        <Link to="/" className="logo" style={{ border: "none", background: "none", cursor: "pointer" }}>
          <img src="/assets/Img/Sweets1.png" alt="The Sweets" />
        </Link>

        <nav className="navigation">
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/receipt">RECEIPT</Link>

          <button className="sp-cart" id="cart-btn" onClick={toggleCart}>
            <ion-icon name="cart-outline"></ion-icon>
          </button>
          <span className="cart-count">{totalItems() > 0 ? totalItems() : ""}</span>

          <form onSubmit={handleSearch} className="search-container">
            <div className="input-wrapper">
              <input
                type="text"
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for names.."
              />
              <span className="search-icon">
                <button className="searchBtn" type="submit">
                  <ion-icon name="search-outline"></ion-icon>
                </button>
              </span>
            </div>
          </form>

          <Link to="/search" className="searchAdvance">ADVANCED SEARCH</Link>

          <div className="auth-container">
            {user ? (
              <div className="user-menu">
                <button id="user-btn" className="btnLogin-popup">{user.username}</button>
                <button className="btnLogout-popup" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <>
                <button id="login-btn" className="btnLogin-popup" onClick={() => navigate("/login")}>Login</button>
                <button id="register-btn" className="btnLogout-popup" onClick={() => navigate("/register")}>Register</button>
              </>
            )}
          </div>
        </nav>

        <div className="hamburger" id="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div><div className="bar"></div><div className="bar"></div>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu" id="mobileMenu">
          <div className="hamburger" onClick={() => setMenuOpen(false)}>
            <div className="bar"></div><div className="bar"></div><div className="bar"></div>
          </div>
          <div className="mobile-menu-off">
            <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT</Link>
            <Link to="/receipt" onClick={() => setMenuOpen(false)}>RECEIPT</Link>
            <button className="sp-cart" onClick={() => { toggleCart(); setMenuOpen(false); }}>
              <ion-icon name="cart-outline"></ion-icon>
            </button>
            <div className="btn-log">
              {user ? (
                <button className="btnLogout-popup" onClick={handleLogout}>Logout</button>
              ) : (
                <>
                  <button className="btnLogin-popup" onClick={() => { navigate("/login"); setMenuOpen(false); }}>Login</button>
                  <button className="btnLogout-popup" onClick={() => { navigate("/register"); setMenuOpen(false); }}>Register</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
