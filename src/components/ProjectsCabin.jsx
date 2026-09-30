import { useState } from "react";
import contentData from "../data/content.json";
import { useMachineStore } from "../store/useMachineStore";
import { playServoClick } from "../utils/audioSystem";

export default function ProjectsCabin() {
  const { projects } = contentData;
  const { isOvercharged, soundEnabled } = useMachineStore();
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id);

  const handleSelect = (id) => {
    if (soundEnabled) playServoClick(true);
    setActiveProjectId(id);
  };

  return (
    <section id="projects" className="cabin-section projects-cabin" aria-label="Featured Engineering Projects">
      <div className="cabin-frame">
        {/* Section HUD Header */}
        <div className="cabin-hud-header">
          <div className="hud-badge">
            <span className="hud-dot active" />
            <span className="hud-mono">SECTOR 03 // DEPLOYMENT BAY &amp; PRODUCTION FLEET</span>
          </div>
          <div className="hud-status-strip">
            <span className="hud-chip">4 PRODUCTION ENGINES</span>
            <span className="hud-chip highlight">METRICS VERIFIED</span>
          </div>
        </div>

        <div className="section-intro-text">
          <h2 className="section-heading">PRODUCTION ARCHITECTURE &amp; SYSTEMS</h2>
          <p className="section-subheading">
            Live web platforms, distributed WebSocket clusters, and autonomous AI pipelines engineered for enterprise scale, zero downtime, and quantified speed gains.
          </p>
        </div>

        {/* Modular Projects Fleet Grid */}
        <div className="projects-fleet-grid">
          {projects.map((proj) => {
            const isSelected = activeProjectId === proj.id;
            return (
              <article
                key={proj.id}
                className={`project-bay-module ${isSelected ? "selected" : ""} ${isOvercharged ? "overcharge-glow" : ""}`}
                onClick={() => handleSelect(proj.id)}
              >
                {/* Conduit Input Header */}
                <div className="module-conduit-bar">
                  <div className="socket-indicator">
                    <span className="socket-dot" />
                    <span className="socket-packet-name">BUS: {proj.packetType}</span>
                  </div>
                  <div className="assigned-unit">
                    <span>UNIT: {proj.assignedBot}</span>
                  </div>
                </div>

                <div className="module-body">
                  <div className="project-title-row">
                    <h3 className="project-title">{proj.name}</h3>
                    <span className="project-status-tag">{proj.status}</span>
                  </div>

                  <p className="project-summary">{proj.summary}</p>

                  {/* Problem & Solution Callout */}
                  <div className="engineering-problem-box">
                    <span className="problem-label">CHALLENGE &amp; RESOLUTION:</span>
                    <p className="problem-text">{proj.problem}</p>
                  </div>

                  {/* Impact Metrics Banner */}
                  <div className="project-metrics-strip">
                    <div className="metric-pill primary">
                      <span className="metric-kpi">{proj.resultMetric}</span>
                      <span className="metric-lbl">PRIMARY GAIN</span>
                    </div>
                    {proj.secondaryMetric && (
                      <div className="metric-pill secondary">
                        <span className="metric-kpi">{proj.secondaryMetric}</span>
                        <span className="metric-lbl">SECONDARY GAIN</span>
                      </div>
                    )}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="project-stack-wrap">
                    {proj.stack.map((tech, idx) => (
                      <span key={idx} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* External Links Bar */}
                  <div className="project-links-row">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-ext-btn live"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>LIVE DEPLOYMENT</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}

                    {proj.repoUrl && (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-ext-btn repo"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>SOURCE CODE</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
