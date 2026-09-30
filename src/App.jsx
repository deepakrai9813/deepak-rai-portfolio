import { useState, useEffect } from "react";
import { useMachineStore } from "./store/useMachineStore";
import { playHeartbeat } from "./utils/audioSystem";

import AtmosphereBackground from "./components/AtmosphereBackground";
import CommandCenterView from "./components/CommandCenterView";
import CaseStudyModal from "./components/CaseStudyModal";
import ContactModal from "./components/ContactModal";
import JarvisConsole from "./components/JarvisConsole";
import BootSequence from "./components/BootSequence";
import WorkshopFooter from "./components/WorkshopFooter";
import contentData from "./data/content.json";

export default function App() {
  const { soundEnabled, triggerHeartbeat } = useMachineStore();
  const [bootCompleted, setBootCompleted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Double-Pulse Heartbeat Cycle (1.4s loop: Lub at 0s, Dub at 0.22s)
  useEffect(() => {
    const heartbeatInterval = setInterval(() => {
      triggerHeartbeat();
      if (soundEnabled) {
        playHeartbeat(true);
      }
    }, 1400);

    return () => clearInterval(heartbeatInterval);
  }, [soundEnabled, triggerHeartbeat]);

  const handleOpenProjects = () => {
    // Open the primary showcase project
    setSelectedProject(contentData.projects[0]);
  };

  const handleOpenContact = () => {
    setIsContactModalOpen(true);
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="living-machine-root">
      {/* 1. Optional Skippable Boot Sequence */}
      {!bootCompleted && (
        <BootSequence onComplete={() => setBootCompleted(true)} />
      )}

      {/* 2. Atmosphere Canvas & Blueprint Grid Backdrop */}
      <AtmosphereBackground />

      {/* 3. The Panoramic Workshop Command Center (Matching media_1790677833683.jpg) */}
      <main className="panoramic-workshop-stage">
        <CommandCenterView
          onOpenProjects={handleOpenProjects}
          onOpenContact={handleOpenContact}
          onSelectProject={handleSelectProject}
        />
      </main>

      {/* 4. Grid Termination Footer with Uptime & Fan Disclaimer */}
      <WorkshopFooter onNavigate={(sec) => {
        const el = document.getElementById(sec);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }} />

      {/* 5. J.A.R.V.I.S. Floating Holographic AI Interface */}
      <JarvisConsole onNavigate={(sec) => {
        if (sec === "contact") setIsContactModalOpen(true);
        if (sec === "projects") setSelectedProject(contentData.projects[0]);
      }} />

      {/* 6. High-Tech Modals */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {isContactModalOpen && (
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      )}
    </div>
  );
}
