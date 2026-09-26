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
} from "./icons";

const BLUEPRINT_HOTSPOTS = [
  {
    id: "concurrency",
    label: "GOROUTINE POOL",
    x: 38,
    y: 28,
    desc: "sync.Pool zero-alloc byte slices under 50k concurrent requests",
    spec: "ALLOC: 0 B/op // RECYCLE: 99.4%",
  },
  {
    id: "sentinel",
    label: "SENTINEL PROXY",
    x: 62,
    y: 36,
    desc: "Autonomous circuit breaker with sliding-window error ring buffers",
    spec: "p50: 12ms // DROPPED: 0.00%",
  },
  {
    id: "postgres",
    label: "ACID SHARDING",
    x: 32,
    y: 65,
    desc: "PostgreSQL WAL stream replication with deterministic rollback",
    spec: "ISOLATION: SERIALIZABLE // ZERO DRIFT",
  },
  {
    id: "chaos",
    label: "CHAOS INJECTOR",
    x: 68,
    y: 72,
    desc: "Toxiproxy automated latency injection (500ms) with zero panic",
    spec: "TRIP TIME: 8ms // HEAL: 400ms",
  },
];

export default function HeroInstrument({ lens, setLens, playClick, playSwitch }) {
  // Photo Inspection Mode: "optical" | "xray" | "telemetry"
  const [photoMode, setPhotoMode] = useState("optical");
  const [activeHotspot, setActiveHotspot] = useState(BLUEPRINT_HOTSPOTS[0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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

    // Calculate subtle 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -5; // max -5 to +5 deg
    const ry = ((x - centerX) / centerX) * 5;
    setCardTilt({ rx: parseFloat(rx.toFixed(2)), ry: parseFloat(ry.toFixed(2)) });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCardTilt({ rx: 0, ry: 0 });
  };

  const handleModeChange = (mode) => {
    playSwitch?.();
    setPhotoMode(mode);
  };

  return (
    <section id="hero" className="hero-instrument">
      <div className="container">
        <div className="hero-chassis">
          {/* Engineering Metadata Header Bar */}
          <div className="hero-meta-bar">
            <div className="meta-left">
              <span className="tag-solid active">
                <span className="led-indicator" />
                SYSTEM_STATUS: HEALTHY
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

          {/* Primary Split: Left Dossier / Perspective & Right Unique Architect Photo Aperture */}
          <div className="hero-main-split">
            {/* Primary Left Cell: The Architectural Dossier & Perspective Content */}
            <div className="hero-primary-cell">
              <div className="hero-kicker">
                <span className="led-indicator" />
                <span>// ENGINEERING DOSSIER // DEEPAK RAI</span>
              </div>

              <h1 className="hero-headline">
                FAULT-TOLERANT SYSTEMS.
                <br />
                <span className="highlight-signal">HIGH-THROUGHPUT</span> WEB.
              </h1>

              {/* Perspective Lens Adaptive Readout */}
              {lens === "executive" && (
                <div className="hero-lens-banner">
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
                <div className="hero-lens-banner">
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
                <div className="hero-lens-banner">
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

              {/* Primary Action Buttons with Solid Mechanical Physics */}
              <div className="hero-cta-row">
                <button
                  type="button"
                  className="btn-mech-signal"
                  onClick={() => scrollTo("sentinel-lab")}
                >
                  <Zap style={{ width: "16px", height: "16px" }} />
                  <span>TEST CIRCUIT BREAKER</span>
                </button>

                <button
                  type="button"
                  className="btn-mech"
                  onClick={() => scrollTo("cluster-3d")}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <Box style={{ width: "15px", height: "15px", color: "var(--signal-green)" }} />
                  <span>INSPECT 3D CLUSTER</span>
                </button>

                <a
                  href="/Deepak-Kumar-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-mech-outline"
                  download="Deepak-Kumar-Resume.pdf"
                  onClick={() => playClick?.()}
                >
                  <span>SPEC SHEET (PDF)</span>
                  <ArrowUpRight style={{ width: "14px", height: "14px" }} />
                </a>

                <button
                  type="button"
                  className="btn-mech-outline"
                  onClick={() => scrollTo("dispatch")}
                >
                  <span>INITIATE DISPATCH</span>
                  <span style={{ opacity: 0.5 }}>//</span>
                </button>
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
                className="architect-dossier-card"
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
                  <div className="dossier-id-tag">ID: DR-9813 // L4_ROOT</div>
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
                  <span className="viewport-bracket top-left">+ [0,0]</span>
                  <span className="viewport-bracket top-right">+ [1,0]</span>
                  <span className="viewport-bracket bottom-left">+ [0,1]</span>
                  <span className="viewport-bracket bottom-right">+ [1,1]</span>

                  {/* Mode 1: Optical Interactive Reticle Cursor */}
                  {photoMode === "optical" && isHovered && (
                    <div
                      className="caliper-reticle-tracker"
                      style={{
                        left: `${mousePos.x}px`,
                        top: `${mousePos.y}px`,
                      }}
                    >
                      <Crosshair style={{ width: "24px", height: "24px" }} />
                      <div className="caliper-coord-chip">
                        X: {mousePos.x}mm // Y: {mousePos.y}mm
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
                        <line x1="38" y1="28" x2="62" y2="36" stroke="var(--signal-green)" strokeWidth="0.8" />
                        <line x1="62" y1="36" x2="68" y2="72" stroke="var(--signal-cyan)" strokeWidth="0.8" />
                        <line x1="38" y1="28" x2="32" y2="65" stroke="var(--signal-cyan)" strokeWidth="0.8" />
                        <line x1="32" y1="65" x2="68" y2="72" stroke="var(--signal-green)" strokeWidth="0.8" />
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
                        <span className="tag-solid active">HEARTBEAT: 72 BPM</span>
                        <span className="tag-solid">LATENCY: 12MS</span>
                      </div>

                      {/* Real-time Oscilloscope Waveform SVG */}
                      <div className="telemetry-oscilloscope-strip">
                        <svg viewBox="0 0 300 40" preserveAspectRatio="none" className="oscilloscope-svg">
                          <path
                            d="M0,20 L40,20 L50,8 L60,32 L70,12 L80,24 L90,20 L150,20 L160,5 L170,35 L180,10 L190,25 L200,20 L300,20"
                            fill="none"
                            stroke="var(--signal-green)"
                            strokeWidth="2"
                          />
                        </svg>
                        <div className="oscilloscope-caption">
                          <span>SINUS RHYTHM // STEADY STATE</span>
                          <span>SAMPLE RATE: 1000HZ</span>
                        </div>
                      </div>

                      <div className="telemetry-hud-bottom">
                        <div className="hud-metric-row">
                          <span>LOCATION:</span>
                          <span style={{ color: "var(--text-high)", fontWeight: 700 }}>NEW DELHI (IST)</span>
                        </div>
                        <div className="hud-metric-row">
                          <span>CLEARANCE:</span>
                          <span style={{ color: "var(--signal-green)", fontWeight: 700 }}>PRODUCTION ADMIN</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Optical Scanline Sweep Effect */}
                  <div className="dossier-scanline-bar" />
                </div>

                {/* Left Millimeter Caliper Vertical Axis */}
                <div className="dossier-caliper-axis left-axis">
                  <span>00mm</span>
                  <span>30mm</span>
                  <span>60mm</span>
                  <span>90mm</span>
                  <span>120mm</span>
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

                {/* Bottom Architectural Specs Strip */}
                <div className="dossier-specs-footer">
                  <div className="dossier-spec-item">
                    <span className="spec-label">UPTIME</span>
                    <span className="spec-val" style={{ color: "var(--signal-green)" }}>99.98%</span>
                  </div>
                  <div className="dossier-spec-item">
                    <span className="spec-label">PROXY LATENCY</span>
                    <span className="spec-val">12ms</span>
                  </div>
                  <div className="dossier-spec-item">
                    <span className="spec-label">CODEBASE</span>
                    <span className="spec-val">GO // NEXT.JS</span>
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
