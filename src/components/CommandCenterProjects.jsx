export default function CommandCenterProjects({ isHighlighted }) {
  const projects = [
    {
      id: "san-brothers",
      title: "San Brothers",
      firm: "Corporate Solutions",
      tech: "Full Stack | MongoDB | React",
      liveUrl: "https://sanbrothers.co.in",
      isLive: true,
      iconType: "globe",
    },
    {
      id: "ai-project",
      title: "AI_PROJECT",
      firm: "Study Accelerator",
      tech: "React | AI | Llama",
      githubUrl: "https://github.com/deepakrai9813",
      isLive: false,
      iconType: "ai",
    },
    {
      id: "leadfinder-ai",
      title: "LeadFinder AI™",
      firm: "Prospect Engine",
      tech: "Next.js | OpenAI",
      githubUrl: "https://github.com/deepakrai9813",
      isLive: false,
      iconType: "radar",
    },
  ];

  return (
    <div className={`cc-panel cc-projects-card ${isHighlighted ? "highlighted" : ""}`}>
      <span className="cc-corner-bracket tl" />
      <span className="cc-corner-bracket tr" />
      <span className="cc-corner-bracket bl" />
      <span className="cc-corner-bracket br" />

      {/* Header */}
      <div className="cc-card-header">
        <span className="cc-card-title">PROJECTS</span>
      </div>

      {/* Project Rows */}
      <div className="cc-projects-list">
        {projects.map((proj) => (
          <div key={proj.id} className="cc-project-row">
            {/* Project Thumbnail Icon */}
            <div className={`cc-project-icon-well ${proj.iconType}`}>
              {proj.iconType === "globe" && (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#60a5fa" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              )}
              {proj.iconType === "ai" && (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#38bdf8" strokeWidth="2">
                  <circle cx="12" cy="12" r="8" />
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <line x1="12" y1="18" x2="12" y2="22" />
                  <circle cx="12" cy="12" r="3" fill="#38bdf8" />
                </svg>
              )}
              {proj.iconType === "radar" && (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#818cf8" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3a9 9 0 0 1 9 9" />
                  <line x1="12" y1="12" x2="18.5" y2="5.5" />
                </svg>
              )}
            </div>

            {/* Info */}
            <div className="cc-project-info">
              <span className="cc-proj-name">{proj.title}</span>
              <span className="cc-proj-firm">{proj.firm}</span>
              <span className="cc-proj-tech">{proj.tech}</span>
            </div>

            {/* Action Badge / Button */}
            <div className="cc-project-action">
              {proj.isLive ? (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cc-btn-live-tag"
                  title="View Live Platform"
                >
                  ● Live
                </a>
              ) : (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cc-btn-github-tag"
                  title="View Source on GitHub"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
