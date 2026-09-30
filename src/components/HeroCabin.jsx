import ArcReactorCanvas from "./ArcReactorCanvas";
import { useMachineStore } from "../store/useMachineStore";
import { playOverchargeSfx, playUiChirp } from "../utils/audioSystem";
import contentData from "../data/content.json";

export default function HeroCabin({ onNavigate }) {
  const { profile, reactor } = contentData;
  const { isOvercharged, overchargeReactor, soundEnabled } = useMachineStore();

  const handleOverchargeClick = () => {
    if (soundEnabled) {
      playOverchargeSfx(true);
      playUiChirp(true, 1200);
    }
    overchargeReactor();
  };

  return (
    <section id="hero" className="cabin-section hero-command-deck" aria-label="Command Deck Core">
      <div className="cabin-frame">
        {/* Cabin HUD Header Bar */}
        <div className="cabin-hud-header">
          <div className="hud-badge">
            <span className="hud-dot active" />
            <span className="hud-mono">SECTOR 01 // QUANTUM ARC CORE</span>
          </div>
          <div className="hud-status-strip">
            <span className="hud-chip">GRID: ONLINE</span>
            <span className="hud-chip highlight">STARK-DEV-01</span>
          </div>
        </div>

        <div className="hero-content-grid">
          {/* Left Column: Developer Identity & Biography */}
          <div className="hero-identity-card">
            <div className="identity-tagline">
              <span className="bracket">[</span>
              <span className="tag-role">{profile.role.toUpperCase()}</span>
              <span className="bracket">]</span>
            </div>

            <h1 className="developer-name">
              {profile.name}
            </h1>

            <p className="developer-tagline">
              {profile.tagline}
            </p>

            <p className="developer-bio">
              {profile.about}
            </p>

            {/* Quick CTAs */}
            <div className="hero-action-row">
              <button
                type="button"
                className="btn-primary-stark"
                onClick={() => onNavigate?.("projects")}
              >
                <span>DEPLOYED PROJECTS</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button
                type="button"
                className="btn-secondary-stark"
                onClick={() => onNavigate?.("contact")}
              >
                <span>TRANSMIT SIGNAL</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </button>
            </div>

            {/* 3 Core Engineering Metrics */}
            <div className="hero-stats-band">
              {profile.stats.map((stat, i) => (
                <div key={i} className="stat-module">
                  <div className="stat-val">{stat.value}</div>
                  <div className="stat-lbl">{stat.label}</div>
                  <div className="stat-sub">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Central Arc Reactor 3D Display & Gantry Controls */}
          <div className="hero-reactor-centerpiece">
            {/* Gantry Ring Frame */}
            <div className="reactor-gantry-ring">
              <div className="gantry-corner tl" />
              <div className="gantry-corner tr" />
              <div className="gantry-corner bl" />
              <div className="gantry-corner br" />

              {/* 3D Arc Reactor WebGL Canvas */}
              <div className="reactor-canvas-host">
                <ArcReactorCanvas />
              </div>

              {/* SPARK: Reactor Maintenance Technician Stationed at Core */}
              <div
                className={`bot-unit bot-spark-gantry ${isOvercharged ? "alarm-mode" : ""}`}
                onClick={() => {
                  if (soundEnabled) {
                    playUiChirp(true, 880);
                  }
                  const quotes = [
                    "Thermal flux at 310 Kelvin. Core output rock solid at 3.85 Gigawatts.",
                    "Tuning copper coil harmonic #7... Zero magnetic leakage detected.",
                    "Stand clear of the plasma containment field, deploying diagnostic pulse!",
                  ];
                  const quote = quotes[Math.floor(Math.random() * quotes.length)];
                  useMachineStore.getState().setBotSpeech("SPARK", quote, 4000);
                }}
                title="SPARK // MAINTENANCE: Click to inspect reactor"
              >
                <div className="bot-avatar-wrap">
                  <svg className="bot-svg" viewBox="0 0 48 48" width="40" height="40">
                    <line x1="24" y1="8" x2="24" y2="3" stroke="#f6b93b" strokeWidth="2" />
                    <circle cx="24" cy="3" r="2.5" fill="#3ee8ff" className="antenna-led" />
                    <polygon points="12,8 36,8 39,20 9,20" fill="#0f1c2f" stroke="#1d3654" strokeWidth="1.5" />
                    <rect x="15" y="12" width="18" height="5" rx="1.5" fill="#3ee8ff" className="visor-glow" />
                    <polygon points="10,21 38,21 34,36 14,36" fill="#0a1220" stroke="#f6b93b" strokeWidth="1.2" />
                    <circle cx="24" cy="28" r="3.5" fill="#eafeff" stroke="#3ee8ff" strokeWidth="1.2" />
                    <line x1="10" y1="24" x2="4" y2="32" stroke="#d98a2b" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="38" y1="24" x2="44" y2="30" stroke="#d98a2b" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="44" y1="30" x2="46" y2="24" stroke="#3ee8ff" strokeWidth="2" strokeLinecap="round" />
                    <rect x="12" y="37" width="24" height="5" rx="2" fill="#1d3654" />
                  </svg>
                  <div className="bot-tag">
                    <span className="bot-role-dot" style={{ backgroundColor: "#f6b93b" }} />
                    <span className="bot-name">SPARK</span>
                  </div>
                </div>

                {useMachineStore.getState().activeSpeechBubble?.botId === "SPARK" && (
                  <div className="bot-speech-bubble spark-bubble">
                    <div className="bubble-header">
                      <span className="bubble-bot-id">SPARK // MAINTENANCE</span>
                    </div>
                    <p className="bubble-text">{useMachineStore.getState().activeSpeechBubble.text}</p>
                  </div>
                )}
              </div>

              {/* Reactor Live Telemetry Ring Readout */}
              <div className="reactor-hud-telemetry">
                <div className="telemetry-block">
                  <span className="label">CORE VOLTAGE</span>
                  <span className={`val ${isOvercharged ? "overcharged" : ""}`}>
                    {isOvercharged ? "5.58 GW" : reactor.voltage}
                  </span>
                </div>

                <div className="telemetry-block">
                  <span className="label">HARMONIC FREQ</span>
                  <span className="val">{isOvercharged ? "108.2 Hz" : reactor.frequency}</span>
                </div>
                <div className="telemetry-block">
                  <span className="label">THERMAL FLUX</span>
                  <span className={`val ${isOvercharged ? "hot" : ""}`}>
                    {isOvercharged ? "420 K" : reactor.coreTemp}
                  </span>
                </div>
                <div className="telemetry-block">
                  <span className="label">EFFICIENCY</span>
                  <span className="val">{reactor.efficiency}</span>
                </div>
              </div>
            </div>

            {/* Overcharge Reactor Action Button */}
            <div className="reactor-control-strip">
              <button
                type="button"
                className={`btn-overcharge ${isOvercharged ? "discharging" : ""}`}
                onClick={handleOverchargeClick}
                disabled={isOvercharged}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>{isOvercharged ? "DISCHARGING SURGE (145%)..." : "OVERCHARGE ARC REACTOR"}</span>
              </button>
              <span className="overcharge-hint">
                Sends quantum surge wave through all pipeline conduits
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
