import contentData from "../data/content.json";
import { useMachineStore } from "../store/useMachineStore";

export default function SkillsCabins() {
  const { skills } = contentData;
  const { isOvercharged } = useMachineStore();

  const domainConfigs = [
    {
      key: "frontend",
      title: "FRONTEND LAB",
      sector: "BAY 01",
      bot: "PIXEL",
      botColor: "#3ee8ff",
      role: "Client Architecture & Shaders",
      conduit: "CYAN DATA BUS",
      items: skills.frontend,
    },
    {
      key: "backend",
      title: "API GATEWAY",
      sector: "BAY 02",
      bot: "ROOT",
      botColor: "#f6b93b",
      role: "Distributed Microservices & Streams",
      conduit: "GOLD POWER TRUNK",
      items: skills.backend,
    },
    {
      key: "data",
      title: "DATABASE VAULT",
      sector: "BAY 03",
      bot: "QUERY",
      botColor: "#a6f4ff",
      role: "Sharding, Vector & ACID Stores",
      conduit: "CYAN DATA BUS",
      items: skills.data,
    },
    {
      key: "cloud",
      title: "DEVOPS DECK",
      sector: "BAY 04",
      bot: "KUBO",
      botColor: "#d98a2b",
      role: "Containers, CI/CD & Linux Kernel",
      conduit: "RED TELEMETRY LINE",
      items: skills.cloud,
    },
  ];

  return (
    <section id="skills" className="cabin-section skills-workshop" aria-label="Skills & Core Technologies">
      <div className="cabin-frame">
        {/* Section Header */}
        <div className="cabin-hud-header">
          <div className="hud-badge">
            <span className="hud-dot active" />
            <span className="hud-mono">SECTOR 02 // REACTOR CORE LAB &amp; SUBSYSTEMS</span>
          </div>
          <div className="hud-status-strip">
            <span className="hud-chip">4 CONDUIT BAYS</span>
            <span className="hud-chip highlight">POWER DISTRIBUTED</span>
          </div>
        </div>

        <div className="section-intro-text">
          <h2 className="section-heading">ENGINEERING SUBSYSTEMS &amp; STACK</h2>
          <p className="section-subheading">
            Each specialized engineering bay is continuously powered by the central Arc Reactor. Bot specialists oversee automated compilation, routing, sharding, and container orchestration.
          </p>
        </div>

        {/* 4 Specialized Sub-Cabins Grid */}
        <div className="skills-bays-grid">
          {domainConfigs.map((bay) => (
            <div key={bay.key} className="sub-cabin-card">
              {/* Pipeline Conduit Port */}
              <div className="conduit-socket">
                <span className="socket-ring" />
                <span className="socket-label">{bay.conduit}</span>
              </div>

              {/* Bay Header */}
              <div className="bay-header">
                <div>
                  <span className="bay-sector">{bay.sector}</span>
                  <h3 className="bay-title">{bay.title}</h3>
                </div>

                {/* Assigned Bot Badge */}
                <div className="assigned-bot-pill" style={{ borderColor: bay.botColor }}>
                  <span className="bot-led" style={{ backgroundColor: bay.botColor }} />
                  <span className="bot-name-text">TECH: {bay.bot}</span>
                </div>
              </div>

              <p className="bay-role">{bay.role}</p>

              {/* Skills List */}
              <div className="bay-skills-list">
                {bay.items.map((skill, index) => (
                  <div key={index} className="skill-meter-row">
                    <div className="meter-label-row">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="meter-track">
                      <div
                        className={`meter-bar ${isOvercharged ? "overcharge-glow" : ""}`}
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: bay.botColor,
                        }}
                      />
                    </div>
                    <span className="skill-desc">{skill.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
