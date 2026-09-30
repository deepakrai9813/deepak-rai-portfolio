import { useState, useEffect } from "react";
import { useMachineStore } from "./store/useMachineStore";
import { playHeartbeat } from "./utils/audioSystem";

import AtmosphereBackground from "./components/AtmosphereBackground";
import PipelinesCanvas from "./components/PipelinesCanvas";
import SpiderWebCanvas from "./components/SpiderWebCanvas";
import HeaderNav from "./components/HeaderNav";
import HeroCabin from "./components/HeroCabin";
import BotWorkers from "./components/BotWorkers";
import SkillsCabins from "./components/SkillsCabins";
import ProjectsCabin from "./components/ProjectsCabin";
import ExperienceCabin from "./components/ExperienceCabin";
import ContactCabin from "./components/ContactCabin";
import WorkshopFooter from "./components/WorkshopFooter";
import JarvisConsole from "./components/JarvisConsole";
import BootSequence from "./components/BootSequence";

export default function App() {
  const { isBooted, soundEnabled, triggerHeartbeat } = useMachineStore();
  const [bootCompleted, setBootCompleted] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Handle smooth scroll navigation
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

  // Scroll spy to highlight active section in HeaderNav
  useEffect(() => {
    const sections = ["hero", "skills", "projects", "experience", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
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
    <div className="living-machine-root">
      {/* 1. Optional Skippable Boot Sequence */}
      {!bootCompleted && (
        <BootSequence onComplete={() => setBootCompleted(true)} />
      )}

      {/* 2. Atmosphere Canvas & Blueprint Grid Backdrop */}
      <AtmosphereBackground />

      {/* 3. Three Conduits (Cyan Data, Gold Power, Red Telemetry) with Packets */}
      <PipelinesCanvas />

      {/* 4. Top-Right Spider-Man Recon Web (5% Accent with Verlet Physics) */}
      <SpiderWebCanvas />

      {/* 5. Top Command Header Bar */}
      <HeaderNav activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 6. Living Machine Main Content Stream */}
      <main className="workshop-main-stream">
        {/* Sector 01: Core Command Deck (Arc Reactor Heart) */}
        <HeroCabin onNavigate={handleNavigate} />

        {/* 8 Bots on Patrol & Holographic Mission Control Kanban Table */}
        <BotWorkers activeSection={activeSection} />

        {/* Sector 02: Reactor Core Lab (Skills & Engineering Subsystems) */}
        <SkillsCabins />

        {/* Sector 03: Deployment Bay (Projects & Performance Metrics) */}
        <ProjectsCabin />

        {/* Sector 04: Flight Logs (Career Milestones & Audits) */}
        <ExperienceCabin />

        {/* Sector 05: Quantum Transmitter (Comms & Direct Hire) */}
        <ContactCabin />
      </main>

      {/* 7. Grid Termination Footer with Uptime & Fan Disclaimer */}
      <WorkshopFooter onNavigate={handleNavigate} />

      {/* 8. J.A.R.V.I.S. Floating Holographic AI Interface */}
      <JarvisConsole onNavigate={handleNavigate} />
    </div>
  );
}
