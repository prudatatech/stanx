import { useState } from "react";
import { X, CheckCircle, ExternalLink, MapPin, Truck, Building2 } from "lucide-react";

export default function WhereToBuyModal({ isOpen, onClose, selectedProduct }) {
  const [pincode, setPincode] = useState("");
  const [checkedPincode, setCheckedPincode] = useState(false);

  if (!isOpen) return null;

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.trim().length >= 4) {
      setCheckedPincode(true);
    }
  };

  const RETAILERS = [
    {
      name: "Blinkit Instant",
      delivery: "Delivery in 10-15 Minutes",
      tag: "Fastest",
      color: "#f7cb15",
      textColor: "#000",
      link: "https://blinkit.com"
    },
    {
      name: "Zepto Quick",
      delivery: "Delivery in 10 Minutes",
      tag: "Instant",
      color: "#3b0066",
      textColor: "#fff",
      link: "https://zepto.com"
    },
    {
      name: "Amazon Grocery",
      delivery: "Same Day / Next Day Prime",
      tag: "Pan-India",
      color: "#232f3e",
      textColor: "#fff",
      link: "https://amazon.in"
    },
    {
      name: "StarX Direct Wholesale (B2B)",
      delivery: "5kg Chef Packs • Bulk Dispatches",
      tag: "Commercial",
      color: "#8a1016",
      textColor: "#fff",
      link: "#wholesale"
    }
  ];

  return (
    <div className="where-modal-backdrop" onClick={onClose}>
      <div className="where-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="where-modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="where-modal-header">
          <div className="where-icon-pill">
            <MapPin size={20} />
          </div>
          <h3>Where to Buy StarX Sauces</h3>
          <p>
            {selectedProduct
              ? `Find ${selectedProduct.name} across official retailers, quick-commerce, and restaurant suppliers.`
              : "Discover where to buy StarX sauces across local stores, grocery apps, and direct wholesale."}
          </p>
        </div>

        {/* Pincode Availability Checker */}
        <form onSubmit={handlePincodeCheck} className="pincode-check-form">
          <input
            type="text"
            placeholder="Enter your Delivery Pincode (e.g. 110001, 400001)"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
              setCheckedPincode(false);
            }}
            className="pincode-input"
          />
          <button type="submit" className="check-btn">
            Check
          </button>
        </form>

        {checkedPincode && (
          <div className="pincode-result-success">
            <CheckCircle size={16} />
            <span>Delivery available at <strong>{pincode}</strong> via Quick-Commerce & StarX Direct!</span>
          </div>
        )}

        {/* Retailers List */}
        <div className="retailers-list">
          {RETAILERS.map((ret, index) => (
            <div key={index} className="retailer-item">
              <div className="ret-left">
                <span
                  className="ret-logo-badge"
                  style={{ backgroundColor: ret.color, color: ret.textColor }}
                >
                  {ret.name.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <h4 className="ret-name">{ret.name}</h4>
                  <span className="ret-delivery">
                    <Truck size={12} /> {ret.delivery}
                  </span>
                </div>
              </div>
              <a
                href={ret.link}
                target="_blank"
                rel="noreferrer"
                className="ret-action-link"
              >
                <span>Shop</span>
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>

        {/* Restaurant Wholesale Banner */}
        <div className="b2b-wholesale-callout">
          <Building2 size={24} className="b2b-icon" />
          <div>
            <h5>Running a Restaurant, Café, or Food Truck?</h5>
            <p>Order 5 kg jugs of StarX Continental, Chilli, and Soya sauces at special commercial rates.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
