import { useState, useEffect } from "react";
import InstrumentHeader from "./components/InstrumentHeader";
import HeroInstrument from "./components/HeroInstrument";
import SentinelSandbox from "./components/SentinelSandbox";
import ProjectsMatrix from "./components/ProjectsMatrix";
import CapabilityGrid from "./components/CapabilityGrid";
import TelemetryTerminal from "./components/TelemetryTerminal";
import UplinkContact from "./components/UplinkContact";
import InstrumentFooter from "./components/InstrumentFooter";
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
    <div className="workstation-root" style={{ minHeight: "100vh" }}>
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

        {/* Verified Systems & Architectural Specs Matrix */}
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
    </div>
  );
}
