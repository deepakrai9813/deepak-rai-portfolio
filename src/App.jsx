import { useState, useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import SideQuests from "./components/SideQuests";
import Visuals from "./components/Visuals";
import Experience from "./components/Experience";
import Tools from "./components/Tools";
import About from "./components/About";
import Footer from "./components/Footer";
import CaseStudyModal from "./components/CaseStudyModal";
import CommandPalette from "./components/CommandPalette";
import Toast from "./components/Toast";
import { toggleSound } from "./utils/soundFx";

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll spy to update active nav item
  useEffect(() => {
    const sections = ["home", "projects", "side-quests", "visuals", "experience", "tools", "about", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`framer-portfolio-root theme-${theme}`}>
      {/* Ambient background glow layers (Signature Neha Yadav soft radial lighting) */}
      <div className="framer-ambient-canvas" aria-hidden="true">
        <div className="ambient-radial glow-top" />
        <div className="ambient-radial glow-center" />
        <div className="ambient-radial glow-bottom" />
        <div className="ambient-subtle-grid" />
      </div>

      {/* Floating Pill Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCmd={() => setIsCmdOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="framer-main-layout">
        <Hero onNavigate={handleNavigate} onShowToast={showToast} />
        <Projects onSelectProject={(p) => setSelectedProject(p)} />
        <SideQuests onShowToast={showToast} />
        <Visuals />
        <Experience />
        <Tools />
        <About onNavigate={handleNavigate} />
        <Footer onShowToast={showToast} />
      </main>

      {/* Modals & Overlays */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onNavigate={handleNavigate}
        toggleTheme={toggleTheme}
        toggleSound={toggleSound}
        onShowToast={showToast}
      />

      <Toast message={toastMessage} />
    </div>
  );
}
