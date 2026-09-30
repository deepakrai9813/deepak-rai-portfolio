import { useEffect } from "react";

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

  const title = project.title || project.name || "Technical Case Study";
  const category = project.category || "Full Stack Engineering";
  const summary = project.summary || "End-to-end production architecture breakdown.";
  const caseStudy = project.caseStudy || {};
  const problem = caseStudy.problem || project.problem || "High-concurrency workload requiring distributed architecture and zero downtime.";
  const solution = caseStudy.solution || "Architected decoupled event-driven services utilizing Redis pub/sub channels, asynchronous worker queues, and connection pool sharding.";
  const architecture = caseStudy.architecture || [
    "Frontend: React 19 SPA with optimistic UI updates and Tailwind CSS design tokens",
    "Backend: RESTful microservices with Node.js & Express with JWT security",
    "Database: Sharded MongoDB with aggregation pipelines + Redis caching",
    "DevOps: Automated CI/CD pipeline deployed on cloud infrastructure",
  ];
  const tags = project.tags || project.stack || ["React", "Node.js", "Express", "MongoDB"];
  const liveUrl = project.liveUrl;
  const githubUrl = project.githubUrl || project.repoUrl;
  const impact = project.impact || [
    { metric: project.resultMetric || "4.5x", label: "Primary Result" },
    { metric: project.secondaryMetric || "60%", label: "Latency Slashed" },
  ];

  return (
    <div className="case-study-backdrop" onClick={onClose}>
      <div
        className="case-study-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Header Row */}
        <div className="modal-header-row">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="project-status-badge live">
              <span className="status-pulse-dot" style={{ width: "5px", height: "5px" }} />
              <span>{category}</span>
            </span>
            {caseStudy.timeline && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>
                Timeline: {caseStudy.timeline}
              </span>
            )}
          </div>

          <button
            type="button"
            className="btn-close-modal"
            onClick={onClose}
            aria-label="Close modal (Esc)"
            title="Close (Esc)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Title & Summary */}
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          {title}
        </h2>
        <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "24px" }}>
          {summary}
        </p>

        {/* Quantified Impact Banner */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${impact.length}, 1fr)`, gap: "12px", background: "rgba(255, 255, 255, 0.03)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", marginBottom: "28px" }}>
          {impact.map((imp, idx) => (
            <div key={idx}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "800", color: "var(--accent-cyan)" }}>
                {imp.metric}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                {imp.label}
              </div>
            </div>
          ))}
        </div>

        {/* Problem Statement */}
        <div style={{ marginBottom: "24px" }}>
          <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent-cyan)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
            The Engineering Challenge
          </h4>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
            {problem}
          </p>
        </div>

        {/* Solution */}
        <div style={{ marginBottom: "24px" }}>
          <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent-emerald)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
            Architectural Resolution
          </h4>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
            {solution}
          </p>
        </div>

        {/* Architecture Components */}
        <div style={{ marginBottom: "24px" }}>
          <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent-indigo)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
            Key Architecture Modules
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
            {architecture.map((item, idx) => (
              <li key={idx} style={{ position: "relative", paddingLeft: "18px", fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                <span style={{ position: "absolute", left: 0, color: "var(--accent-cyan)" }}>&rarr;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div style={{ marginBottom: "28px" }}>
          <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>
            Technologies Deployed
          </h4>
          <div className="tech-pills-wrap">
            {tags.map((t) => (
              <span key={t} className="tech-tag-pill">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "20px", borderTop: "1px solid var(--border-subtle)" }}>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-action"
              style={{ fontSize: "13px", padding: "10px 20px" }}
            >
              <span>Visit Live Production</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-action"
              style={{ fontSize: "13px", padding: "10px 20px" }}
            >
              <span>Source Repository</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
