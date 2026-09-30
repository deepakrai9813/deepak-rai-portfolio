import { useState } from "react";
import { PERSONAL_INFO } from "../utils/data";
import { useCardSpotlight } from "../hooks/useCardSpotlight";

export default function Hero({ onOpenCommandPalette, onOpenSchedule }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const { onMouseMove } = useCardSpotlight();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText("npx deepak-kumar");
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2500);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { value: "3+ Years", label: "Production Engineering", color: "cyan" },
    { value: "15+", label: "Deployed Systems", color: "emerald" },
    { value: "99.98%", label: "Uptime SLA", color: "indigo" },
    { value: "<18ms", label: "p95 API Latency", color: "cyan" },
  ];

  return (
    <section id="hero" className="portfolio-hero-section">
      <div className="hero-content-wrapper">
        {/* Availability Pill */}
        <div className="hero-status-pill">
          <span className="status-pulse-dot" />
          <span>Available for Senior / Full-Stack Roles</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-main-title">
          Building resilient distributed systems,{" "}
          <span className="gradient-text-shimmer">
            scalable microservices &amp; high-performance web experiences.
          </span>
        </h1>

        {/* Subtitle / Bio */}
        <p className="hero-subtitle-description">
          I am <strong>Deepak Kumar</strong>, a full stack software engineer with 3+ years of experience engineering enterprise web platforms, event-driven Node.js &amp; React/Next.js architectures, and cloud data pipelines.
        </p>

        {/* Hero CTAs */}
        <div className="hero-cta-cluster">
          <button
            type="button"
            className="btn-primary-action"
            onClick={() => scrollTo("projects")}
          >
            <span>Explore Projects</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </button>

          <button
            type="button"
            className="btn-schedule-action"
            onClick={onOpenSchedule}
            title="Schedule a 15-30m technical chat"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Schedule Chat</span>
          </button>

          <button
            type="button"
            className="btn-secondary-action"
            onClick={() => scrollTo("contact")}
          >
            <span>Get in Touch</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          <button
            type="button"
            className="btn-secondary-action"
            onClick={handleCopyEmail}
            title="Click to copy email address"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>{copiedEmail ? "Email Copied!" : "Copy Email"}</span>
          </button>
        </div>

        {/* Interactive CLI Badge */}
        <div className="hero-cli-container">
          <div
            className="hero-cli-badge"
            onClick={handleCopyCommand}
            title="Click to copy CLI command"
          >
            <span className="cli-terminal-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </span>
            <span className="cli-command-txt">npx deepak-kumar</span>
            <span className="cli-copy-indicator">
              {copiedCmd ? (
                <span className="copied-tag">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied
                </span>
              ) : (
                <span className="copy-label">Copy</span>
              )}
            </span>
          </div>
        </div>

        {/* Quantified Stats Ribbon */}
        <div className="hero-stats-ribbon">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="hero-stat-card spotlight-card"
              onMouseMove={onMouseMove}
            >
              <span className={`stat-numeric-value ${s.color}`}>{s.value}</span>
              <span className="stat-title-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
