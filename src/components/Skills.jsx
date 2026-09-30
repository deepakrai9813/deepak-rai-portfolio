import contentData from "../data/content.json";

export default function Skills() {
  const categories = [
    {
      title: "Frontend Architecture",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      skills: contentData.skills.frontend,
    },
    {
      title: "Backend & Microservices",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      ),
      skills: contentData.skills.backend,
    },
    {
      title: "Databases & Caching",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
      skills: contentData.skills.data,
    },
    {
      title: "Cloud & DevOps",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      ),
      skills: contentData.skills.cloud,
    },
  ];

  return (
    <section id="skills" className="section-container-block">
      {/* Section Header */}
      <div className="section-header-lockup">
        <div className="section-tag-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span>TECHNICAL ARSENAL</span>
        </div>
        <h2 className="section-heading-title">Core Competencies & Stack</h2>
        <p className="section-subtitle-text">
          Deep expertise across modern client interfaces, distributed runtime backends, distributed data stores, and cloud infrastructure.
        </p>
      </div>

      {/* 4-Column Grid */}
      <div className="skills-matrix-deck">
        {categories.map((cat) => (
          <div key={cat.title} className="skills-category-card">
            <h3 className="skill-category-title">
              {cat.icon}
              <span>{cat.title}</span>
            </h3>

            <div className="skill-items-list">
              {cat.skills.map((s) => (
                <div key={s.name} className="skill-entry-row">
                  <div className="skill-name-bar">
                    <span className="skill-label-txt">{s.name}</span>
                    <span className="skill-metric-pct">{s.level}%</span>
                  </div>
                  <div className="skill-progress-track">
                    <div
                      className="skill-progress-fill"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "1px" }}>
                    {s.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
