import { useState } from "react";
import { PERSONAL_INFO } from "../utils/data";

export default function Hero({ onOpenCommandPalette }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
            scalable microservices & high-performance web experiences.
          </span>
        </h1>

        {/* Subtitle / Bio */}
        <p className="hero-subtitle-description">
          I am <strong>Deepak Kumar</strong>, a full stack software engineer with 3+ years of experience engineering enterprise web platforms, event-driven Node.js & React/Next.js architectures, and cloud data pipelines.
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
            <span>{copied ? "Email Copied!" : "Copy Email"}</span>
          </button>
        </div>

        {/* Quantified Stats Ribbon */}
        <div className="hero-stats-ribbon">
          {stats.map((s, idx) => (
            <div key={idx} className="hero-stat-card">
              <span className={`stat-numeric-value ${s.color}`}>{s.value}</span>
              <span className="stat-title-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
