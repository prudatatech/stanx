import { useState } from "react";
import { X, Star, Flame, ShoppingBag, MapPin, Check, Sparkles } from "lucide-react";

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  onWhereToBuy
}) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="starx-modal-backdrop" onClick={onClose}>
      <div className="starx-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="modal-grid">
          {/* Left: Product Image Column */}
          <div className="modal-image-col">
            <div className="modal-img-pedestal">
              <img
                src={product.image}
                alt={product.name}
                className="modal-bottle-img"
              />
            </div>
            <div className="modal-quick-badges">
              <span className="badge-tag" style={{ background: product.badgeColor }}>
                {product.badge}
              </span>
              <span className="badge-tag tag-green">100% Vegetarian</span>
              <span className="badge-tag tag-gold">{product.viscosity}</span>
            </div>
          </div>

          {/* Right: Product Details Column */}
          <div className="modal-info-col">
            <div className="modal-header">
              <span className="modal-category">{product.categoryLabel}</span>
              <h2 className="modal-title">{product.name}</h2>
              <p className="modal-tagline">{product.tagline}</p>
            </div>

            {/* Ratings & Heat */}
            <div className="modal-meta-row">
              <div className="modal-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="#eca825" color="#eca825" />
                ))}
                <span className="score">{product.rating}</span>
                <span className="count">({product.reviewsCount} chef reviews)</span>
              </div>
              <div className="modal-heat">
                <span className="heat-label">Spice Intensity:</span>
                <div className="heat-flames">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Flame
                      key={i}
                      size={15}
                      className={i < product.heatLevel ? "active-flame" : "dim-flame"}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Pack Size */}
            <div className="modal-price-box">
              <div className="price-primary">
                <span className="currency">₹</span>
                <span className="amount">{product.price}</span>
                <span className="tax-incl">(Incl. all taxes)</span>
              </div>
              <div className="pack-info">
                Standard Package: <strong>{product.packSize}</strong>
              </div>
            </div>

            {/* Description */}
            <p className="modal-description">{product.description}</p>

            {/* Food Pairings */}
            <div className="modal-pairings-block">
              <h4 className="section-label">
                <Sparkles size={14} /> Perfect Food Pairings:
              </h4>
              <div className="pairings-pill-list">
                {product.pairings.map((p, i) => (
                  <span key={i} className="pairing-pill">{p}</span>
                ))}
              </div>
            </div>

            {/* Nutrition Facts Table */}
            <div className="modal-nutrition-block">
              <h4 className="section-label">Nutritional Information (Approx. per 100g):</h4>
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <span className="n-label">Energy</span>
                  <span className="n-val">{product.nutritionPer100g.energy}</span>
                </div>
                <div className="nutrition-item">
                  <span className="n-label">Carbs</span>
                  <span className="n-val">{product.nutritionPer100g.carbohydrates}</span>
                </div>
                <div className="nutrition-item">
                  <span className="n-label">Sugars</span>
                  <span className="n-val">{product.nutritionPer100g.sugars}</span>
                </div>
                <div className="nutrition-item">
                  <span className="n-label">Protein</span>
                  <span className="n-val">{product.nutritionPer100g.protein}</span>
                </div>
                <div className="nutrition-item">
                  <span className="n-label">Fat</span>
                  <span className="n-val">{product.nutritionPer100g.fat}</span>
                </div>
                <div className="nutrition-item">
                  <span className="n-label">Sodium</span>
                  <span className="n-val">{product.nutritionPer100g.sodium}</span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="modal-ingredients-block">
              <h4 className="section-label">Ingredients:</h4>
              <p className="ingredients-text">{product.ingredients.join(", ")}.</p>
            </div>

            {/* Modal Actions */}
            <div className="modal-actions-bar">
              <div className="quantity-stepper">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="step-btn"
                >
                  -
                </button>
                <span className="qty-value">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="step-btn"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className={`modal-add-btn ${added ? "added" : ""}`}
                onClick={handleAdd}
              >
                {added ? (
                  <>
                    <Check size={18} />
                    <span>Added to Order!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Order (₹{product.price * qty})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="modal-where-btn"
                onClick={() => {
                  onClose();
                  onWhereToBuy(product);
                }}
              >
                <MapPin size={18} />
                <span>Find in Stores</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
