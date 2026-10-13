export default function StarXLogo({ size = "default", light = false }) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <div className={`starx-logo-brand-wrap ${isLarge ? "logo-lg" : ""} ${isSmall ? "logo-sm" : ""}`}>
      <div className="logo-badge-container">
        <svg
          viewBox="0 0 240 80"
          className="starx-logo-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle curved label ribbon */}
          <path
            d="M12 20C12 14 18 10 24 10H216C222 10 228 14 228 20V60C228 66 222 70 216 70H24C18 70 12 66 12 60V20Z"
            fill={light ? "#8a1016" : "rgba(138, 16, 22, 0.95)"}
            stroke="#eca825"
            strokeWidth="1.5"
          />
          <path
            d="M18 24C18 20 22 17 26 17H214C218 17 222 20 222 24V56C222 60 218 63 214 63H26C22 63 18 60 18 56V24Z"
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeDasharray="4 2"
            fill="none"
          />

          {/* StarX stylized script text */}
          <text
            x="120"
            y="44"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="'Libre Caslon Text', 'Brush Script MT', cursive, serif"
            fontSize="34"
            fontWeight="700"
            fontStyle="italic"
            letterSpacing="-0.02em"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
          >
            StarX
          </text>

          {/* Under-brand tagline */}
          <text
            x="120"
            y="57"
            textAnchor="middle"
            fill="#fcf9f0"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="7"
            fontWeight="600"
            letterSpacing="0.14em"
          >
            BLEND OF TASTE AND HAPPINESS
          </text>
        </svg>

        {/* 100% Vegetarian Mark */}
        <div className="veg-mark-emblem" title="100% Vegetarian">
          <span className="veg-dot" />
        </div>
      </div>
    </div>
  );
}
