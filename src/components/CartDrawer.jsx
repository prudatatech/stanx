import { useState } from "react";
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart
}) {
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 499;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const applyCoupon = (e) => {
    e.preventDefault();
    const code = coupon.trim().toUpperCase();
    if (code === "STARX15" || code === "STARX57" || code === "HAPPINESS") {
      setDiscountPercent(15);
      setCouponMessage("✓ Promo code applied: 15% Off Your Order!");
    } else {
      setCouponMessage("✕ Invalid code. Try code 'STARX57' for 15% off!");
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#8a1016", "#c4122f", "#eca825", "#ffffff"]
    });
    setCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutSuccess(false);
      onClose();
    }, 3200);
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} className="header-bag-icon" />
            <h3>Your StarX Basket</h3>
            <span className="cart-total-count">({items.length} items)</span>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Viscous Sauce Free Delivery Gauge */}
        <div className="viscous-gauge-container">
          <div className="gauge-status-text">
            {remainingForFreeShipping > 0 ? (
              <>
                Add <strong>₹{remainingForFreeShipping}</strong> more for <strong>FREE DELIVERY</strong>!
              </>
            ) : (
              <span className="free-shipping-unlocked">
                <Sparkles size={14} /> FREE SHIPPING UNLOCKED!
              </span>
            )}
          </div>
          <div className="viscous-bottle-track" title={`${Math.round(progressPercent)}% to Free Shipping`}>
            <div
              className="viscous-sauce-fill"
              style={{ width: `${progressPercent}%` }}
            >
              <span className="sauce-flow-ripple" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        {checkoutSuccess ? (
          <div className="checkout-success-view">
            <CheckCircle2 size={64} className="success-icon" />
            <h3>Order Placed Successfully!</h3>
            <p>Thank you for choosing StarX Sauces — Blend Of Taste And Happiness.</p>
            <p className="order-id">Order Reference: #STX-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-cart-state">
            <div className="empty-bottle-graphic">🥫</div>
            <h4>Your Basket is Empty</h4>
            <p>Add some rich StarX Continental, Chilli, or Soya sauce to savor the flavor!</p>
            <button
              type="button"
              className="browse-sauces-btn"
              onClick={onClose}
            >
              Browse Sauces
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-thumb"
                  />
                  <div className="cart-item-meta">
                    <h5 className="item-name">{item.name}</h5>
                    <span className="item-pack">{item.packSize}</span>
                    <span className="item-unit-price">₹{item.price} each</span>

                    <div className="item-qty-row">
                      <div className="qty-controls">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remove-item-btn"
                        onClick={() => onRemoveItem(item.id)}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="item-total-price">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Box */}
            <form onSubmit={applyCoupon} className="coupon-form">
              <input
                type="text"
                placeholder="Discount code (try STARX57)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="coupon-input"
              />
              <button type="submit" className="apply-coupon-btn">
                Apply
              </button>
            </form>
            {couponMessage && (
              <p className={`coupon-msg ${discountPercent > 0 ? "success" : "error"}`}>
                {couponMessage}
              </p>
            )}

            {/* Order Summary & Checkout */}
            <div className="cart-footer">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discountPercent > 0 && (
                <div className="summary-line discount-line">
                  <span>Chef Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="summary-line">
                <span>Shipping</span>
                <span>{remainingForFreeShipping === 0 ? "FREE" : "₹60"}</span>
              </div>
              <div className="summary-line grand-total">
                <span>Total Amount</span>
                <span>₹{finalTotal + (remainingForFreeShipping === 0 ? 0 : 60)}</span>
              </div>

              <button
                type="button"
                className="checkout-btn"
                onClick={handleCheckout}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
