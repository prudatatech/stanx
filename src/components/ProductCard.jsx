import { useState } from "react";
import { Star, Eye, ShoppingBag, Flame, Check } from "lucide-react";

export default function ProductCard({
  product,
  onQuickView,
  onAddToCart,
  onWhereToBuy
}) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="starx-product-card" onClick={() => onQuickView(product)}>
      {/* Top Keystone Badge */}
      <div className="card-badge-row">
        <span
          className="keystone-pill-badge"
          style={{ backgroundColor: product.badgeColor }}
        >
          {product.badge}
        </span>
        <div className="veg-indicator-box" title="100% Vegetarian">
          <span className="veg-indicator-dot" />
        </div>
      </div>

      {/* Product Image Frame with Pedestal Lighting */}
      <div className="product-image-pedestal">
        <img
          src={product.image}
          alt={product.name}
          className="product-bottle-img"
          loading="lazy"
        />
        <div className="pedestal-shadow" />
        <button
          type="button"
          className="quick-view-hover-btn"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          title="Quick View Details"
        >
          <Eye size={16} />
          <span>Quick View</span>
        </button>
      </div>

      {/* Content Details */}
      <div className="product-card-body">
        <div className="category-and-heat">
          <span className="product-category-tag">{product.categoryLabel}</span>
          <div className="heat-level-meter" title={`Spice Heat Level: ${product.heatLevel}/5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Flame
                key={i}
                size={13}
                className={`heat-flame ${i < product.heatLevel ? "active" : ""}`}
              />
            ))}
          </div>
        </div>

        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-tagline">{product.tagline}</p>

        <div className="product-pack-size">
          <span>Pack: <strong>{product.packSize}</strong></span>
          <span className="viscosity-tag">{product.viscosity.split(" ")[0]} Flow</span>
        </div>

        {/* Rating Row */}
        <div className="product-card-rating">
          <div className="stars-cluster">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="star-filled" fill="#eca825" color="#eca825" />
            ))}
          </div>
          <span className="rating-score">{product.rating}</span>
          <span className="reviews-count">({product.reviewsCount})</span>
        </div>

        {/* Price and Action Row */}
        <div className="product-card-footer">
          <div className="price-stack">
            <span className="price-label">Price</span>
            <span className="price-amount">₹{product.price}</span>
            {product.packSize.includes("5 kg") && (
              <span className="wholesale-pill">Bulk Pack</span>
            )}
          </div>

          <div className="card-cta-group">
            <button
              type="button"
              className={`add-to-cart-cta ${added ? "added" : ""}`}
              onClick={handleAdd}
              disabled={added}
            >
              {added ? (
                <>
                  <Check size={16} />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
