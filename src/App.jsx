import { useEffect, useState, useCallback } from "react";
import { MotionConfig } from "framer-motion";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Works from "./components/Works";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CommandPalette from "./components/CommandPalette";
import Toast from "./components/Toast";
import { useTheme } from "./hooks/useTheme";
import { useSound } from "./hooks/useSound";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export default function App() {
  useSmoothScroll(true);

  const { theme, toggle: toggleTheme, accent, changeAccent, accents } = useTheme();
  const {
    soundEnabled,
    toggleSound,
    playClick,
    playPop,
    playTone,
    playSuccess,
  } = useSound();

  const [cmdOpen, setCmdOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [highlightedSkill, setHighlightedSkill] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const showToast = useCallback((toastData) => {
    setToast(toastData);
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  // When a skill tag is clicked in Skills section, set filter and smoothly scroll to Works
  const handleSkillClick = useCallback(
    (skillName) => {
      setHighlightedSkill(skillName);
      if (skillName) {
        showToast({
          type: "info",
          title: "Skill Filter Active",
          message: `Showing projects using "${skillName}"`,
        });
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [showToast]
  );

  const handleSelectProjectFromCmd = useCallback((projId) => {
    setSelectedProjectId(projId);
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Always open at the very top on reload
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div id="top">
        <Preloader />
        <ScrollProgress />
        
        <Nav
          theme={theme}
          toggleTheme={toggleTheme}
          accent={accent}
          changeAccent={changeAccent}
          accents={accents}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
          onOpenCommandPalette={setCmdOpen}
          playClick={playClick}
          showToast={showToast}
        />

        <main>
          <Hero
            onOpenCommandPalette={setCmdOpen}
            playClick={playClick}
          />
          <Marquee />
          <About playPop={playPop} />
          <Skills
            onSkillClick={handleSkillClick}
            highlightedSkill={highlightedSkill}
            playPop={playPop}
          />
          <Works
            selectedProjectId={selectedProjectId}
            onOpenProjectModal={setSelectedProjectId}
            highlightedSkill={highlightedSkill}
            playPop={playPop}
          />
          <Testimonials />
          <Contact
            showToast={showToast}
            playSuccess={playSuccess}
            playClick={playClick}
          />
        </main>

        <Footer />
        <BackToTop />

        {/* Global Command Palette (Cmd+K / Ctrl+K) */}
        <CommandPalette
          isOpen={cmdOpen}
          onClose={setCmdOpen}
          theme={theme}
          toggleTheme={toggleTheme}
          accent={accent}
          changeAccent={changeAccent}
          accents={accents}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
          playClick={playClick}
          playSuccess={playSuccess}
          showToast={showToast}
          onSelectProject={handleSelectProjectFromCmd}
        />

        {/* Global Toast Notifications */}
        <Toast toast={toast} onClose={closeToast} />
      </div>
    </MotionConfig>
  );
}
