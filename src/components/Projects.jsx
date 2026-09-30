import { PROJECTS } from "../utils/data";

export default function Projects({ onSelectProject }) {
  return (
    <section id="projects" className="section-container-block">
      {/* Section Header */}
      <div className="section-header-lockup">
        <div className="section-tag-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <span>FEATURED WORK</span>
        </div>
        <h2 className="section-heading-title">Production Case Studies</h2>
        <p className="section-subtitle-text">
          Enterprise web applications, distributed real-time engines, and AI automation tools engineered for scale.
        </p>
      </div>

      {/* Projects 2-Column Grid */}
      <div className="projects-deck-grid">
        {PROJECTS.map((proj) => {
          const isLive = proj.id === "san-brothers";
          const isAI = proj.id === "leadfinder-ai";

          return (
            <article key={proj.id} className="project-showcase-card">
              <div>
                {/* Top Meta Row */}
                <div className="project-top-meta">
                  <div className="project-status-badge live">
                    <span className="status-pulse-dot" style={{ width: "5px", height: "5px" }} />
                    <span>{isLive ? "Production Live" : isAI ? "Deployed AI Platform" : "Open Architecture"}</span>
                  </div>
                  <div className="project-kpi-chip">{proj.category}</div>
                </div>

                {/* Heading & Summary */}
                <h3 className="project-card-heading">{proj.title}</h3>
                <p className="project-card-summary">{proj.summary}</p>

                {/* Quantified Impact Box */}
                <div className="project-impact-box">
                  <span className="impact-label">Key Engineering Result</span>
                  <div className="impact-metric-text" style={{ color: "var(--accent-cyan)" }}>
                    {proj.impact[0].metric} {proj.impact[0].label}
                    <span style={{ fontSize: "13px", color: "var(--text-muted)", marginLeft: "8px", fontWeight: "400" }}>
                      ({proj.impact[1].metric} {proj.impact[1].label})
                    </span>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="tech-pills-wrap" style={{ marginBottom: "24px" }}>
                  {proj.tags.map((t) => (
                    <span key={t} className="tech-tag-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="project-card-footer">
                <div className="project-card-links">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-card-link"
                      title={`Visit ${proj.title} live`}
                    >
                      <span>Live Site</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  )}

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-card-link"
                      title={`View ${proj.title} source code`}
                    >
                      <span>GitHub</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  className="btn-case-study"
                  onClick={() => onSelectProject(proj)}
                >
                  <span>Case Study &rarr;</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
