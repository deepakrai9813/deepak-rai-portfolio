import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Zap,
  Box,
  Cpu,
  Layers,
  Send,
  Volume2,
  VolumeX,
  FileText,
  Activity,
  Menu,
  X,
  Shield,
  Clock,
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  // Track scroll position for floating dock elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className={`modern-nav-wrapper ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="container modern-nav-container">
        {/* Brand Monogram & Identity */}
        <div className="nav-brand-section">
          <a
            href="#hero"
            className="modern-brand-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("hero");
            }}
          >
            <div className="brand-monogram-shield">
              <span className="brand-bracket">◤</span>
              <span className="brand-monogram">DR</span>
              <span className="brand-bracket">◢</span>
            </div>
            <div className="brand-text-block">
              <span className="brand-full-name">DEEPAK RAI</span>
              <span className="brand-role-subtitle">SYSTEMS ARCHITECT</span>
            </div>
          </a>

          <div className="nav-status-pill">
            <span className="led-beacon pulse" />
            <span className="nav-status-text">99.98% SLA // LIVE</span>
          </div>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="modern-nav-links">
          <button
            type="button"
            className="nav-anchor-btn"
            onClick={() => handleNavClick("cluster-3d")}
          >
            <Box style={{ width: "12px", height: "12px" }} />
            <span>3D TOPOLOGY</span>
          </button>

          <button
            type="button"
            className="nav-anchor-btn"
            onClick={() => handleNavClick("sentinel-lab")}
          >
            <Zap style={{ width: "12px", height: "12px" }} />
            <span>SANDBOX</span>
          </button>

          <button
            type="button"
            className="nav-anchor-btn"
            onClick={() => handleNavClick("projects")}
          >
            <Layers style={{ width: "12px", height: "12px" }} />
            <span>PROJECTS</span>
          </button>

          <button
            type="button"
            className="nav-anchor-btn"
            onClick={() => handleNavClick("incident-drill")}
          >
            <Shield style={{ width: "12px", height: "12px" }} />
            <span>INCIDENT</span>
          </button>

          <button
            type="button"
            className="nav-anchor-btn"
            onClick={() => handleNavClick("terminal")}
          >
            <Activity style={{ width: "12px", height: "12px" }} />
            <span>TERMINAL</span>
          </button>
        </nav>

        {/* Right Controls: Lens Rocker, Audio, Theme & Uplink */}
        <div className="modern-nav-actions">
          {/* 3-State Perspective Lens Segmented Control */}
          <div className="modern-lens-selector" title="Switch architectural perspective">
            <button
              type="button"
              className={`lens-segment-btn ${lens === "executive" ? "active" : ""}`}
              onClick={() => handleLensChange("executive")}
            >
              EXEC
            </button>
            <button
              type="button"
              className={`lens-segment-btn ${lens === "architect" ? "active" : ""}`}
              onClick={() => handleLensChange("architect")}
            >
              ARCH
            </button>
            <button
              type="button"
              className={`lens-segment-btn ${lens === "terminal" ? "active" : ""}`}
              onClick={() => handleLensChange("terminal")}
            >
              CLI
            </button>
          </div>

          {/* Sound FX Toggle */}
          <button
            type="button"
            className={`nav-utility-btn ${soundEnabled ? "sound-active" : ""}`}
            onClick={() => {
              playClick?.();
              toggleSound();
            }}
            title={`Sound FX: ${soundEnabled ? "Enabled (Click to mute)" : "Muted (Click to enable)"}`}
            aria-label="Toggle Sound Effects"
          >
            {soundEnabled ? (
              <div className="audio-eq-bars" style={{ height: "10px" }}>
                <span className="eq-bar bar1" />
                <span className="eq-bar bar2" />
                <span className="eq-bar bar3" />
              </div>
            ) : (
              <VolumeX style={{ width: "14px", height: "14px" }} />
            )}
          </button>

          {/* Theme Mode Toggle (Solid light/dark) */}
          <button
            type="button"
            className="nav-utility-btn"
            onClick={() => {
              playClick?.();
              toggleTheme();
            }}
            title={`Current: ${theme.toUpperCase()} mode (Click to toggle)`}
            aria-label="Toggle Light/Dark Theme"
          >
            {theme === "dark" ? (
              <Sun style={{ width: "14px", height: "14px" }} />
            ) : (
              <Moon style={{ width: "14px", height: "14px" }} />
            )}
          </button>

          {/* Direct Uplink Button */}
          <button
            type="button"
            className="nav-cta-btn"
            onClick={() => handleNavClick("dispatch")}
          >
            <Send style={{ width: "12px", height: "12px" }} />
            <span>DISPATCH</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="nav-mobile-toggle"
            onClick={() => {
              playClick?.();
              setMobileMenuOpen((v) => !v);
            }}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? (
              <X style={{ width: "18px", height: "18px" }} />
            ) : (
              <Menu style={{ width: "18px", height: "18px" }} />
            )}
          </button>
        </div>
      </div>

      {/* Spacious Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-inner">
            <div className="mobile-lens-picker">
              <span className="mobile-menu-label">// PERSPECTIVE LENS:</span>
              <div className="modern-lens-selector full-width">
                <button
                  type="button"
                  className={`lens-segment-btn ${lens === "executive" ? "active" : ""}`}
                  onClick={() => handleLensChange("executive")}
                >
                  EXECUTIVE BRIEF
                </button>
                <button
                  type="button"
                  className={`lens-segment-btn ${lens === "architect" ? "active" : ""}`}
                  onClick={() => handleLensChange("architect")}
                >
                  SYSTEM ARCHITECT
                </button>
                <button
                  type="button"
                  className={`lens-segment-btn ${lens === "terminal" ? "active" : ""}`}
                  onClick={() => handleLensChange("terminal")}
                >
                  TERMINAL CLI
                </button>
              </div>
            </div>

            <nav className="mobile-nav-links-list">
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNavClick("cluster-3d")}
              >
                <span>01. 3D VOLUMETRIC CLUSTER</span>
                <Box style={{ width: "16px", height: "16px" }} />
              </button>

              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNavClick("sentinel-lab")}
              >
                <span>02. SENTINEL SANDBOX &amp; RADAR</span>
                <Zap style={{ width: "16px", height: "16px" }} />
              </button>

              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNavClick("memory-lab")}
              >
                <span>03. GO CONCURRENCY BENCH</span>
                <Cpu style={{ width: "16px", height: "16px" }} />
              </button>

              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNavClick("projects")}
              >
                <span>04. PRODUCTION SYSTEMS MATRIX</span>
                <Layers style={{ width: "16px", height: "16px" }} />
              </button>

              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNavClick("incident-drill")}
              >
                <span>05. INCIDENT FAILOVER DRILL</span>
                <Shield style={{ width: "16px", height: "16px" }} />
              </button>

              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNavClick("terminal")}
              >
                <span>06. DIAGNOSTIC CLI TERMINAL</span>
                <Activity style={{ width: "16px", height: "16px" }} />
              </button>
            </nav>

            <div className="mobile-drawer-footer">
              <a
                href="/Deepak-Kumar-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-mech full-width"
                download="Deepak-Kumar-Resume.pdf"
                onClick={() => playClick?.()}
              >
                <FileText style={{ width: "14px", height: "14px" }} />
                <span>DOWNLOAD RESUME SPEC (PDF)</span>
              </a>

              <div className="mobile-status-row">
                <span className="led-beacon pulse" />
                <span>STATION: DEEPAK-RAI-WS // {timeStr}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
