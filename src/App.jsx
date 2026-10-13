import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  PRODUCTS,
  CONDIMENT_TYPES,
  BETTER_FOR_YOU_FILTERS,
  OCCASION_FILTERS,
  COOK_WITH_US_RECIPES
} from "./data/products";
import "./App.css";

/* ═══════════════════════════════════════════════════════════════
   1. BIG CINEMATIC HERO VIDEO
   - Large cinema screen
   - Video in front, vivid and crisp
   - Starts playing automatically on scroll
   - Fully responsive for mobile
   ═══════════════════════════════════════════════════════════════ */
function HeroVideo() {
  const vidRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const vid = vidRef.current;
    if (!vid) return;

    const handleScroll = () => {
      if (vid && vid.paused) {
        vid.play().catch(() => {});
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true, once: true });
    window.addEventListener("touchmove", handleScroll, { passive: true, once: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY > 10) {
            vid.play().catch(() => {});
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={containerRef} className="hero-cinema-section">
      <div className="hero-cinema-inner">
        <div className="hero-cinema-header">
          <span className="hero-kicker">Signature Blends</span>
          <h1 className="hero-title">Favorites from StarX</h1>
          <p className="hero-subtitle">
            Crafted for chefs, street-food legends, and gourmet home kitchens.
          </p>
        </div>

        <div className="hero-big-screen">
          <video
            ref={vidRef}
            className="hero-cinema-video"
            src="/ketchup-scroll.mp4"
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. "COOK WITH US" RECIPE GALLERY
   ═══════════════════════════════════════════════════════════════ */
function CookWithUsSection() {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="cook-with-us-section" id="recipes-section">
      <div className="cook-header-row">
        <h2 className="cook-title">Cook With Us</h2>
        <div className="cook-nav-arrows">
          <button className="cook-arrow-btn" onClick={scrollLeft} aria-label="Previous recipe">
            ‹
          </button>
          <button className="cook-arrow-btn" onClick={scrollRight} aria-label="Next recipe">
            ›
          </button>
        </div>
      </div>

      <div className="cook-cards-shelf" ref={containerRef}>
        {COOK_WITH_US_RECIPES.map((r) => (
          <article key={r.id} className="cook-card">
            <div className="cook-card-media">
              <img src={r.image} alt={r.title} loading="lazy" />
              <span className="cook-time-pill">{r.time}</span>
            </div>
            <div className="cook-card-body">
              <span className="cook-sauce-tag">{r.sauce}</span>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. "KEEPING IT FRESH" BANNER
   ═══════════════════════════════════════════════════════════════ */
function KeepingItFreshSection() {
  return (
    <section className="keeping-fresh-section">
      <div className="keeping-fresh-top">
        <h2 className="fresh-giant-headline">KEEPING IT FRESH</h2>
      </div>
      <div className="keeping-fresh-bottom">
        <p className="fresh-body-copy">
          Burgers as art. Stains as fashion. As one of the world's most iconic brands, we push flavor 
          to its absolute limit — from fiery street-side momos to gourmet smash burgers.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. "INVESTED IN QUALITY"
   ═══════════════════════════════════════════════════════════════ */
function InvestedInQualitySection() {
  return (
    <section className="invested-quality-section" id="quality-section">
      <div className="invested-inner">
        <div className="invested-text-col">
          <h2 className="invested-title">INVESTED IN QUALITY</h2>
          <p className="invested-body">
            Each step in the tomato-growing process is monitored by StarX Tomato Masters: seven of the 
            foremost agricultural experts on sauce tomatoes, who keep StarX tomatoes at the highest standard 
            of quality — because the ketchup on your table is only as good as the tomato it comes from.
          </p>
        </div>

        <div className="invested-graphic-col">
          <div className="keystone-frame">
            <svg className="keystone-outline" viewBox="0 0 200 240" fill="none">
              <path
                d="M30 10 L170 10 L190 70 L150 230 L50 230 L10 70 Z"
                stroke="#ba0c2f"
                strokeWidth="7"
                strokeLinejoin="round"
              />
            </svg>
            <img
              src="/assets/invested-tomato.jpg"
              alt="StarX Tomato Quality Layers"
              className="invested-tomato-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. DEDICATED "WHO WE ARE" SEPARATE PAGE
   ═══════════════════════════════════════════════════════════════ */
function WhoWeArePage({ onBackToProducts }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="who-page-root">
      {/* Top Breadcrumb */}
      <nav className="who-breadcrumb-bar">
        <div className="who-breadcrumb-inner">
          <button className="crumb-link" onClick={onBackToProducts}>
            Home
          </button>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Who We Are</span>
        </div>
      </nav>

      {/* Hero: WHO WE ARE with StarX Brand Pattern on sides */}
      <section className="who-hero-section">
        <div className="who-pattern-col who-pattern-left" />

        <div className="who-center-content">
          <h1 className="who-title">WHO WE ARE</h1>
          <h2 className="who-subtitle">The original flavor maker</h2>
          <p className="who-body">
            We believe if you love something, you should go all in. In the years of going all in 
            to make our products, we’ve inspired thousands of stories of people going all in to show 
            how much they love them. Like carrying StarX sauce at all times, curating midnight feast collections, 
            even getting tattoos of our iconic bottle. And we plan to continue to create the highest 
            quality condiments on earth.
          </p>
          <button className="who-cta-btn" onClick={onBackToProducts}>
            Explore All Sauces →
          </button>
        </div>

        <div className="who-pattern-col who-pattern-right" />
      </section>

      {/* "KEEPING IT FRESH" Banner */}
      <KeepingItFreshSection />

      {/* "INVESTED IN QUALITY" */}
      <InvestedInQualitySection />

      {/* "Cook With Us" */}
      <CookWithUsSection />

      {/* Floating Cookie Button */}
      <button className="floating-cookie-btn" aria-label="Cookie Preferences" title="Cookie Preferences">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 00-2 19.8" />
          <circle cx="8" cy="9" r="1.2" fill="currentColor" />
          <circle cx="15" cy="8" r="1.2" fill="currentColor" />
          <circle cx="10" cy="15" r="1.2" fill="currentColor" />
          <circle cx="15" cy="14" r="1.2" fill="currentColor" />
        </svg>
      </button>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5B. SCROLLING ANIMATION: KETCHUP ENTERING THE HERITAGE BOX
   ═══════════════════════════════════════════════════════════════ */
function KetchupPourBoxSection() {
  const sectionRef = useRef(null);
  const [pourProgress, setPourProgress] = useState(0.35);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalDist = rect.height + windowHeight * 0.8;
      const currentPos = windowHeight - rect.top;
      const progress = Math.max(0.15, Math.min(1, currentPos / totalDist));
      
      setPourProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fillHeightPercent = Math.min(96, Math.max(18, pourProgress * 100));

  return (
    <section ref={sectionRef} className="ketchup-pour-section">
      <div className="ketchup-pour-inner">
        <div className="pour-header">
          <span className="pour-kicker">Harvest To Table Process</span>
          <h2 className="pour-title">THE SLOW POUR INTO THE BOX</h2>
          <p className="pour-subtitle">
            Watch the rich, stone-crushed crimson sauce stream into our signature cedar collection box 
            as you scroll through each step of the harvest journey.
          </p>
        </div>

        {/* Interactive Pouring Stage */}
        <div className="pour-stage">
          {/* Top Nozzle / Bottle pouring Stream */}
          <div className="pour-spout">
            <div className="pour-spout-bottle">
              <img
                src="/products/starx-continental-sauce.png"
                alt="StarX Sauce Bottle Pouring"
                className="pour-bottle-img"
              />
            </div>
            {/* Liquid Stream connecting bottle to box */}
            <div className="pour-stream-ribbon" style={{ opacity: pourProgress > 0.1 ? 1 : 0.4 }}>
              <div className="stream-inner" />
            </div>
          </div>

          {/* The Collector Box */}
          <div className="ketchup-collector-box">
            <div className="box-wood-header">
              <span className="box-stamp-text">STARX CONDIMENT ARCHIVE • CRATE NO. 57</span>
              <span className="box-capacity-text">PURE SUN-RIPENED REDUCTION</span>
            </div>

            {/* Rising Liquid Reservoir */}
            <div className="box-liquid-reservoir">
              <div
                className="liquid-fill"
                style={{ height: `${fillHeightPercent}%` }}
              >
                <div className="liquid-wave-surface">
                  <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
                    <path
                      d="M0,25 C150,50 350,0 500,25 C650,50 850,0 1000,25 C1150,50 1200,30 1200,30 L1200,60 L0,60 Z"
                      fill="#8c0a22"
                    />
                  </svg>
                </div>
                <div className="liquid-glisten" />
              </div>

              {/* Milestones inside the box */}
              <div className="box-milestones-grid">
                <div className={`milestone-step ${pourProgress > 0.25 ? "active" : ""}`}>
                  <span className="milestone-badge">01</span>
                  <h4>Dawn Harvest</h4>
                  <p>Hand-picked in Maharashtra & Karnataka when natural vine brix reaches its peak.</p>
                </div>
                <div className={`milestone-step ${pourProgress > 0.45 ? "active" : ""}`}>
                  <span className="milestone-badge">02</span>
                  <h4>Cold Extraction</h4>
                  <p>Mashed within four hours of harvest to retain natural aroma, pectin, and color.</p>
                </div>
                <div className={`milestone-step ${pourProgress > 0.68 ? "active" : ""}`}>
                  <span className="milestone-badge">03</span>
                  <h4>Copper Simmer</h4>
                  <p>Slowly reduced with whole aromatics and brewed vinegar for velvet viscosity.</p>
                </div>
                <div className={`milestone-step ${pourProgress > 0.85 ? "active" : ""}`}>
                  <span className="milestone-badge">04</span>
                  <h4>Sealed in Glass</h4>
                  <p>Bottled hot without synthetic starches, ready for dining tables nationwide.</p>
                </div>
              </div>
            </div>

            {/* Box Footer Plank */}
            <div className="box-plank-footer">
              <span>TRADITIONAL CEDAR CELLAR CRATE • CERTIFIED GRADE 1 EXTRACT</span>
              <span className="fill-meter-readout">Fill Level: {Math.round(fillHeightPercent)}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5C. DEDICATED "GROWN NOT MADE" SEPARATE PAGE
   ═══════════════════════════════════════════════════════════════ */
function GrownNotMadePage({ onBackToProducts }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="grown-page-root">
      {/* Top Breadcrumb */}
      <nav className="who-breadcrumb-bar">
        <div className="who-breadcrumb-inner">
          <button className="crumb-link" onClick={onBackToProducts}>
            Home
          </button>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Grown Not Made</span>
        </div>
      </nav>

      {/* Hero: GROWN NOT MADE with Vintage StarX Brand Pattern on sides */}
      <section className="who-hero-section">
        <div className="who-pattern-col who-pattern-left" />

        <div className="who-center-content">
          <h1 className="who-title">GROWN NOT MADE</h1>
          <h2 className="who-subtitle">From Indian Soil to Every Kitchen Table</h2>
          <p className="who-body">
            Great sauce does not start in a manufacturing kettle—it starts deep in the nutrient-dense earth.
            For decades, StarX has partnered directly with generational farming families across the fertile
            belts of Maharashtra, Karnataka, and Punjab. Under the unyielding sun, our heirloom seeds are planted
            in mineral-rich soil and nurtured with clean canal and river irrigation. Every tomato is vine-ripened
            to absolute peak sweetness before hand-picking, ensuring that the bottle that reaches your table carries
            the unmistakable freshness of the harvest.
          </p>
          <button className="who-cta-btn" onClick={onBackToProducts}>
            Explore Farm-Crafted Sauces →
          </button>
        </div>

        <div className="who-pattern-col who-pattern-right" />
      </section>

      {/* ─── ILLUSTRATED STORY BOX 1: THE INDIAN FARMERS ─── */}
      <section className="farm-story-section">
        <div className="farm-story-container">
          <div className="story-box-card">
            <div className="story-box-illustration">
              <div className="illustration-frame">
                <img
                  src="/assets/indian-farmer-tomato.jpg"
                  alt="Generational Indian farmers harvesting heirloom tomatoes for StarX"
                  className="story-illustration-img"
                  loading="lazy"
                />
                <div className="illustration-caption-tag">
                  Harvest Belt • Certified Contract Acreage
                </div>
              </div>
            </div>

            <div className="story-box-content">
              <span className="story-eyebrow">AGRICULTURAL HERITAGE</span>
              <h2 className="story-heading">Grown by Generational Hands</h2>
              <p className="story-lead">
                Across four thousand acres of sun-drenched Indian farmland, our contract growers cultivate
                tomatoes using time-honored regenerative agricultural practices.
              </p>
              <p className="story-desc">
                We never force-ripen with synthetic gases or harvest under-ripe green fruit for transport convenience.
                Each vine is attended to individually, allowing the sugars and natural citric acids to balance naturally
                under the open sky. By procuring directly from our grower collectives at guaranteed fair pricing, we ensure
                both agricultural prosperity and uncompromised culinary grade quality.
              </p>

              <div className="story-stamp-row">
                <div className="heritage-stamp">
                  <span className="stamp-title">100% Sun-Ripened</span>
                  <span className="stamp-sub">Naturally on the vine</span>
                </div>
                <div className="heritage-stamp">
                  <span className="stamp-title">Direct Procurement</span>
                  <span className="stamp-sub">Fair-price grower partners</span>
                </div>
                <div className="heritage-stamp">
                  <span className="stamp-title">Zero Artificial Gases</span>
                  <span className="stamp-sub">Clean earth ripening</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ILLUSTRATED STORY BOX 2: THE BOTANICAL HEIRLOOM SEED ─── */}
      <section className="farm-story-section alt-bg">
        <div className="farm-story-container">
          <div className="story-box-card reversed">
            <div className="story-box-content">
              <span className="story-eyebrow">BOTANICAL VARIETAL INTEGRITY</span>
              <h2 className="story-heading">Proprietary Heirloom Seedstock</h2>
              <p className="story-lead">
                The secret to our legendary slow pour is not thickeners—it is the natural pectin inside our proprietary seed.
              </p>
              <p className="story-desc">
                While industrial commercial varieties are bred for tough skins and mechanical transport, StarX selects
                strictly for flavor depth, lycopene concentration, and soluble solids. When crushed, our heirloom tomatoes
                yield an uncommonly velvety puree that reduces into a glistening sauce without the addition of corn starch
                or artificial gums.
              </p>

              <div className="story-stamp-row">
                <div className="heritage-stamp">
                  <span className="stamp-title">Non-GMO Seedstock</span>
                  <span className="stamp-sub">Traditional cross-pollinated lines</span>
                </div>
                <div className="heritage-stamp">
                  <span className="stamp-title">High Natural Pectin</span>
                  <span className="stamp-sub">Natural slow-pouring viscosity</span>
                </div>
                <div className="heritage-stamp">
                  <span className="stamp-title">Stone-Ground Cold Mash</span>
                  <span className="stamp-sub">Retains fresh fruit essence</span>
                </div>
              </div>
            </div>

            <div className="story-box-illustration">
              <div className="illustration-frame">
                <img
                  src="/assets/tomato-vine-botanical.jpg"
                  alt="Heirloom tomato plant on vine botanical illustration"
                  className="story-illustration-img"
                  loading="lazy"
                />
                <div className="illustration-caption-tag">
                  Lycopersicon Esculentum • StarX Heirloom Line
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCROLLING ANIMATION: KETCHUP ENTERING THE HERITAGE BOX ─── */}
      <KetchupPourBoxSection />

      {/* "KEEPING IT FRESH" Banner */}
      <KeepingItFreshSection />

      {/* "Cook With Us" */}
      <CookWithUsSection />

      {/* Floating Cookie Button */}
      <button className="floating-cookie-btn" aria-label="Cookie Preferences" title="Cookie Preferences">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 00-2 19.8" />
          <circle cx="8" cy="9" r="1.2" fill="currentColor" />
          <circle cx="15" cy="8" r="1.2" fill="currentColor" />
          <circle cx="10" cy="15" r="1.2" fill="currentColor" />
          <circle cx="15" cy="14" r="1.2" fill="currentColor" />
        </svg>
      </button>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════
   6. HEINZ-STYLE PRODUCT CARD
   ═══════════════════════════════════════════════════════════════ */
function HeinzProductCard({ product, onSelect, onAddToCart }) {
  const isBurgundy = product.cardBg === "burgundy";

  return (
    <article className="heinz-card" onClick={() => onSelect(product)}>
      <div className={`heinz-card-media ${isBurgundy ? "card-burgundy" : "card-cream"}`}>
        <img
          src={product.image}
          alt={product.fullName}
          className="heinz-bottle-img"
          loading="lazy"
        />
        <div className="heinz-bottle-shadow" />
        <button
          className="heinz-bag-btn"
          aria-label={`Add ${product.name} to cart`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </button>
      </div>

      <div className="heinz-card-info">
        <span className="heinz-brand-tag">StarX</span>
        <h3 className="heinz-card-title">{product.name}</h3>
        <span className="heinz-card-sizes">{product.sizeCountText}</span>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════
   7. FULL PAGE PRODUCT DETAIL VIEW
   ═══════════════════════════════════════════════════════════════ */
function FullProductPage({ product, onBack, onAddToCart, onSelectRelated }) {
  const [selectedSize, setSelectedSize] = useState(product.defaultSize || product.sizes[0]);
  const [activeTab, setActiveTab] = useState("desc");
  const related = useMemo(
    () => PRODUCTS.filter((p) => p.id !== product.id),
    [product.id]
  );

  useEffect(() => {
    setSelectedSize(product.defaultSize || product.sizes[0]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  return (
    <main className="product-page-root">
      <nav className="product-breadcrumb-bar" aria-label="Breadcrumb">
        <div className="product-breadcrumb-inner">
          <button className="crumb-link" onClick={onBack}>
            All Products
          </button>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">{product.name}</span>
        </div>
      </nav>

      <section className="product-stage-wrap">
        <div className="product-stage-inner">
          <div className="product-stage-left">
            <div className="bottle-spotlight">
              <img
                src={product.image}
                alt={product.fullName}
                className="bottle-spotlight-img"
              />
              <div className="bottle-ground-shadow" />
            </div>
          </div>

          <div className="product-stage-right">
            <span className="brand-eyebrow">StarX</span>
            <h1 className="product-headline">{product.name}</h1>

            <div className="rating-row">
              <span className="rating-stars" aria-label={`${product.rating} out of 5 stars`}>
                ★★★★★
              </span>
              <span className="rating-score">
                {product.rating} ({product.reviewsCount})
              </span>
            </div>

            <div className="sizes-block">
              <span className="sizes-label">Sizes available: <strong>{selectedSize}</strong></span>
              <div className="sizes-pills-row">
                {product.sizes.map((sz) => {
                  const isActive = sz === selectedSize;
                  return (
                    <button
                      key={sz}
                      className={`size-pill ${isActive ? "active" : ""}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="buy-block">
              <span className="buy-heading">Buy Online</span>
              <div className="buy-actions-row">
                <button
                  className="buy-stores-btn"
                  onClick={() => onAddToCart({ ...product, selectedSize })}
                >
                  See All Stores
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" />
                  </svg>
                </button>
                <button
                  className="buy-cart-btn"
                  onClick={() => onAddToCart({ ...product, selectedSize })}
                >
                  Add to Cart
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="product-info-section">
              <div className="info-section-header">
                <h3>Product Information</h3>
              </div>

              <div className="info-tabs-nav">
                <button
                  className={`info-tab-btn ${activeTab === "desc" ? "active" : ""}`}
                  onClick={() => setActiveTab("desc")}
                >
                  Description
                </button>
                <button
                  className={`info-tab-btn ${activeTab === "ingredients" ? "active" : ""}`}
                  onClick={() => setActiveTab("ingredients")}
                >
                  Ingredients
                </button>
                <button
                  className={`info-tab-btn ${activeTab === "nutrition" ? "active" : ""}`}
                  onClick={() => setActiveTab("nutrition")}
                >
                  Nutrition Facts
                </button>
                <button
                  className={`info-tab-btn ${activeTab === "pairings" ? "active" : ""}`}
                  onClick={() => setActiveTab("pairings")}
                >
                  Pairings
                </button>
              </div>

              <div className="info-tab-panel">
                {activeTab === "desc" && (
                  <div className="panel-desc">
                    <p>{product.description}</p>
                    <div className="badge-pills-row">
                      <span className="spec-tag">✓ Chef Grade Consistency</span>
                      <span className="spec-tag">✓ Slow-Pour Viscosity</span>
                      <span className="spec-tag">✓ No Artificial Sweeteners</span>
                    </div>
                  </div>
                )}

                {activeTab === "ingredients" && (
                  <div className="panel-ingredients">
                    <p className="ingredients-lead">{product.ingredients}</p>
                    <small className="allergen-note">
                      Allergen Advice: Contains permitted ingredients. Soya sauce contains wheat and soy.
                    </small>
                  </div>
                )}

                {activeTab === "nutrition" && (
                  <div className="panel-nutrition">
                    <table className="nutrition-table">
                      <thead>
                        <tr>
                          <th>Nutrient</th>
                          <th>Per 100g</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(product.nutritionPer100g).map(([key, val]) => (
                          <tr key={key}>
                            <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                            <td><strong>{val}</strong></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === "pairings" && (
                  <div className="panel-pairings">
                    <p className="pairings-lead">Recommended pairings for best flavor:</p>
                    <div className="pairings-list">
                      {product.pairings.map((pair, idx) => (
                        <span key={idx} className="pairing-pill">
                          {pair}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CookWithUsSection />

      <section className="more-products-shelf">
        <div className="more-products-header">
          <h2>More from StarX</h2>
          <button className="view-catalog-btn" onClick={onBack}>
            View All Sauces →
          </button>
        </div>
        <div className="heinz-grid">
          {related.map((item) => (
            <HeinzProductCard
              key={item.id}
              product={item}
              onSelect={onSelectRelated}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      <button className="floating-cookie-btn" aria-label="Cookie Preferences" title="Cookie Preferences">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 00-2 19.8" />
          <circle cx="8" cy="9" r="1.2" fill="currentColor" />
          <circle cx="15" cy="8" r="1.2" fill="currentColor" />
          <circle cx="10" cy="15" r="1.2" fill="currentColor" />
          <circle cx="15" cy="14" r="1.2" fill="currentColor" />
        </svg>
      </button>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════
   8. CART DRAWER
   ═══════════════════════════════════════════════════════════════ */
function CartDrawer({ isOpen, items, onClose, onUpdateQty, onCheckout }) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <aside className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-sidebar-header">
          <h3>Your Bag ({items.reduce((s, i) => s + i.qty, 0)})</h3>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p>Your bag is currently empty.</p>
            <button className="cart-shop-now-btn" onClick={onClose}>Browse Sauces</button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {items.map((it) => (
                <div key={`${it.id}-${it.selectedSize || it.defaultSize}`} className="cart-item-row">
                  <img src={it.image} alt={it.name} className="cart-item-thumb" />
                  <div className="cart-item-info">
                    <h4>{it.name}</h4>
                    <span className="cart-item-size">{it.selectedSize || it.defaultSize}</span>
                    <span className="cart-item-price">₹{it.price}</span>
                  </div>
                  <div className="cart-item-qty">
                    <button onClick={() => onUpdateQty(it.id, it.selectedSize, -1)} aria-label="Decrease quantity">−</button>
                    <span>{it.qty}</span>
                    <button onClick={() => onUpdateQty(it.id, it.selectedSize, 1)} aria-label="Increase quantity">+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-sidebar-footer">
              <div className="cart-subtotal-row">
                <span>Subtotal</span>
                <strong>₹{total.toFixed(2)}</strong>
              </div>
              <p className="cart-tax-notice">Taxes and commercial shipping calculated at checkout.</p>
              <button className="cart-checkout-btn" onClick={onCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   9. TOAST NOTIFICATION
   ═══════════════════════════════════════════════════════════════ */
function ToastNotification({ message, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2400);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="heinz-toast">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   10. MAIN APP COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isWhoWeArePage, setIsWhoWeArePage] = useState(false);
  const [isGrownNotMadePage, setIsGrownNotMadePage] = useState(false);
  const [filterTab, setFilterTab] = useState("condiment"); // "condiment" | "better" | "occasion"
  const [selectedCondimentType, setSelectedCondimentType] = useState("all");
  const [selectedBetterForYou, setSelectedBetterForYou] = useState("all");
  const [selectedOccasion, setSelectedOccasion] = useState("all");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync hash routing: #who-we-are, #grown-not-made, #product/[id], or home
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#who-we-are") {
        setIsWhoWeArePage(true);
        setIsGrownNotMadePage(false);
        setSelectedProduct(null);
      } else if (hash === "#grown-not-made") {
        setIsGrownNotMadePage(true);
        setIsWhoWeArePage(false);
        setSelectedProduct(null);
      } else if (hash.startsWith("#product/")) {
        const pId = hash.replace("#product/", "");
        const found = PRODUCTS.find((p) => p.id === pId);
        if (found) {
          setSelectedProduct(found);
          setIsWhoWeArePage(false);
          setIsGrownNotMadePage(false);
        }
      } else {
        setIsWhoWeArePage(false);
        setIsGrownNotMadePage(false);
        setSelectedProduct(null);
      }
    };

    window.addEventListener("hashchange", handleHash);
    handleHash();
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const openProduct = useCallback((product) => {
    setSelectedProduct(product);
    setIsWhoWeArePage(false);
    setIsGrownNotMadePage(false);
    setIsMobileMenuOpen(false);
    window.location.hash = `#product/${product.id}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openWhoWeAre = useCallback(() => {
    setIsWhoWeArePage(true);
    setIsGrownNotMadePage(false);
    setSelectedProduct(null);
    setIsMobileMenuOpen(false);
    window.location.hash = "#who-we-are";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openGrownNotMade = useCallback(() => {
    setIsGrownNotMadePage(true);
    setIsWhoWeArePage(false);
    setSelectedProduct(null);
    setIsMobileMenuOpen(false);
    window.location.hash = "#grown-not-made";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigateToHome = useCallback(() => {
    setSelectedProduct(null);
    setIsWhoWeArePage(false);
    setIsGrownNotMadePage(false);
    setIsMobileMenuOpen(false);
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const addToCart = useCallback((product) => {
    const size = product.selectedSize || product.defaultSize || "Standard";
    setCart((prev) => {
      const existing = prev.findIndex((i) => i.id === product.id && i.selectedSize === size);
      if (existing >= 0) {
        const copy = [...prev];
        copy[existing].qty += 1;
        return copy;
      }
      return [...prev, { ...product, selectedSize: size, qty: 1 }];
    });
    setToastMsg(`Added ${product.name} (${size}) to your bag`);
  }, []);

  const updateCartQty = useCallback((id, selectedSize, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id && item.selectedSize === selectedSize) {
            return { ...item, qty: item.qty + delta };
          }
          return item;
        })
        .filter((item) => item.qty > 0);
    });
  }, []);

  const cartTotalCount = cart.reduce((acc, curr) => acc + curr.qty, 0);

  // Dynamic products filtering based on active filter tab & selected circle
  const filteredProducts = useMemo(() => {
    if (filterTab === "condiment") {
      if (selectedCondimentType === "all") return PRODUCTS;
      return PRODUCTS.filter((p) => p.category === selectedCondimentType);
    }
    if (filterTab === "better") {
      if (selectedBetterForYou === "all") return PRODUCTS;
      return PRODUCTS.filter((p) => p.benefit === selectedBetterForYou);
    }
    if (filterTab === "occasion") {
      if (selectedOccasion === "all") return PRODUCTS;
      return PRODUCTS.filter((p) => p.occasion === selectedOccasion);
    }
    return PRODUCTS;
  }, [filterTab, selectedCondimentType, selectedBetterForYou, selectedOccasion]);

  return (
    <div className="stanx-app">
      {/* ─── HEINZ-STYLE TOP NAVBAR ─── */}
      <header className="heinz-nav-header">
        <div className="heinz-nav-inner">
          <div className="nav-col-left">
            <button
              className="nav-grid-btn"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            >
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="dot" /><span className="dot" /><span className="dot" />
            </button>
            <a href="#" className="nav-brand-logo" onClick={(e) => { e.preventDefault(); navigateToHome(); }}>
              <span className="brand-word">StarX</span>
              <span className="brand-est">ESTᴰ 2024</span>
            </a>
          </div>

          <nav className="nav-col-center">
            <a
              href="#products-section"
              className={!isWhoWeArePage && !isGrownNotMadePage && !selectedProduct ? "active-link" : ""}
              onClick={(e) => { e.preventDefault(); navigateToHome(); }}
            >
              Products
            </a>
            <a
              href="#who-we-are"
              className={isWhoWeArePage ? "active-link" : ""}
              onClick={(e) => { e.preventDefault(); openWhoWeAre(); }}
            >
              Who We Are
            </a>
            <a
              href="#grown-not-made"
              className={isGrownNotMadePage ? "active-link" : ""}
              onClick={(e) => { e.preventDefault(); openGrownNotMade(); }}
            >
              Grown Not Made
            </a>
            <a href="#recipes-section">
              Recipes
            </a>
            <a href="#foodservice-section">
              Commercial
            </a>
          </nav>

          <div className="nav-col-right">
            <div className="nav-search-wrap">
              <input type="text" placeholder="Search" aria-label="Search StarX products" />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <button className="nav-auth-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
              <span>Log in</span>
            </button>
            <button className="nav-cart-btn" onClick={() => setIsCartOpen(true)} aria-label="Open Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartTotalCount > 0 && <span className="nav-cart-badge">{cartTotalCount}</span>}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <div className="mobile-nav-links">
              <a
                href="#products-section"
                onClick={(e) => { e.preventDefault(); navigateToHome(); }}
              >
                All Products (8)
              </a>
              <a
                href="#who-we-are"
                onClick={(e) => { e.preventDefault(); openWhoWeAre(); }}
              >
                Who We Are
              </a>
              <a
                href="#grown-not-made"
                onClick={(e) => { e.preventDefault(); openGrownNotMade(); }}
              >
                Grown Not Made (Farm Harvest)
              </a>
              <a
                href="#quality-section"
                onClick={(e) => { e.preventDefault(); openWhoWeAre(); }}
              >
                Invested in Quality
              </a>
              <a
                href="#recipes-section"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cook With Us Recipes
              </a>
              <a
                href="#foodservice-section"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Foodservice 5 kg Commercial
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ─── ROUTING: GROWN NOT MADE vs WHO WE ARE vs PRODUCT DETAIL vs MAIN LANDING ─── */}
      {isGrownNotMadePage ? (
        <GrownNotMadePage onBackToProducts={navigateToHome} />
      ) : isWhoWeArePage ? (
        <WhoWeArePage onBackToProducts={navigateToHome} />
      ) : selectedProduct ? (
        <FullProductPage
          product={selectedProduct}
          onBack={navigateToHome}
          onAddToCart={addToCart}
          onSelectRelated={openProduct}
        />
      ) : (
        <main>
          {/* BIG CINEMATIC HERO VIDEO — Autoplays on scroll, big screen, responsive */}
          <HeroVideo />

          {/* ─── FILTER BY SECTION (Heinz Exact Tabs) ─── */}
          <section className="heinz-filter-bar" id="products-section">
            <div className="filter-bar-content">
              <h2 className="filter-heading">Filter by</h2>

              <div className="filter-pill-nav" role="tablist" aria-label="Product filter categories">
                {/* Tab 1: Condiment Type */}
                <button
                  role="tab"
                  aria-selected={filterTab === "condiment"}
                  className={`filter-pill ${filterTab === "condiment" ? "active" : ""}`}
                  onClick={() => setFilterTab("condiment")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                  </svg>
                  <span>Condiment Type</span>
                </button>

                {/* Tab 2: Better For You */}
                <button
                  role="tab"
                  aria-selected={filterTab === "better"}
                  className={`filter-pill ${filterTab === "better" ? "active" : ""}`}
                  onClick={() => setFilterTab("better")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                  <span>Better For You</span>
                </button>

                {/* Tab 3: Occasion */}
                <button
                  role="tab"
                  aria-selected={filterTab === "occasion"}
                  className={`filter-pill ${filterTab === "occasion" ? "active" : ""}`}
                  onClick={() => setFilterTab("occasion")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                  <span>Occasion</span>
                </button>
              </div>
            </div>
          </section>

          {/* ─── DYNAMIC CATEGORY CIRCLES SHELF ─── */}
          <section className="category-circles-shelf">
            <div className="category-circles-inner">
              {/* Shelf 1: Condiment Types (Dark Wine circles with bottles inside - Image 2) */}
              {filterTab === "condiment" &&
                CONDIMENT_TYPES.map((c) => {
                  const isActive = selectedCondimentType === c.id;
                  return (
                    <button
                      key={c.id}
                      className={`cat-bubble ${isActive ? "active" : ""}`}
                      onClick={() => setSelectedCondimentType(c.id)}
                    >
                      <div className="bubble-disc bubble-wine">
                        {c.id === "all" ? (
                          <div className="bubble-star-wrap">
                            <span className="bubble-star">★</span>
                            <span className="bubble-all-text">ALL</span>
                          </div>
                        ) : (
                          <img
                            src={c.image}
                            alt={c.label}
                            className="bubble-bottle-img"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <span className="bubble-caption">{c.label}</span>
                    </button>
                  );
                })}

              {/* Shelf 2: Better For You (Health/Wellness badges) */}
              {filterTab === "better" &&
                BETTER_FOR_YOU_FILTERS.map((b) => {
                  const isActive = selectedBetterForYou === b.id;
                  return (
                    <button
                      key={b.id}
                      className={`cat-bubble ${isActive ? "active" : ""}`}
                      onClick={() => setSelectedBetterForYou(b.id)}
                    >
                      <div className="bubble-disc bubble-healthy">
                        <span className="bubble-healthy-icon">{b.icon}</span>
                      </div>
                      <span className="bubble-caption">{b.label}</span>
                    </button>
                  );
                })}

              {/* Shelf 3: Occasions (Lifestyle round photos - Image 1) */}
              {filterTab === "occasion" &&
                OCCASION_FILTERS.map((o) => {
                  const isActive = selectedOccasion === o.id;
                  return (
                    <button
                      key={o.id}
                      className={`cat-bubble ${isActive ? "active" : ""}`}
                      onClick={() => setSelectedOccasion(o.id)}
                    >
                      <div className="bubble-disc bubble-lifestyle">
                        <img
                          src={o.image}
                          alt={o.label}
                          className="bubble-lifestyle-img"
                          loading="lazy"
                        />
                      </div>
                      <span className="bubble-caption">{o.label}</span>
                    </button>
                  );
                })}
            </div>
          </section>

          {/* ─── PRODUCT CARDS GRID (All 8 Products) ─── */}
          <section className="heinz-products-section">
            <div className="heinz-products-inner">
              <div className="products-headline-row">
                <p className="catalog-count">
                  Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} condiments
                </p>
                {(selectedCondimentType !== "all" || selectedBetterForYou !== "all" || selectedOccasion !== "all") && (
                  <button
                    className="clear-filter-btn"
                    onClick={() => {
                      setSelectedCondimentType("all");
                      setSelectedBetterForYou("all");
                      setSelectedOccasion("all");
                    }}
                  >
                    Clear Filter ✕
                  </button>
                )}
              </div>

              <div className="heinz-grid">
                {filteredProducts.map((product) => (
                  <HeinzProductCard
                    key={product.id}
                    product={product}
                    onSelect={openProduct}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* "Cook With Us" Recipe Section */}
          <CookWithUsSection />

          {/* Commercial Foodservice Section */}
          <section className="foodservice-section" id="foodservice-section">
            <div className="foodservice-inner">
              <div className="foodservice-card">
                <div className="foodservice-info">
                  <span className="fs-tag">Foodservice & Wholesale</span>
                  <h2>Supplying Commercial Kitchens</h2>
                  <p>
                    Over 500+ restaurants, food trucks, and catering partners rely on StarX 5 kg commercial chef jugs 
                    for consistent flavor in high-volume operations. Available with dedicated distributor logistics.
                  </p>
                  <div className="fs-actions">
                    <a href="mailto:orders@starxfoods.in" className="fs-btn-dark">Inquire for Wholesale</a>
                    <span className="fs-contact-text">Inquiries: orders@starxfoods.in</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ─── REAL HEINZ FOOTER ─── */}
      <footer className="heinz-site-footer">
        <div className="footer-top-grid">
          <div className="footer-col">
            <h4>StarX® Condiments</h4>
            <a href="#products-section" onClick={navigateToHome}>All Sauces (8)</a>
            <a href="#recipes-section">Culinary Recipes</a>
            <a href="#who-we-are" onClick={openWhoWeAre}>Our Story</a>
            <a href="#grown-not-made" onClick={openGrownNotMade}>Grown Not Made</a>
            <a href="#foodservice-section">Commercial 5 kg Jugs</a>
          </div>

          <div className="footer-col">
            <h4>Our Company</h4>
            <a href="#who-we-are" onClick={openWhoWeAre}>Who We Are</a>
            <a href="#grown-not-made" onClick={openGrownNotMade}>Grown Not Made</a>
            <a href="#who-we-are" onClick={openWhoWeAre}>Quality & Sourcing</a>
            <a href="#who-we-are" onClick={openWhoWeAre}>Sustainability</a>
            <a href="#products-section" onClick={navigateToHome}>Browse Catalog</a>
          </div>

          <div className="footer-col">
            <h4>Support & Connect</h4>
            <a href="mailto:contact@starxfoods.in">Contact Us ↗</a>
            <a href="#foodservice-section">Store Locator ↗</a>
            <a href="#foodservice-section">Distributor Registration ↗</a>
            <a href="#recipes-section">Recipe Inquiries</a>
          </div>

          <div className="footer-col footer-col-locale">
            <span className="locale-label">Country / Language</span>
            <div className="locale-pill">
              <span>🇮🇳 India (English)</span>
              <span>▾</span>
            </div>
            <p className="locale-helper">Serving kitchens and tables nationwide.</p>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} StarX Foods Pvt. Ltd. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <span className="dot-divider">•</span>
            <a href="#">Terms of Use</a>
            <span className="dot-divider">•</span>
            <a href="#">Do Not Sell My Info</a>
            <span className="dot-divider">•</span>
            <a href="#">Cookie Settings</a>
          </div>
        </div>
      </footer>

      {/* CART DRAWER & TOAST NOTIFICATION */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={updateCartQty}
        onCheckout={() => {
          alert("Thank you! Proceeding to checkout.");
          setCart([]);
          setIsCartOpen(false);
        }}
      />

      {toastMsg && (
        <ToastNotification
          message={toastMsg}
          onDone={() => setToastMsg(null)}
        />
      )}
    </div>
  );
}
