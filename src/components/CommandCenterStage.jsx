import { useState } from "react";
import CommandCenterNav from "./CommandCenterNav";
import CommandCenterHero from "./CommandCenterHero";
import CommandCenterSkills from "./CommandCenterSkills";
import CommandCenterExperience from "./CommandCenterExperience";
import CommandCenterIronHeart from "./CommandCenterIronHeart";
import CommandCenterBottomHub from "./CommandCenterBottomHub";
import CommandCenterProjects from "./CommandCenterProjects";
import CommandCenterContact from "./CommandCenterContact";
import CommandCenterCodebase from "./CommandCenterCodebase";
import CommandCenterJarvis from "./CommandCenterJarvis";
import CommandCenterSpiderMan from "./CommandCenterSpiderMan";

export default function CommandCenterStage({ theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState("home");
  const [highlightedCard, setHighlightedCard] = useState(null);
  const [isOvercharged, setIsOvercharged] = useState(false);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    setHighlightedCard(sectionId);
    setTimeout(() => setHighlightedCard(null), 2500);

    // If on mobile/stacked view, smooth scroll to element
    const el = document.getElementById(`cc-sec-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleOvercharge = () => {
    setIsOvercharged(true);
    setTimeout(() => setIsOvercharged(false), 2600);
  };

  return (
    <div className={`command-center-viewport ${isOvercharged ? "overcharged" : ""}`}>
      {/* 1. Top Navigation Bar */}
      <CommandCenterNav
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* 2. Main High-Tech Workshop Stage */}
      <div className="cc-stage-container">
        {/* Background Workshop Backdrop */}
        <div className="cc-workshop-backdrop" aria-hidden="true">
          <img
            src="/iron-workshop-bg.jpg"
            alt="Stark Industries Workshop Command Center"
            className="cc-bg-image"
          />
          <div className="cc-bg-vignette" />
        </div>

        {/* Dynamic Glowing Energy Conduits / Pipelines Overlay */}
        <div className="cc-live-pipes-overlay" aria-hidden="true">
          <span className="cc-pulse-packet p1" />
          <span className="cc-pulse-packet p2" />
          <span className="cc-pulse-packet p3" />
          <span className="cc-pulse-packet p4" />
        </div>

        {/* Interactive HUD Stations Layer */}
        <div className="cc-hud-overlay-grid">
          {/* Top-Left: Hero / Profile Card */}
          <div id="cc-sec-home" className="cc-grid-zone zone-hero">
            <CommandCenterHero
              onViewProjects={() => handleNavigate("projects")}
              onContact={() => handleNavigate("contact")}
              isHighlighted={highlightedCard === "home" || highlightedCard === "about"}
            />
          </div>

          {/* Left-Middle: Skills Card */}
          <div id="cc-sec-skills" className="cc-grid-zone zone-skills">
            <CommandCenterSkills isHighlighted={highlightedCard === "skills"} />
          </div>

          {/* Bottom-Left: Experience Card */}
          <div id="cc-sec-experience" className="cc-grid-zone zone-experience">
            <CommandCenterExperience isHighlighted={highlightedCard === "experience"} />
            <div className="cc-floor-stencil">FULL STACK DEVELOPER</div>
          </div>

          {/* Center: Triangular Iron Heart Arc Reactor & Maintenance Bay */}
          <div className="cc-grid-zone zone-iron-heart">
            <CommandCenterIronHeart
              isOvercharged={isOvercharged}
              onOvercharge={handleOvercharge}
            />
          </div>

          {/* Bottom-Center: Data Flow & Resume */}
          <div className="cc-grid-zone zone-bottom-hub">
            <CommandCenterBottomHub />
          </div>

          {/* Top-Right: Projects Card */}
          <div id="cc-sec-projects" className="cc-grid-zone zone-projects">
            <CommandCenterProjects isHighlighted={highlightedCard === "projects"} />
          </div>

          {/* Middle-Right: Contact Card */}
          <div id="cc-sec-contact" className="cc-grid-zone zone-contact">
            <CommandCenterContact isHighlighted={highlightedCard === "contact"} />
          </div>

          {/* Bottom-Right: Code Base & Coding Bot */}
          <div className="cc-grid-zone zone-codebase">
            <CommandCenterCodebase />
          </div>

          {/* Far-Right: J.A.R.V.I.S. Assistant */}
          <div className="cc-grid-zone zone-jarvis">
            <CommandCenterJarvis isHighlighted={highlightedCard === "about"} />
          </div>

          {/* Bottom-Right: Spider-Man Web & Mask Corner */}
          <div className="cc-grid-zone zone-spider-bottom">
            <CommandCenterSpiderMan />
          </div>
        </div>
      </div>
    </div>
  );
}
