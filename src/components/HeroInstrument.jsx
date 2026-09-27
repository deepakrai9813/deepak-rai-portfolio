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

export default function HeroInstrument({ lens, setLens, playClick, playSwitch }) {
  const [activeProfile, setActiveProfile] = useState(SYSTEM_PROFILES[0]);
  const [photoMode, setPhotoMode] = useState("optical"); // "optical" | "blueprint"
  const [mousePos, setMousePos] = useState({ x: 200, y: 160 });
  const [isHovered, setIsHovered] = useState(false);
  const [cardTilt, setCardTilt] = useState({ rx: 0, ry: 0 });

  const cardRef = useRef(null);

  const scrollTo = (id) => {
    playClick?.();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // 3D Parallax Tilt on Card Hover
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
    <section id="hero" className="modern-hero-section">
      <div className="container">
        <div className="hero-editorial-grid">
          {/* Left Column: Monolithic Editorial Typography & Technical Blueprint */}
          <div className="hero-left-column">
            {/* Architectural Eyebrow */}
            <div className="hero-eyebrow">
              <span className="led-beacon pulse" />
              <span className="eyebrow-text">
                DEEPAK RAI // DISTRIBUTED SYSTEMS &amp; INFRASTRUCTURE
              </span>
            </div>

            {/* Monolithic Headline */}
            <h1 className="hero-monolith-headline">
              ARCHITECTING RESILIENCE.
              <br />
              <span className="hero-headline-accent">ELIMINATING DOWNTIME.</span>
            </h1>

            {/* Architectural Core Statement */}
            <p className="hero-core-statement">
              Systems engineer specializing in high-concurrency Go reverse proxies, lock-free concurrency primitives, 
              and deterministic failover mechanisms designed to maintain 99.98% SLAs under catastrophic upstream collapse.
            </p>

            {/* Interactive Perspective Lens Showcase */}
            <div className="hero-perspective-showcase">
              <div className="perspective-header">
                <span className="perspective-label">// ACTIVE PERSPECTIVE LENS:</span>
                <div className="perspective-pill-group">
                  <button
                    type="button"
                    className={`perspective-pill ${lens === "executive" ? "active" : ""}`}
                    onClick={() => {
                      playSwitch?.();
                      setLens("executive");
                    }}
                  >
                    01. EXECUTIVE
                  </button>
                  <button
                    type="button"
                    className={`perspective-pill ${lens === "architect" ? "active" : ""}`}
                    onClick={() => {
                      playSwitch?.();
                      setLens("architect");
                    }}
                  >
                    02. ARCHITECT
                  </button>
                  <button
                    type="button"
                    className={`perspective-pill ${lens === "terminal" ? "active" : ""}`}
                    onClick={() => {
                      playSwitch?.();
                      setLens("terminal");
                    }}
                  >
                    03. TERMINAL
                  </button>
                </div>
              </div>

              <div className="perspective-content-card">
                {lens === "executive" && (
                  <div>
                    <div className="perspective-title">BUSINESS CONTINUITY &amp; PRODUCTION VELOCITY</div>
                    <div className="perspective-desc">
                      I build digital platforms that eliminate revenue loss during outages. Creator of <strong>Project Sentinel</strong> (handling high-concurrency failover with zero request drops) and architect of <strong>San Brothers Corporate Solutions</strong> (ranking #1 on Google for brand keywords with sub-second page loads).
                    </div>
                  </div>
                )}

                {lens === "architect" && (
                  <div>
                    <div className="perspective-title">GO CONCURRENCY PRIMITIVES &amp; SYSTEM INTERNALS</div>
                    <div className="perspective-desc">
                      Deep engineering focus on <code>sync.Pool</code> zero-allocation byte buffers, sliding-window failure ring buffers, atomic lock-free counters, Toxiproxy chaos injection, and ACID relational PostgreSQL data modeling.
                    </div>
                  </div>
                )}

                {lens === "terminal" && (
                  <div>
                    <div className="perspective-title">INTERACTIVE TELEMETRY &amp; LIVE DIAGNOSTICS</div>
                    <div className="perspective-desc">
                      Live telemetry link established. Explore the interactive 3D volumetric cluster, simulate live circuit breaker trips, or inspect real-time memory allocation profiles in the sandboxes below.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive System Profile Telemetry Strip */}
            <div className="hero-profile-bar">
              <div className="profile-row-header">
                <span className="profile-caption">// SYSTEM OPERATING PROFILE:</span>
                <div className="profile-buttons">
                  {SYSTEM_PROFILES.map((prof) => (
                    <button
                      key={prof.id}
                      type="button"
                      className={`profile-switch-btn ${activeProfile.id === prof.id ? "active" : ""}`}
                      onClick={() => handleSelectProfile(prof)}
                    >
                      {prof.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Telemetry Data Chips */}
              <div className="profile-telemetry-chips">
                <div className="telemetry-chip">
                  <span className="chip-label">PROXY LATENCY</span>
                  <span className="chip-value" style={{ color: "var(--signal-green)" }}>
                    {activeProfile.latency}
                  </span>
                </div>
                <div className="telemetry-chip">
                  <span className="chip-label">ACTIVE GOROUTINES</span>
                  <span className="chip-value">{activeProfile.goroutines}</span>
                </div>
                <div className="telemetry-chip">
                  <span className="chip-label">THROUGHPUT</span>
                  <span className="chip-value">{activeProfile.qps}</span>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="hero-action-buttons">
              <button
                type="button"
                className="btn-modern-solid"
                onClick={() => scrollTo("cluster-3d")}
              >
                <Box style={{ width: "15px", height: "15px" }} />
                <span>EXPLORE 3D CLUSTER</span>
              </button>

              <button
                type="button"
                className="btn-modern-outline"
                onClick={() => scrollTo("sentinel-lab")}
              >
                <Zap style={{ width: "15px", height: "15px" }} />
                <span>TEST CIRCUIT SANDBOX</span>
              </button>

              <a
                href="/Deepak-Kumar-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-resume-link"
                download="Deepak-Kumar-Resume.pdf"
                onClick={() => playClick?.()}
              >
                <span>SPEC SHEET (PDF)</span>
                <ArrowUpRight style={{ width: "13px", height: "13px" }} />
              </a>
            </div>

            {/* Clean Architectural Guarantees Strip */}
            <div className="hero-proof-strip">
              <div className="proof-item">
                <CheckCircle style={{ width: "12px", height: "12px", color: "var(--signal-green)" }} />
                <span>99.98% VERIFIED UPTIME</span>
              </div>
              <div className="proof-dot">·</div>
              <div className="proof-item">
                <CheckCircle style={{ width: "12px", height: "12px", color: "var(--signal-green)" }} />
                <span>ZERO-ALLOC HOT PATHS</span>
              </div>
              <div className="proof-dot">·</div>
              <div className="proof-item">
                <CheckCircle style={{ width: "12px", height: "12px", color: "var(--signal-green)" }} />
                <span>DETERMINISTIC FAILOVER</span>
              </div>
            </div>
          </div>

          {/* Right Column: Deepak's Authentic 2D Photo "The Architectural Monolith" */}
          <div className="hero-right-column">
            <div
              ref={cardRef}
              className="monolith-portrait-card"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1200px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`,
              }}
            >
              {/* Corner Precision Optical Registration Marks (+) */}
              <span className="card-registration-cross tl">+</span>
              <span className="card-registration-cross tr">+</span>
              <span className="card-registration-cross bl">+</span>
              <span className="card-registration-cross br">+</span>

              {/* Monolith Header Bar */}
              <div className="monolith-card-topbar">
                <div className="monolith-title-group">
                  <span className="led-beacon pulse" />
                  <span className="monolith-label">ARCHITECTURAL DOSSIER // DEEPAK RAI</span>
                </div>

                {/* Dual Mode Switcher: Optical vs CAD Blueprint */}
                <div className="monolith-mode-switch">
                  <button
                    type="button"
                    className={`mode-btn ${photoMode === "optical" ? "active" : ""}`}
                    onClick={() => {
                      playSwitch?.();
                      setPhotoMode("optical");
                    }}
                    title="Real Photographic View"
                  >
                    OPTICAL
                  </button>
                  <button
                    type="button"
                    className={`mode-btn ${photoMode === "blueprint" ? "active" : ""}`}
                    onClick={() => {
                      playSwitch?.();
                      setPhotoMode("blueprint");
                    }}
                    title="CAD Architectural Schematic Overlay"
                  >
                    CAD BLUEPRINT
                  </button>
                </div>
              </div>

              {/* Photo Viewport Container */}
              <div className="monolith-viewport">
                {/* The Authentic 2D Photograph */}
                <img
                  src="/deepak-rai.png"
                  alt="Deepak Rai - Systems & Full-Stack Architect"
                  className={`monolith-photo-img ${photoMode === "blueprint" ? "blueprint-mode" : ""}`}
                  loading="eager"
                />

                {/* Optical Mode: Subtle Interactive Crosshair Cursor Tracker */}
                {photoMode === "optical" && isHovered && (
                  <div
                    className="monolith-crosshair-reticle"
                    style={{
                      left: `${mousePos.x}px`,
                      top: `${mousePos.y}px`,
                    }}
                  >
                    <div className="reticle-circle" />
                    <Crosshair style={{ width: "22px", height: "22px" }} />
                    <div className="reticle-coords">
                      <span>X:{mousePos.x}mm</span>
                      <span>Y:{mousePos.y}mm</span>
                    </div>
                  </div>
                )}

                {/* Blueprint CAD Schematic Mode Overlay */}
                {photoMode === "blueprint" && (
                  <div className="monolith-blueprint-layer">
                    <svg className="blueprint-schematic-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Grid Lines */}
                      {[20, 40, 60, 80].map((val) => (
                        <line key={`x-${val}`} x1={val} y1="0" x2={val} y2="100" stroke="var(--signal-cyan)" strokeWidth="0.3" strokeDasharray="2,2" />
                      ))}
                      {[25, 50, 75].map((val) => (
                        <line key={`y-${val}`} x1="0" y1={val} x2="100" y2={val} stroke="var(--signal-cyan)" strokeWidth="0.3" strokeDasharray="2,2" />
                      ))}

                      {/* Distributed Node Conduits */}
                      <line x1="50" y1="20" x2="30" y2="50" stroke="var(--signal-green)" strokeWidth="0.8" />
                      <line x1="50" y1="20" x2="70" y2="50" stroke="var(--signal-green)" strokeWidth="0.8" />
                      <line x1="30" y1="50" x2="50" y2="80" stroke="var(--signal-cyan)" strokeWidth="0.8" />
                      <line x1="70" y1="50" x2="50" y2="80" stroke="var(--signal-cyan)" strokeWidth="0.8" />

                      {/* Node Circles */}
                      <circle cx="50" cy="20" r="3" fill="var(--signal-green)" />
                      <circle cx="30" cy="50" r="3" fill="var(--signal-cyan)" />
                      <circle cx="70" cy="50" r="3" fill="var(--signal-cyan)" />
                      <circle cx="50" cy="80" r="3" fill="var(--signal-green)" />
                    </svg>

                    <div className="blueprint-node-tag tag-top">
                      <span>[01. SENTINEL PROXY INGRESS]</span>
                    </div>
                    <div className="blueprint-node-tag tag-left">
                      <span>[02. ZERO-ALLOC BUFFER]</span>
                    </div>
                    <div className="blueprint-node-tag tag-right">
                      <span>[03. CIRCUIT BREAKER]</span>
                    </div>
                    <div className="blueprint-node-tag tag-bottom">
                      <span>[04. ACID DATA SHARD]</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Monolith Footer Status */}
              <div className="monolith-card-footer">
                <div className="footer-status-pill">
                  <span className="status-dot-green" />
                  <span className="status-text">ONLINE // DELHI · REMOTE WORLDWIDE</span>
                </div>
                <div className="footer-role-tag">CLEARANCE: L4_ROOT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
