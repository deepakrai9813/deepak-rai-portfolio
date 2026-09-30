import { useMachineStore } from "../store/useMachineStore";
import { startReactorHum, stopReactorHum, playUiChirp } from "../utils/audioSystem";

export default function HeaderNav({ activeSection = "hero", onNavigate }) {
  const { soundEnabled, toggleSound, isOvercharged, powerLevel } = useMachineStore();

  const handleSoundClick = () => {
    const nextState = !soundEnabled;
    toggleSound();
    if (nextState) {
      startReactorHum(true);
      playUiChirp(true, 920);
    } else {
      stopReactorHum();
    }
  };

  const navItems = [
    { id: "hero", label: "01 // CORE", sector: "CORE" },
    { id: "skills", label: "02 // LAB", sector: "LAB" },
    { id: "projects", label: "03 // PROJECTS", sector: "PROJECTS" },
    { id: "experience", label: "04 // FLIGHT LOGS", sector: "LOGS" },
    { id: "contact", label: "05 // TRANSMITTER", sector: "CONTACT" },
  ];

  return (
    <header className="workshop-header-nav" role="banner">
      <div className="header-left">
        <button
          type="button"
          className="brand-anchor"
          onClick={() => onNavigate?.("hero")}
          aria-label="Deepak Kumar - Mark-85 Core"
        >
          <svg className="stark-core-icon" viewBox="0 0 24 24" width="22" height="22">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="none" stroke="#3ee8ff" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4" fill="#3ee8ff" />
          </svg>
          <div className="brand-text-block">
            <span className="brand-title">DEEPAK KUMAR</span>
            <span className="brand-sub">STARK-DEV-01 // FULL STACK</span>
          </div>
        </button>

        {/* Live System Status Pill */}
        <div className="system-status-pill">
          <span className={`status-indicator ${isOvercharged ? "overcharged" : "nominal"}`} />
          <span className="status-label">
            {isOvercharged ? "TURBO BURST (145%)" : "GRID NOMINAL"}
          </span>
        </div>
      </div>

      {/* Sector Navigation Links */}
      <nav className="header-center-nav" aria-label="Workshop Sectors">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`nav-sector-link ${isActive ? "active" : ""}`}
              onClick={() => onNavigate?.(item.id)}
            >
              <span className="sector-num">{item.label}</span>
              {isActive && <span className="sector-active-bar" />}
            </button>
          );
        })}
      </nav>

      {/* Header Right: Diagnostics & Audio Toggle */}
      <div className="header-right">
        {/* Core Voltage Readout */}
        <div className="core-telemetry-badge">
          <span className="telemetry-key">CORE:</span>
          <span className={`telemetry-val ${isOvercharged ? "overcharged" : ""}`}>
            {isOvercharged ? "5.58 GW" : "3.85 GW"}
          </span>
        </div>

        {/* Audio Toggle Button with SVG Icon */}
        <button
          type="button"
          className={`audio-toggle-btn ${soundEnabled ? "sound-on" : "sound-off"}`}
          onClick={handleSoundClick}
          title={soundEnabled ? "Audio Active (Reactor Hum & Heartbeat)" : "Click to Enable Audio Synthesis"}
          aria-label={soundEnabled ? "Mute audio synthesis" : "Enable audio synthesis"}
        >
          {soundEnabled ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
          <span className="audio-label">{soundEnabled ? "AUDIO ON" : "AUDIO OFF"}</span>
        </button>
      </div>
    </header>
  );
}
