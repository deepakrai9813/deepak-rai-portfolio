import { useEffect } from "react";
import { playClick, playPop } from "../utils/soundFx";

export default function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!project) return null;
  const cs = project.caseStudy || {};

  return (
    <div
      className="cs-modal-overlay"
      onClick={() => {
        playClick();
        onClose();
      }}
    >
      <div
        className="cs-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="cs-modal-header">
          <div className="cs-header-meta">
            <span className="cs-pill">{project.year}</span>
            <span className="cs-pill">{project.category}</span>
            <span className="cs-pill">{project.subCategory}</span>
          </div>

          <button
            type="button"
            className="cs-close-btn"
            onClick={() => {
              playClick();
              onClose();
            }}
            title="Close modal (Esc)"
          >
            ✕
          </button>
        </div>

        <div className="cs-title-group">
          <h2 className="cs-title">{project.title}</h2>
          <p className="cs-summary">{project.summary}</p>
        </div>

        {/* Impact Bar */}
        <div className="cs-impact-bar">
          {project.impact.map((imp) => (
            <div key={imp.label} className="cs-impact-box">
              <span className="cs-metric-num">{imp.metric}</span>
              <span className="cs-metric-label">{imp.label}</span>
            </div>
          ))}
        </div>

        {/* Case Study Deep Dive Body */}
        <div className="cs-body-content">
          <div className="cs-section-block">
            <h4 className="cs-heading">PROJECT OVERVIEW</h4>
            <p className="cs-text">{cs.overview}</p>
          </div>

          <div className="cs-two-col">
            <div className="cs-section-block">
              <h4 className="cs-heading problem-title">THE CHALLENGE</h4>
              <p className="cs-text">{cs.problem}</p>
            </div>

            <div className="cs-section-block">
              <h4 className="cs-heading solution-title">THE ENGINEERING SOLUTION</h4>
              <p className="cs-text">{cs.solution}</p>
            </div>
          </div>

          {cs.architecture && (
            <div className="cs-section-block">
              <h4 className="cs-heading">TECHNICAL ARCHITECTURE</h4>
              <ul className="cs-list">
                {cs.architecture.map((item, idx) => (
                  <li key={idx}>
                    <span className="cs-bullet">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cs.deliverables && (
            <div className="cs-section-block">
              <h4 className="cs-heading">KEY DELIVERABLES</h4>
              <ul className="cs-list">
                {cs.deliverables.map((item, idx) => (
                  <li key={idx}>
                    <span className="cs-bullet">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="cs-section-block">
            <h4 className="cs-heading">TECHNOLOGY STACK</h4>
            <div className="cs-tags-row">
              {project.tags.map((t) => (
                <span key={t} className="cs-tech-chip">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="cs-modal-footer">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-primary-action"
              onClick={playPop}
            >
              <span>Visit Live Application</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-secondary-action"
              onClick={playClick}
            >
              <span>View Source Code</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
