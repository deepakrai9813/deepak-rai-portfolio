import { Sun, Moon } from "./icons";

export default function CommandCenterNav({
  theme,
  toggleTheme,
  activeSection,
  onNavigate,
}) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="cc-navbar">
      {/* Left: Brand Identity */}
      <div className="cc-nav-brand">
        <span className="cc-brand-badge">DK</span>
        <div className="cc-brand-text">
          <span className="cc-brand-name">Deepak Kumar</span>
          <span className="cc-brand-title">Full Stack Developer</span>
        </div>
      </div>

      {/* Center: Navigation Links */}
      <nav className="cc-nav-links" aria-label="Main Navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`cc-nav-link ${activeSection === item.id ? "active" : ""}`}
            onClick={() => onNavigate?.(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right: Theme Toggle & Spider-Man Top Corner Web */}
      <div className="cc-nav-controls">
        <button
          type="button"
          className="cc-theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          aria-label="Toggle Theme"
        >
          <span className="cc-toggle-track">
            <span className={`cc-toggle-thumb ${theme === "dark" ? "dark" : "light"}`}>
              {theme === "dark" ? <Moon width={11} height={11} /> : <Sun width={11} height={11} />}
            </span>
          </span>
        </button>

        {/* Top-Right Spider-Man Corner Web with Emblem */}
        <div className="cc-top-spider-corner" title="Spider-Tech Protocol">
          <svg viewBox="0 0 100 100" className="cc-web-svg">
            <line x1="100" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
            <line x1="100" y1="0" x2="20" y2="70" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
            <line x1="100" y1="0" x2="60" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
            <path d="M 60 0 Q 75 25 100 40" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
            <path d="M 30 0 Q 55 50 100 70" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
          </svg>
          <div className="cc-mini-spider-mask" />
        </div>
      </div>
    </header>
  );
}
