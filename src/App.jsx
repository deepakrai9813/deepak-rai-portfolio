import { useState } from "react";
import { useTheme } from "./hooks/useTheme";
import StarkNavbar from "./components/StarkNavbar";
import StarkHero from "./components/StarkHero";
import EnergyConduits from "./components/EnergyConduits";
import BotWorkersNetwork from "./components/BotWorkersNetwork";
import JarvisAssistant from "./components/JarvisAssistant";
import SpiderWebCorner from "./components/SpiderWebCorner";
import StarkProjectsCabin from "./components/StarkProjectsCabin";
import StarkConcurrencyCabin from "./components/StarkConcurrencyCabin";
import StarkUplinkCabin from "./components/StarkUplinkCabin";
import StarkFooter from "./components/StarkFooter";

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const [isOvercharged, setIsOvercharged] = useState(false);

  const handleOvercharge = () => {
    setIsOvercharged(true);
    setTimeout(() => setIsOvercharged(false), 2600);
  };

  return (
    <div className="stark-portfolio-root">
      {/* 5% Spider-Man Realistic Corner Webs */}
      <SpiderWebCorner />

      {/* Visible Active Energy & Data Pipelines Connected to the Central Arc Reactor */}
      <EnergyConduits isOvercharged={isOvercharged} />

      {/* Autonomous Bot Workers Patrolling and Interacting across the Page */}
      <BotWorkersNetwork />

      {/* J.A.R.V.I.S. Interactive AI Assistant with Animated Eye & Voice Synthesis */}
      <JarvisAssistant />

      {/* Stark Industries Armor Console Navigation Bar */}
      <StarkNavbar
        theme={theme}
        toggleTheme={toggleTheme}
        isOvercharged={isOvercharged}
      />

      <main>
        {/* Hero Section featuring the Central Arc Reactor ("Iron Heart") & Deepak's 2D Portrait */}
        <StarkHero
          onOvercharge={handleOvercharge}
          isOvercharged={isOvercharged}
        />

        {/* Cabin 01: Full-Stack Stark Armory & Systems */}
        <StarkProjectsCabin />

        {/* Cabin 02: Go Concurrency & Propulsion Bench */}
        <StarkConcurrencyCabin />

        {/* Cabin 03: Direct Transmission Uplink */}
        <StarkUplinkCabin />
      </main>

      {/* Stark Industries Specifications Footer */}
      <StarkFooter />
    </div>
  );
}
