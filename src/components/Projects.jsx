import { PROJECTS } from "../utils/data";
import { playClick, playPop } from "../utils/soundFx";

export default function Projects({ onSelectProject }) {
  return (
    <section id="projects" className="framer-section framer-projects-section">
      <div className="framer-container">
        {/* Section Header */}
        <div className="framer-section-header">
          <span className="section-eyebrow">PORTFOLIO</span>
          <h2 className="section-title">Latest projects</h2>
          <p className="section-subtitle">
            Selected works that drove measurable business and engineering impact.
          </p>
        </div>

        {/* Project Case Studies List */}
        <div className="framer-projects-grid">
          {PROJECTS.map((proj) => (
            <article key={proj.id} className="framer-project-card">
              {/* Card Meta & Header */}
              <div className="proj-header-row">
                <div className="proj-pill-group">
                  <span className="proj-pill year-pill">{proj.year}</span>
                  <span className="proj-pill cat-pill">{proj.category}</span>
                  <span className="proj-pill sub-pill">{proj.subCategory}</span>
                </div>
                <div className="proj-role-tag">{proj.role}</div>
              </div>

              {/* Title & Narrative Hook */}
              <div className="proj-content-block">
                <h3 className="proj-title">{proj.title}</h3>
                <p className="proj-summary">{proj.summary}</p>
              </div>

              {/* IMPACT METRICS (Signature Framer Feature) */}
              <div className="proj-impact-container">
                <span className="impact-heading">IMPACT</span>
                <div className="impact-grid">
                  {proj.impact.map((imp) => (
                    <div key={imp.label} className="impact-badge">
                      <span className="impact-metric">{imp.metric}</span>
                      <span className="impact-label">{imp.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Mockup Display Frame */}
              <div
                className="proj-visual-mockup"
                onClick={() => {
                  playPop();
                  onSelectProject(proj);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSelectProject(proj);
                }}
                title="Click to view full case study"
              >
                <div className="mockup-chrome-bar">
                  <div className="chrome-controls">
                    <span className="chrome-dot red" />
                    <span className="chrome-dot yellow" />
                    <span className="chrome-dot green" />
                  </div>
                  <div className="chrome-url-bar">
                    <span>https://{proj.id}.internal.cloud</span>
                  </div>
                  <span className="chrome-badge">PROD</span>
                </div>

                <div className="mockup-inner-screen">
                  <div className="mockup-screen-glow" />
                  <div className="mockup-screen-content">
                    <div className="screen-header-wire">
                      <span className="wire-badge">{proj.category}</span>
                      <span className="wire-title">{proj.title}</span>
                    </div>
                    <div className="screen-stats-wire">
                      <div className="wire-stat-box">
                        <span className="w-val">{proj.impact[0].metric}</span>
                        <span className="w-lbl">{proj.impact[0].label}</span>
                      </div>
                      <div className="wire-stat-box">
                        <span className="w-val">{proj.impact[1].metric}</span>
                        <span className="w-lbl">{proj.impact[1].label}</span>
                      </div>
                      <div className="wire-stat-box highlight">
                        <span className="w-val">{proj.impact[2].metric}</span>
                        <span className="w-lbl">{proj.impact[2].label}</span>
                      </div>
                    </div>
                    <div className="screen-tags-row">
                      {proj.tags.map((t) => (
                        <span key={t} className="screen-tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mockup-hover-cue">
                  <span>View Full Case Study & Architecture →</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="proj-actions-row">
                <button
                  type="button"
                  className="proj-btn-primary"
                  onClick={() => {
                    playPop();
                    onSelectProject(proj);
                  }}
                >
                  <span>Case Study</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </button>

                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-btn-ghost"
                    onClick={playClick}
                  >
                    <span>Live Preview</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                    className="proj-btn-ghost"
                    onClick={playClick}
                  >
                    <span>Repository</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
