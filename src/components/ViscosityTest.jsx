import { useState, useRef, useEffect } from "react";
import { Gauge, Sparkles, Award, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

export default function ViscosityTest() {
  const [isHolding, setIsHolding] = useState(false);
  const [pourProgress, setPourProgress] = useState(0);
  const [speedMph, setSpeedMph] = useState(0);
  const [isPerfectPour, setIsPerfectPour] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isHolding) {
      timerRef.current = setInterval(() => {
        setPourProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timerRef.current);
            setIsPerfectPour(true);
            confetti({
              particleCount: 80,
              spread: 60,
              colors: ["#c4122f", "#8a1016", "#eca825"]
            });
            return 100;
          }
          const next = prev + 1.8;
          // Fluctuate around 0.028 mph official ketchup pour speed
          const simulatedSpeed = (0.024 + (next / 100) * 0.007).toFixed(3);
          setSpeedMph(simulatedSpeed);
          return next;
        });
      }, 50);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHolding]);

  const handleReset = () => {
    setPourProgress(0);
    setSpeedMph(0);
    setIsPerfectPour(false);
  };

  return (
    <section className="viscosity-test-section" id="viscosity">
      <div className="viscosity-container">
        <div className="viscosity-header">
          <span className="eyebrow-pill">
            <Gauge size={14} /> THE CULINARY SCIENCE OF SLOW POUR
          </span>
          <h2 className="viscosity-title">The StarX 0.028 MPH Viscosity Test</h2>
          <p className="viscosity-subtitle">
            Authentic table sauce must cling, not run. Heinz famously calibrated its ketchup to flow at 
            exactly <strong>0.028 miles per hour</strong>. StarX Continental Sauce is cooked down to that 
            exact thick, velvety benchmark. Test the pour yourself below!
          </p>
        </div>

        <div className="viscosity-interactive-card">
          {/* Virtual Sauce Channel */}
          <div className="viscosity-simulation-stage">
            <div className="bottle-tilted-icon">
              <span className={`bottle-tilt-graphic ${isHolding ? "pouring" : ""}`}>
                🧴
              </span>
              <span className="bottle-label">StarX 1.2kg Bottle</span>
            </div>

            <div className="sauce-chute-track">
              <div
                className="flowing-sauce-stream"
                style={{ width: `${pourProgress}%` }}
              >
                <div className="stream-drip-head" />
              </div>
              <div className="chute-target-plate">
                <span className="plate-icon">🍔</span>
                <span className="plate-label">Target Dish</span>
              </div>
            </div>

            <div className="telemetry-readouts">
              <div className="telemetry-box">
                <span className="telemetry-label">FLOW SPEED</span>
                <span className="telemetry-value">
                  {speedMph > 0 ? `${speedMph} mph` : "0.000 mph"}
                </span>
                <span className="telemetry-sub">Official Target: 0.028 mph</span>
              </div>

              <div className="telemetry-box">
                <span className="telemetry-label">POUR COMPLETION</span>
                <span className="telemetry-value">{Math.round(pourProgress)}%</span>
                <span className="telemetry-sub">High Cling Factor</span>
              </div>

              <div className="telemetry-box">
                <span className="telemetry-label">DENSITY VERDICT</span>
                <span className="telemetry-value highlight">
                  {pourProgress >= 100
                    ? "PERFECT VELVET"
                    : pourProgress > 40
                    ? "FLOWING RICH"
                    : "STANDBY"}
                </span>
                <span className="telemetry-sub">No Runny Wateriness</span>
              </div>
            </div>
          </div>

          {/* Action Button & Result */}
          <div className="viscosity-controls-row">
            {!isPerfectPour ? (
              <button
                type="button"
                className={`hold-pour-btn ${isHolding ? "active" : ""}`}
                onMouseDown={() => setIsHolding(true)}
                onMouseUp={() => setIsHolding(false)}
                onTouchStart={() => setIsHolding(true)}
                onTouchEnd={() => setIsHolding(false)}
              >
                <span className="btn-glow-ring" />
                <span>{isHolding ? "POURING... HOLD STEADY" : "PRESS & HOLD TO TILT & POUR"}</span>
              </button>
            ) : (
              <div className="perfect-pour-reward">
                <div className="reward-badge">
                  <Award size={24} className="trophy-icon" />
                  <div>
                    <h4>★ CERTIFIED MASTER POUR ★</h4>
                    <p>You calibrated StarX Continental Sauce to optimal slow-pour viscosity!</p>
                  </div>
                </div>
                <div className="reward-promo">
                  <span>USE CHEF CODE:</span>
                  <strong>STARX57</strong>
                  <span>FOR 15% OFF IN BASKET</span>
                </div>
                <button type="button" className="retry-btn" onClick={handleReset}>
                  <RotateCcw size={15} />
                  <span>Try Again</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
