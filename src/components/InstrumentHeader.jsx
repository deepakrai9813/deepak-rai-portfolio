import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Zap,
  AlertTriangle,
  Box,
  Cpu,
  Layers,
  Send,
  Volume2,
  VolumeX,
  FileText,
  Activity,
  ArrowUpRight,
} from "./icons";

export default function InstrumentHeader({
  lens,
  setLens,
  theme,
  toggleTheme,
  soundEnabled,
  toggleSound,
  playClick,
  playSwitch,
}) {
  const [timeStr, setTimeStr] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        setTimeStr(`${formatted} IST`);
      } catch {
        setTimeStr("LIVE IST");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLensChange = (mode) => {
    playSwitch?.();
    setLens(mode);
    if (mode === "terminal") {
      document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (id) => {
    playClick?.();
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="instrument-navbar-dock">
      {/* Top Precision Telemetry Ribbon */}
      <div className="nav-telemetry-ribbon">
        <div className="container nav-ribbon-content">
          <div className="nav-ribbon-left">
            <span className="led-beacon pulse" />
            <span className="ribbon-highlight">STATION: DEEPAK-RAI-WS</span>
            <span className="ribbon-divider">//</span>
            <span className="ribbon-dim">GEO: 28.6139°N, 77.2090°E (NEW DELHI)</span>
            <span className="ribbon-divider">//</span>
            <span className="ribbon-dim">CORE: SENTINEL-GO-PROXY</span>
          </div>

          <div className="nav-ribbon-right">
            <span className="ribbon-dim">PROXY SLA: 12ms</span>
            <span className="ribbon-divider">//</span>
            <span className="ribbon-dim">PACKET LOSS: 0.00%</span>
            <span className="ribbon-divider">//</span>
            <span className="ribbon-clock">{timeStr || "12:00:00 IST"}</span>
            <span className="ribbon-divider">//</span>
            <span className="ribbon-status-badge">AVAIL FOR HIRE</span>
          </div>
        </div>
      </div>

      {/* Main Floating Console Bar */}
      <div className="nav-chassis">
        <div className="container nav-chassis-container">
          {/* Module 1: Hardware Brand Identity */}
          <div className="nav-brand-module">
            <a
              href="#hero"
              className="brand-anchor"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("hero");
              }}
            >
              <div className="brand-monogram-box">
                <span className="monogram-text">DR</span>
                <span className="monogram-corner top-left" />
                <span className="monogram-corner bottom-right" />
              </div>
              <div className="brand-meta">
                <div className="brand-title-row">
                  <span className="brand-name">DEEPAK RAI</span>
                  <span className="brand-badge-root">L4_ROOT</span>
                </div>
                <div className="brand-subtitle">SYSTEMS &amp; WEB ARCHITECT</div>
              </div>
            </a>
          </div>

          {/* Module 2: Tri-Perspective Lens Rocker (Tactile Center) */}
          <div className="nav-lens-dock">
            <div className="lens-rocker-wrapper">
              <button
                type="button"
                className={`lens-dock-btn ${lens === "executive" ? "active" : ""}`}
                onClick={() => handleLensChange("executive")}
                title="Perspective 01: Executive Brief (SLA, Business ROI & Product Velocity)"
              >
                <span className="lens-index">01</span>
                <span className="lens-label">EXEC BRIEF</span>
              </button>

              <button
                type="button"
                className={`lens-dock-btn ${lens === "architect" ? "active" : ""}`}
                onClick={() => handleLensChange("architect")}
                title="Perspective 02: Architectural Spec (Go Concurrency, Zero-alloc Memory & Ring Buffers)"
              >
                <span className="lens-index">02</span>
                <span className="lens-label">ARCH SPEC</span>
              </button>

              <button
                type="button"
                className={`lens-dock-btn ${lens === "terminal" ? "active" : ""}`}
                onClick={() => handleLensChange("terminal")}
                title="Perspective 03: Diagnostic Terminal (Interactive CLI & Benchmark Profiles)"
              >
                <span className="lens-index">03</span>
                <span className="lens-label">CLI CONSOLE</span>
              </button>
            </div>
          </div>

          {/* Module 3: Navigation Links & Hardware Utilities */}
          <div className="nav-actions-dock">
            {/* Quick Links Array */}
            <nav className="nav-links-array">
              <button
                type="button"
                className="nav-item-btn highlight-green"
                onClick={() => handleNavClick("cluster-3d")}
                title="Jump to 3D Volumetric Distributed Systems Cluster"
              >
                <Box style={{ width: "13px", height: "13px" }} />
                <span>3D CLUSTER</span>
              </button>

              <button
                type="button"
                className="nav-item-btn"
                onClick={() => handleNavClick("sentinel-lab")}
                title="Jump to Sentinel Circuit Breaker Lab"
              >
                <Zap style={{ width: "12px", height: "12px" }} />
                <span>CHAOS LAB</span>
              </button>

              <button
                type="button"
                className="nav-item-btn"
                onClick={() => handleNavClick("memory-lab")}
                title="Jump to Go Memory Pool Playground"
              >
                <Cpu style={{ width: "12px", height: "12px" }} />
                <span>MEM POOL</span>
              </button>

              <button
                type="button"
                className="nav-item-btn"
                onClick={() => handleNavClick("projects")}
                title="Jump to Production Engineering Projects"
              >
                <Layers style={{ width: "12px", height: "12px" }} />
                <span>PROJECTS</span>
              </button>

              <button
                type="button"
                className="nav-item-btn highlight-orange"
                onClick={() => handleNavClick("incident-drill")}
                title="Jump to Live Incident Failover Simulator"
              >
                <AlertTriangle style={{ width: "12px", height: "12px" }} />
                <span>INCIDENT</span>
              </button>

              <button
                type="button"
                className="nav-item-btn"
                onClick={() => handleNavClick("dispatch")}
                title="Jump to Tactical Dispatch Console"
              >
                <Send style={{ width: "12px", height: "12px" }} />
                <span>DISPATCH</span>
              </button>
            </nav>

            <div className="nav-controls-group">
              {/* Mechanical Audio Synthesizer Toggle */}
              <button
                type="button"
                className={`hardware-toggle-btn ${soundEnabled ? "sound-active" : ""}`}
                onClick={() => {
                  toggleSound();
                  playSwitch?.();
                }}
                title={soundEnabled ? "Mechanical Sound: ACTIVE (Click to Mute)" : "Mechanical Sound: MUTED (Click to Enable)"}
                aria-label="Toggle mechanical sound"
              >
                {soundEnabled ? (
                  <Volume2 style={{ width: "14px", height: "14px" }} />
                ) : (
                  <VolumeX style={{ width: "14px", height: "14px" }} />
                )}
                <span className="toggle-led" />
              </button>

              {/* Theme Rocker (Dark Stealth vs Light Blueprint) */}
              <button
                type="button"
                className="hardware-toggle-btn"
                onClick={() => {
                  playClick?.();
                  toggleTheme();
                }}
                title={`Switch Theme: currently ${theme === "dark" ? "Matte Stealth (Dark)" : "Blueprint Paper (Light)"}`}
                aria-label="Toggle visual theme"
              >
                {theme === "dark" ? (
                  <Sun style={{ width: "14px", height: "14px" }} />
                ) : (
                  <Moon style={{ width: "14px", height: "14px" }} />
                )}
              </button>

              {/* Quick Resume Spec CTA */}
              <a
                href="/Deepak-Kumar-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta-resume"
                download="Deepak-Kumar-Resume.pdf"
                onClick={() => playClick?.()}
                title="Download Deepak Kumar Rai Technical Resume (PDF)"
              >
                <span>SPEC PDF</span>
                <ArrowUpRight style={{ width: "12px", height: "12px" }} />
              </a>

              {/* Mobile Drawer Hamburger */}
              <button
                type="button"
                className="nav-mobile-trigger"
                onClick={() => {
                  playClick?.();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-label="Toggle mobile navigation menu"
              >
                <span className={`burger-bar ${mobileMenuOpen ? "open" : ""}`} />
                <span className={`burger-bar ${mobileMenuOpen ? "open" : ""}`} />
                <span className={`burger-bar ${mobileMenuOpen ? "open" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="nav-mobile-drawer">
            <div className="mobile-lens-strip">
              <span className="mobile-lens-label">// PERSPECTIVE LENS:</span>
              <div className="mobile-lens-btns">
                <button
                  type="button"
                  className={lens === "executive" ? "active" : ""}
                  onClick={() => handleLensChange("executive")}
                >
                  01. EXEC
                </button>
                <button
                  type="button"
                  className={lens === "architect" ? "active" : ""}
                  onClick={() => handleLensChange("architect")}
                >
                  02. ARCH
                </button>
                <button
                  type="button"
                  className={lens === "terminal" ? "active" : ""}
                  onClick={() => handleLensChange("terminal")}
                >
                  03. CLI
                </button>
              </div>
            </div>

            <div className="mobile-nav-links">
              <button type="button" onClick={() => handleNavClick("cluster-3d")}>
                <Box style={{ width: "14px", height: "14px" }} />
                <span>3D CLUSTER VISUALIZER</span>
              </button>
              <button type="button" onClick={() => handleNavClick("sentinel-lab")}>
                <Zap style={{ width: "14px", height: "14px" }} />
                <span>CHAOS SIMULATOR</span>
              </button>
              <button type="button" onClick={() => handleNavClick("memory-lab")}>
                <Cpu style={{ width: "14px", height: "14px" }} />
                <span>MEMORY POOL BENCHMARK</span>
              </button>
              <button type="button" onClick={() => handleNavClick("projects")}>
                <Layers style={{ width: "14px", height: "14px" }} />
                <span>SYSTEMS &amp; PROJECTS</span>
              </button>
              <button type="button" onClick={() => handleNavClick("incident-drill")}>
                <AlertTriangle style={{ width: "14px", height: "14px" }} />
                <span>INCIDENT DRILL</span>
              </button>
              <button type="button" onClick={() => handleNavClick("dispatch")}>
                <Send style={{ width: "14px", height: "14px" }} />
                <span>DIRECT DISPATCH</span>
              </button>
              <a
                href="/Deepak-Kumar-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Deepak-Kumar-Resume.pdf"
                className="mobile-resume-link"
              >
                <FileText style={{ width: "14px", height: "14px" }} />
                <span>DOWNLOAD RESUME SPEC (PDF)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
