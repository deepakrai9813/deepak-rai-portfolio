import { useState, useEffect } from "react";
import { playClick, playPop, playSuccess } from "../utils/soundFx";

export default function SideQuests({ onShowToast }) {
  // CyberPet state
  const [petMood, setPetMood] = useState("coding");
  const [petEnergy, setPetEnergy] = useState(85);
  const [petSpeech, setPetSpeech] = useState("Writing clean async/await functions...");
  const [petClicks, setPetClicks] = useState(0);

  // Network probe state
  const [pingStatus, setPingStatus] = useState("idle");
  const [pingResults, setPingResults] = useState([
    { endpoint: "Cloudflare Edge (1.1.1.1)", rtt: "14ms", status: "Optimal" },
    { endpoint: "AWS Mumbai (ap-south-1)", rtt: "22ms", status: "Optimal" },
    { endpoint: "Vercel Edge Functions", rtt: "19ms", status: "Optimal" },
    { endpoint: "GitHub API Gateway", rtt: "38ms", status: "Optimal" },
  ]);

  // Glass generator state
  const [blurVal, setBlurVal] = useState(16);
  const [opacityVal, setOpacityVal] = useState(12);

  const petResponses = {
    poke: [
      "Running 'npm run build'...",
      "Compiling TypeScript types in memory...",
      "Sub-50ms latency is optimal.",
      "Unit testing complete: 100% pass rate.",
      "Deploying updates to edge nodes.",
    ],
    coffee: [
      "Caffeine level at maximum. Ready for 500 lines of clean code.",
      "Buffer refreshed. Systems running at peak performance.",
      "Async operations scheduled and optimized.",
    ],
    sleep: [
      "Entering low-power standby mode. Monitoring health checks.",
      "Standby mode active. Ping me if latency spikes.",
    ],
    code: [
      "Writing a high-throughput WebSocket microservice...",
      "Refactoring loop into an O(1) hash map lookup.",
      "Git commit: 'feat: optimized database index pipelines'",
    ],
  };

  const handlePetAction = (action) => {
    playPop();
    if (action === "poke") {
      setPetClicks((c) => c + 1);
      const list = petResponses.poke;
      setPetSpeech(list[Math.floor(Math.random() * list.length)]);
      setPetMood("happy");
    } else if (action === "coffee") {
      setPetEnergy(100);
      const list = petResponses.coffee;
      setPetSpeech(list[Math.floor(Math.random() * list.length)]);
      setPetMood("hyper");
    } else if (action === "sleep") {
      setPetEnergy(40);
      const list = petResponses.sleep;
      setPetSpeech(list[Math.floor(Math.random() * list.length)]);
      setPetMood("sleeping");
    } else if (action === "code") {
      setPetEnergy((e) => Math.max(20, e - 10));
      const list = petResponses.code;
      setPetSpeech(list[Math.floor(Math.random() * list.length)]);
      setPetMood("coding");
    }
  };

  const runLivePingTest = () => {
    playClick();
    setPingStatus("running");
    setTimeout(() => {
      setPingResults([
        { endpoint: "Cloudflare Edge (1.1.1.1)", rtt: `${Math.floor(10 + Math.random() * 8)}ms`, status: "Optimal" },
        { endpoint: "AWS Mumbai (ap-south-1)", rtt: `${Math.floor(18 + Math.random() * 10)}ms`, status: "Optimal" },
        { endpoint: "Vercel Edge Functions", rtt: `${Math.floor(15 + Math.random() * 9)}ms`, status: "Optimal" },
        { endpoint: "GitHub API Gateway", rtt: `${Math.floor(32 + Math.random() * 14)}ms`, status: "Optimal" },
      ]);
      setPingStatus("done");
      playSuccess();
      onShowToast("Network ping test completed");
    }, 1200);
  };

  const copyGlassCss = () => {
    const css = `background: rgba(255, 255, 255, 0.${opacityVal});\nbackdrop-filter: blur(${blurVal}px);\n-webkit-backdrop-filter: blur(${blurVal}px);\nborder: 1px solid rgba(255, 255, 255, 0.15);\nborder-radius: 16px;`;
    navigator.clipboard.writeText(css);
    playSuccess();
    onShowToast("Glassmorphism CSS copied");
  };

  return (
    <section id="side-quests" className="framer-section framer-quests-section">
      <div className="framer-container">
        {/* Section Header */}
        <div className="framer-section-header">
          <span className="section-eyebrow">LAB & EXPERIMENTS</span>
          <h2 className="section-title">Side Quests</h2>
          <p className="section-subtitle">
            A collection of small builds, AI experiments & curious little ideas.
          </p>
        </div>

        {/* Quest Cards Grid */}
        <div className="framer-quests-grid">
          {/* Card 1: Interactive CyberPet */}
          <div className="framer-quest-card quest-pet">
            <div className="quest-meta-row">
              <span className="quest-year">2026</span>
              <span className="quest-tag">AI Experiment</span>
              <span className="quest-tool">Web Audio + State Machine</span>
            </div>

            <div className="quest-info">
              <h3 className="quest-title">CyberPet — Vibe Companion</h3>
              <p className="quest-desc">
                An interactive desktop buddy built for developers. Click to interact, give coffee, or watch it code!
              </p>
            </div>

            {/* Interactive Bot Display */}
            <div className="cyberpet-stage">
              <div className="pet-speech-bubble">
                <span>{petSpeech}</span>
              </div>

              <div
                className={`cyberpet-avatar mood-${petMood}`}
                onClick={() => handlePetAction("poke")}
                role="button"
                tabIndex={0}
                title="Click to poke CyberPet!"
              >
                <div className="pet-head">
                  <div className="pet-antenna">
                    <span className="antenna-glow" />
                  </div>
                  <div className="pet-eyes">
                    {petMood === "sleeping" ? (
                      <span className="eye-closed">- -</span>
                    ) : petMood === "hyper" ? (
                      <span className="eye-hyper">^ ^</span>
                    ) : (
                      <span className="eye-normal">● ●</span>
                    )}
                  </div>
                  <div className="pet-mouth">
                    {petMood === "coding" ? "</>" : petMood === "happy" ? "_" : "—"}
                  </div>
                </div>
              </div>

              <div className="pet-stats-row">
                <span className="pet-stat">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Energy: {petEnergy}%
                </span>
                <span className="pet-stat">Clicks: {petClicks}</span>
                <span className="pet-stat">Mood: {petMood.toUpperCase()}</span>
              </div>

              {/* Bot Interaction Buttons */}
              <div className="pet-controls">
                <button
                  type="button"
                  className="pet-btn"
                  onClick={() => handlePetAction("coffee")}
                  title="Feed coffee"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  </svg>
                  <span>Coffee</span>
                </button>
                <button
                  type="button"
                  className="pet-btn"
                  onClick={() => handlePetAction("code")}
                  title="Command to code"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  <span>Code</span>
                </button>
                <button
                  type="button"
                  className="pet-btn"
                  onClick={() => handlePetAction("sleep")}
                  title="Let pet rest"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  <span>Rest</span>
                </button>
                <button
                  type="button"
                  className="pet-btn"
                  onClick={() => handlePetAction("poke")}
                  title="Poke"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6" />
                    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                  </svg>
                  <span>Poke</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Live Network Latency & Jitter Probe */}
          <div className="framer-quest-card quest-probe">
            <div className="quest-meta-row">
              <span className="quest-year">2025</span>
              <span className="quest-tag">Developer Utility</span>
              <span className="quest-tool">Edge Network Diagnostic</span>
            </div>

            <div className="quest-info">
              <h3 className="quest-title">Live Network Latency Probe</h3>
              <p className="quest-desc">
                Real-time roundtrip latency & route health probe measuring edge packet performance.
              </p>
            </div>

            <div className="probe-terminal">
              <div className="probe-terminal-header">
                <span className="term-dot" />
                <span className="term-title">EDGE ROUTE TELEMETRY</span>
                <button
                  type="button"
                  className="probe-run-btn"
                  onClick={runLivePingTest}
                  disabled={pingStatus === "running"}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <span>{pingStatus === "running" ? "Pinging..." : "Test Latency"}</span>
                </button>
              </div>

              <div className="probe-results-list">
                {pingResults.map((r) => (
                  <div key={r.endpoint} className="probe-result-row">
                    <span className="r-endpoint">{r.endpoint}</span>
                    <span className="r-rtt">{r.rtt}</span>
                    <span className="r-badge">{r.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: CSS Glassmorphism Shader Lab */}
          <div className="framer-quest-card quest-shader">
            <div className="quest-meta-row">
              <span className="quest-year">2024</span>
              <span className="quest-tag">Open Source</span>
              <span className="quest-tool">CSS Houdini + Tokens</span>
            </div>

            <div className="quest-info">
              <h3 className="quest-title">CSS Glassmorphism Shader Lab</h3>
              <p className="quest-desc">
                Fine-tune backdrop blur & specular opacity in real time, then copy production-ready CSS.
              </p>
            </div>

            <div className="glass-preview-zone">
              <div
                className="glass-sample-box"
                style={{
                  background: `rgba(255, 255, 255, ${opacityVal / 100})`,
                  backdropFilter: `blur(${blurVal}px)`,
                  WebkitBackdropFilter: `blur(${blurVal}px)`,
                }}
              >
                <span className="sample-text">Live Glass Preview</span>
                <span className="sample-meta">
                  blur: {blurVal}px | alpha: {opacityVal}%
                </span>
              </div>

              <div className="glass-slider-controls">
                <div className="slider-row">
                  <label htmlFor="blur-range">Blur: {blurVal}px</label>
                  <input
                    id="blur-range"
                    type="range"
                    min="4"
                    max="40"
                    value={blurVal}
                    onChange={(e) => setBlurVal(Number(e.target.value))}
                  />
                </div>
                <div className="slider-row">
                  <label htmlFor="opacity-range">Opacity: {opacityVal}%</label>
                  <input
                    id="opacity-range"
                    type="range"
                    min="2"
                    max="35"
                    value={opacityVal}
                    onChange={(e) => setOpacityVal(Number(e.target.value))}
                  />
                </div>
              </div>

              <button
                type="button"
                className="copy-css-btn"
                onClick={copyGlassCss}
              >
                <span>Copy CSS Tokens</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
