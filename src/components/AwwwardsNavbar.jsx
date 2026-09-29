import { useState, useEffect } from "react";
import { Sun, Moon, ArrowUpRight } from "./icons";

const NAV_LINKS = [
  { id: "hero", label: "01 // OVERVIEW" },
  { id: "neural-core", label: "02 // 3D CORE" },
  { id: "bento-systems", label: "03 // BENTO SYSTEMS" },
  { id: "concurrency-lab", label: "04 // BENCHMARK" },
  { id: "manifesto", label: "05 // MANIFESTO" },
  { id: "contact", label: "06 // DISPATCH" },
];

export default function AwwwardsNavbar({ theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Scroll spy
      const sections = NAV_LINKS.map((link) => document.getElementById(link.id));
      const scrollY = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollY) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Floating Dynamic Island Navbar */}
      <header className={`awwwards-navbar-container ${scrolled ? "is-scrolled" : ""}`}>
        <div className="awwwards-island-pill">
          {/* Brand Logo & Pulsing Beacon */}
          <button
            type="button"
            className="awwwards-brand-link"
            onClick={() => scrollTo("hero")}
            title="Deepak Rai — Distributed Systems Architect"
          >
            <span className="brand-symbol">◤ DR ◢</span>
            <div className="brand-info">
              <span className="brand-title">DEEPAK RAI</span>
              <span className="brand-availability">
                <span className="pulse-beacon" />
                <span className="availability-label">SYSTEMS ACTIVE</span>
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="awwwards-nav-menu" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                className={`awwwards-nav-item ${activeSection === link.id ? "active" : ""}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Island Utilities */}
          <div className="awwwards-nav-actions">
            {/* Uiverse Cyber Shimmer Resume Button */}
            <a
              href="/Deepak-Kumar-Resume.pdf"
              download="Deepak-Kumar-Resume.pdf"
              className="uiverse-cyber-btn"
              title="Download Verified Resume Specification (PDF)"
            >
              <span>RESUME</span>
              <ArrowUpRight width={12} height={12} />
            </a>

            {/* Tactile Glass Theme Switcher */}
            <button
              type="button"
              className="awwwards-theme-toggle"
              onClick={toggleTheme}
              aria-label={`Toggle to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun width={14} height={14} /> : <Moon width={14} height={14} />}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              className="awwwards-mobile-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
            >
              <span className="hamburger-bar" />
              <span className="hamburger-bar" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Glass Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="awwwards-mobile-drawer" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-top-row">
              <span className="brand-symbol">◤ DR ◢</span>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Mobile Navigation"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="drawer-links-stack">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  className={`drawer-link-btn ${activeSection === link.id ? "active" : ""}`}
                  onClick={() => scrollTo(link.id)}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight width={14} height={14} />
                </button>
              ))}
            </div>

            <div className="drawer-footer-actions">
              <a
                href="/Deepak-Kumar-Resume.pdf"
                download="Deepak-Kumar-Resume.pdf"
                className="drawer-resume-cta"
              >
                <span>DOWNLOAD RESUME SPEC (PDF)</span>
                <ArrowUpRight width={14} height={14} />
              </a>
              <div className="drawer-status-meta">
                <span className="pulse-beacon" />
                <span>Tokyo / Remote · Open for Systems Roles</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
