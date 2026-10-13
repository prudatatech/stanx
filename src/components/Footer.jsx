import { useState } from "react";
import StarXLogo from "./StarXLogo";
import { Send, Check, Heart, ShieldCheck, Phone, Mail } from "lucide-react";

export default function Footer({ onSelectCategory }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer className="starx-footer" id="story">
      {/* Top Banner Accent */}
      <div className="footer-top-accent" />

      <div className="footer-container">
        <div className="footer-main-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <StarXLogo size="large" />
            <p className="footer-brand-bio">
              StarX is dedicated to crafting bold, thick, and authentically rich sauces. 
              From street-style woks to family dining tables, we bring you the ultimate 
              <strong> Blend Of Taste And Happiness</strong>.
            </p>
            <div className="cert-badges-row">
              <span className="cert-badge">
                <ShieldCheck size={14} /> FSSAI Certified
              </span>
              <span className="cert-badge cert-green">
                <span className="green-dot-mini" /> 100% Vegetarian
              </span>
            </div>
          </div>

          {/* Sauces Range Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Culinary Sauces</h4>
            <ul className="footer-nav-list">
              <li>
                <button type="button" onClick={() => onSelectCategory("continental")}>
                  StarX Continental Sauce (1.2 kg)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectCategory("chilli")}>
                  StarX Red Chilli Sauce (5 kg / 1.2 kg)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectCategory("chilli")}>
                  StarX Green Chilli Sauce (5 kg / 1.2 kg)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectCategory("soya")}>
                  StarX Dark Soya Sauce (5 kg)
                </button>
              </li>
              <li>
                <a href="#experience">The Slow-Pour Film</a>
              </li>
              <li>
                <a href="#viscosity">0.028 MPH Viscosity Lab</a>
              </li>
            </ul>
          </div>

          {/* Commercial & Contact Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Trade & Wholesale</h4>
            <ul className="footer-nav-list">
              <li><a href="#wholesale">B2B Restaurant Supply</a></li>
              <li><a href="#wholesale">Café & Cloud Kitchen Packs</a></li>
              <li><a href="#wholesale">Distributor Network</a></li>
              <li><a href="#wholesale">Private Label Enquiries</a></li>
              <li className="contact-item">
                <Phone size={13} />
                <span>Wholesale Desk: +91 98765 43210</span>
              </li>
              <li className="contact-item">
                <Mail size={13} />
                <span>hello@starxsauces.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-heading">Secret Chef Recipes</h4>
            <p className="newsletter-text">
              Subscribe to receive weekly Indo-Chinese woks, gourmet burger sauces, and exclusive chef discounts.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="newsletter-input-wrap">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" aria-label="Subscribe to newsletter">
                  {subscribed ? <Check size={18} /> : <Send size={18} />}
                </button>
              </div>
            </form>
            {subscribed && (
              <p className="newsletter-success">
                ✓ Welcome to the StarX Flavor Club!
              </p>
            )}
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="footer-bottom-bar">
          <div className="copyright-text">
            © {new Date().getFullYear()} StarX Foods & Sauces Pvt. Ltd. All Rights Reserved. 
            Made with <Heart size={12} className="heart-icon" /> for sauce lovers everywhere.
          </div>
          <div className="bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Trade</a>
            <a href="#nutrition">Nutritional Standards</a>
            <a href="#safety">Food Safety Assured</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
