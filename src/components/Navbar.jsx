import { useState, useEffect } from "react";

export default function Navbar({ onOpenCommandPalette, onOpenSchedule }) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "architecture-comparison", "experience", "skills", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="floating-navbar-container" role="banner">
      <nav className="floating-navbar-pill" aria-label="Main Navigation">
        {/* Brand Monogram */}
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("hero"); }} className="brand-anchor">
          <div className="brand-symbol-badge">DK</div>
          <span className="brand-text-name">Deepak Kumar</span>
        </a>

        {/* Section Links */}
        <div className="nav-links-cluster">
          <button
            type="button"
            className={`nav-link-item ${activeSection === "about" ? "active" : ""}`}
            onClick={() => scrollTo("about")}
          >
            About
          </button>
          <button
            type="button"
            className={`nav-link-item ${activeSection === "projects" ? "active" : ""}`}
            onClick={() => scrollTo("projects")}
          >
            Projects
          </button>
          <button
            type="button"
            className={`nav-link-item ${activeSection === "experience" ? "active" : ""}`}
            onClick={() => scrollTo("experience")}
          >
            Experience
          </button>
          <button
            type="button"
            className={`nav-link-item ${activeSection === "skills" ? "active" : ""}`}
            onClick={() => scrollTo("skills")}
          >
            Skills
          </button>
          <button
            type="button"
            className={`nav-link-item ${activeSection === "contact" ? "active" : ""}`}
            onClick={() => scrollTo("contact")}
          >
            Contact
          </button>
        </div>

        {/* Action Cluster */}
        <div className="nav-actions-cluster">
          <button
            type="button"
            className="btn-cmd-shortcut"
            onClick={onOpenCommandPalette}
            title="Open Command Menu (⌘K or Ctrl+K)"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Search</span>
            <kbd className="kbd-badge">⌘K</kbd>
          </button>

          <button
            type="button"
            className="btn-nav-schedule"
            onClick={onOpenSchedule}
            title="Schedule a 15-30m technical chat"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
            </svg>
            <span>Book Chat</span>
          </button>

          <a
            href="/Deepak-Kumar-Resume.pdf"
            download="Deepak-Kumar-Resume.pdf"
            className="btn-nav-resume"
            title="Download Verified Resume PDF"
          >
            <span>Resume</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}
