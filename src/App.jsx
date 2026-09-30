import { useState, useEffect } from "react";
import CustomCursor from "./components/CustomCursor";
import ParticleCanvas from "./components/ParticleCanvas";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoAbout from "./components/BentoAbout";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import GitHubActivityHeatmap from "./components/GitHubActivityHeatmap";
import ProjectCalculator from "./components/ProjectCalculator";
import InteractiveTerminal from "./components/InteractiveTerminal";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import FunFAQ from "./components/FunFAQ";
import Contact from "./components/Contact";
import VibeWidget from "./components/VibeWidget";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import CaseStudyModal from "./components/CaseStudyModal";

export default function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Global Keyboard Shortcut: ⌘K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="portfolio-app-root">
      {/* 1. Fluid Custom Cursor Layer */}
      <CustomCursor />

      {/* 2. Luminous Ambient Mesh & Particle Aura */}
      <div className="ambient-mesh-canvas" aria-hidden="true">
        <div className="mesh-glow-orb orb-1" />
        <div className="mesh-glow-orb orb-2" />
        <div className="mesh-glow-orb orb-3" />
        <div className="mesh-noise-overlay" />
      </div>
      <ParticleCanvas />

      {/* 3. Floating Island Pill Navbar */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* 4. Main Content Sections */}
      <main id="main-content">
        <Hero onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
        <BentoAbout />
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <Experience />

        {/* GitHub Code Velocity & Heatmap Section */}
        <section id="heatmap" className="section-container-block" style={{ paddingBottom: "20px" }}>
          <GitHubActivityHeatmap />
        </section>

        {/* Interactive Scope & Velocity Estimator */}
        <section id="calculator" className="section-container-block" style={{ paddingBottom: "20px" }}>
          <ProjectCalculator />
        </section>

        {/* Live Interactive Developer Terminal Console */}
        <section id="terminal" className="section-container-block" style={{ paddingBottom: "20px" }}>
          <div className="section-header-lockup">
            <div className="section-tag-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              <span>INTERACTIVE TELEMETRY</span>
            </div>
            <h2 className="section-heading-title">Live Developer Console</h2>
            <p className="section-subtitle-text">
              Run commands, query cluster metrics, and explore architectural telemetry directly in the browser terminal.
            </p>
          </div>
          <InteractiveTerminal />
        </section>

        <Skills />
        <Testimonials />
        <FunFAQ />
        <Contact />
      </main>

      {/* 5. Floating Vibe Music Dock Widget */}
      <VibeWidget />

      {/* 6. Luminous Minimalist Footer */}
      <Footer />

      {/* 7. Command Palette (⌘K) Dialog */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* 8. Technical Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
