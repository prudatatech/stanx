import { useState } from "react";
import StarXLogo from "./StarXLogo";
import { Search, ShoppingBag, MapPin, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar({
  searchTerm,
  setSearchTerm,
  cartCount,
  onOpenCart,
  onOpenWhereToBuy
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="starx-navbar-wrapper">
      {/* Top Banner Ribbon */}
      <div className="top-announcement-bar">
        <div className="announcement-track">
          <span>★ BLEND OF TASTE AND HAPPINESS ★</span>
          <span>100% VEGETARIAN AUTHENTIC CONDIMENTS</span>
          <span>FREE DELIVERY ON ORDERS ABOVE ₹499</span>
          <span>CHEF SPECIAL: 5 KG COMMERCIAL JUGS & 1.2 KG TABLE PACKS</span>
        </div>
      </div>

      <nav className="starx-main-nav">
        <div className="nav-container">
          {/* Brand Logo */}
          <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <StarXLogo />
          </div>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            <li>
              <button type="button" onClick={() => scrollTo("products")} className="nav-link-btn">
                Products Hub
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollTo("experience")} className="nav-link-btn">
                Slow-Pour Film
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollTo("viscosity")} className="nav-link-btn">
                Viscosity Lab (0.028 mph)
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollTo("pairings")} className="nav-link-btn">
                Recipes & Pairings
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollTo("story")} className="nav-link-btn">
                Our Story
              </button>
            </li>
          </ul>

          {/* Right Action Icons */}
          <div className="nav-actions">
            {/* Search Toggle */}
            <div className={`nav-search-box ${searchOpen ? "open" : ""}`}>
              <Search size={18} className="search-icon" onClick={() => setSearchOpen(!searchOpen)} />
              <input
                type="text"
                placeholder="Search sauces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchTerm("")}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Where to Buy / Store Locator */}
            <button
              type="button"
              className="nav-action-btn where-to-buy-btn"
              onClick={onOpenWhereToBuy}
              title="Where to buy / Distributors"
            >
              <MapPin size={17} />
              <span className="btn-label">Where to Buy</span>
            </button>

            {/* Cart Button */}
            <button
              type="button"
              className="nav-action-btn cart-btn"
              onClick={onOpenCart}
              aria-label="Open Cart Drawer"
            >
              <ShoppingBag size={18} />
              <span className="cart-badge">{cartCount}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <div className="mobile-search-wrap">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search StarX sauces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ul className="mobile-links">
              <li>
                <button type="button" onClick={() => scrollTo("products")}>
                  Products Hub
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo("experience")}>
                  Slow-Pour Film
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo("viscosity")}>
                  Viscosity Speed Lab
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo("pairings")}>
                  Recipes & Pairings
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo("story")}>
                  About StarX
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="mobile-distributor-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWhereToBuy();
                  }}
                >
                  <span>Distributors & Where to Buy</span>
                  <ArrowUpRight size={16} />
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
