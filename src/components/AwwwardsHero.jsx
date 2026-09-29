import { useState, useRef } from "react";
import { ArrowUpRight, Zap, Shield, Cpu, ExternalLink } from "./icons";

const PHOTO_MODES = [
  { id: "cyber", label: "01. CYBER NOIR", desc: "Ultra-dark high-contrast cyber aesthetic" },
  { id: "mono", label: "02. EDITORIAL MONO", desc: "Classic Swiss architectural monochrome" },
  { id: "studio", label: "03. TRUE COLOR", desc: "Authentic full-spectrum studio color" },
];

const BENTO_METRIC_PILLS = [
  {
    id: "p1",
    tag: "01 // CONCURRENCY",
    title: "50,000+ QPS",
    detail: "Zero-Alloc sync.Pool Buffers",
    pos: "pos-tl",
  },
  {
    id: "p2",
    tag: "02 // FAULT TOLERANCE",
    title: "0.00% PACKET LOSS",
    detail: "Autonomous Circuit Quorum",
    pos: "pos-cr",
  },
  {
    id: "p3",
    tag: "03 // TAIL LATENCY",
    title: "p99 < 10MS",
    detail: "Sub-Millisecond Edge Routing",
    pos: "pos-bl",
  },
];

export default function AwwwardsHero() {
  const [filterMode, setFilterMode] = useState("cyber");
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [hoveredPill, setHoveredPill] = useState(null);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = Math.round((x / rect.width) * 100);
    const py = Math.round((y / rect.height) * 100);
    setSpotlight({ x: px, y: py });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -7;
    const ry = ((x - centerX) / centerX) * 7;
    setTilt({ rx: parseFloat(rx.toFixed(2)), ry: parseFloat(ry.toFixed(2)) });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setSpotlight({ x: 50, y: 50 });
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="awwwards-hero-section">
      <div className="container">
        <div className="awwwards-hero-layout">
          {/* Left Column: Monolithic Editorial Headline & Narrative */}
          <div className="hero-narrative-column">
            <div className="hero-eyebrow-pill">
              <span className="eyebrow-beacon" />
              <span className="eyebrow-text">CREATIVE TECHNOLOGIST &amp; SYSTEMS ARCHITECT</span>
            </div>

            <h1 className="hero-monumental-headline">
              HIGH-CONCURRENCY <br />
              <span className="headline-glow-word">DISTRIBUTED</span> <br />
              ARCHITECTURES.
            </h1>

            <p className="hero-thesis-statement">
              I architect fault-tolerant backend infrastructure, sub-millisecond Go microservices,
              and zero-dependency reverse proxies designed to survive catastrophic upstream failure.
              Obsessed with lock-free concurrency, byte-slice reuse, and clean code craftsmanship.
            </p>

            {/* Awwwards Triple Metric Ticker */}
            <div className="hero-metric-ticker">
              <div className="ticker-cell">
                <span className="ticker-num">50K+</span>
                <span className="ticker-label">QPS CONCURRENCY</span>
                <span className="ticker-caption">Zero-alloc Go runtime</span>
              </div>
              <div className="ticker-cell">
                <span className="ticker-num">0.00%</span>
                <span className="ticker-label">PACKET LOSS</span>
                <span className="ticker-caption">Under 500ms network chaos</span>
              </div>
              <div className="ticker-cell">
                <span className="ticker-num">&lt;10ms</span>
                <span className="ticker-label">p99 LATENCY</span>
                <span className="ticker-caption">Deterministic buffer reuse</span>
              </div>
            </div>

            {/* Uiverse Magnetic Action Group */}
            <div className="hero-cta-group">
              <button
                type="button"
                className="uiverse-magnetic-primary-btn"
                onClick={() => scrollTo("bento-systems")}
              >
                <span>EXPLORE BENTO SYSTEMS</span>
                <span className="btn-glyph">↓</span>
              </button>

              <a
                href="/Deepak-Kumar-Resume.pdf"
                download="Deepak-Kumar-Resume.pdf"
                className="uiverse-magnetic-secondary-btn"
                title="Download Deepak Rai Verified Resume (PDF)"
              >
                <span>RESUME SPEC (PDF)</span>
                <ArrowUpRight width={14} height={14} />
              </a>

              <div className="hero-live-availability">
                <span className="pulse-beacon green" />
                <span>Tokyo / Remote · Open for Senior Roles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Holographic Bento Monolith (Deepak's 2D Photo) */}
          <div className="hero-visual-column">
            <div
              ref={cardRef}
              className="holographic-bento-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              }}
            >
              {/* Uiverse Dynamic Spotlight Overlay */}
              <div
                className="uiverse-card-spotlight"
                style={{
                  background: `radial-gradient(400px circle at ${spotlight.x}% ${spotlight.y}%, rgba(0, 240, 255, 0.12), transparent 70%)`,
                }}
              />

              {/* Bento Card Header */}
              <div className="bento-top-bar">
                <div className="bento-meta-title">
                  <span className="bento-fig">FIG 01 //</span>
                  <span>DEEPAK RAI · ARCHITECT PROFILE</span>
                </div>
                <div className="bento-verified-status">
                  <span className="verified-dot" />
                  <span>AUTHENTIC 2D CAPTURE</span>
                </div>
              </div>

              {/* Image Viewport with Mode Filters */}
              <div className="bento-image-viewport">
                <img
                  src="/deepak-rai.png"
                  alt="Deepak Rai — Distributed Systems Architect & Full Stack Engineer"
                  className={`bento-portrait-img mode-${filterMode}`}
                />

                {/* Uiverse Floating Frosted Glass Metric Pills */}
                {BENTO_METRIC_PILLS.map((pill) => (
                  <div
                    key={pill.id}
                    className={`uiverse-glass-pill ${pill.pos} ${
                      hoveredPill === pill.id ? "active-pill" : ""
                    }`}
                    onMouseEnter={() => setHoveredPill(pill.id)}
                    onMouseLeave={() => setHoveredPill(null)}
                  >
                    <span className="pill-tag">{pill.tag}</span>
                    <span className="pill-title">{pill.title}</span>
                    <span className="pill-detail">{pill.detail}</span>
                  </div>
                ))}
              </div>

              {/* Uiverse Tactile Mode Switcher Toolbar */}
              <div className="bento-mode-toolbar">
                <span className="toolbar-caption">RENDER FILTER:</span>
                <div className="toolbar-btn-group">
                  {PHOTO_MODES.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      className={`uiverse-mode-pill-btn ${filterMode === mode.id ? "selected" : ""}`}
                      onClick={() => setFilterMode(mode.id)}
                      title={mode.desc}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bento Card Bottom Specifications */}
              <div className="bento-bottom-bar">
                <div className="spec-item">
                  <span className="spec-k">LOCATION:</span>
                  <span className="spec-v">TOKYO / REMOTE</span>
                </div>
                <div className="spec-item">
                  <span className="spec-k">ROLE:</span>
                  <span className="spec-v highlight">SYSTEMS ARCHITECT</span>
                </div>
                <div className="spec-item">
                  <span className="spec-k">SLA:</span>
                  <span className="spec-v highlight">99.98% QUORUM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
