import { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  CommandIcon,
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
  Copy,
  ArrowUpRight,
  FileText,
  Palette,
  Volume2,
  VolumeX,
  X,
  ShieldCheck,
  Cpu,
  Monitor,
} from "./icons";

export default function CommandPalette({
  isOpen,
  onClose,
  theme,
  toggleTheme,
  accent,
  changeAccent,
  accents,
  soundEnabled,
  toggleSound,
  playClick,
  playSuccess,
  showToast,
  onSelectProject,
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keydown handler for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose(!isOpen);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items = useMemo(() => {
    const all = [
      // Navigation
      {
        id: "nav-work",
        category: "Navigation",
        title: "Selected Projects & Systems",
        subtitle: "View full-stack apps and fault-tolerant architecture",
        icon: Monitor,
        action: () => {
          document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        id: "nav-services",
        category: "Navigation",
        title: "Capabilities & Services",
        subtitle: "High-resilience systems, AI engineering, full-stack apps",
        icon: ShieldCheck,
        action: () => {
          document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        id: "nav-skills",
        category: "Navigation",
        title: "Technical Skills & Architecture",
        subtitle: "Explore technologies, databases, and AI pipelines",
        icon: Cpu,
        action: () => {
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        id: "nav-about",
        category: "Navigation",
        title: "About Deepak & Engineering Journey",
        subtitle: "Background, stats, and production milestones",
        icon: FileText,
        action: () => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        id: "nav-contact",
        category: "Navigation",
        title: "Get in Touch / Contact",
        subtitle: "Freelance inquiries, full-time roles, or consultations",
        icon: Mail,
        action: () => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        },
      },

      // Featured Projects Deep Dive
      {
        id: "proj-sentinel",
        category: "Projects",
        title: "Project Sentinel (Circuit Breaker Gateway)",
        subtitle: "Go • Gorilla WebSocket • Toxiproxy • Sub-200ms failover",
        icon: ShieldCheck,
        action: () => {
          if (onSelectProject) {
            onSelectProject("sentinel");
          } else {
            document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
          }
        },
      },
      {
        id: "proj-san",
        category: "Projects",
        title: "SAN BROTHERS Corporate Solutions",
        subtitle: "Production compliance web application · Live on Google",
        icon: ArrowUpRight,
        action: () => {
          window.open("https://sanbrotherscorporatesolutions.in", "_blank");
        },
      },
      {
        id: "proj-bian",
        category: "Projects",
        title: "BIAN AI — AI Study Assistant",
        subtitle: "React 19 • Groq LLMs • Streaming API • pdf.js",
        icon: ArrowUpRight,
        action: () => {
          window.open("https://github.com/deepakrai9813/AI_PROJECT", "_blank");
        },
      },
      {
        id: "proj-leadfinder",
        category: "Projects",
        title: "LeadFinder AI — Lead Generation",
        subtitle: "Next.js 16 • TypeScript • Prisma • NextAuth",
        icon: ArrowUpRight,
        action: () => {
          window.open("https://github.com/deepakrai9813/leadfinder-ai", "_blank");
        },
      },

      // Quick Actions
      {
        id: "act-copy-email",
        category: "Actions",
        title: "Copy Email Address",
        subtitle: "deepakkumar740@gmail.com",
        icon: Copy,
        action: async () => {
          try {
            await navigator.clipboard.writeText("deepakkumar740@gmail.com");
            showToast?.({
              type: "success",
              title: "Email Copied!",
              message: "deepakkumar740@gmail.com is ready to paste.",
            });
            playSuccess?.();
          } catch {
            showToast?.({
              type: "info",
              title: "Email Address",
              message: "deepakkumar740@gmail.com",
            });
          }
        },
      },
      {
        id: "act-resume",
        category: "Actions",
        title: "Download Resume / CV (PDF)",
        subtitle: "Full-Stack Software Developer résumé",
        icon: FileText,
        action: () => {
          const a = document.createElement("a");
          a.href = "Deepak-Resume.pdf";
          a.download = "Deepak-Rai-Resume.pdf";
          a.click();
          showToast?.({
            type: "info",
            title: "Resume Downloaded",
            message: "Thanks for reviewing my background!",
          });
        },
      },
      {
        id: "act-theme",
        category: "Actions",
        title: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
        subtitle: `Currently in ${theme} mode`,
        icon: theme === "dark" ? Sun : Moon,
        action: () => {
          toggleTheme();
          playClick?.();
          showToast?.({
            type: "info",
            title: "Theme Changed",
            message: `Switched to ${theme === "dark" ? "Light" : "Dark"} mode`,
          });
        },
      },
      {
        id: "act-sound",
        category: "Actions",
        title: soundEnabled ? "Mute UI Audio Effects" : "Enable UI Audio Effects",
        subtitle: "Synthesized Web Audio tactile clicks",
        icon: soundEnabled ? VolumeX : Volume2,
        action: () => {
          toggleSound();
          showToast?.({
            type: "info",
            title: "Audio Feedback",
            message: soundEnabled ? "Sound muted" : "Tactile sounds enabled",
          });
        },
      },

      // Accent Colors
      ...accents.map((acc) => ({
        id: `accent-${acc.id}`,
        category: "Accent Theme",
        title: `Set Accent: ${acc.name}`,
        subtitle: accent === acc.id ? "Currently active accent" : `Switch UI glow to ${acc.name}`,
        icon: Palette,
        colorBadge: acc.color,
        action: () => {
          changeAccent(acc.id);
          playClick?.();
          showToast?.({
            type: "success",
            title: "Accent Updated",
            message: `Set theme accent to ${acc.name}`,
          });
        },
      })),

      // External Socials
      {
        id: "soc-github",
        category: "Profiles",
        title: "GitHub Profile (@deepakrai9813)",
        subtitle: "View repositories, contributions, and code",
        icon: Github,
        action: () => {
          window.open("https://github.com/deepakrai9813", "_blank");
        },
      },
      {
        id: "soc-linkedin",
        category: "Profiles",
        title: "LinkedIn Profile",
        subtitle: "Connect professionally and view recommendations",
        icon: Linkedin,
        action: () => {
          window.open("https://www.linkedin.com/in/deepak-rai-990502236", "_blank");
        },
      },
    ];

    if (!query.trim()) return all;

    const q = query.toLowerCase();
    return all.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, theme, accent, accents, soundEnabled, toggleTheme, toggleSound, changeAccent, playClick, playSuccess, showToast, onSelectProject]);

  // Keep index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item) => {
    playClick?.();
    item.action();
    onClose(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === "Enter" && items[selectedIndex]) {
      e.preventDefault();
      handleSelect(items[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="cmd-overlay" onClick={() => onClose(false)}>
          <motion.div
            className="cmd-dialog"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cmd-header">
              <span className="cmd-search-icon">
                <Search width={18} height={18} />
              </span>
              <input
                ref={inputRef}
                className="cmd-input"
                placeholder="Type a command or search projects, skills, actions…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Command search"
              />
              {query && (
                <button
                  className="cmd-clear"
                  onClick={() => setQuery("")}
                  aria-label="Clear input"
                >
                  <X width={14} height={14} />
                </button>
              )}
              <kbd className="cmd-kbd">ESC</kbd>
            </div>

            <div className="cmd-list" ref={listRef}>
              {items.length === 0 ? (
                <div className="cmd-empty">
                  <p>No results found for &ldquo;{query}&rdquo;</p>
                  <small>Try searching for projects, skills, resume, or theme</small>
                </div>
              ) : (
                items.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className={`cmd-item${isSelected ? " is-selected" : ""}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <span className="cmd-item-icon">
                        {item.colorBadge ? (
                          <span
                            className="cmd-color-dot"
                            style={{ background: item.colorBadge }}
                          />
                        ) : (
                          <Icon width={17} height={17} />
                        )}
                      </span>
                      <div className="cmd-item-text">
                        <span className="cmd-item-title">{item.title}</span>
                        <span className="cmd-item-sub">{item.subtitle}</span>
                      </div>
                      <span className="cmd-item-category">{item.category}</span>
                    </div>
                  );
                })
              )}
            </div>

            <div className="cmd-footer">
              <div className="cmd-shortcuts">
                <span>
                  <kbd>↑</kbd> <kbd>↓</kbd> Navigate
                </span>
                <span>
                  <kbd>↵</kbd> Select
                </span>
                <span>
                  <kbd>ESC</kbd> Close
                </span>
              </div>
              <span className="cmd-meta">Deepak Rai · Portfolio Command Center</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
