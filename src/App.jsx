import { useState, useEffect } from "react";
import InstrumentHeader from "./components/InstrumentHeader";
import HeroInstrument from "./components/HeroInstrument";
import SentinelSandbox from "./components/SentinelSandbox";
import MemoryPoolPlayground from "./components/MemoryPoolPlayground";
import ProjectsMatrix from "./components/ProjectsMatrix";
import CapabilityGrid from "./components/CapabilityGrid";
import EngineeringAudit from "./components/EngineeringAudit";
import IncidentSimulator from "./components/IncidentSimulator";
import TelemetryTerminal from "./components/TelemetryTerminal";
import UplinkContact from "./components/UplinkContact";
import InstrumentFooter from "./components/InstrumentFooter";
import WorkstationHUD from "./components/WorkstationHUD";
import { useTheme } from "./hooks/useTheme";
import { useMechanicalSound } from "./hooks/useMechanicalSound";

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const {
    soundEnabled,
    toggleSound,
    playClick,
    playSwitch,
    playRelayTrip,
    playRelayReset,
    playPing,
    playAlarm,
    playSuccessFanfare,
    audioTriggerCount,
  } = useMechanicalSound();

  const [lens, setLens] = useState(() => {
    try {
      return localStorage.getItem("dr-lens") || "executive";
    } catch {
      return "executive";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("dr-lens", lens);
    } catch {
      /* ignore */
    }
  }, [lens]);

  return (
    <div className="workstation-root" style={{ minHeight: "100vh", position: "relative" }}>
      {/* Precision Instrument Header & Perspective Lens Selector */}
      <InstrumentHeader
        lens={lens}
        setLens={setLens}
        theme={theme}
        toggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        playClick={playClick}
        playSwitch={playSwitch}
      />

      <main>
        {/* Technical Dossier & Real-Time Telemetry Readout */}
        <HeroInstrument
          lens={lens}
          setLens={setLens}
          playClick={playClick}
          playSwitch={playSwitch}
        />

        {/* Live Interactive Circuit Breaker Chaos Simulator */}
        <SentinelSandbox
          playClick={playClick}
          playSwitch={playSwitch}
          playRelayTrip={playRelayTrip}
          playRelayReset={playRelayReset}
          playPing={playPing}
        />

        {/* Interactive Go Memory Pool & Goroutine Concurrency Bench */}
        <MemoryPoolPlayground
          playClick={playClick}
          playSwitch={playSwitch}
          playPing={playPing}
        />

        {/* Verified Systems & Architectural Specs Matrix (with Blueprint Inspector) */}
        <ProjectsMatrix
          lens={lens}
          playClick={playClick}
          playPop={playClick}
        />

        {/* Verified Technical Competencies & Engineering Disciplines */}
        <CapabilityGrid
          playClick={playClick}
          playPop={playClick}
        />

        {/* The Systems Audit: Conventional Dev vs. Deepak Rai Systems Architecture */}
        <EngineeringAudit
          playClick={playClick}
          playPop={playClick}
        />

        {/* Live Systems Incident Drill: Interactive Production Failover Challenge */}
        <IncidentSimulator
          playClick={playClick}
          playAlarm={playAlarm}
          playSuccessFanfare={playSuccessFanfare}
        />

        {/* Direct Diagnostic Telemetry Terminal (CLI) */}
        <TelemetryTerminal
          setLens={setLens}
          playClick={playClick}
          playPing={playPing}
          playSwitch={playSwitch}
        />

        {/* Tactical Direct Dispatch Station */}
        <UplinkContact
          playClick={playClick}
          playSuccess={playPing}
        />
      </main>

      {/* Hardware System Specification Footer */}
      <InstrumentFooter playClick={playClick} />

      {/* Live Flight Recorder HUD (FPS Counter, Oscilloscope & Hotkey Assistant) */}
      <WorkstationHUD
        lens={lens}
        setLens={setLens}
        theme={theme}
        toggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        audioTriggerCount={audioTriggerCount}
        playClick={playClick}
        playSwitch={playSwitch}
      />
    </div>
  );
}
