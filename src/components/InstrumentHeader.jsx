import { useState, useEffect } from "react";
import { Sun, Moon, Zap, AlertTriangle } from "./icons";

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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="instrument-header">
      {/* Precision Telemetry Topline */}
      <div className="header-topline">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span className="led-indicator pulse" />
          <span style={{ color: "var(--text-high)", fontWeight: 700 }}>STATION: DEEPAK-RAI-WS</span>
          <span>//</span>
          <span>LAT/LON: 28.6139°N, 77.2090°E</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>PROXY SLA: 12ms (p99 &lt;35ms)</span>
          <span>//</span>
          <span>PACKET LOSS: 0.00%</span>
          <span>//</span>
          <span style={{ color: "var(--signal-green)", fontWeight: 700 }}>
            {timeStr || "12:00:00 IST"}
          </span>
        </div>
      </div>

      {/* Main Bar with Identity, Lens Switcher, and Hardware Controls */}
      <div className="header-main">
        <div className="header-brand">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("hero");
            }}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                backgroundColor: "var(--text-high)",
                color: "var(--bg-canvas)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "13px",
                fontFamily: "var(--font-mono)",
              }}
            >
              DR
            </div>
            <div>
              <div className="brand-callsign">DEEPAK RAI</div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--text-dim)",
                  letterSpacing: "0.06em",
                }}
              >
                SYSTEMS &amp; FULL-STACK ENGINEER
              </div>
            </div>
          </a>
        </div>

        {/* The Tri-Perspective Lens Switcher */}
        <div className="lens-selector-group">
          <button
            type="button"
            className={`lens-option-btn ${lens === "executive" ? "active" : ""}`}
            onClick={() => handleLensChange("executive")}
            title="Executive Brief: Business impact, reliability SLAs, and high-level ROI"
          >
            <span style={{ opacity: 0.6 }}>01</span>
            <span>EXECUTIVE BRIEF</span>
          </button>

          <button
            type="button"
            className={`lens-option-btn ${lens === "architect" ? "active" : ""}`}
            onClick={() => handleLensChange("architect")}
            title="Architectural Spec: Concurrency primitives, zero-copy rewinds, and system internals"
          >
            <span style={{ opacity: 0.6 }}>02</span>
            <span>ARCHITECT SPEC</span>
          </button>

          <button
            type="button"
            className={`lens-option-btn ${lens === "terminal" ? "active" : ""}`}
            onClick={() => handleLensChange("terminal")}
            title="Terminal Console: Live interactive CLI, raw logs, and diagnostic benchmarks"
          >
            <span style={{ opacity: 0.6 }}>03</span>
            <span>TERMINAL CLI</span>
          </button>
        </div>

        {/* Quick Nav Anchor Strip */}
        <nav style={{ display: "flex", gap: "12px", fontFamily: "var(--font-mono)", fontSize: "11px", flexWrap: "wrap", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => handleNavClick("sentinel-lab")}
            style={{ color: "var(--signal-green)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            <Zap style={{ width: "12px", height: "12px" }} />
            <span>[CHAOS LAB]</span>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("memory-lab")}
            style={{ color: "var(--signal-cyan)", fontWeight: 600 }}
          >
            [MEMORY POOL]
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("projects")}
            style={{ color: "var(--text-med)" }}
          >
            [PROJECTS]
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("audit")}
            style={{ color: "var(--text-med)" }}
          >
            [AUDIT]
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("incident-drill")}
            style={{ color: "var(--signal-orange)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            <AlertTriangle style={{ width: "12px", height: "12px" }} />
            <span>[INCIDENT DRILL]</span>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("dispatch")}
            style={{ color: "var(--text-high)", fontWeight: 700 }}
          >
            [DISPATCH]
          </button>
        </nav>

        {/* Hardware Sound & Theme Toggles */}
        <div className="header-actions">
          {/* Mechanical Audio Rocker */}
          <button
            type="button"
            className="btn-mech-outline"
            onClick={() => {
              toggleSound();
              playSwitch?.();
            }}
            style={{ padding: "6px 10px", fontSize: "11px", gap: "6px" }}
            title="Toggle synthesized physical mechanical click sound effects"
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: soundEnabled ? "var(--signal-green)" : "var(--border-strong)",
                display: "inline-block",
              }}
            />
            <span>{soundEnabled ? "AUDIO: ON" : "AUDIO: MUTE"}</span>
          </button>

          {/* Theme Rocker (Matte Stealth vs Blueprint Paper) */}
          <button
            type="button"
            className="icon-toggle-btn"
            onClick={() => {
              playClick?.();
              toggleTheme();
            }}
            title={`Switch to ${theme === "dark" ? "Light Blueprint Paper" : "Dark Stealth"} theme`}
          >
            {theme === "dark" ? <Sun style={{ width: "16px", height: "16px" }} /> : <Moon style={{ width: "16px", height: "16px" }} />}
          </button>
        </div>
      </div>
    </header>
  );
}
