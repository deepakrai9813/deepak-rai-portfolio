import { useState, useRef } from "react";
import {
  Zap,
  Box,
  ArrowUpRight,
  Crosshair,
  Layers,
  Cpu,
  Shield,
  Activity,
  CheckCircle,
} from "./icons";

// 3 Curated Operating Profiles
const SYSTEM_PROFILES = [
  {
    id: "nominal",
    name: "01. NOMINAL SLA",
    latency: "12ms",
    goroutines: "12,400",
    qps: "8,200/s",
    desc: "Steady-state production reverse proxy baseline with zero memory leaks.",
  },
  {
    id: "burst",
    name: "02. 50K CONCURRENCY",
    latency: "4.1ms",
    goroutines: "38,000",
    qps: "42,000/s",
    desc: "High-concurrency burst mode utilizing zero-alloc sync.Pool buffers.",
  },
  {
    id: "failover",
    name: "03. CASCAVAL FAILOVER",
    latency: "18ms",
    goroutines: "24,000",
    qps: "28,500/s",
    desc: "Circuit breaker tripped: automated reroute to standby replica with 0% drop.",
  },
];

// Interactive Architectural Leader Anchors for the 2D Photo Monolith
const ARCHITECT_ANCHORS = [
  {
    id: "concurrency",
    label: "CONCURRENCY ENGINE",
    desc: "Lock-free sync.Pool & goroutine work-stealing scheduler",
    x: 28,
    y: 22,
  },
  {
    id: "proxy",
    label: "PROJECT SENTINEL PROXY",
    desc: "Zero-dependency reverse proxy with deterministic circuit trip",
    x: 72,
    y: 42,
  },
  {
    id: "sla",
    label: "99.98% SLA QUORUM",
    desc: "Sub-second failover across Tokyo, Frankfurt & Virginia edge nodes",
    x: 35,
    y: 75,
  },
];

