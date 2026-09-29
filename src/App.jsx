import { useTheme } from "./hooks/useTheme";
import AwwwardsNavbar from "./components/AwwwardsNavbar";
import AwwwardsHero from "./components/AwwwardsHero";
import AwwwardsNeuralCore3D from "./components/AwwwardsNeuralCore3D";
import AwwwardsBentoGrid from "./components/AwwwardsBentoGrid";
import AwwwardsConcurrencyLab from "./components/AwwwardsConcurrencyLab";
import AwwwardsManifesto from "./components/AwwwardsManifesto";
import AwwwardsContact from "./components/AwwwardsContact";
import AwwwardsFooter from "./components/AwwwardsFooter";

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();

  return (
    <div className="awwwards-portfolio-root">
      {/* Uiverse Floating Island Capsule Dock */}
      <AwwwardsNavbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        {/* Cinematic Awwwards Hero & Holographic Bento Monolith (Deepak's 2D Photo) */}
        <AwwwardsHero />

        {/* 3D Volumetric Distributed Neural Core (Three.js WebGL) */}
        <AwwwardsNeuralCore3D />

        {/* The Bento Architectural Systems Exhibition */}
        <AwwwardsBentoGrid />

        {/* Uiverse Concurrency & Zero-Alloc Memory Lab */}
        <AwwwardsConcurrencyLab />

        {/* Core Architectural Manifesto */}
        <AwwwardsManifesto />

        {/* Direct Dispatch & Collaboration Station */}
        <AwwwardsContact />
      </main>

      {/* Monumental Cinematic Signoff Footer */}
      <AwwwardsFooter />
    </div>
  );
}
