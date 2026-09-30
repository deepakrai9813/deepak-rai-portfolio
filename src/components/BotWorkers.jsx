import { useState, useEffect } from "react";
import { useMachineStore } from "../store/useMachineStore";
import { playServoClick, playUiChirp } from "../utils/audioSystem";
import contentData from "../data/content.json";

// Specialized witty dialogue for each bot
const BOT_QUOTES = {
  SPARK: [
    "Thermal flux at 310 Kelvin. Core output rock solid at 3.85 Gigawatts.",
    "Tuning copper coil harmonic #7... Zero magnetic leakage detected.",
    "Stand clear of the plasma containment field, deploying diagnostic pulse!",
  ],
  PIXEL: [
    "React 19 Server Actions compiled with zero layout thrashing.",
    "Hydration completed in 1.2ms. Lighthouse accessibility locked at 100.",
    "Synthesizing fluid typography tokens for quantum display resolutions.",
  ],
  ROOT: [
    "Routing 50,000 WebSocket connections through distributed Redis pub/sub.",
    "Microservice mesh healthy: p95 latency under 18ms across all regions.",
    "Terminating SSL at the edge gateway. Zero packet drops observed.",
  ],
  QUERY: [
    "Sharded MongoDB compound index rebuilt. Query plan optimized to 0.4ms.",
    "Executing ACID transaction across distributed PostgreSQL ledger.",
    "Vector embeddings indexed in pgvector. Semantic search ready.",
  ],
  KUBO: [
    "Docker multi-stage container build completed: 18MB alpine image.",
    "Kubernetes pod autoscaling calibrated: CPU headroom at 72%.",
    "CI/CD pipeline green. Automated canary deployment verified.",
  ],
  AEGIS: [
    "JWT token entropy verified. Rotating cryptographic salt keys.",
    "Perimeter firewall active. Rate-limiting suspicious IP clusters.",
    "Zero vulnerabilities detected in static dependency analysis audit.",
  ],
  BUGSY: [
    "Running Playwright end-to-end test matrix across 6 browser viewports.",
    "Caught an off-by-one boundary edge case! Quarantining in bug jar.",
    "Test coverage: 99.4% statements, 98.8% branches. Flawless run.",
  ],
  NOVA: [
    "Iron Man titanium & Mark-85 cyan contrast ratio verified at 12:1 WCAG AAA.",
    "Balancing 95% Stark tech precision with 5% Iron Spider nano-mesh.",
    "Haptic micro-interactions calibrated. User delight metrics peak.",
  ],
};

