import { useState, useEffect } from "react";
import { PERSONAL_INFO } from "../utils/data";

export default function PressKitModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("bio");
  const [bioLength, setBioLength] = useState("medium");
  const [copiedBio, setCopiedBio] = useState(false);
  const [copiedStack, setCopiedStack] = useState(false);

  const bios = {
    short: "Deepak Kumar is a full-stack engineer and distributed systems architect with 3+ years of experience building resilient microservices, high-concurrency event-driven web platforms, and sub-quarter-second web applications with React 19, Node.js, and Redis.",
    medium: "Deepak Kumar is a full-stack software engineer specializing in scalable distributed backends, reactive web interfaces, and high-performance cloud infrastructure. With 3+ years of production experience at San Brothers Corporate Solutions and global clients, Deepak engineers mission-critical enterprise portals, Redis-cached microservices, and Docker-orchestrated cloud pipelines delivering sub-18ms p95 latencies and 99.98% uptime SLA.",
    long: "Deepak Kumar is a senior-level full-stack engineer based in India (working remotely worldwide). Over 3+ years of engineering production systems, he has architected end-to-end supply chain logistics platforms, real-time WebSockets engines handling 50k+ concurrent connections, and cloud developer studios. At San Brothers Corporate Solutions, he spearheaded the migration of legacy monoliths into event-driven microservices, slashing onboarding times by 84% and cutting p95 database query times from 1.85s to 18ms. His core stack centers on TypeScript, React 19, Next.js, Node.js, PostgreSQL, Redis, and Docker.",
  };

  const stackMarkdown = `### Deepak Kumar — Technical Stack & Core Competencies
- **Frontend Architecture**: React 19, Next.js 15 (App Router, RSC), TypeScript, Tailwind CSS, TanStack Query, Framer Motion, WebSockets.
- **Backend & Microservices**: Node.js, Express.js, TypeScript, RabbitMQ, Redis Streams, Python, REST & GraphQL.
- **Databases & In-Memory**: PostgreSQL (Covering Indexes, Partitioning), MongoDB (Aggregation Pipelines), Redis (Distributed Mutex, Caching).
- **Cloud, DevOps & Tooling**: Docker, Docker Swarm, AWS (ECS, S3, CloudFront), GitHub Actions CI/CD, NGINX, Linux Shell.
- **Contact**: deepakkumar740@gmail.com | https://www.linkedin.com/in/deepak-rai-990502236/ | https://github.com/deepakrai9813`;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyBio = () => {
    navigator.clipboard.writeText(bios[bioLength]);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  const handleCopyStack = () => {
    navigator.clipboard.writeText(stackMarkdown);
    setCopiedStack(true);
    setTimeout(() => setCopiedStack(false), 2000);
  };

  return (
    <div className="presskit-modal-backdrop" onClick={onClose}>
      <div
        className="presskit-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="presskit-title"
      >
        <div className="presskit-modal-header">
          <div className="presskit-title-lockup">
            <span className="presskit-tag-badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>ENGINEERING BRIEFING &amp; PRESS KIT</span>
            </span>
            <h3 id="presskit-title" className="presskit-title-text">
              Deepak Kumar — Press Kit &amp; Media Assets
            </h3>
          </div>
          <button
            type="button"
            className="btn-close-presskit"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="presskit-tabs-bar">
          <button
            type="button"
            className={`presskit-tab-btn ${activeTab === "bio" ? "active" : ""}`}
            onClick={() => setActiveTab("bio")}
          >
            Executive Bio
          </button>
          <button
            type="button"
            className={`presskit-tab-btn ${activeTab === "metrics" ? "active" : ""}`}
            onClick={() => setActiveTab("metrics")}
          >
            Key Metrics
          </button>
          <button
            type="button"
            className={`presskit-tab-btn ${activeTab === "stack" ? "active" : ""}`}
            onClick={() => setActiveTab("stack")}
          >
            Tech Stack (Markdown)
          </button>
        </div>

        <div className="presskit-modal-body">
          {activeTab === "bio" && (
            <div className="presskit-bio-panel">
              <div className="bio-length-toggle-bar">
                <span className="length-label">Select Length:</span>
                <div className="length-pills">
                  {["short", "medium", "long"].map((len) => (
                    <button
                      key={len}
                      type="button"
                      className={`length-pill ${bioLength === len ? "active" : ""}`}
                      onClick={() => setBioLength(len)}
                    >
                      {len.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bio-content-box">
                <p className="bio-text">{bios[bioLength]}</p>
              </div>

              <div className="bio-actions-bar">
                <button
                  type="button"
                  className="btn-copy-bio"
                  onClick={handleCopyBio}
                >
                  {copiedBio ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ color: "#10b981" }}>Copied Bio to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy Bio for Event / Intro</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === "metrics" && (
            <div className="presskit-metrics-panel">
              <div className="presskit-metrics-grid">
                <div className="presskit-metric-card">
                  <span className="m-val">3+ Years</span>
                  <span className="m-lbl">Full-Stack Production Engineering</span>
                </div>
                <div className="presskit-metric-card">
                  <span className="m-val">99.98%</span>
                  <span className="m-lbl">Production Cluster SLA</span>
                </div>
                <div className="presskit-metric-card">
                  <span className="m-val">&lt; 18 ms</span>
                  <span className="m-lbl">p95 API Latency (Redis Layer)</span>
                </div>
                <div className="presskit-metric-card">
                  <span className="m-val">50,000+</span>
                  <span className="m-lbl">Peak Concurrent Connections Handled</span>
                </div>
                <div className="presskit-metric-card">
                  <span className="m-val">15+</span>
                  <span className="m-lbl">Enterprise Systems Shipped</span>
                </div>
                <div className="presskit-metric-card">
                  <span className="m-val">84x</span>
                  <span className="m-lbl">KYC Distributor Onboarding Acceleration</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "stack" && (
            <div className="presskit-stack-panel">
              <div className="stack-pre-box">
                <pre>
                  <code>{stackMarkdown}</code>
                </pre>
              </div>
              <button
                type="button"
                className="btn-copy-stack"
                onClick={handleCopyStack}
              >
                {copiedStack ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ color: "#10b981" }}>Copied Markdown to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Copy ATS Markdown Summary</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="presskit-modal-footer">
          <a
            href="/Deepak-Kumar-Resume.pdf"
            download="Deepak-Kumar-Resume.pdf"
            className="btn-download-resume-pk"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download Resume PDF</span>
          </a>
          <button
            type="button"
            className="btn-modal-dismiss"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
