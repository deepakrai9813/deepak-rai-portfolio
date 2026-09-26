import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sun,
  Moon,
  ArrowUpRight,
  Github,
  CommandIcon,
  Volume2,
  VolumeX,
  Palette,
} from "./icons";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Nav({
  theme,
  toggleTheme,
  accent,
  changeAccent,
  accents,
  soundEnabled,
  toggleSound,
  onOpenCommandPalette,
  playClick,
  showToast,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteRef = useRef(null);

  useEffect(() => {
    const ids = ["about", "services", "skills", "work", "contact"];
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = `#${id}`;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Click outside to close accent palette
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target)) {
        setPaletteOpen(false);
      }
    };
    if (paletteOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [paletteOpen]);

  const isDark = theme === "dark";

  const handleAccentChange = (accId, accName) => {
    changeAccent(accId);
    playClick?.();
    setPaletteOpen(false);
    showToast?.({
      type: "success",
      title: "Theme Accent Updated",
      message: `Switched accent glow to ${accName}`,
    });
  };

  return (
    <>
      <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="container nav__inner">
          <a
            href="#top"
            className="nav__logo"
            aria-label="Deepak Rai — home"
            onClick={playClick}
          >
            deepak<span className="dot">.dev</span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={active === l.href ? "active" : ""}
                onClick={playClick}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            {/* Command Palette Trigger */}
            <button
              className="nav__cmd-btn"
              onClick={() => {
                playClick?.();
                onOpenCommandPalette(true);
              }}
              title="Open Command Menu (⌘K / Ctrl+K)"
              aria-label="Open Command Menu"
            >
              <CommandIcon width={14} height={14} />
              <span>⌘K</span>
            </button>

            {/* Accent Color Picker Dropdown */}
            <div className="nav__palette-wrapper" ref={paletteRef}>
              <button
                className="icon-link nav__palette-toggle"
                onClick={() => {
                  playClick?.();
                  setPaletteOpen((prev) => !prev);
                }}
                title="Change theme accent color"
                aria-label="Change accent color"
                aria-expanded={paletteOpen}
              >
                <Palette width={16} height={16} />
              </button>

              <AnimatePresence>
                {paletteOpen && (
                  <motion.div
                    className="palette-dropdown"
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="palette-dropdown__head">
                      <span>Accent Color</span>
                    </div>
                    <div className="palette-dropdown__list">
                      {accents.map((acc) => (
                        <button
                          key={acc.id}
                          className={`palette-item${accent === acc.id ? " is-active" : ""}`}
                          onClick={() => handleAccentChange(acc.id, acc.name)}
                        >
                          <span
                            className="palette-swatch"
                            style={{ background: acc.color }}
                          />
                          <span>{acc.name}</span>
                          {accent === acc.id && <span className="palette-check">✓</span>}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sound FX Toggle */}
            <button
              className="icon-link nav__sound-toggle"
              onClick={() => {
                toggleSound();
                showToast?.({
                  type: "info",
                  title: "Audio Feedback",
                  message: soundEnabled ? "Sound muted" : "Tactile sounds enabled",
                });
              }}
              title={soundEnabled ? "Mute interface audio" : "Enable interface audio"}
              aria-label={soundEnabled ? "Mute audio" : "Enable audio"}
            >
              {soundEnabled ? (
                <Volume2 width={16} height={16} />
              ) : (
                <VolumeX width={16} height={16} />
              )}
            </button>

            {/* GitHub Profile */}
            <a
              href="https://github.com/deepakrai9813"
              target="_blank"
              rel="noreferrer"
              className="icon-link"
              aria-label="GitHub profile"
              title="GitHub"
              onClick={playClick}
            >
              <Github width={16} height={16} />
            </a>

            {/* Dark / Light Theme Toggle */}
            <button
              className="theme-toggle"
              onClick={() => {
                playClick?.();
                toggleTheme();
              }}
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
              title={`Switch to ${isDark ? "light" : "dark"} theme`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "inline-flex" }}
                >
                  {isDark ? <Sun width={16} height={16} /> : <Moon width={16} height={16} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <a href="#contact" className="btn btn-primary nav__cta" onClick={playClick}>
              Let&apos;s talk <ArrowUpRight width={15} height={15} />
            </a>

            <button
              className={`burger${open ? " is-open" : ""}`}
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            aria-label="Mobile"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => {
                  playClick?.();
                  setOpen(false);
                }}
              >
                {l.label}
              </a>
            ))}
            <div className="mobile-menu__actions">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setOpen(false);
                  onOpenCommandPalette(true);
                }}
              >
                <CommandIcon width={15} height={15} /> Command Palette (⌘K)
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
