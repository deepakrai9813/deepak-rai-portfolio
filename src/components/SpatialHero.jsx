import { useState, useRef } from "react";
import { ArrowUpRight, Zap, Shield, Cpu, ExternalLink } from "./icons";

const PHOTO_MODES = [
  { id: "natural", label: "01. NATURAL STUDIO", desc: "Authentic full-spectrum color rendering" },
  { id: "mono", label: "02. EDITORIAL MONO", desc: "High-contrast Swiss architectural monochrome" },
  { id: "architectural", label: "03. ARCHITECTURAL LENS", desc: "Deep black, high-dynamic precision contrast" },
];

const SPATIAL_METRICS = [
  {
    id: "m1",
    tag: "01 // CONCURRENCY",
    title: "50,000+ QPS",
    subtitle: "Lock-Free sync.Pool Pipelines",
    posClass: "pos-top-left",
  },
  {
    id: "m2",
    tag: "02 // FAULT TOLERANCE",
    title: "0.00% PACKET LOSS",
    subtitle: "Automated Circuit Breaker Quorum",
    posClass: "pos-center-right",
  },
  {
    id: "m3",
    tag: "03 // TAIL LATENCY",
    title: "p99 < 10MS",
    subtitle: "Sub-Millisecond Edge Routing",
    posClass: "pos-bottom-left",
  },
];

