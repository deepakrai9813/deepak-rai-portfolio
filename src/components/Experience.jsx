import { EXPERIENCE_TIMELINE } from "../utils/data";

export default function Experience() {
  return (
    <section id="experience" className="section-container-block">
      {/* Section Header */}
      <div className="section-header-lockup">
        <div className="section-tag-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          <span>CAREER TIMELINE</span>
        </div>
        <h2 className="section-heading-title">Engineering Journey</h2>
        <p className="section-subtitle-text">
          Proven history of building mission-critical software, enterprise portals, and high-concurrency systems.
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="timeline-card-stream">
        {EXPERIENCE_TIMELINE.map((item) => (
          <div key={item.id} className="timeline-role-item">
            <div className="timeline-item-header">
              <div className="role-title-box">
                <h3>{item.role}</h3>
                <div className="role-company-line">
                  {item.company} &bull; {item.location} ({item.type})
                </div>
              </div>
              <div className="role-period-badge">{item.period}</div>
            </div>

            <p style={{ fontSize: "14.5px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.6" }}>
              {item.description}
            </p>

            <ul className="role-bullet-points">
              {item.highlights.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>

            <div className="tech-pills-wrap" style={{ marginTop: "20px" }}>
              {item.skills.map((s) => (
                <span key={s} className="tech-tag-pill" style={{ fontSize: "11.5px" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
