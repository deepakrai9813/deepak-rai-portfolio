import { useState, useEffect, useRef } from "react";
import { PERSONAL_INFO } from "../utils/data";
import { playClick, playPop, playSuccess } from "../utils/soundFx";

export default function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  toggleTheme,
  toggleSound,
  onShowToast,
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === "Escape" && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "nav-home",
      label: "Jump to Home",
      category: "Navigation",
      action: () => {
        onNavigate("home");
        onClose();
      },
    },
    {
      id: "nav-projects",
      label: "Explore Latest Projects",
      category: "Navigation",
      action: () => {
        onNavigate("projects");
        onClose();
      },
    },
    {
      id: "nav-sidequests",
      label: "Open Side Quests (CyberPet, Latency Probe)",
      category: "Navigation",
      action: () => {
        onNavigate("side-quests");
        onClose();
      },
    },
    {
      id: "nav-visuals",
      label: "View Architecture Blueprints (Visuals)",
      category: "Navigation",
      action: () => {
        onNavigate("visuals");
        onClose();
      },
    },
    {
      id: "nav-experience",
      label: "View Career Experience",
      category: "Navigation",
      action: () => {
        onNavigate("experience");
        onClose();
      },
    },
    {
      id: "nav-tools",
      label: "Filter Tech Stack & Tools",
      category: "Navigation",
      action: () => {
        onNavigate("tools");
        onClose();
      },
    },
    {
      id: "nav-about",
      label: "Read About & Story",
      category: "Navigation",
      action: () => {
        onNavigate("about");
        onClose();
      },
    },
    {
      id: "nav-contact",
      label: "Go to Contact / Let's Build Together",
      category: "Navigation",
      action: () => {
        onNavigate("contact");
        onClose();
      },
    },
    {
      id: "act-copy-email",
      label: `Copy Email (${PERSONAL_INFO.email})`,
      category: "Quick Action",
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        playSuccess();
        onShowToast("Email copied to clipboard! 📋");
        onClose();
      },
    },
    {
      id: "act-resume",
      label: "Download Deepak Kumar Resume (PDF)",
      category: "Quick Action",
      action: () => {
        playPop();
        window.open(PERSONAL_INFO.resumeUrl, "_blank");
        onClose();
      },
    },
    {
      id: "act-theme",
      label: "Toggle Theme (Dark / Light)",
      category: "Preferences",
      action: () => {
        playPop();
        toggleTheme();
        onClose();
      },
    },
    {
      id: "act-sound",
      label: "Toggle UI Sound FX",
      category: "Preferences",
      action: () => {
        toggleSound();
        onClose();
      },
    },
    {
      id: "act-linkedin",
      label: "Open LinkedIn Profile",
      category: "Social",
      action: () => {
        playClick();
        window.open(PERSONAL_INFO.linkedin, "_blank");
        onClose();
      },
    },
    {
      id: "act-github",
      label: "Open GitHub Profile",
      category: "Social",
      action: () => {
        playClick();
        window.open(PERSONAL_INFO.github, "_blank");
        onClose();
      },
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.label.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="cmd-modal-overlay"
      onClick={() => {
        playClick();
        onClose();
      }}
    >
      <div
        className="cmd-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="cmd-search-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or jump to section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="cmd-esc-tag">ESC</span>
        </div>

        <div className="cmd-results-list">
          {filtered.length === 0 ? (
            <div className="cmd-empty">No matching commands found.</div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                className="cmd-item-row"
                onClick={item.action}
              >
                <div className="cmd-item-left">
                  <span className="cmd-category-tag">{item.category}</span>
                  <span className="cmd-item-label">{item.label}</span>
                </div>
                <span className="cmd-item-arrow">↵</span>
              </button>
            ))
          )}
        </div>

        <div className="cmd-footer-tips">
          <span>Navigate with <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>Select with <kbd>↵</kbd></span>
          <span>Close with <kbd>esc</kbd></span>
        </div>
      </div>
    </div>
  );
}
