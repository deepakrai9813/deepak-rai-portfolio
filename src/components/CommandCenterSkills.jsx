export default function CommandCenterSkills({ isHighlighted }) {
  const skills = [
    {
      id: "react",
      name: "React",
      iconColor: "#61dafb",
      bgColor: "rgba(97, 218, 251, 0.12)",
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill="#61dafb" />
        </svg>
      ),
    },
    {
      id: "nodejs",
      name: "Node.js",
      iconColor: "#68a063",
      bgColor: "rgba(104, 160, 99, 0.12)",
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#68a063">
          <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2zm0 2.3L5.5 8.1v7.8L12 19.7l6.5-3.8V8.1L12 4.3z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      ),
    },
    {
      id: "express",
      name: "Express",
      iconColor: "#f1f5f9",
      bgColor: "rgba(255, 255, 255, 0.08)",
      svg: (
        <span style={{ fontSize: "14px", fontWeight: "800", fontFamily: "var(--font-mono)", color: "#f8fafc" }}>
          ex
        </span>
      ),
    },
    {
      id: "mongodb",
      name: "MongoDB",
      iconColor: "#47a248",
      bgColor: "rgba(71, 162, 72, 0.12)",
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#47a248">
          <path d="M12 1.5C12 1.5 6 8.5 6 14.5C6 18.5 8.8 21.5 12 22.5C15.2 21.5 18 18.5 18 14.5C18 8.5 12 1.5 12 1.5ZM12 20.8C10.5 19.8 8.2 17.5 8.2 14.5C8.2 10.2 11.5 5.2 12 4.2C12.5 5.2 15.8 10.2 15.8 14.5C15.8 17.5 13.5 19.8 12 20.8Z" />
        </svg>
      ),
    },
    {
      id: "html",
      name: "HTML",
      iconColor: "#e34f26",
      bgColor: "rgba(227, 79, 38, 0.12)",
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#e34f26">
          <path d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3zm14.8 5.4H8.7l.2 2.3h8.7l-.6 6.8-4.8 1.4-4.8-1.4-.3-3.4H9.5l.2 1.6 2.3.7 2.3-.7.3-3.1H6.6L6 5h12.1l-.3 2.4z" />
        </svg>
      ),
    },
    {
      id: "css",
      name: "CSS",
      iconColor: "#1572b6",
      bgColor: "rgba(21, 114, 182, 0.12)",
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#1572b6">
          <path d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3zm14.8 5.4H8.7l.2 2.3h8.7l-.6 6.8-4.8 1.4-4.8-1.4-.3-3.4H9.5l.2 1.6 2.3.7 2.3-.7.3-3.1H6.6L6 5h12.1l-.3 2.4z" />
        </svg>
      ),
    },
    {
      id: "javascript",
      name: "JavaScript",
      iconColor: "#f7df1e",
      bgColor: "rgba(247, 223, 30, 0.12)",
      svg: (
        <span style={{ fontSize: "12px", fontWeight: "900", fontFamily: "var(--font-mono)", color: "#f7df1e" }}>
          JS
        </span>
      ),
    },
    {
      id: "git",
      name: "Git & GitHub",
      iconColor: "#ffffff",
      bgColor: "rgba(255, 255, 255, 0.08)",
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`cc-panel cc-skills-card ${isHighlighted ? "highlighted" : ""}`}>
      <span className="cc-corner-bracket tl" />
      <span className="cc-corner-bracket tr" />
      <span className="cc-corner-bracket bl" />
      <span className="cc-corner-bracket br" />

      {/* Card Header */}
      <div className="cc-card-header">
        <span className="cc-card-title">SKILLS</span>
      </div>

      {/* 8-Skill Grid (2x4) */}
      <div className="cc-skills-grid">
        {skills.map((skill) => (
          <div key={skill.id} className="cc-skill-item" title={skill.name}>
            <div
              className="cc-skill-icon-well"
              style={{ backgroundColor: skill.bgColor }}
            >
              {skill.svg}
            </div>
            <span className="cc-skill-label">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
