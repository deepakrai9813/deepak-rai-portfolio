import contentData from "../data/content.json";
import { useMachineStore } from "../store/useMachineStore";

export default function ExperienceCabin() {
  const { experience } = contentData;
  const { isOvercharged } = useMachineStore();

  return (
    <section id="experience" className="cabin-section experience-cabin" aria-label="Work Experience & Mission Logs">
      <div className="cabin-frame">
        {/* Section HUD Header */}
        <div className="cabin-hud-header">
          <div className="hud-badge">
            <span className="hud-dot active" />
            <span className="hud-mono">SECTOR 04 // FLIGHT LOGS &amp; MISSION CHRONOLOGY</span>
          </div>
          <div className="hud-status-strip">
            <span className="hud-chip">3 MILESTONES</span>
            <span className="hud-chip highlight">MISSION RECORD</span>
          </div>
        </div>

        <div className="section-intro-text">
          <h2 className="section-heading">FLIGHT LOGS &amp; CAREER TIMELINE</h2>
          <p className="section-subheading">
            Chronological record of enterprise deployments, high-concurrency microservice scaling, and independent software consulting engagements.
          </p>
        </div>

        {/* High-Tech Conduit Timeline */}
        <div className="experience-conduit-timeline">
          {experience.map((item, idx) => (
            <div key={idx} className="timeline-node-card">
              {/* Left Column: Period & Station */}
              <div className="timeline-node-meta">
                <span className="node-period-badge">{item.period}</span>
                <span className="node-cabin-tag">CABIN: {item.cabin}</span>
                <div className="node-bot-signoff">
                  <span className="signoff-dot" />
                  <span className="signoff-text">AUDITED: {item.assignedBot}</span>
                </div>
              </div>

              {/* Node Center Junction Marker */}
              <div className="timeline-junction-point">
                <span className={`junction-core ${isOvercharged ? "overcharge-glow" : ""}`} />
                <span className="junction-line" />
              </div>

              {/* Right Column: Mission Content */}
              <div className="timeline-node-body">
                <div className="role-company-row">
                  <h3 className="role-title">{item.role}</h3>
                  <span className="company-name">{item.company}</span>
                  <span className="location-badge">{item.location}</span>
                </div>

                <ul className="bullet-points-list">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="bullet-item">
                      <svg className="bullet-chevron" viewBox="0 0 16 16" width="12" height="12">
                        <polyline points="4,2 10,8 4,14" fill="none" stroke="#3ee8ff" strokeWidth="2" />
                      </svg>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
