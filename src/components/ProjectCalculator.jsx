import { useState } from "react";

export default function ProjectCalculator() {
  const [projectType, setProjectType] = useState("fullstack");
  const [speed, setSpeed] = useState("sprint");

  const projectTypes = [
    {
      id: "fullstack",
      title: "Full-Stack Web App",
      desc: "Interactive React/Next.js frontend + robust Node.js microservices",
      recStack: ["React 19 / Next.js 15", "Node.js & Express", "MongoDB / PostgreSQL", "Tailwind CSS"],
      timeline: "2 to 4 Weeks",
      sla: "< 25ms Interaction Latency",
    },
    {
      id: "backend",
      title: "High-Concurrency Backend",
      desc: "Sub-50ms WebSocket clusters, event-driven Redis pub/sub pipelines",
      recStack: ["Node.js Cluster", "Redis Pub/Sub", "WebSockets", "Docker", "AWS/Cloud"],
      timeline: "3 to 6 Weeks",
      sla: "50k+ Concurrent Conns",
    },
    {
      id: "ai-agent",
      title: "AI Agent Automation",
      desc: "Autonomous LLM reasoning chains, vector search & data workflows",
      recStack: ["FastAPI / Python", "LangChain", "OpenAI / Claude API", "pgvector", "Next.js"],
      timeline: "2 to 3 Weeks",
      sla: "10x Operational Velocity",
    },
    {
      id: "modernization",
      title: "System Modernization",
      desc: "Database sharding, query latency slashing & CI/CD automation",
      recStack: ["Database Indexing", "Redis Cache Layer", "GitHub Actions CI/CD", "TypeScript"],
      timeline: "1 to 3 Weeks",
      sla: "60% Query Latency Cut",
    },
  ];

  const speedOptions = [
    { id: "sprint", label: "Fast Sprint (High Velocity)", tag: "Agile" },
    { id: "standard", label: "Standard Production Phase", tag: "Milestones" },
    { id: "lead", label: "Ongoing Senior / Lead Role", tag: "Full-Time" },
  ];

  const selected = projectTypes.find((p) => p.id === projectType) || projectTypes[0];

  const handleStartProject = () => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
      const subjectInput = document.getElementById("subject");
      if (subjectInput) {
        subjectInput.value = `Collaboration Inquiry: ${selected.title} (${speed.toUpperCase()})`;
      }
    }
  };

  return (
    <div className="project-calculator-card">
      <div className="calc-header-row">
        <div>
          <span className="calc-tag-badge">INTERACTIVE SCOPE ESTIMATOR</span>
          <h3 className="calc-heading">Collaborate with Deepak</h3>
          <p className="calc-desc">
            Select your technical requirements to generate an instant architectural blueprint and recommended stack:
          </p>
        </div>

        <div className="calc-badge-live">
          <span className="live-ping" />
          <span>AUTONOMOUS OWNERSHIP</span>
        </div>
      </div>

      {/* Selector Grid */}
      <div className="calc-inputs-grid">
        {/* Step 1: Project Type */}
        <div>
          <label className="calc-field-lbl">1. SELECT ARCHITECTURE FOCUS</label>
          <div className="calc-pill-options">
            {projectTypes.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`calc-type-btn ${projectType === t.id ? "active" : ""}`}
                onClick={() => setProjectType(t.id)}
              >
                <span className="calc-type-title">{t.title}</span>
                <span className="calc-type-desc">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Velocity & Role */}
        <div>
          <label className="calc-field-lbl">2. DESIRED ENGAGEMENT MODEL</label>
          <div className="calc-speed-options">
            {speedOptions.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`calc-speed-btn ${speed === s.id ? "active" : ""}`}
                onClick={() => setSpeed(s.id)}
              >
                <span className="speed-dot" />
                <span className="speed-title">{s.label}</span>
                <span className="speed-tag">{s.tag}</span>
              </button>
            ))}
          </div>

          {/* Blueprint Result Output */}
          <div className="calc-result-box">
            <div className="result-top-meta">
              <span className="result-lbl">RECOMMENDED ARCHITECTURE BLUEPRINT</span>
              <span className="result-sla-chip">{selected.sla}</span>
            </div>

            <h4 className="result-title">{selected.title}</h4>
            <div className="result-stack-pills">
              {selected.recStack.map((tech) => (
                <span key={tech} className="result-tech-pill">
                  {tech}
                </span>
              ))}
            </div>

            <div className="result-footer-row">
              <div className="result-time-info">
                <span className="time-lbl">Estimated Delivery</span>
                <span className="time-val">{selected.timeline}</span>
              </div>

              <button
                type="button"
                className="btn-calc-action"
                onClick={handleStartProject}
              >
                <span>Initiate Discussion &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
