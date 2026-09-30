import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoAbout from "./components/BentoAbout";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
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
      {/* 1. Ambient Lighting & Mesh Backdrop */}
      <div className="ambient-mesh-canvas" aria-hidden="true">
        <div className="mesh-glow-orb orb-1" />
        <div className="mesh-glow-orb orb-2" />
        <div className="mesh-glow-orb orb-3" />
        <div className="mesh-noise-overlay" />
      </div>

      {/* 2. Floating Island Pill Navbar */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* 3. Main Content Sections */}
      <main id="main-content">
        <Hero onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
        <BentoAbout />
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <Experience />
        <Skills />
        <Contact />
      </main>

      {/* 4. Luxury Minimalist Footer */}
      <Footer />

      {/* 5. Command Palette (⌘K) Dialog */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* 6. Technical Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
