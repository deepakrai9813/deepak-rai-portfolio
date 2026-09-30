import { useState, useEffect } from "react";
import CustomCursor from "./components/CustomCursor";
import ParticleCanvas from "./components/ParticleCanvas";
import ThemePaletteSwitcher from "./components/ThemePaletteSwitcher";
import SoundFXWidget from "./components/SoundFXWidget";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoAbout from "./components/BentoAbout";
import Projects from "./components/Projects";
import ArchitectureComparison from "./components/ArchitectureComparison";
import ArchitectureDecisionRecords from "./components/ArchitectureDecisionRecords";
import Experience from "./components/Experience";
import GitHubActivityHeatmap from "./components/GitHubActivityHeatmap";
import ProjectCalculator from "./components/ProjectCalculator";
import ChaosSimulator from "./components/ChaosSimulator";
import SystemStatusDashboard from "./components/SystemStatusDashboard";
import InteractiveTerminal from "./components/InteractiveTerminal";
import TechPlayground from "./components/TechPlayground";
import QueryOptimizerVisualizer from "./components/QueryOptimizerVisualizer";
import Skills from "./components/Skills";
import CertificationsDeck from "./components/CertificationsDeck";
import Testimonials from "./components/Testimonials";
import FunFAQ from "./components/FunFAQ";
import Contact from "./components/Contact";
import VibeWidget from "./components/VibeWidget";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import CaseStudyModal from "./components/CaseStudyModal";
import ScheduleMeetingModal from "./components/ScheduleMeetingModal";
import PressKitModal from "./components/PressKitModal";

export default function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isPressKitOpen, setIsPressKitOpen] = useState(false);
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

      {/* 3. Floating Docks: Audio & Theme Switchers */}
      <div className="bottom-floating-controls-dock" aria-label="Quick Settings Dock">
        <SoundFXWidget />
        <ThemePaletteSwitcher />
      </div>

      {/* 4. Floating Island Pill Navbar */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenSchedule={() => setIsScheduleModalOpen(true)}
      />

      {/* 5. Main Content Sections */}
      <main id="main-content">
        <Hero
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenSchedule={() => setIsScheduleModalOpen(true)}
        />

        <BentoAbout />

        <Projects onSelectProject={(project) => setSelectedProject(project)} />

        {/* Architectural Transformation: Before vs. After Case Study */}
        <section id="architecture-comparison" className="section-container-block" style={{ paddingBottom: "20px" }}>
          <ArchitectureComparison />
        </section>

        {/* Architecture Decision Records (ADRs) Catalog */}
        <section id="adrs" className="section-container-block" style={{ paddingBottom: "20px" }}>
          <ArchitectureDecisionRecords />
        </section>

        <Experience />

        {/* GitHub Code Velocity & Heatmap Section */}
        <section id="heatmap" className="section-container-block" style={{ paddingBottom: "20px" }}>
          <GitHubActivityHeatmap />
        </section>

        {/* Interactive Scope & Velocity Estimator */}
        <section id="calculator" className="section-container-block" style={{ paddingBottom: "20px" }}>
          <ProjectCalculator />
        </section>

        {/* Distributed Systems Chaos & Traffic Spike Simulator */}
        <section id="chaos-simulator" className="section-container-block" style={{ paddingBottom: "20px" }}>
          <ChaosSimulator />
        </section>

        {/* System Health Observability & Incident Post-Mortems */}
        <section id="system-status" className="section-container-block" style={{ paddingBottom: "20px" }}>
          <SystemStatusDashboard />
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

        {/* Interactive Code & Production Pattern Inspector */}
        <section id="tech-playground" className="section-container-block" style={{ paddingBottom: "20px" }}>
          <TechPlayground />
        </section>

        {/* Database Query Optimizer & EXPLAIN Plan Visualizer */}
        <section id="query-optimizer" className="section-container-block" style={{ paddingBottom: "20px" }}>
          <QueryOptimizerVisualizer />
        </section>

        <Skills />

        {/* Verified Credentials, Certifications & Engineering Badges */}
        <section id="certifications" className="section-container-block" style={{ paddingBottom: "20px" }}>
          <CertificationsDeck />
        </section>

        <Testimonials />

        <FunFAQ />

        <Contact onOpenSchedule={() => setIsScheduleModalOpen(true)} />
      </main>

      {/* 6. Floating Vibe Music Dock Widget */}
      <VibeWidget />

      {/* 7. Luminous Minimalist Footer */}
      <Footer onOpenPressKit={() => setIsPressKitOpen(true)} />

      {/* 8. Command Palette (⌘K) Dialog */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenSchedule={() => setIsScheduleModalOpen(true)}
        onOpenPressKit={() => setIsPressKitOpen(true)}
      />

      {/* 9. Technical Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* 10. Direct Technical Conversation & Meeting Scheduler Modal */}
      <ScheduleMeetingModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

      {/* 11. Engineering Press Kit & Media Briefing Modal */}
      <PressKitModal
        isOpen={isPressKitOpen}
        onClose={() => setIsPressKitOpen(false)}
      />
    </div>
  );
}
