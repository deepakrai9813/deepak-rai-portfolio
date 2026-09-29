import { useTheme } from "./hooks/useTheme";
import SpatialNavbar from "./components/SpatialNavbar";
import SpatialHero from "./components/SpatialHero";
import QuantumLattice3D from "./components/QuantumLattice3D";
import ArchitecturalSystems from "./components/ArchitecturalSystems";
import InteractiveBenchmark from "./components/InteractiveBenchmark";
import EngineeringPhilosophy from "./components/EngineeringPhilosophy";
import SpatialContact from "./components/SpatialContact";
import SpatialFooter from "./components/SpatialFooter";

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();

  return (
    <div className="spatial-portfolio-root">
      {/* Floating Spatial Horizon Capsule Dock */}
      <SpatialNavbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        {/* Kinetic Dimensional Prism & Monolithic Introduction */}
        <SpatialHero />

        {/* 3D Volumetric Distributed Consensus Lattice (Three.js WebGL) */}
        <QuantumLattice3D />

        {/* Flagship Architectural Systems Exhibition */}
        <ArchitecturalSystems />

        {/* Interactive Go Concurrency & Zero-Alloc Memory Benchmark */}
        <InteractiveBenchmark />

        {/* Core Engineering Philosophy & Architectural Doctrine */}
        <EngineeringPhilosophy />

        {/* Direct Uplink & Collaboration Station */}
        <SpatialContact />
      </main>

      {/* Swiss Editorial Architectural Footer */}
      <SpatialFooter />
    </div>
  );
}
