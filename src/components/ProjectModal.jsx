import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  CheckCircle,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
} from "./icons";

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="proj-modal-overlay" onClick={onClose}>
          <motion.div
            className="proj-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="proj-modal__head">
              <div className="proj-modal__eyebrow">
                <span className="idx">●</span> {project.category || "Case Study"}
                {project.status && (
                  <span className="proj-modal__status">{project.status}</span>
                )}
              </div>
              <button
                className="proj-modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X width={18} height={18} />
              </button>
            </div>

            <div className="proj-modal__body">
              <h2 className="proj-modal__title">{project.title}</h2>
              <p className="proj-modal__lead">{project.desc}</p>

              {/* Metrics Grid */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="proj-modal__metrics">
                  {project.metrics.map((m) => (
                    <div className="proj-metric-card" key={m.label}>
                      <span className="proj-metric-val">{m.value}</span>
                      <span className="proj-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Architecture & Decisions */}
              {project.deepDive && (
                <div className="proj-modal__section">
                  <h3>
                    <Layers width={18} height={18} /> Architecture &amp; Key Decisions
                  </h3>
                  <div className="proj-deep-content">
                    {project.deepDive.problem && (
                      <div className="proj-callout">
                        <strong>The Challenge:</strong>
                        <p>{project.deepDive.problem}</p>
                      </div>
                    )}
                    {project.deepDive.solution && (
                      <div className="proj-callout proj-callout--solution">
                        <strong>The Solution:</strong>
                        <p>{project.deepDive.solution}</p>
                      </div>
                    )}
                    {project.deepDive.highlights && (
                      <ul className="proj-highlights">
                        {project.deepDive.highlights.map((h, idx) => (
                          <li key={idx}>
                            <CheckCircle width={16} height={16} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="proj-modal__section">
                <h3>
                  <Cpu width={18} height={18} /> Technologies &amp; Tooling
                </h3>
                <div className="proj-modal__tags">
                  {project.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="proj-modal__footer">
              <div className="proj-modal__links">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    Open Live Project <ExternalLink width={16} height={16} />
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost"
                  >
                    <Github width={16} height={16} /> View Source on GitHub
                  </a>
                )}
              </div>
              <button className="btn btn-ghost" onClick={onClose}>
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
