import { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  ArrowUpRight,
  Zap,
  Activity,
  Crosshair,
  Eye,
  Layers,
  Cpu,
  Server,
  Box,
  CheckCircle,
  Radio,
  Sliders,
  Volume2,
} from "./icons";

const BLUEPRINT_HOTSPOTS = [
  {
    id: "concurrency",
    label: "GOROUTINE ENGINE",
    x: 42,
    y: 26,
    desc: "sync.Pool zero-alloc byte slices under 50,000 concurrent streaming goroutines",
    spec: "ALLOC: 0 B/op // RECYCLE: 99.8% // GC PAUSE: <0.1ms",
  },
  {
    id: "sentinel",
    label: "SENTINEL PROXY GATEWAY",
    x: 64,
    y: 38,
    desc: "Autonomous HTTP/TCP reverse proxy with zero-drop sliding ring circuit breaker",
    spec: "p50: 12ms // p99: 28ms // DROPPED: 0.00%",
  },
  {
    id: "postgres",
    label: "POSTGRES ACID SHARDING",
    x: 34,
    y: 68,
    desc: "PostgreSQL WAL stream replication with serializable distributed consensus",
    spec: "REPLICATION: SYNC // INTEGRITY: 100% // DRIFT: 0",
  },
  {
    id: "chaos",
    label: "TOXIPROXY CHAOS SHIELD",
    x: 72,
    y: 74,
    desc: "Automated upstream latency storm injector (500ms jitter) with deterministic fallback",
    spec: "TRIP TIME: 6ms // HEALING RATE: 350ms // PANIC: 0",
  },
];

const SYSTEM_PROFILES = [
  { id: "nominal", name: "PROFILE 01: NOMINAL (99.98% SLA)", latency: "12ms", goroutines: "12,400", qps: "10,200", p99: "28ms" },
  { id: "burst", name: "PROFILE 02: HIGH-CONCURRENCY (50K/S)", latency: "16ms", goroutines: "50,000", qps: "48,500", p99: "34ms" },
  { id: "chaos", name: "PROFILE 03: CASCAVAL CHAOS DRILL", latency: "2.4ms [REWOUND]", goroutines: "24,000", qps: "18,400", p99: "18ms" },
];

