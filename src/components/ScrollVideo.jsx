import { useEffect, useRef, useState } from "react";
import "./ScrollVideo.css";
import { Play, Pause, RotateCcw, VolumeX, Sparkles } from "lucide-react";

export default function ScrollVideo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [activeStage, setActiveStage] = useState("Slow-Motion Bottle Spin");

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let disposed = false;

    const updateProgress = () => {
      if (frameRef.current !== null) return;

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;

        if (
          disposed ||
          !Number.isFinite(video.duration) ||
          video.duration <= 0 ||
          video.readyState < 1
        ) {
          return;
        }

        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // 0 when the section enters from below.
        // 1 when the section has passed above the viewport.
        const distance = viewportHeight + rect.height;
        const progress = Math.max(
          0,
          Math.min(1, (viewportHeight - rect.top) / distance)
        );

        setScrollProgress(Math.round(progress * 100));

        // Determine key narrative stages
        if (progress < 0.25) {
          setActiveStage("The StarX Signature Pour");
        } else if (progress < 0.55) {
          setActiveStage("Viscous Crimson Velocity");
        } else if (progress < 0.8) {
          setActiveStage("The Ultimate Burger Splashdown");
        } else {
          setActiveStage("Golden Crunch Perfection");
        }

        const targetTime = progress * video.duration;

        // Avoid unnecessary seeking and visual jitter.
        if (Math.abs(video.currentTime - targetTime) > 0.04) {
          video.currentTime = targetTime;
        }
      });
    };

    // This video is controlled only by scrolling.
    video.pause();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });
    window.addEventListener("resize", updateProgress);
    video.addEventListener("loadedmetadata", updateProgress);

    updateProgress();

    return () => {
      disposed = true;

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      video.removeEventListener("loadedmetadata", updateProgress);
    };
  }, []);

  const handleManualScrub = (e) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    const val = parseFloat(e.target.value);
    setScrollProgress(Math.round(val * 100));
    video.currentTime = val * video.duration;
  };

  const togglePreviewPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlayingPreview) {
      video.pause();
      setIsPlayingPreview(false);
    } else {
      video.play();
      setIsPlayingPreview(true);
    }
  };

  const handleReset = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlayingPreview(false);
    video.currentTime = 0;
    setScrollProgress(0);
  };

  return (
    <section
      ref={sectionRef}
      className="scroll-video-section"
      aria-label="Scroll-controlled ketchup commercial"
      id="experience"
    >
      <div className="scroll-video-badge-wrap">
        <span className="scroll-video-stage-badge">
          <Sparkles size={14} className="star-icon" />
          {activeStage}
        </span>
      </div>

      <div className="scroll-video-content">
        <div className="scroll-video-player-container">
          <video
            ref={videoRef}
            className="scroll-video"
            src="/ketchup-scroll.mp4"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-label="Ketchup bottle and slow-motion food commercial"
          />

          {/* Interactive HUD Overlay */}
          <div className="scroll-video-hud">
            <div className="hud-left">
              <span className="live-progress-pill">{scrollProgress}%</span>
              <span className="hud-label">SCROLL TRACKING</span>
            </div>
            <div className="hud-right">
              <button
                type="button"
                className="hud-btn"
                onClick={togglePreviewPlay}
                title={isPlayingPreview ? "Pause" : "Play continuous preview"}
                aria-label={isPlayingPreview ? "Pause preview" : "Play preview"}
              >
                {isPlayingPreview ? <Pause size={15} /> : <Play size={15} />}
                <span>{isPlayingPreview ? "Pause" : "Preview"}</span>
              </button>
              <button
                type="button"
                className="hud-btn hud-btn-icon"
                onClick={handleReset}
                title="Reset to beginning"
                aria-label="Reset to beginning"
              >
                <RotateCcw size={15} />
              </button>
              <div className="hud-sound-pill" title="Muted for smooth seeking">
                <VolumeX size={15} />
                <span>MUTED</span>
              </div>
            </div>
          </div>

          {/* Interactive Scrub Track */}
          <div className="video-scrubber-bar">
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={scrollProgress / 100}
              onChange={handleManualScrub}
              aria-label="Seek video position"
              className="scrubber-slider"
            />
            <div
              className="scrubber-fill"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        <p className="scroll-video-hint">
          SCROLL TO EXPERIENCE THE ACTION ↓
        </p>

        <div className="scroll-milestones">
          <div className={`milestone-item ${scrollProgress >= 10 ? "active" : ""}`}>
            <span className="milestone-dot" />
            <span className="milestone-title">01. Bottle Twist</span>
          </div>
          <div className={`milestone-item ${scrollProgress >= 40 ? "active" : ""}`}>
            <span className="milestone-dot" />
            <span className="milestone-title">02. Crimson Stream</span>
          </div>
          <div className={`milestone-item ${scrollProgress >= 70 ? "active" : ""}`}>
            <span className="milestone-dot" />
            <span className="milestone-title">03. Burger Impact</span>
          </div>
          <div className={`milestone-item ${scrollProgress >= 90 ? "active" : ""}`}>
            <span className="milestone-dot" />
            <span className="milestone-title">04. Pure Happiness</span>
          </div>
        </div>
      </div>
    </section>
  );
}
