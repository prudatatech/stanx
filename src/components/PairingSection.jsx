import { PAIRING_RECIPES } from "../data/products";
import { Utensils, Clock, Users, ArrowUpRight } from "lucide-react";

export default function PairingSection({ onSelectProduct }) {
  return (
    <section className="pairings-section" id="pairings">
      <div className="pairings-container">
        <div className="pairings-header">
          <span className="eyebrow-pill">
            <Utensils size={14} /> CHEF KITCHEN INSPIRATION
          </span>
          <h2 className="pairings-title">Pair Your Happiness: Street & Diner Classics</h2>
          <p className="pairings-subtitle">
            From smoky wok Hakka noodles in Delhi to golden burgers and momos, discover how 
            StarX sauces elevate everyday cravings into culinary happiness.
          </p>
        </div>

        <div className="pairings-grid">
          {PAIRING_RECIPES.map((recipe) => (
            <div key={recipe.id} className="pairing-card">
              <div className="pairing-top-tag">
                <span className="recipe-tag-pill">{recipe.tag}</span>
                <div className="recipe-meta-pills">
                  <span><Clock size={13} /> {recipe.time}</span>
                  <span><Users size={13} /> Serves {recipe.serves}</span>
                </div>
              </div>

              <h3 className="recipe-card-title">{recipe.title}</h3>
              <p className="recipe-card-desc">{recipe.desc}</p>

              <div className="recipe-sauce-row">
                <span className="sauce-label">Powered By:</span>
                <div className="sauce-chips">
                  {recipe.sauces.map((sauce, idx) => (
                    <span key={idx} className="sauce-chip">
                      {sauce}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
