import { useState, useEffect } from "react";
import { Sun, Moon, ArrowUpRight, Menu, Zap, X } from "./icons";

const CABIN_ANCHORS = [
  { id: "hero", label: "00 // ARC CORE" },
  { id: "projects-cabin", label: "01 // ARMORY" },
  { id: "concurrency-cabin", label: "02 // PROPULSION" },
  { id: "uplink-cabin", label: "03 // UPLINK" },
];

export default function StarkNavbar({ theme, toggleTheme, isOvercharged }) {
  const [activeCabin, setActiveCabin] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const cabins = CABIN_ANCHORS.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 240;

      for (let i = cabins.length - 1; i >= 0; i--) {
        const sec = cabins[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveCabin(CABIN_ANCHORS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setDrawerOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className={`stark-navbar-wrapper ${scrolled ? "is-scrolled" : ""}`}>
        <div className="stark-armor-dock">
          {/* Brand & Arc Reactor Mini-Gauge */}
          <button
            type="button"
            className="stark-brand-anchor"
            onClick={() => scrollTo("hero")}
            title="Stark Industries // Deepak Rai Systems Architect"
          >
            <span className="stark-arc-icon">◤ DR ◢</span>
            <div className="stark-brand-titles">
              <span className="brand-firm-name">STARK OS // DEEPAK RAI</span>
              <span className="brand-power-readout">
                <span className={`arc-pulse-dot ${isOvercharged ? "overcharged" : ""}`} />
                <span>{isOvercharged ? "ARC BOOST: 7.68 GJ/S" : "ARC POWER: 3.84 GJ/S"}</span>
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="stark-nav-links" aria-label="Stark System Cabins">
            {CABIN_ANCHORS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`stark-nav-btn ${activeCabin === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Utilities */}
          <div className="stark-nav-actions">
            {/* Resume Button */}
            <a
              href="/Deepak-Kumar-Resume.pdf"
              download="Deepak-Kumar-Resume.pdf"
              className="btn-stark-resume"
              title="Download Verified Resume Specification (PDF)"
            >
              <span>RESUME</span>
              <ArrowUpRight width={12} height={12} />
            </a>

            {/* Theme Toggle */}
            <button
              type="button"
              className="btn-stark-theme"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun width={15} height={15} /> : <Moon width={15} height={15} />}
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="btn-stark-mobile"
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <Menu width={16} height={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="stark-mobile-overlay" onClick={() => setDrawerOpen(false)}>
          <div className="stark-mobile-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-sheet-top">
              <span className="stark-arc-icon">◤ DR ◢ STARK OS</span>
              <button
                type="button"
                className="btn-sheet-close"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close Navigation"
              >
                <X width={16} height={16} />
              </button>
            </div>

            <div className="mobile-sheet-links">
              {CABIN_ANCHORS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`mobile-sheet-link ${activeCabin === item.id ? "active" : ""}`}
                  onClick={() => scrollTo(item.id)}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight width={14} height={14} />
                </button>
              ))}
            </div>

            <div className="mobile-sheet-footer">
              <a
                href="/Deepak-Kumar-Resume.pdf"
                download="Deepak-Kumar-Resume.pdf"
                className="btn-sheet-download"
              >
                <span>DOWNLOAD RESUME SPEC (PDF)</span>
                <ArrowUpRight width={14} height={14} />
              </a>
              <div className="sheet-arc-status">
                <span className="arc-pulse-dot" />
                <span>Tokyo / Remote · Open for Systems Roles</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
