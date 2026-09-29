import { useState } from "react";
import { PERSONAL_INFO } from "../utils/data";
import { playClick, playPop, playSuccess } from "../utils/soundFx";

export default function Hero({ onNavigate, onShowToast }) {
  const [copied, setCopied] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    playSuccess();
    onShowToast("Email copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2500);
  };

  const metrics = [
    { label: "Production Uptime", val: "99.98%", sub: "Zero unbudgeted downtime" },
    { label: "API p95 Latency", val: "18ms", sub: "Redis caching + Edge routing" },
    { label: "Git Commits", val: "1,420+", sub: "Continuous deployment cycle" },
    { label: "Microservices", val: "16 Nodes", sub: "Docker & Kubernetes cluster" },
  ];

  return (
    <section id="home" className="framer-hero-section">
      <div className="framer-hero-container">
        {/* Availability Badge */}
        <div className="framer-status-badge">
          <span className="pulsing-emerald-dot" />
          <span className="status-label">{PERSONAL_INFO.status}</span>
        </div>

        {/* Big Expressive Greeting */}
        <div className="framer-hero-intro">
          <h2 className="framer-greeting">
            Hi, I’m Deepak! <span className="hand-wave">👋</span>
          </h2>
          <h1 className="framer-hero-headline">
            {PERSONAL_INFO.bioHeadline}
          </h1>
          <p className="framer-hero-bio">
            {PERSONAL_INFO.bioNarrative}
          </p>
        </div>

        {/* Interactive Engineering Telemetry Card (Hero Central Visual) */}
        <div className="framer-hero-showcase">
          <div className="showcase-ambient-blur" />
          <div className="showcase-glass-card">
            <div className="showcase-card-header">
              <div className="header-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="header-system-tag">
                <span className="live-pulse" />
                <span>SYSTEM STATUS: OPERATIONAL</span>
              </div>
              <div className="header-location">{PERSONAL_INFO.location}</div>
            </div>

            <div className="showcase-grid-content">
              {metrics.map((m, idx) => (
                <div
                  key={m.label}
                  className={`metric-block ${activeMetric === idx ? "active-block" : ""}`}
                  onMouseEnter={() => {
                    playClick();
                    setActiveMetric(idx);
                  }}
                >
                  <div className="metric-val">{m.val}</div>
                  <div className="metric-label">{m.label}</div>
                  <div className="metric-sub">{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Quick Live Code Stream Banner */}
            <div className="showcase-code-banner">
              <span className="code-prefix">&gt; stack:</span>
              <span className="code-text">
                React 19 • Next.js 15 • Node.js • Express • MongoDB • Redis • Docker • Claude AI
              </span>
            </div>
          </div>
        </div>

        {/* Hero Action Controls */}
        <div className="framer-hero-actions">
          <button
            type="button"
            className="framer-btn-primary"
            onClick={() => {
              playPop();
              onNavigate("projects");
            }}
          >
            <span>Explore Projects</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </button>

          <button
            type="button"
            className="framer-btn-secondary"
            onClick={handleCopyEmail}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>{copied ? "Copied deepakkumar740@gmail.com" : "Copy Email"}</span>
          </button>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="framer-btn-ghost"
            onClick={playClick}
          >
            <span>LinkedIn</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="framer-btn-ghost"
            onClick={playClick}
          >
            <span>GitHub</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