export default function HeroInstrument({ lens, setLens, playClick, playSwitch }) {
  const [activeProfile, setActiveProfile] = useState(SYSTEM_PROFILES[0]);
  const [photoMode, setPhotoMode] = useState("optical"); // "optical" | "cad"
  const [activeAnchor, setActiveAnchor] = useState(ARCHITECT_ANCHORS[0]);
  const [mousePos, setMousePos] = useState({ x: 220, y: 180 });
  const [isHovered, setIsHovered] = useState(false);
  const [cardTilt, setCardTilt] = useState({ rx: 0, ry: 0 });

  const cardRef = useRef(null);

  const scrollTo = (id) => {
    playClick?.();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // 3D Parallax Tilt & Reticle Tracking on Card Hover
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x: Math.round(x), y: Math.round(y) });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -5;
    const ry = ((x - centerX) / centerX) * 5;
    setCardTilt({ rx: parseFloat(rx.toFixed(2)), ry: parseFloat(ry.toFixed(2)) });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCardTilt({ rx: 0, ry: 0 });
  };

  const handleSelectProfile = (prof) => {
    playSwitch?.();
    setActiveProfile(prof);
  };

  return (
    <section id="hero" className="futuristic-hero-section">
      <div className="container">
        <div className="futuristic-hero-grid">
          {/* Left Column: Monolithic Editorial Statement & System Blueprint */}
          <div className="hero-monolith-column">
            {/* Fine Technical Eyebrow */}
            <div className="monolith-eyebrow">
              <span className="led-beacon pulse" />
              <span className="eyebrow-text">
                DEEPAK RAI // SYSTEMS &amp; DISTRIBUTED ARCHITECTURE
              </span>
            </div>

            {/* Giant Monolithic Headline */}
            <h1 className="monolith-headline">
              HIGH-SCALE SYSTEMS.
              <br />
              <span className="monolith-headline-accent">DEFYING DOWNTIME.</span>
            </h1>

            {/* Core Architectural Thesis */}
            <p className="monolith-thesis">
              Systems and full-stack engineer building production-grade distributed infrastructure. 
              Creator of <strong>Project Sentinel</strong> (high-throughput Go reverse proxy with automated circuit breakers) 
              and architect of high-velocity web platforms that maintain <strong>99.98% verified SLAs</strong> under extreme load.
            </p>

            {/* Futuristic Perspective Lens Matrix */}
            <div className="futuristic-lens-box">
              <div className="lens-box-header">
                <span className="lens-box-caption">// PERSPECTIVE LENS:</span>
                <div className="lens-pill-group">
                  <button
                    type="button"
                    className={`lens-pill ${lens === "executive" ? "active" : ""}`}
                    onClick={() => {
                      playSwitch?.();
                      setLens("executive");
                    }}
                  >
                    01. EXECUTIVE BRIEF
                  </button>
                  <button
                    type="button"
                    className={`lens-pill ${lens === "architect" ? "active" : ""}`}
                    onClick={() => {
                      playSwitch?.();
                      setLens("architect");
                    }}
                  >
                    02. ARCHITECTURAL SPEC
                  </button>
                  <button
                    type="button"
                    className={`lens-pill ${lens === "terminal" ? "active" : ""}`}
                    onClick={() => {
                      playSwitch?.();
                      setLens("terminal");
                    }}
                  >
                    03. TERMINAL RUNTIME
                  </button>
                </div>
              </div>

              <div className="lens-box-body">
                {lens === "executive" && (
                  <div>
                    <div className="lens-body-title">BUSINESS CONTINUITY &amp; REVENUE SHIELDING</div>
                    <div className="lens-body-text">
                      I architect software systems that eliminate revenue-impacting downtime. 
                      Project Sentinel prevents cascading failovers with zero dropped transactions, 
                      while San Brothers Corporate Solutions ranks #1 on Google for brand keywords with sub-second page loads.
                    </div>
                  </div>
                )}

                {lens === "architect" && (
                  <div>
                    <div className="lens-body-title">LOCK-FREE CONCURRENCY &amp; MEMORY RECYCLING</div>
                    <div className="lens-body-text">
                      Deep systems focus on Go concurrency models (<code>sync.Pool</code> zero-alloc byte slices, atomic lock-free counters, sliding-window failure ring buffers), 
                      Toxiproxy chaos injection, Web Workers off-thread computation, Next.js 16 App Router, and ACID PostgreSQL relational design.
                    </div>
                  </div>
                )}

                {lens === "terminal" && (
                  <div>
                    <div className="lens-body-title">LIVE TELEMETRY &amp; INTERACTIVE SIMULATION</div>
                    <div className="lens-body-text">
                      Direct diagnostic uplink established. Jump into the interactive 3D volumetric cluster, simulate live circuit breaker failover drills, 
                      or test Go memory allocation recycling directly in your browser below.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Operating Profile Bar */}
            <div className="hero-operating-bar">
              <div className="operating-bar-header">
                <span className="operating-caption">// SYSTEM OPERATING PROFILE:</span>
                <div className="operating-pill-group">
                  {SYSTEM_PROFILES.map((prof) => (
                    <button
                      key={prof.id}
                      type="button"
                      className={`operating-pill ${activeProfile.id === prof.id ? "active" : ""}`}
                      onClick={() => handleSelectProfile(prof)}
                    >
                      {prof.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Live Telemetry Chips */}
              <div className="operating-chips-grid">
                <div className="operating-chip">
                  <span className="chip-label">PROXY LATENCY</span>
                  <span className="chip-value" style={{ color: "var(--signal-green)" }}>
                    {activeProfile.latency}
                  </span>
                </div>
                <div className="operating-chip">
                  <span className="chip-label">GOROUTINES</span>
                  <span className="chip-value">{activeProfile.goroutines}</span>
                </div>
                <div className="operating-chip">
                  <span className="chip-label">THROUGHPUT</span>
                  <span className="chip-value">{activeProfile.qps}</span>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="hero-cta-actions">
              <button
                type="button"
                className="btn-monolith-primary"
                onClick={() => scrollTo("cluster-3d")}
              >
                <Box style={{ width: "15px", height: "15px" }} />
                <span>EXPLORE 3D CLUSTER</span>
              </button>

              <button
                type="button"
                className="btn-monolith-secondary"
                onClick={() => scrollTo("sentinel-lab")}
              >
                <Zap style={{ width: "15px", height: "15px" }} />
                <span>TEST CIRCUIT SANDBOX</span>
              </button>

              <a
                href="/Deepak-Kumar-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-monolith-link"
                download="Deepak-Kumar-Resume.pdf"
                onClick={() => playClick?.()}
              >
                <span>SPEC SHEET (PDF)</span>
                <ArrowUpRight style={{ width: "13px", height: "13px" }} />
              </a>
            </div>

            {/* Clean Verification Proof Points */}
            <div className="hero-guarantees-ticker">
              <div className="ticker-item">
                <CheckCircle style={{ width: "12px", height: "12px", color: "var(--signal-green)" }} />
                <span>99.98% VERIFIED UPTIME</span>
              </div>
              <div className="ticker-sep">·</div>
              <div className="ticker-item">
                <CheckCircle style={{ width: "12px", height: "12px", color: "var(--signal-green)" }} />
                <span>ZERO-ALLOC HOT PATHS</span>
              </div>
              <div className="ticker-sep">·</div>
              <div className="ticker-item">
                <CheckCircle style={{ width: "12px", height: "12px", color: "var(--signal-green)" }} />
                <span>DETERMINISTIC FAILOVER</span>
              </div>
            </div>
          </div>

          {/* Right Column: Deepak's 2D Photo "The Omni-Aperture Monolith" */}
          <div className="hero-aperture-column">
            <div
              ref={cardRef}
              className="aperture-monolith-slab"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1200px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`,
              }}
            >
              {/* Swiss Precision Registration Marks (+) */}
              <span className="aperture-cross tl">+</span>
              <span className="aperture-cross tr">+</span>
              <span className="aperture-cross bl">+</span>
              <span className="aperture-cross br">+</span>

              {/* Monolith Header Bar */}
              <div className="aperture-topbar">
                <div className="aperture-meta-left">
                  <span className="led-beacon pulse" />
                  <span className="aperture-title">OMNI-APERTURE // DEEPAK RAI</span>
                </div>

                <div className="aperture-mode-selector">
                  <button
                    type="button"
                    className={`aperture-mode-btn ${photoMode === "optical" ? "active" : ""}`}
                    onClick={() => {
                      playSwitch?.();
                      setPhotoMode("optical");
                    }}
                  >
                    OPTICAL
                  </button>
                  <button
                    type="button"
                    className={`aperture-mode-btn ${photoMode === "cad" ? "active" : ""}`}
                    onClick={() => {
                      playSwitch?.();
                      setPhotoMode("cad");
                    }}
                  >
                    CAD SCHEMATIC
                  </button>
                </div>
              </div>

              {/* Photo Viewport */}
              <div className="aperture-viewport">
                {/* Authentic 2D Photo of Deepak Rai */}
                <img
                  src="/deepak-rai.png"
                  alt="Deepak Rai - Systems Architect"
                  className={`aperture-portrait-img ${photoMode === "cad" ? "cad-filter" : ""}`}
                  loading="eager"
                />

                {/* Optical Mode: Laser Focus Reticle tracking cursor */}
                {photoMode === "optical" && isHovered && (
                  <div
                    className="aperture-reticle"
                    style={{
                      left: `${mousePos.x}px`,
                      top: `${mousePos.y}px`,
                    }}
                  >
                    <div className="reticle-lens-ring" />
                    <Crosshair style={{ width: "22px", height: "22px" }} />
                    <div className="reticle-badge">
                      <span>X:{mousePos.x}mm</span>
                      <span>Y:{mousePos.y}mm</span>
                    </div>
                  </div>
                )}

                {/* Interactive Architectural Hotspot Pins on 2D Portrait */}
                {photoMode === "optical" && (
                  <div className="aperture-anchors-overlay">
                    {ARCHITECT_ANCHORS.map((anchor) => (
                      <button
                        key={anchor.id}
                        type="button"
                        className={`anchor-beacon-pin ${activeAnchor.id === anchor.id ? "active" : ""}`}
                        style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
                        onClick={() => {
                          playClick?.();
                          setActiveAnchor(anchor);
                        }}
                        title={anchor.label}
                      >
                        <span className="beacon-core" />
                        <span className="beacon-pulse-ring" />
                        <span className="beacon-tag">{anchor.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* CAD Schematic Overlay Mode */}
                {photoMode === "cad" && (
                  <div className="aperture-cad-layer">
                    <svg className="cad-schematic-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Grid Lines */}
                      {[25, 50, 75].map((pos) => (
                        <line key={`cx-${pos}`} x1={pos} y1="0" x2={pos} y2="100" stroke="var(--signal-cyan)" strokeWidth="0.4" strokeDasharray="3,3" />
                      ))}
                      {[25, 50, 75].map((pos) => (
                        <line key={`cy-${pos}`} x1="0" y1={pos} x2="100" y2={pos} stroke="var(--signal-cyan)" strokeWidth="0.4" strokeDasharray="3,3" />
                      ))}

                      {/* Architecture Conduits */}
                      <line x1="50" y1="20" x2="28" y2="48" stroke="var(--signal-green)" strokeWidth="1" />
                      <line x1="50" y1="20" x2="72" y2="48" stroke="var(--signal-green)" strokeWidth="1" />
                      <line x1="28" y1="48" x2="50" y2="78" stroke="var(--signal-cyan)" strokeWidth="1" />
                      <line x1="72" y1="48" x2="50" y2="78" stroke="var(--signal-cyan)" strokeWidth="1" />

                      <circle cx="50" cy="20" r="3.5" fill="var(--signal-green)" />
                      <circle cx="28" cy="48" r="3.5" fill="var(--signal-cyan)" />
                      <circle cx="72" cy="48" r="3.5" fill="var(--signal-cyan)" />
                      <circle cx="50" cy="78" r="3.5" fill="var(--signal-green)" />
                    </svg>

                    <div className="cad-label-badge badge-top">[INGRESS PROXY :8080]</div>
                    <div className="cad-label-badge badge-left">[ZERO-ALLOC POOL]</div>
                    <div className="cad-label-badge badge-right">[CIRCUIT BREAKER]</div>
                    <div className="cad-label-badge badge-bottom">[ACID DATA SHARD]</div>
                  </div>
                )}
              </div>

              {/* Inspected Anchor Spec Drawer */}
              {photoMode === "optical" && (
                <div className="aperture-spec-drawer">
                  <div className="spec-drawer-label">INSPECTED ARCHITECTURAL PRIMITIVE:</div>
                  <div className="spec-drawer-title">{activeAnchor.label}</div>
                  <div className="spec-drawer-desc">{activeAnchor.desc}</div>
                </div>
              )}

              {/* Monolith Footer Status */}
              <div className="aperture-footer">
                <div className="aperture-status-group">
                  <span className="led-beacon pulse" />
                  <span className="aperture-status-text">
                    STATUS: ACTIVE // DELHI · WORLDWIDE REMOTE
                  </span>
                </div>
                <div className="aperture-clearance-tag">L4_ROOT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
