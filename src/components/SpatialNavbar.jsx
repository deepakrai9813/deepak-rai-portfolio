import { useState, useEffect } from "react";
import { Sun, Moon, ArrowUpRight, Menu } from "./icons";

const NAV_ITEMS = [
  { id: "hero", label: "01 // INTRO" },
  { id: "lattice", label: "02 // 3D LATTICE" },
  { id: "systems", label: "03 // SYSTEMS" },
  { id: "benchmark", label: "04 // BENCHMARK" },
  { id: "philosophy", label: "05 // PHILOSOPHY" },
  { id: "contact", label: "06 // CONTACT" },
];

export default function SpatialNavbar({ theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll spy
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className={`spatial-navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
        <div className="spatial-dock-capsule">
          {/* Brand Monogram & Live Status */}
          <button
            type="button"
            className="spatial-brand-btn"
            onClick={() => scrollTo("hero")}
            title="Deepak Rai — Distributed Systems Architect"
          >
            <span className="brand-monogram">◤ DR ◢</span>
            <div className="brand-status-meta">
              <span className="brand-name">DEEPAK RAI</span>
              <span className="status-live-chip">
                <span className="status-dot-pulse" />
                <span className="status-chip-text">SYSTEMS ACTIVE</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="spatial-nav-links" aria-label="Primary Navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`spatial-nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Utilities */}
          <div className="spatial-nav-actions">
            {/* Direct Resume CTA */}
            <a
              href="/Deepak-Kumar-Resume.pdf"
              download="Deepak-Kumar-Resume.pdf"
              className="spatial-resume-btn"
              title="Download Verified Resume Specification (PDF)"
            >
              <span>RESUME</span>
              <ArrowUpRight width={12} height={12} />
            </a>

            {/* Theme Toggle */}
            <button
              type="button"
              className="spatial-theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun width={15} height={15} /> : <Moon width={15} height={15} />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="spatial-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Mobile Navigation Menu"
            >
              <Menu width={16} height={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="spatial-mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="spatial-mobile-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-overlay-header">
              <div className="brand-monogram">◤ DR ◢</div>
              <button
                type="button"
                className="mobile-close-btn"
                onClick={() => setMobileOpen(false)}
                aria-label="Close Mobile Navigation"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="mobile-links-list">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`mobile-nav-btn ${activeSection === item.id ? "active" : ""}`}
                  onClick={() => scrollTo(item.id)}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight width={14} height={14} />
                </button>
              ))}
            </div>

            <div className="mobile-drawer-bottom">
              <a
                href="/Deepak-Kumar-Resume.pdf"
                download="Deepak-Kumar-Resume.pdf"
                className="mobile-resume-download"
              >
                <span>DOWNLOAD RESUME (PDF)</span>
                <ArrowUpRight width={14} height={14} />
              </a>
              <div className="mobile-status-indicator">
                <span className="status-dot-pulse" />
                <span>Tokyo / Remote · Open for Systems Roles</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
