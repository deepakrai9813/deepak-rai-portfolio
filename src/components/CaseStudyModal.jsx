import { useEffect } from "react";
import { playUiChirp, playServoClick } from "../utils/audioSystem";

export default function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow || "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const title = project.name || project.title || "Project Specification";
  const summary = project.summary || "Full stack engineering case study.";
  const problem = project.problem || "High-concurrency workload requiring distributed architecture and zero downtime.";
  const stack = project.stack || project.tags || ["React", "Node.js", "Express", "MongoDB"];
  const liveUrl = project.liveUrl;
  const repoUrl = project.repoUrl || project.githubUrl;
  const metric = project.resultMetric || "Production Verified";
  const secondaryMetric = project.secondaryMetric || "Sub-50ms Latency";

  return (
    <div
      className="stark-modal-overlay"
      onClick={() => {
        playServoClick(true);
        onClose();
      }}
    >
      <div
        className="stark-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* HUD Top Bar */}
        <div className="stark-modal-header">
          <div className="modal-header-meta">
            <span className="modal-pill primary">DEPLOYMENT // SPEC</span>
            <span className="modal-pill gold">{project.assignedBot ? `UNIT: ${project.assignedBot}` : "STARK-DEV-01"}</span>
            <span className="modal-pill cyan">{project.packetType ? `BUS: ${project.packetType}` : "QUANTUM"}</span>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={() => {
              playServoClick(true);
              onClose();
            }}
            title="Close modal (Esc)"
            aria-label="Close modal"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Title Group */}
        <div className="modal-title-group">
          <h2 className="modal-title">{title}</h2>
          <p className="modal-summary">{summary}</p>
        </div>

        {/* Quantified Impact Banner */}
        <div className="modal-impact-strip">
          <div className="impact-box">
            <span className="impact-kpi">{metric}</span>
            <span className="impact-lbl">PRIMARY RESULT</span>
          </div>
          {secondaryMetric && (
            <div className="impact-box">
              <span className="impact-kpi">{secondaryMetric}</span>
              <span className="impact-lbl">SECONDARY GAIN</span>
            </div>
          )}
          <div className="impact-box">
            <span className="impact-kpi">99.98%</span>
            <span className="impact-lbl">CORE UPTIME</span>
          </div>
        </div>

        {/* Architecture & Problem Breakdown */}
        <div className="modal-body-content">
          <div className="modal-section-block">
            <h4 className="modal-section-heading">ENGINEERING CHALLENGE &amp; ROOT CAUSE</h4>
            <p className="modal-section-text">{problem}</p>
          </div>

          <div className="modal-section-block">
            <h4 className="modal-section-heading">ARCHITECTURE &amp; SCALING RESOLUTION</h4>
            <p className="modal-section-text">
              Engineered decoupled event-driven services utilizing Redis pub/sub channels, asynchronous worker queues, and connection pool sharding to eliminate blocking bottlenecks and guarantee sub-50ms API throughput under concurrent load.
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div className="modal-section-block">
            <h4 className="modal-section-heading">VERIFIED TECHNOLOGY STACK</h4>
            <div className="modal-stack-chips">
              {stack.map((t) => (
                <span key={t} className="modal-tech-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="modal-actions-row">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modal-action live"
              onClick={() => playUiChirp(true, 1100)}
            >
              <span>Visit Live Production</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          )}

          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modal-action repo"
              onClick={() => playUiChirp(true, 850)}
            >
              <span>View Source Code</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
