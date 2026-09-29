import { useState, useEffect } from "react";
import { playClick, playPop, toggleSound, isSoundEnabled } from "../utils/soundFx";

export default function Navbar({
  theme,
  toggleTheme,
  activeSection,
  onNavigate,
  onOpenCmd,
}) {
  const [soundOn, setSoundOn] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "side-quests", label: "Side Quests" },
    { id: "visuals", label: "Visuals" },
    { id: "experience", label: "Experience" },
    { id: "tools", label: "Tools" },
    { id: "about", label: "About" },
  ];

  return (
    <div className={`framer-nav-container ${scrolled ? "nav-scrolled" : ""}`}>
      <nav className="framer-nav-pill" aria-label="Main Navigation">
        {/* Brand / Logo */}
        <button
          type="button"
          className="framer-nav-brand"
          onClick={() => {
            playPop();
            onNavigate("home");
          }}
          title="Deepak Kumar - Home"
        >
          <span className="brand-dot" />
          <span className="brand-text">DK</span>
        </button>

        {/* Navigation Links */}
        <div className="framer-nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`framer-nav-link ${activeSection === item.id ? "active" : ""}`}
              onClick={() => {
                playClick();
                onNavigate(item.id);
              }}
            >
              {item.label}
              {activeSection === item.id && <span className="active-pill-glow" />}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="framer-nav-actions">
          {/* Command Palette Trigger */}
          <button
            type="button"
            className="framer-icon-btn cmd-trigger"
            onClick={() => {
              playPop();
              onOpenCmd();
            }}
            title="Quick Command Bar (Ctrl+K or ⌘K)"
            aria-label="Open Command Palette"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="cmd-badge">⌘K</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            type="button"
            className={`framer-icon-btn ${soundOn ? "active-sound" : ""}`}
            onClick={handleSoundToggle}
            title={soundOn ? "Mute interface audio" : "Enable interface audio"}
            aria-label="Toggle Sound Effects"
          >
            {soundOn ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            className="framer-icon-btn"
            onClick={() => {
              playPop();
              toggleTheme();
            }}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Resume 1-Click Download Button */}
          <a
            href="/Deepak-Kumar-Resume.pdf"
            download="Deepak-Kumar-Resume.pdf"
            className="framer-cta-pill"
            onClick={playPop}
          >
            <span>Resume</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </nav>
    </div>
  );
}