export default function BotWorkers({ activeSection = "hero" }) {
  const {
    soundEnabled,
    activeSpeechBubble,
    setBotSpeech,
    isOvercharged,
  } = useMachineStore();

  const [botMeetingActive, setBotMeetingActive] = useState(false);
  const [meetingTopic, setMeetingTopic] = useState("SPRINT PLANNING // KANBAN v3.8");

  const bots = contentData.bots || [];

  const handleBotClick = (bot) => {
    if (soundEnabled) {
      playServoClick(true);
      playUiChirp(true, 880);
    }
    const quotes = BOT_QUOTES[bot.id] || ["All systems operational, sir."];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    setBotSpeech(bot.id, quote, 4000);
  };

  // Toggle mission control meeting periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setBotMeetingActive((prev) => !prev);
      const topics = [
        "SPRINT PLANNING // KANBAN v3.8",
        "DATABASE SHARD MIGRATION REVIEW",
        "EDGE LATENCY OPTIMIZATION REPORT",
        "SECURITY HARDENING DEPLOYMENT",
      ];
      setMeetingTopic(topics[Math.floor(Math.random() * topics.length)]);
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bot-workers-layer" aria-label="Stark Workshop Automated Bot Crew">
      {/* 1. SPARK: The Reactor Maintenance Technician (Stationed right at the Arc Core) */}
      <div
        className={`bot-unit bot-spark ${isOvercharged ? "alarm-mode" : ""}`}
        style={{ left: "calc(50% + 140px)", top: "330px" }}
        onClick={() => handleBotClick(bots.find((b) => b.id === "SPARK") || { id: "SPARK", name: "SPARK" })}
        title="SPARK: Click to inspect reactor status"
      >
        <div className="bot-avatar-wrap">
          {/* Mechanical Low-Poly SVG Bot Avatar */}
          <svg className="bot-svg" viewBox="0 0 48 48" width="44" height="44">
            {/* Antenna with status LED */}
            <line x1="24" y1="8" x2="24" y2="3" stroke="#f6b93b" strokeWidth="2" />
            <circle cx="24" cy="3" r="2.5" fill="#3ee8ff" className="antenna-led" />

            {/* Angular Helmet / Head */}
            <polygon points="12,8 36,8 39,20 9,20" fill="#0f1c2f" stroke="#1d3654" strokeWidth="1.5" />
            {/* Cyan Optic Visor */}
            <rect x="15" y="12" width="18" height="5" rx="1.5" fill="#3ee8ff" className="visor-glow" />

            {/* Torso */}
            <polygon points="10,21 38,21 34,36 14,36" fill="#0a1220" stroke="#f6b93b" strokeWidth="1.2" />
            {/* Chest Arc Reactor miniature */}
            <circle cx="24" cy="28" r="3.5" fill="#eafeff" stroke="#3ee8ff" strokeWidth="1.2" />

            {/* Arms / Tools (Calibration wand) */}
            <line x1="10" y1="24" x2="4" y2="32" stroke="#d98a2b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="38" y1="24" x2="44" y2="30" stroke="#d98a2b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="44" y1="30" x2="46" y2="24" stroke="#3ee8ff" strokeWidth="2" strokeLinecap="round" />

            {/* Caterpillar / Quad treads */}
            <rect x="12" y="37" width="24" height="5" rx="2" fill="#1d3654" />
          </svg>

          {/* Bot Name Badge */}
          <div className="bot-tag">
            <span className="bot-role-dot" style={{ backgroundColor: "#f6b93b" }} />
            <span className="bot-name">SPARK</span>
          </div>

          {/* Active Speech Bubble */}
          {activeSpeechBubble?.botId === "SPARK" && (
            <div className="bot-speech-bubble">
              <div className="bubble-header">
                <span className="bubble-bot-id">SPARK // MAINTENANCE</span>
                <span className="bubble-close-mark">&times;</span>
              </div>
              <p className="bubble-text">{activeSpeechBubble.text}</p>
            </div>
          )}
        </div>
      </div>

      {/* 2. MISSION CONTROL HOLOGRAPHIC KANBAN TABLE (Between Hero & Skills) */}
      <div className="mission-control-table-section">
        <div className="table-hologram-wrap">
          <div className="hologram-ring" />
          <div className="hologram-grid-plane" />

          {/* Holographic Kanban Board */}
          <div className="hologram-kanban-board">
            <div className="kanban-header">
              <span className="terminal-prefix">[STARK-OPS]</span>
              <span className="kanban-title">{meetingTopic}</span>
              <span className="live-pulse-badge">LIVE SYNC</span>
            </div>

            <div className="kanban-columns">
              <div className="kanban-col">
                <div className="col-title">DEPLOYED (100%)</div>
                <div className="kanban-card">
                  <div className="card-top">
                    <span className="card-id">#STK-901</span>
                    <span className="card-tag frontend">REACT 19</span>
                  </div>
                  <p className="card-desc">Hydrated full stack core portfolio</p>
                </div>
                <div className="kanban-card">
                  <div className="card-top">
                    <span className="card-id">#STK-842</span>
                    <span className="card-tag backend">NODE.JS</span>
                  </div>
                  <p className="card-desc">San Brothers KYC workflow engine</p>
                </div>
              </div>

              <div className="kanban-col">
                <div className="col-title">IN FLIGHT (ACTIVE)</div>
                <div className="kanban-card active">
                  <div className="card-top">
                    <span className="card-id">#STK-944</span>
                    <span className="card-tag ai">FASTAPI</span>
                  </div>
                  <p className="card-desc">LeadFinder AI prospect reasoning</p>
                </div>
                <div className="kanban-card">
                  <div className="card-top">
                    <span className="card-id">#STK-789</span>
                    <span className="card-tag cloud">DOCKER</span>
                  </div>
                  <p className="card-desc">Container cluster multi-stage build</p>
                </div>
              </div>

              <div className="kanban-col">
                <div className="col-title">AUTOMATED QA</div>
                <div className="kanban-card">
                  <div className="card-top">
                    <span className="card-id">#STK-980</span>
                    <span className="card-tag test">PLAYWRIGHT</span>
                  </div>
                  <p className="card-desc">Zero regressions across viewports</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bots Assembled around the planning table */}
          <div className="meeting-bots-roster">
            {bots
              .filter((b) => b.id !== "SPARK")
              .map((bot, index) => {
                const isSpeakingThis = activeSpeechBubble?.botId === bot.id;
                return (
                  <div
                    key={bot.id}
                    className={`bot-unit table-attendee ${isSpeakingThis ? "is-talking" : ""}`}
                    onClick={() => handleBotClick(bot)}
                    title={`${bot.name} (${bot.role}): Click for dialogue`}
                  >
                    <div className="bot-avatar-mini">
                      <svg viewBox="0 0 36 36" width="30" height="30">
                        {/* Little antenna */}
                        <line x1="18" y1="6" x2="18" y2="2" stroke={bot.color} strokeWidth="2" />
                        <circle cx="18" cy="2" r="1.5" fill="#3ee8ff" />
                        {/* Bot Head */}
                        <rect x="8" y="7" width="20" height="12" rx="3" fill="#0f1c2f" stroke={bot.color} strokeWidth="1.5" />
                        <rect x="11" y="10" width="14" height="4" rx="1" fill="#3ee8ff" />
                        {/* Body */}
                        <rect x="9" y="20" width="18" height="11" rx="2" fill="#0a1220" stroke="#1d3654" strokeWidth="1" />
                        <circle cx="18" cy="25" r="2.5" fill={bot.color} />
                        {/* Feet */}
                        <rect x="10" y="32" width="6" height="3" rx="1" fill="#1d3654" />
                        <rect x="20" y="32" width="6" height="3" rx="1" fill="#1d3654" />
                      </svg>
                      <span className="mini-bot-name">{bot.name}</span>
                    </div>

                    {isSpeakingThis && (
                      <div className="bot-speech-bubble attendee-bubble">
                        <div className="bubble-header">
                          <span className="bubble-bot-id">{bot.name} // {bot.role}</span>
                        </div>
                        <p className="bubble-text">{activeSpeechBubble.text}</p>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