export default function SpatialHero() {
  const [activeMode, setActiveMode] = useState("natural");
  const [hoveredMetric, setHoveredMetric] = useState(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [prismPos, setPrismPos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = Math.round((x / rect.width) * 100);
    const py = Math.round((y / rect.height) * 100);
    setPrismPos({ x: px, y: py });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -6;
    const ry = ((x - centerX) / centerX) * 6;
    setTilt({ rx: parseFloat(rx.toFixed(2)), ry: parseFloat(ry.toFixed(2)) });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setPrismPos({ x: 50, y: 50 });
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="spatial-hero-section">
      <div className="container">
        <div className="spatial-hero-grid">
          {/* Left Column: Architectural Monolith Headline & Thesis */}
          <div className="spatial-hero-left">
            <div className="hero-kicker-badge">
              <span className="kicker-dot" />
              <span className="kicker-text">DISTRIBUTED SYSTEMS & BACKEND ARCHITECT</span>
            </div>

            <h1 className="spatial-hero-headline">
              INDOMITABLE <br />
              <span className="headline-accent">SYSTEMS.</span> <br />
              ZERO DOWNTIME.
            </h1>

            <p className="spatial-hero-thesis">
              I architect high-throughput backend infrastructure, zero-dependency reverse proxies,
              and fault-tolerant distributed cloud services. Relentlessly committed to
              sub-millisecond tail latencies, lock-free Go concurrency, and architectures designed
              to outlast catastrophic upstream failure.
            </p>

            {/* High-Impact Architectural Telemetry Strip */}
            <div className="spatial-stat-row">
              <div className="spatial-stat-card">
                <span className="stat-big-num">50K+</span>
                <span className="stat-unit">QPS THROUGHPUT</span>
                <span className="stat-sub">Benchmarked in Go runtime</span>
              </div>
              <div className="spatial-stat-card">
                <span className="stat-big-num">0.00%</span>
                <span className="stat-unit">PACKET LOSS</span>
                <span className="stat-sub">Under 500ms network chaos</span>
              </div>
              <div className="spatial-stat-card">
                <span className="stat-big-num">&lt;10ms</span>
                <span className="stat-unit">p99 TAIL LATENCY</span>
                <span className="stat-sub">Deterministic buffer reuse</span>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="spatial-hero-actions">
              <button
                type="button"
                className="btn-spatial-primary"
                onClick={() => scrollTo("systems")}
              >
                <span>EXPLORE ARCHITECTURAL SYSTEMS</span>
                <span className="btn-spatial-arrow">↓</span>
              </button>

              <a
                href="/Deepak-Kumar-Resume.pdf"
                download="Deepak-Kumar-Resume.pdf"
                className="btn-spatial-secondary"
                title="Download Deepak Rai Verified Resume (PDF)"
              >
                <span>RESUME SPEC (PDF)</span>
                <ArrowUpRight width={14} height={14} />
              </a>

              <div className="hero-status-pill">
                <span className="status-dot-pulse" />
                <span>Tokyo / Remote · Open for Roles</span>
              </div>
            </div>
          </div>

          {/* Right Column: The Kinetic Dimensional Prism (Authentic 2D Photo in 3D Spatial Stage) */}
          <div className="spatial-hero-right">
            <div
              ref={cardRef}
              className="kinetic-prism-stage"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              }}
            >
              {/* Corner Architectural Crop Registration Markers */}
              <div className="prism-crop-mark tl">┌</div>
              <div className="prism-crop-mark tr">┐</div>
              <div className="prism-crop-mark bl">└</div>
              <div className="prism-crop-mark br">┘</div>

              {/* Prism Header Bar */}
              <div className="prism-header-bar">
                <div className="prism-header-title">
                  <span className="prism-index">FIG 01 //</span>
                  <span>DEEPAK RAI · ARCHITECTURAL PROFILE</span>
                </div>
                <div className="prism-verified-chip">
                  <span className="chip-indicator" />
                  <span>AUTHENTIC 2D CAPTURE</span>
                </div>
              </div>

              {/* The Core 2D Photo Viewport with Multi-Depth Spatial Layers */}
              <div className="prism-viewport">
                {/* Authentic 2D Photo with Mode-dependent Filtering */}
                <img
                  src="/deepak-rai.png"
                  alt="Deepak Rai — Distributed Systems Architect & Full Stack Engineer"
                  className={`prism-portrait-image filter-${activeMode}`}
                />

                {/* Spatial Cursor Lighting Follower (Zero Gradients, Pure Geometric Lines) */}
                <div
                  className="prism-light-reticle"
                  style={{
                    left: `${prismPos.x}%`,
                    top: `${prismPos.y}%`,
                  }}
                >
                  <div className="light-reticle-crosshair" />
                  <div className="light-reticle-box" />
                  <span className="light-reticle-coord">
                    POS [{prismPos.x}:{prismPos.y}]
                  </span>
                </div>

                {/* Floating Spatial Glass Metric Anchors (Elevated in Z-space) */}
                {SPATIAL_METRICS.map((m) => (
                  <div
                    key={m.id}
                    className={`spatial-glass-anchor ${m.posClass} ${
                      hoveredMetric === m.id ? "hovered" : ""
                    }`}
                    onMouseEnter={() => setHoveredMetric(m.id)}
                    onMouseLeave={() => setHoveredMetric(null)}
                  >
                    <div className="anchor-tag">{m.tag}</div>
                    <div className="anchor-title">{m.title}</div>
                    <div className="anchor-sub">{m.subtitle}</div>
                  </div>
                ))}
              </div>

              {/* Interactive Photographic Mode Controls */}
              <div className="prism-mode-toolbar">
                <span className="mode-toolbar-label">RENDER FILTER:</span>
                <div className="mode-btn-group">
                  {PHOTO_MODES.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      className={`prism-mode-btn ${activeMode === mode.id ? "active" : ""}`}
                      onClick={() => setActiveMode(mode.id)}
                      title={mode.desc}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prism Base Info Footer */}
              <div className="prism-footer-bar">
                <div className="footer-meta-item">
                  <span className="meta-key">LOCATION:</span>
                  <span className="meta-val">TOKYO / REMOTE</span>
                </div>
                <div className="footer-meta-item">
                  <span className="meta-key">STATUS:</span>
                  <span className="meta-val highlight">SYSTEMS OPERATIONAL</span>
                </div>
                <div className="footer-meta-item">
                  <span className="meta-key">SECURITY:</span>
                  <span className="meta-val">WCAG AAA VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
