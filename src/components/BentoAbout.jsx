import { PERSONAL_INFO } from "../utils/data";

export default function BentoAbout() {
  const techPills = [
    "React 19",
    "Next.js 15",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Redis Pub/Sub",
    "Docker",
    "Tailwind CSS",
    "WebSockets",
    "REST & GraphQL",
  ];

  return (
    <section id="about" className="section-container-block">
      {/* Section Header */}
      <div className="section-header-lockup">
        <div className="section-tag-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>BACKGROUND & ARCHITECTURE</span>
        </div>
        <h2 className="section-heading-title">Engineering with Precision & Scale</h2>
        <p className="section-subtitle-text">
          Turning complex business workflows into fast, dependable, and maintainable distributed software systems.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="bento-overview-grid">
        {/* Tile 1: Architecture Philosophy (Span 8) */}
        <div className="bento-tile col-span-8">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" />
              <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent-cyan)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Core Philosophy
            </span>
          </div>
          <h3 className="bento-card-title">Distributed, Resilient & Type-Safe Architecture</h3>
          <p className="bento-card-body">
            I architect end-to-end web platforms designed for high concurrency from day one. By uniting modern React/Next.js frontends with event-driven Node.js microservices and distributed Redis pub/sub pipelines, I ensure systems maintain sub-50ms interaction latencies, strict schema contracts, and bulletproof uptime under real-world traffic spikes.
          </p>
          <div className="tech-pills-wrap">
            {techPills.map((pill) => (
              <span key={pill} className="tech-tag-pill">
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent-cyan)", display: "inline-block" }} />
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Tile 2: Location & Work Readiness (Span 4) */}
        <div className="bento-tile col-span-4">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent-emerald)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Location & Availability
            </span>
          </div>
          <h3 className="bento-card-title">Global Remote Readiness</h3>
          <p className="bento-card-body" style={{ marginBottom: "16px" }}>
            Based in {PERSONAL_INFO.location} (IST / UTC+5:30). Experienced in collaborating with distributed engineering teams across North American, European, and APAC time zones.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "8px" }}>
              <span style={{ color: "var(--text-muted)" }}>Response Time</span>
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", fontWeight: "600" }}>&lt; 6 Hours</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "8px" }}>
              <span style={{ color: "var(--text-muted)" }}>Work Preference</span>
              <span style={{ fontWeight: "500" }}>Remote / Full-Time</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-muted)" }}>Communication</span>
              <span style={{ fontWeight: "500" }}>Async-first, GitHub, Slack</span>
            </div>
          </div>
        </div>

        {/* Tile 3: Measurable Production Impact (Span 6) */}
        <div className="bento-tile col-span-6">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-indigo)" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent-indigo)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Track Record
            </span>
          </div>
          <h3 className="bento-card-title">Quantifiable Production Impact</h3>
          <p className="bento-card-body" style={{ marginBottom: "18px" }}>
            Software engineering is about measurable results. In production at San Brothers Corporate Solutions, my system architecture slashed customer onboarding turnarounds by 4.5x and cut database query latencies by 60%.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", background: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "800", color: "var(--accent-cyan)" }}>4.5x</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>Faster Onboarding</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "800", color: "var(--accent-emerald)" }}>60%</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>Latency Slashed</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "800", color: "var(--accent-indigo)" }}>1,450+</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>Git Commits</div>
            </div>
          </div>
        </div>

        {/* Tile 4: Code Quality & Engineering Values (Span 6) */}
        <div className="bento-tile col-span-6">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent-cyan)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Quality & Standards
            </span>
          </div>
          <h3 className="bento-card-title">Zero-Regression Engineering</h3>
          <p className="bento-card-body" style={{ marginBottom: "18px" }}>
            Writing code that survives production is a discipline. I mandate strict TypeScript types from database to UI, containerized reproducibility with Docker, automated CI/CD test gates, and continuous monitoring.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "13px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Automated CI/CD Gates</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Strict Type Contracts</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>ACID Database Integrity</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Zero-Downtime Rollouts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