export default function HeroInstrument({ lens, setLens, playClick, playSwitch }) {
  const [photoMode, setPhotoMode] = useState("optical");
  const [activeHotspot, setActiveHotspot] = useState(BLUEPRINT_HOTSPOTS[0]);
  const [activeProfile, setActiveProfile] = useState(SYSTEM_PROFILES[0]);
  const [mousePos, setMousePos] = useState({ x: 180, y: 140 });
  const [isHovered, setIsHovered] = useState(false);
  const [cardTilt, setCardTilt] = useState({ rx: 0, ry: 0 });
  const [isOverclocked, setIsOverclocked] = useState(false);
  const [azimuthAngle, setAzimuthAngle] = useState(142.4);

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
    const rx = ((y - centerY) / centerY) * -6;
    const ry = ((x - centerX) / centerX) * 6;
    setCardTilt({ rx: parseFloat(rx.toFixed(2)), ry: parseFloat(ry.toFixed(2)) });

    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    setAzimuthAngle(parseFloat((angle < 0 ? angle + 360 : angle).toFixed(1)));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCardTilt({ rx: 0, ry: 0 });
  };

  const handleModeChange = (mode) => {
    playSwitch?.();
    setPhotoMode(mode);
  };

  const handleToggleOverclock = () => {
    playClick?.();
    setIsOverclocked((v) => !v);
  };

  const handleSelectProfile = (prof) => {
    playClick?.();
    setActiveProfile(prof);
  };

  return (
    <section id="hero" className="hero-instrument">
      <div className="container">
        <div className="hero-chassis futuristic-screen-frame">
          {/* Engineering Metadata Header Bar */}
          <div className="hero-meta-bar">
            <div className="meta-left">
              <span className={`tag-solid ${isOverclocked ? "amber" : "active"}`}>
                <span className="led-indicator" />
                {isOverclocked ? "SYSTEM_OVERCLOCKED // TURBO 2.4X" : "SYSTEM_STATUS: HEALTHY // NOMINAL"}
              </span>
              <span className="meta-spec">DR-SPEC-2026 // COLD-START: &lt;180MS</span>
            </div>
            <div className="meta-right">
              <span>GO 1.23</span>
              <span className="meta-sep">//</span>
              <span>THREE.JS 3D</span>
              <span className="meta-sep">//</span>
              <span>NEXT.JS 16</span>
              <span className="meta-sep">//</span>
              <span>POSTGRESQL</span>
              <span className="meta-sep">//</span>
              <span>TOXIPROXY CHAOS</span>
            </div>
          </div>

          {/* Primary Split: Left Dossier / Perspective & Right Futuristic Architect Dossier */}
          <div className="hero-main-split">
            {/* Primary Left Cell: The Architectural Dossier & Perspective Content */}
            <div className="hero-primary-cell">
              <div>
                <div className="hero-kicker">
                  <span className="led-indicator" />
                  <span>// CYBERNETIC ARCHITECT DOSSIER // DEEPAK RAI</span>
                </div>

                <h1 className="hero-headline">
                  FAULT-TOLERANT SYSTEMS.
                  <br />
                  <span className="highlight-signal">HIGH-THROUGHPUT</span> WEB.
                </h1>

                {/* Perspective Lens Adaptive Readout */}
                {lens === "executive" && (
                  <div className="hero-lens-banner futuristic-banner">
                    <div className="hero-lens-title">
                      <span style={{ color: "var(--signal-green)" }}>[01 / EXECUTIVE PERSPECTIVE]</span>
                      <span>BUSINESS RELIABILITY &amp; PRODUCT VELOCITY</span>
                    </div>
                    <div className="hero-lens-body">
                      I design and ship production-grade digital infrastructure that eliminates revenue-impacting downtime. 
                      Creator of <strong>Project Sentinel</strong> (high-concurrency reverse proxy maintaining 0 dropped requests under cascading failure) 
                      and architect of <strong>San Brothers Corporate Solutions</strong> (enterprise legal compliance platform ranking #1 on Google for brand keywords).
                    </div>
                  </div>
                )}

                {lens === "architect" && (
                  <div className="hero-lens-banner futuristic-banner">
                    <div className="hero-lens-title">
                      <span style={{ color: "var(--signal-cyan)" }}>[02 / ARCHITECTURAL PERSPECTIVE]</span>
                      <span>SYSTEM INTERNALS &amp; CONCURRENCY PRIMITIVES</span>
                    </div>
                    <div className="hero-lens-body">
                      Deep systems focus on Go concurrency models (<code>sync.RWMutex</code>, <code>sync.Pool</code> zero-alloc byte slices, sliding-window failure ring buffers), 
                      zero-dependency HTTP reverse proxies, Toxiproxy chaos injection, Web Workers off-thread computation, Next.js 16 App Router, and ACID PostgreSQL relational design.
                    </div>
                  </div>
                )}

                {lens === "terminal" && (
                  <div className="hero-lens-banner futuristic-banner">
                    <div className="hero-lens-title">
                      <span style={{ color: "var(--signal-amber)" }}>[03 / TERMINAL PERSPECTIVE]</span>
                      <span>RAW TELEMETRY &amp; INTERACTIVE DIAGNOSTICS</span>
                    </div>
                    <div className="hero-lens-body">
                      Live telemetry link established. Scroll down to execute commands in the live sandbox terminal, inspect memory heap profiles, or run automated chaos injection cycles directly against Project Sentinel.
                    </div>
                  </div>
                )}

                <p className="hero-thesis">
                  Building resilient software is not an aesthetic choice—it is a rigorous discipline of handling edge cases, 
                  eliminating race conditions, and designing deterministic recovery loops before traffic spikes hit production.
                </p>

                {/* Interactive Operating Profile Selector Bar */}
                <div className="hero-profile-selector-strip">
                  <span className="profile-selector-label">// OPERATING PROFILE:</span>
                  <div className="profile-btn-group">
                    {SYSTEM_PROFILES.map((prof) => (
                      <button
                        key={prof.id}
                        type="button"
                        className={`profile-option-btn futuristic-chamfer-btn ${activeProfile.id === prof.id ? "active" : ""}`}
                        onClick={() => handleSelectProfile(prof)}
                      >
                        <span>{prof.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Action Buttons with Solid Mechanical Physics */}
                <div className="hero-cta-row">
                  <button
                    type="button"
                    className="btn-mech-signal futuristic-chamfer-btn"
                    onClick={() => scrollTo("sentinel-lab")}
                  >
                    <Zap style={{ width: "16px", height: "16px" }} />
                    <span>TEST CIRCUIT BREAKER</span>
                  </button>

                  <button
                    type="button"
                    className="btn-mech futuristic-chamfer-btn"
                    onClick={() => scrollTo("cluster-3d")}
                  >
                    <Box style={{ width: "15px", height: "15px", color: "var(--signal-green)" }} />
                    <span>INSPECT 3D CLUSTER</span>
                  </button>

                  <a
                    href="/Deepak-Kumar-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-mech-outline futuristic-chamfer-btn"
                    download="Deepak-Kumar-Resume.pdf"
                    onClick={() => playClick?.()}
                  >
                    <span>SPEC SHEET (PDF)</span>
                    <ArrowUpRight style={{ width: "14px", height: "14px" }} />
                  </a>

                  <button
                    type="button"
                    className="btn-mech-outline futuristic-chamfer-btn"
                    onClick={() => scrollTo("dispatch")}
                  >
                    <span>INITIATE DISPATCH</span>
                    <span style={{ opacity: 0.5 }}>//</span>
                  </button>
                </div>
              </div>

              {/* Live Technical Guarantees Ribbon */}
              <div className="hero-guarantees-strip">
                <div className="guarantee-item">
                  <CheckCircle style={{ width: "13px", height: "13px", color: "var(--signal-green)" }} />
                  <span>ZERO-ALLOC HOT PATHS</span>
                </div>
                <div className="guarantee-item">
                  <CheckCircle style={{ width: "13px", height: "13px", color: "var(--signal-green)" }} />
                  <span>99.98% VERIFIED UPTIME</span>
                </div>
                <div className="guarantee-item">
                  <CheckCircle style={{ width: "13px", height: "13px", color: "var(--signal-green)" }} />
                  <span>DETERMINISTIC FAILOVER</span>
                </div>
              </div>
            </div>

            {/* Right Cell: The World-First Cybernetic Systems Architect Dossier */}
            <div className="hero-architect-cell">
              <div
                ref={cardRef}
                className="architect-dossier-card futuristic-card-frame"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`,
                }}
              >
                {/* Dossier Card Header / Caliper Scale */}
                <div className="dossier-card-header">
                  <div className="dossier-header-title">
                    <span className="led-indicator" />
                    <span>SYSTEM ARCHITECT DOSSIER</span>
                  </div>
                  <div className="dossier-id-tag">ID: DR-9813 // CLEARANCE: L4_ROOT</div>
                </div>

                {/* Top Millimeter Measurement Caliper Axis */}
                <div className="dossier-caliper-axis top-axis">
                  <span>| 00mm</span>
                  <span>| 25mm</span>
                  <span>| 50mm</span>
                  <span>| 75mm</span>
                  <span>| 100mm</span>
                  <span>| 120mm</span>
                </div>

                {/* Main Optical Photo Viewport with Dual Modes */}
                <div className="dossier-photo-viewport">
                  {/* The Authentic 2D Photo */}
                  <img
                    src="/deepak-rai.png"
                    alt="Deepak Rai - Systems & Full-Stack Architect"
                    className={`dossier-portrait-img ${photoMode === "xray" ? "xray-active" : ""}`}
                    loading="eager"
                  />

                  {/* Corner Precision Hairline Targeting Brackets */}
                  <span className="viewport-bracket top-left">┌ [0,0]</span>
                  <span className="viewport-bracket top-right">[1,0] ┐</span>
                  <span className="viewport-bracket bottom-left">└ [0,1]</span>
                  <span className="viewport-bracket bottom-right">[1,1] ┘</span>

                  {/* Futuristic Scanning Reticle (Mode 1: Optical) */}
                  {photoMode === "optical" && isHovered && (
                    <div
                      className="caliper-reticle-tracker"
                      style={{
                        left: `${mousePos.x}px`,
                        top: `${mousePos.y}px`,
                      }}
                    >
                      <div className="reticle-ring outer-ring" />
                      <div className="reticle-ring inner-ring" />
                      <Crosshair style={{ width: "26px", height: "26px" }} />
                      <div className="caliper-coord-chip futuristic-chip">
                        <span>X: {mousePos.x}mm // Y: {mousePos.y}mm</span>
                        <span style={{ color: "var(--signal-cyan)" }}>AZ: {azimuthAngle}° // FOCUS: 100%</span>
                      </div>
                    </div>
                  )}

                  {/* Mode 2: Blueprint Architecture X-Ray Overlay */}
                  {photoMode === "xray" && (
                    <div className="dossier-blueprint-overlay">
                      <svg className="blueprint-schematic-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="25" x2="100" y2="25" stroke="var(--signal-cyan)" strokeWidth="0.4" strokeDasharray="2,2" />
                        <line x1="0" y1="50" x2="100" y2="50" stroke="var(--signal-cyan)" strokeWidth="0.4" strokeDasharray="2,2" />
                        <line x1="0" y1="75" x2="100" y2="75" stroke="var(--signal-cyan)" strokeWidth="0.4" strokeDasharray="2,2" />
                        <line x1="25" y1="0" x2="25" y2="100" stroke="var(--signal-cyan)" strokeWidth="0.4" strokeDasharray="2,2" />
                        <line x1="50" y1="0" x2="50" y2="100" stroke="var(--signal-cyan)" strokeWidth="0.4" strokeDasharray="2,2" />
                        <line x1="75" y1="0" x2="75" y2="100" stroke="var(--signal-cyan)" strokeWidth="0.4" strokeDasharray="2,2" />

                        {/* Connection conduits between nodes */}
                        <line x1="42" y1="26" x2="64" y2="38" stroke="var(--signal-green)" strokeWidth="0.8" />
                        <line x1="64" y1="38" x2="72" y2="74" stroke="var(--signal-cyan)" strokeWidth="0.8" />
                        <line x1="42" y1="26" x2="34" y2="68" stroke="var(--signal-cyan)" strokeWidth="0.8" />
                        <line x1="34" y1="68" x2="72" y2="74" stroke="var(--signal-green)" strokeWidth="0.8" />
                      </svg>

                      {/* Interactive Hotspot Chips */}
                      {BLUEPRINT_HOTSPOTS.map((spot) => (
                        <button
                          key={spot.id}
                          type="button"
                          className={`blueprint-hotspot-pin ${activeHotspot.id === spot.id ? "active" : ""}`}
                          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                          onClick={() => {
                            playClick?.();
                            setActiveHotspot(spot);
                          }}
                          title={spot.label}
                        >
                          <span className="hotspot-core" />
                          <span className="hotspot-ping" />
                          <span className="hotspot-label-tag">{spot.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Mode 3: Telemetry HUD Overlay */}
                  {photoMode === "telemetry" && (
                    <div className="dossier-telemetry-overlay">
                      <div className="telemetry-hud-top">
                        <span className={`tag-solid ${isOverclocked ? "amber" : "active"}`}>
                          HEARTBEAT: {isOverclocked ? "144 BPM [TURBO]" : "72 BPM [NOMINAL]"}
                        </span>
                        <span className="tag-solid">LATENCY: {isOverclocked ? "2.4MS" : activeProfile.latency}</span>
                      </div>

                      {/* Real-time Oscilloscope Waveform SVG */}
                      <div className="telemetry-oscilloscope-strip">
                        <svg viewBox="0 0 300 40" preserveAspectRatio="none" className="oscilloscope-svg">
                          <path
                            d={
                              isOverclocked
                                ? "M0,20 L20,20 L25,4 L30,36 L35,8 L40,32 L45,20 L100,20 L105,2 L110,38 L115,6 L120,34 L125,20 L200,20 L205,4 L210,36 L215,8 L220,32 L225,20 L300,20"
                                : "M0,20 L40,20 L50,8 L60,32 L70,12 L80,24 L90,20 L150,20 L160,5 L170,35 L180,10 L190,25 L200,20 L300,20"
                            }
                            fill="none"
                            stroke={isOverclocked ? "var(--signal-amber)" : "var(--signal-green)"}
                            strokeWidth="2"
                          />
                        </svg>
                        <div className="oscilloscope-caption">
                          <span>{isOverclocked ? "FREQUENCY: 2800HZ // OVERCLOCK" : "SINUS RHYTHM // STEADY STATE"}</span>
                          <span>SAMPLE: 1000HZ</span>
                        </div>
                      </div>

                      <div className="telemetry-hud-bottom">
                        <div className="hud-metric-row">
                          <span>LOCATION:</span>
                          <span style={{ color: "var(--text-high)", fontWeight: 700 }}>NEW DELHI (28.6139°N)</span>
                        </div>
                        <div className="hud-metric-row">
                          <span>CONCURRENCY:</span>
                          <span style={{ color: "var(--signal-green)", fontWeight: 700 }}>
                            {isOverclocked ? "50,000 GOROUTINES" : activeProfile.goroutines}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Optical Scanline Sweep Effect */}
                  <div className="dossier-scanline-bar" />
                </div>

                {/* Interactive Inspection Mode Switcher */}
                <div className="dossier-mode-bar">
                  <button
                    type="button"
                    className={`dossier-mode-btn ${photoMode === "optical" ? "active" : ""}`}
                    onClick={() => handleModeChange("optical")}
                    title="Optical HD Portrait of Deepak Rai"
                  >
                    <Eye style={{ width: "12px", height: "12px" }} />
                    <span>01. OPTICAL</span>
                  </button>

                  <button
                    type="button"
                    className={`dossier-mode-btn ${photoMode === "xray" ? "active" : ""}`}
                    onClick={() => handleModeChange("xray")}
                    title="Architectural Blueprint X-Ray Overlay"
                  >
                    <Layers style={{ width: "12px", height: "12px" }} />
                    <span>02. X-RAY BLUEPRINT</span>
                  </button>

                  <button
                    type="button"
                    className={`dossier-mode-btn ${photoMode === "telemetry" ? "active" : ""}`}
                    onClick={() => handleModeChange("telemetry")}
                    title="Live Neural Telemetry HUD"
                  >
                    <Activity style={{ width: "12px", height: "12px" }} />
                    <span>03. TELEMETRY HUD</span>
                  </button>
                </div>

                {/* Overclock Turbo Mode Rocker Switch */}
                <div className="dossier-overclock-strip">
                  <div className="overclock-info">
                    <span className="overclock-label">ARCHITECT ENGINE VELOCITY</span>
                    <span className="overclock-status">
                      {isOverclocked ? "CRYOGENIC NITROGEN // ACTIVE" : "STANDARD 1.0X NOMINAL"}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`overclock-toggle-btn ${isOverclocked ? "overclocked" : ""}`}
                    onClick={handleToggleOverclock}
                    title="Toggle simulated system overclock"
                  >
                    <Zap style={{ width: "12px", height: "12px" }} />
                    <span>{isOverclocked ? "TURBO: 2.4X [ON]" : "OVERCLOCK [OFF]"}</span>
                  </button>
                </div>

                {/* Active Hotspot Readout Card (When in X-Ray mode) */}
                {photoMode === "xray" && (
                  <div className="dossier-hotspot-inspector">
                    <div className="hotspot-inspector-head">
                      <span style={{ color: "var(--signal-green)", fontWeight: 700 }}>
                        [INSPECTING: {activeHotspot.label}]
                      </span>
                      <span style={{ color: "var(--text-dim)" }}>HOTSPOT TELEMETRY</span>
                    </div>
                    <div className="hotspot-inspector-body">{activeHotspot.desc}</div>
                    <div className="hotspot-inspector-spec">{activeHotspot.spec}</div>
                  </div>
                )}

                {/* Bottom Architectural Specs Strip (Reacts to active profile) */}
                <div className="dossier-specs-footer">
                  <div className="dossier-spec-item">
                    <span className="spec-label">UPTIME SLA</span>
                    <span className="spec-val" style={{ color: "var(--signal-green)" }}>99.98%</span>
                  </div>
                  <div className="dossier-spec-item">
                    <span className="spec-label">PROXY LATENCY</span>
                    <span className="spec-val">{isOverclocked ? "2.4ms" : activeProfile.latency}</span>
                  </div>
                  <div className="dossier-spec-item">
                    <span className="spec-label">QPS THROUGHPUT</span>
                    <span className="spec-val">{isOverclocked ? "48,500/s" : activeProfile.qps}</span>
                  </div>
                  <div className="dossier-spec-item">
                    <span className="spec-label">RACE CONDITIONS</span>
                    <span className="spec-val" style={{ color: "var(--signal-green)" }}>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
