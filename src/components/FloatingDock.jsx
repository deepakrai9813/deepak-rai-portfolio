import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CommandIcon,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Palette,
  ArrowUp,
  Mail,
  ShieldCheck,
} from "./icons";

export default function FloatingDock({
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
  const [visible, setVisible] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show dock after scrolling past hero (180px)
      setVisible(window.scrollY > 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="floating-dock-wrap"
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.92 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Quick action dock"
        >
          <div className="floating-dock">
            {/* Status indicator */}
            <a href="#contact" className="dock-status" title="Open to opportunities" onClick={playClick}>
              <span className="status-dot pulse" />
              <span className="dock-status-text">Available</span>
            </a>

            <div className="dock-divider" />

            {/* Quick section links */}
            <a href="#work" className="dock-btn" title="Jump to Selected Projects" onClick={playClick}>
              Work
            </a>
            <a href="#services" className="dock-btn" title="Jump to Capabilities" onClick={playClick}>
              Services
            </a>
            <a href="#skills" className="dock-btn" title="Jump to Architecture & Skills" onClick={playClick}>
              Skills
            </a>

            <div className="dock-divider" />

            {/* Command Palette Launcher */}
            <button
              className="dock-icon-btn dock-cmd-trigger"
              onClick={() => {
                playClick?.();
                onOpenCommandPalette(true);
              }}
              title="Open Command Center (⌘K)"
              aria-label="Open Command Center"
            >
              <CommandIcon width={15} height={15} />
              <span>⌘K</span>
            </button>

            {/* Audio Toggle */}
            <button
              className="dock-icon-btn"
              onClick={() => {
                toggleSound();
                showToast?.({
                  type: "info",
                  title: "Audio Feedback",
                  message: soundEnabled ? "Sound muted" : "Tactile sounds enabled",
                });
              }}
              title={soundEnabled ? "Mute audio" : "Enable tactile sound"}
              aria-label="Toggle audio"
            >
              {soundEnabled ? (
                <Volume2 width={15} height={15} />
              ) : (
                <VolumeX width={15} height={15} />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              className="dock-icon-btn"
              onClick={() => {
                toggleTheme();
                playClick?.();
              }}
              title={`Switch to ${isDark ? "light" : "dark"} mode`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun width={15} height={15} /> : <Moon width={15} height={15} />}
            </button>

            {/* Back to Top */}
            <a href="#top" className="dock-icon-btn" title="Back to top" aria-label="Back to top" onClick={playClick}>
              <ArrowUp width={15} height={15} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
