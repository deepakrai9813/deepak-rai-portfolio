import { useState, useEffect, useRef } from "react";
import IronHeartCore from "./IronHeartCore";
import { useMachineStore } from "../store/useMachineStore";
import { speakJarvis, stopSpeaking } from "../utils/speechSystem";
import { playServoClick, playUiChirp, playWebZippingSfx } from "../utils/audioSystem";
import contentData from "../data/content.json";

export default function CommandCenterView({ onOpenProjects, onOpenContact, onSelectProject }) {
  const { isOvercharged, soundEnabled, toggleSound } = useMachineStore();
  const [activeSkill, setActiveSkill] = useState(null);
  const [jarvisDialogue, setJarvisDialogue] = useState(
    "Hey Deepak! Your portfolio is running smoothly. The Iron Heart is at 98% efficiency. Would you like me to show your latest project stats or skills overview?"
  );
  const [isTalkingJarvis, setIsTalkingJarvis] = useState(false);
  const [activeSpeechBot, setActiveSpeechBot] = useState(null);
  const dataFlowCanvasRef = useRef(null);

  // 8 High-Tech Tactile Skills with Official Brand Logos
  const skillsList = [
    {
      id: "react",
      name: "React",
      category: "Frontend",
      level: 96,
      color: "#3ee8ff",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#3ee8ff" strokeWidth="1.6">
          <ellipse cx="12" cy="12" rx="10" ry="4.2" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2.2" fill="#3ee8ff" />
        </svg>
      ),
    },
    {
      id: "node",
      name: "Node.js",
      category: "Backend",
      level: 94,
      color: "#54c256",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#54c256">
          <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm6.5 14.2L12 20l-6.5-3.8V7.8L12 4l6.5 3.8v8.4z" />
          <circle cx="12" cy="12" r="3" fill="#ffffff" />
        </svg>
      ),
    },
    {
      id: "express",
      name: "Express",
      category: "Backend",
      level: 92,
      color: "#ffffff",
      icon: (
        <div className="brand-badge-express">ex</div>
      ),
    },
    {
      id: "mongo",
      name: "MongoDB",
      category: "Database",
      level: 94,
      color: "#47a248",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#47a248">
          <path d="M12 2s-6 6-6 11.5a6 6 0 0012 0C18 8 12 2 12 2zm-.5 19v-7l1-1v8a5.2 5.2 0 01-.5 0z" />
        </svg>
      ),
    },
    {
      id: "html",
      name: "HTML",
      category: "Frontend",
      level: 98,
      color: "#e34f26",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M4 2l1.6 18 6.4 2 6.4-2L20 2H4z" fill="#e34f26" />
          <path d="M12 3.8v16.5l4.8-1.5 1.3-15H12z" fill="#ef652a" />
          <path d="M8 7h8l-.3 3.5H8.3l.3 3.5h7.1l-.6 6.2-3.1.9-3.1-.9-.2-2H6.9l.4 3.7 4.7 1.3 4.7-1.3 1-11.2H8V7z" fill="#ffffff" />
        </svg>
      ),
    },
    {
      id: "css",
      name: "CSS",
      category: "Frontend",
      level: 95,
      color: "#1572b6",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M4 2l1.6 18 6.4 2 6.4-2L20 2H4z" fill="#1572b6" />
          <path d="M12 3.8v16.5l4.8-1.5 1.3-15H12z" fill="#33a9dc" />
          <path d="M8 7h8l-.3 3.5H8.3l.3 3.5h7.1l-.6 6.2-3.1.9-3.1-.9-.2-2H6.9l.4 3.7 4.7 1.3 4.7-1.3 1-11.2H8V7z" fill="#ffffff" />
        </svg>
      ),
    },
    {
      id: "js",
      name: "JavaScript",
      category: "Frontend",
      level: 95,
      color: "#f7df1e",
      icon: (
        <div className="brand-badge-js">JS</div>
      ),
    },
    {
      id: "git",
      name: "Git & GitHub",
      category: "DevOps",
      level: 93,
      color: "#f05032",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
  ];

  // Live Oscilloscope Frequency Waveform Animation for Data Flow
  useEffect(() => {
    const canvas = dataFlowCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let step = 0;

    const drawScope = () => {
      step += 0.05;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Grid background
      ctx.strokeStyle = "rgba(62, 232, 255, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw primary cyan waveform
      ctx.beginPath();
      ctx.strokeStyle = "#3ee8ff";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#3ee8ff";
      ctx.shadowBlur = 8;

      for (let x = 0; x < w; x++) {
        const y =
          h / 2 +
          Math.sin(x * 0.04 + step) * 12 * Math.cos(x * 0.01 + step * 0.5) +
          Math.sin(x * 0.1 - step * 1.5) * 4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary green resonance line
      ctx.beginPath();
      ctx.strokeStyle = "rgba(84, 194, 86, 0.65)";
      ctx.lineWidth = 1.2;
      ctx.shadowColor = "#54c256";
      ctx.shadowBlur = 4;
      for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.cos(x * 0.03 - step * 0.8) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(drawScope);
    };

    drawScope();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleBotClick = (botName, phrase) => {
    if (soundEnabled) playServoClick(true);
    setActiveSpeechBot({ name: botName, phrase });
    setTimeout(() => setActiveSpeechBot(null), 3500);
  };

  const handleTalkToJarvis = () => {
    if (isTalkingJarvis) {
      stopSpeaking();
      setIsTalkingJarvis(false);
      return;
    }

    if (soundEnabled) playUiChirp(true, 920);
    const phrases = [
      "All sectors nominal, sir. The Mark-85 Iron Heart is distributing quantum energy to all cabins.",
      "Deepak has 3+ years of experience engineering high-concurrency systems and autonomous AI pipelines.",
      "San Brothers Corporate Solutions is operating live with a 4.5x onboarding acceleration metric.",
      "Direct transmitter line is secure. Ready to route inquiries to Deepak's primary terminal.",
    ];
    const picked = phrases[Math.floor(Math.random() * phrases.length)];
    setJarvisDialogue(picked);

    if (soundEnabled) {
      setIsTalkingJarvis(true);
      speakJarvis(
        picked,
        () => setIsTalkingJarvis(true),
        () => setIsTalkingJarvis(false)
      );
    }
  };

  return (
    <div className={`command-center-canvas-root ${isOvercharged ? "overcharge-active" : ""}`}>
      {/* 1. TOP NAVIGATION BAR */}
      <header className="command-top-nav" role="banner">
        <div className="nav-brand-lockup">
          <div className="brand-logo-badge">
            <span className="logo-dk">DK</span>
          </div>
          <div className="brand-meta">
            <span className="brand-name">Deepak Kumar</span>
            <span className="brand-role">Full Stack Developer</span>
          </div>
        </div>

        <nav className="nav-links-menu" aria-label="Command Center Sectors">
          <a href="#about" className="nav-item active">Home</a>
          <a href="#about" className="nav-item">About</a>
          <a href="#skills" className="nav-item">Skills</a>
          <a href="#projects" className="nav-item">Projects</a>
          <a href="#experience" className="nav-item">Experience</a>
          <a href="#contact" className="nav-item">Contact</a>
        </nav>

        <div className="nav-right-cluster">
          <button
            type="button"
            className={`audio-status-pill ${soundEnabled ? "on" : "off"}`}
            onClick={toggleSound}
            title={soundEnabled ? "Audio Active: Web Audio Synthesis" : "Enable Sound Effects"}
          >
            <span className="audio-led" />
            <span className="audio-txt">{soundEnabled ? "AUDIO ON" : "AUDIO OFF"}</span>
          </button>
        </div>
      </header>

      {/* 2. SPIDER-MAN 5% CORNER ACCENTS (STRICTLY NO EMOJIS) */}
      {/* Top-Right Corner Web & Nano Mask */}
      <div
        className="corner-spider-web top-right"
        title="Iron Spider Recon Unit — With great code comes great responsibility"
        onClick={() => {
          if (soundEnabled) playWebZippingSfx(true);
        }}
      >
        <svg className="spider-web-mesh" viewBox="0 0 160 160" width="160" height="160">
          <path d="M160,0 L0,0 M160,0 L0,40 M160,0 L0,90 M160,0 L0,160 M160,0 L60,160 M160,0 L110,160 M160,0 L160,160" stroke="rgba(234, 254, 255, 0.35)" strokeWidth="1.2" fill="none" />
          <path d="M130,0 Q120,40 100,50 Q60,70 0,65" stroke="rgba(234, 254, 255, 0.42)" strokeWidth="1.2" fill="none" />
          <path d="M90,0 Q80,60 60,90 Q30,110 0,110" stroke="rgba(234, 254, 255, 0.36)" strokeWidth="1.2" fill="none" />
          <path d="M50,0 Q40,90 20,130 Q10,145 0,150" stroke="rgba(234, 254, 255, 0.3)" strokeWidth="1.2" fill="none" />
        </svg>
        <div className="spider-mask-badge">
          <svg viewBox="0 0 32 32" width="28" height="28">
            <path d="M16,2 C8,2 3,10 3,19 C3,26 12,30 16,30 C20,30 29,26 29,19 C29,10 24,2 16,2 Z" fill="#e8322f" stroke="#f6b93b" strokeWidth="1.5" />
            <polygon points="9,14 14,19 7,20" fill="#ffffff" stroke="#04070d" strokeWidth="1.2" />
            <polygon points="23,14 18,19 25,20" fill="#ffffff" stroke="#04070d" strokeWidth="1.2" />
          </svg>
        </div>
      </div>

      {/* Bottom-Right Corner Web with Spider-Man Motto (NO EMOJIS) */}
      <div className="corner-spider-web bottom-right">
        <svg className="spider-web-mesh" viewBox="0 0 140 140" width="140" height="140">
          <path d="M140,140 L0,140 M140,140 L0,90 M140,140 L0,40 M140,140 L50,0 M140,140 L100,0 M140,140 L140,0" stroke="rgba(234, 254, 255, 0.3)" strokeWidth="1.2" fill="none" />
          <path d="M110,140 Q100,100 80,80 Q50,60 0,70" stroke="rgba(234, 254, 255, 0.38)" strokeWidth="1.2" fill="none" />
          <path d="M70,140 Q60,80 40,50 Q20,30 0,35" stroke="rgba(234, 254, 255, 0.28)" strokeWidth="1.2" fill="none" />
        </svg>
        <div className="spiderman-quote-box">
          <span className="quote-text">With great code comes great responsibility.</span>
          <div className="mini-spidey-icon" title="Iron Spider Recon">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M12,2 C6,2 3,8 3,14 C3,20 9,22 12,22 C15,22 21,20 21,14 C21,8 18,2 12,2 Z" fill="#e8322f" stroke="#f6b93b" strokeWidth="1.5" />
              <polygon points="7,11 10,14 5,15" fill="#ffffff" stroke="#04070d" strokeWidth="0.8" />
              <polygon points="17,11 14,14 19,15" fill="#ffffff" stroke="#04070d" strokeWidth="0.8" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. PROMINENT INDUSTRIAL FLANGED CONDUIT DOCKS */}
      <div className="conduit-bus-lines" aria-hidden="true" />

      {/* 4. MAIN COMMAND CENTER 3-COLUMN SPATIAL GRID */}
      <div className="command-grid-layout">
        {/* ========================================================
            COLUMN 1 (LEFT): HELLO/PROFILE HUD, SKILLS, EXPERIENCE
            ======================================================== */}
        <div className="grid-column left-wing">
          {/* TERMINAL 1: HELLO / PROFILE HUD (Top Left) */}
          <section id="about" className="hud-glass-terminal profile-hud">
            <div className="conduit-dock-flange right" />
            <div className="terminal-inner-frame">
              <div className="hud-corner-bracket tl" />
              <div className="hud-corner-bracket tr" />
              <div className="hud-corner-bracket bl" />
              <div className="hud-corner-bracket br" />

              <div className="profile-hud-header">
                {/* Holographic Avatar Blueprint Portrait of Deepak Kumar */}
                <div className="holo-avatar-frame" title="Deepak Kumar // Mark-85 Bio-Link Active">
                  <img
                    src="/assets/deepak-avatar.jpg"
                    alt="Deepak Kumar Holographic Avatar"
                    className="avatar-photo-img"
                  />
                  <div className="scanline-overlay" />
                  <div className="avatar-hud-reticle" />
                  <span className="avatar-status-pill">SYS // ACTIVE</span>
                </div>

                <div className="profile-hud-titles">
                  <span className="hud-greeting">Hello, I'm</span>
                  <h1 className="hud-name">Deepak Kumar</h1>
                  <span className="hud-role-tag">Full Stack Developer</span>
                </div>
              </div>

              <p className="hud-bio-text">
                I build modern web applications that solve real problems. Specializing in high-performance React architectures, resilient Node.js microservices, and autonomous AI pipelines.
              </p>

              <div className="hud-cta-buttons">
                <button
                  type="button"
                  className="btn-hud primary"
                  onClick={() => onOpenProjects?.()}
                >
                  View My Projects
                </button>
                <button
                  type="button"
                  className="btn-hud secondary"
                  onClick={() => onOpenContact?.()}
                >
                  Contact Me
                </button>
              </div>
            </div>
          </section>

          {/* TERMINAL 2: SKILLS RACK (Mid Left) */}
          <section id="skills" className="hud-glass-terminal skills-hud">
            <div className="conduit-dock-flange right" />
            <div className="terminal-inner-frame">
              <div className="terminal-top-badge">
                <span className="badge-dot" />
                <span className="badge-title">SKILLS</span>
              </div>

              <div className="skills-interactive-rack">
                {skillsList.map((skill) => (
                  <button
                    key={skill.id}
                    type="button"
                    className={`skill-rack-btn ${activeSkill?.id === skill.id ? "active" : ""}`}
                    onClick={() => {
                      if (soundEnabled) playUiChirp(true, 780);
                      setActiveSkill(skill);
                    }}
                    title={`${skill.name} (${skill.category}) — Proficiency: ${skill.level}%`}
                  >
                    <div className="skill-logo-icon">{skill.icon}</div>
                    <span className="skill-btn-label">{skill.name}</span>
                  </button>
                ))}
              </div>

              {activeSkill && (
                <div className="skill-detail-callout">
                  <div className="callout-header">
                    <span className="callout-name">{activeSkill.name}</span>
                    <span className="callout-cat">Sector: {activeSkill.category}</span>
                    <span className="callout-pct">{activeSkill.level}%</span>
                  </div>
                  <div className="callout-bar">
                    <div
                      className="callout-fill"
                      style={{ width: `${activeSkill.level}%`, backgroundColor: activeSkill.color }}
                    />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* TERMINAL 3: EXPERIENCE BAY (Bottom Left) */}
          <section id="experience" className="hud-glass-terminal experience-hud">
            <div className="conduit-dock-flange right" />
            <div className="terminal-inner-frame">
              <div className="terminal-top-badge">
                <span className="badge-dot" />
                <span className="badge-title">EXPERIENCE</span>
                <span className="live-status-pill">Live</span>
              </div>

              <div className="experience-summary-card">
                <div className="exp-corp-row">
                  <div className="corp-badge">SB</div>
                  <div className="corp-meta">
                    <h3 className="corp-title">San Brothers Corporate Solutions</h3>
                    <span className="corp-role">Full Stack Developer</span>
                  </div>
                </div>

                <ul className="exp-bullet-list">
                  <li>Built company secretary services platform with 4.5x onboarding acceleration</li>
                  <li>React frontend + Node.js &amp; MongoDB backend with sub-50ms query cache</li>
                  <li>Deployed on Render with automated CI/CD pipeline and 99.98% uptime</li>
                </ul>
              </div>

              {/* Bot Worker Pushing Features Cart beside Experience */}
              <div
                className="cart-bot-cluster"
                onClick={() => handleBotClick("AEGIS", "Shipping new features... Zero regression testing pass!")}
              >
                <div className="bot-speech-tag">
                  {activeSpeechBot?.name === "AEGIS" ? activeSpeechBot.phrase : "Shipping new features..."}
                </div>
                <div className="stark-armor-bot" title="AEGIS // Click to inspect">
                  <svg viewBox="0 0 32 36" width="26" height="30">
                    <polygon points="8,4 24,4 27,16 5,16" fill="#e8322f" stroke="#f6b93b" strokeWidth="1.2" />
                    <polygon points="10,6 22,6 24,15 8,15" fill="#f6b93b" />
                    <rect x="11" y="9" width="10" height="2.5" rx="1" fill="#3ee8ff" />
                    <rect x="7" y="17" width="18" height="13" rx="2" fill="#e8322f" stroke="#f6b93b" strokeWidth="1" />
                    <circle cx="16" cy="23" r="2.5" fill="#ffffff" stroke="#3ee8ff" strokeWidth="1" />
                  </svg>
                </div>
                <div className="cargo-cart-prop">
                  <span className="cart-wheel w1" />
                  <span className="cart-wheel w2" />
                </div>
              </div>

              {/* Stencil Floor Text */}
              <div className="floor-stencil-text left-stencil">
                <span className="stencil-main">FULL STACK DEVELOPER</span>
                <span className="stencil-sub">DEPLOYMENT RENDER</span>
              </div>
            </div>
          </section>
        </div>

        {/* ========================================================
            COLUMN 2 (CENTER): THE IRON HEART & DATA FLOW TERMINAL
            ======================================================== */}
        <div className="grid-column center-stage">
          {/* THE CENTRAL IRON HEART SUPERSTRUCTURE */}
          <div className="centerpiece-iron-heart-wrapper">
            <IronHeartCore />
          </div>

          {/* TERMINAL: DATA FLOW & RESUME (Bottom Center) */}
          <div className="hud-glass-terminal dataflow-resume-terminal">
            <div className="conduit-dock-flange top" />
            <div className="dataflow-scope-card">
              <div className="scope-header">
                <span className="scope-dot" />
                <span className="scope-title">DATA FLOW</span>
              </div>

              {/* Real-Time Oscilloscope Waveform Canvas */}
              <div className="oscilloscope-screen">
                <canvas
                  ref={dataFlowCanvasRef}
                  width="220"
                  height="48"
                  className="oscilloscope-canvas-el"
                />
              </div>

              <div className="dataflow-channels">
                <span className="ch-active">&bull; Frontend</span>
                <span className="ch-active">&bull; Backend</span>
                <span className="ch-active">&bull; Database</span>
                <span className="ch-active">&bull; API</span>
                <span className="ch-active">&bull; Users</span>
              </div>
            </div>

            {/* Resume Download Action Card */}
            <div className="resume-download-card">
              <a
                href="/Deepak-Kumar-Resume.pdf"
                download="Deepak-Kumar-Resume.pdf"
                className="btn-download-resume"
                title="Download Deepak Kumar's Verified Resume PDF"
              >
                <div className="resume-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3ee8ff" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <polyline points="9 15 12 18 15 15" />
                  </svg>
                </div>
                <div className="resume-text-box">
                  <span className="res-title">RESUME</span>
                  <span className="res-action">Download My Resume</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================
            COLUMN 3 (RIGHT): 2-SUBCOLUMN PANORAMIC LAYOUT
            Inner: Projects (top) + Contact (bottom)
            Outer: J.A.R.V.I.S. (top) + Code Base (bottom)
            ======================================================== */}
        <div className="grid-column right-wing">
          <div className="right-wing-subgrid">
            {/* SUB-COLUMN 1: INNER RIGHT (Projects & Contact) */}
            <div className="right-subcol inner">
              {/* TERMINAL 4: PROJECTS BAY */}
              <section id="projects" className="hud-glass-terminal projects-hud">
                <div className="conduit-dock-flange left" />
                <div className="terminal-inner-frame">
                  <div className="terminal-top-badge">
                    <span className="badge-dot" />
                    <span className="badge-title">PROJECTS</span>
                  </div>

                  <div className="projects-mini-deck">
                    {/* Project 1 */}
                    <div
                      className="project-row-item"
                      onClick={() => onSelectProject?.(contentData.projects[0])}
                    >
                      <div className="project-thumb-box">
                        <span className="thumb-icon">SB</span>
                      </div>
                      <div className="project-row-info">
                        <div className="p-title-line">
                          <span className="p-name">San Brothers</span>
                          <span className="p-live-pill">Live</span>
                        </div>
                        <span className="p-stack">React | MongoDB</span>
                      </div>
                    </div>

                    {/* Project 2 */}
                    <div
                      className="project-row-item"
                      onClick={() => onSelectProject?.(contentData.projects[1])}
                    >
                      <div className="project-thumb-box ai">
                        <span className="thumb-icon">AI</span>
                      </div>
                      <div className="project-row-info">
                        <div className="p-title-line">
                          <span className="p-name">LeadFinder AI™</span>
                          <span className="p-repo-pill">GitHub</span>
                        </div>
                        <span className="p-stack">Next.js | FastAPI</span>
                      </div>
                    </div>

                    {/* Project 3 */}
                    <div
                      className="project-row-item"
                      onClick={() => onSelectProject?.(contentData.projects[2])}
                    >
                      <div className="project-thumb-box cloud">
                        <span className="thumb-icon">NX</span>
                      </div>
                      <div className="project-row-info">
                        <div className="p-title-line">
                          <span className="p-name">Nexus Cloud</span>
                          <span className="p-repo-pill">GitHub</span>
                        </div>
                        <span className="p-stack">Node.js | Redis</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* TERMINAL 6: CONTACT TERMINAL */}
              <section id="contact" className="hud-glass-terminal contact-hud">
                <div className="conduit-dock-flange left" />
                <div className="terminal-inner-frame">
                  <div className="terminal-top-badge">
                    <span className="badge-dot" />
                    <span className="badge-title">CONTACT</span>
                  </div>

                  <div className="contact-quick-rows">
                    <a href="mailto:deepakkumar740@gmail.com" className="contact-line">
                      <div className="c-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3ee8ff" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <div className="c-text">
                        <span className="c-lbl">Email</span>
                        <span className="c-val">deepakkumar740@gmail.com</span>
                      </div>
                    </a>

                    <div className="contact-line">
                      <div className="c-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3ee8ff" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div className="c-text">
                        <span className="c-lbl">Location</span>
                        <span className="c-val">Bahadurgarh, Haryana</span>
                      </div>
                    </div>

                    <a href="https://linkedin.com/in/deepakrai9813" target="_blank" rel="noopener noreferrer" className="contact-line">
                      <div className="c-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3ee8ff" strokeWidth="2">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </div>
                      <div className="c-text">
                        <span className="c-lbl">LinkedIn</span>
                        <span className="c-val">in/deepak-kumar</span>
                      </div>
                    </a>

                    <a href="https://github.com/deepakrai9813" target="_blank" rel="noopener noreferrer" className="contact-line">
                      <div className="c-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3ee8ff" strokeWidth="2">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </div>
                      <div className="c-text">
                        <span className="c-lbl">GitHub</span>
                        <span className="c-val">github.com/deepakrai9813</span>
                      </div>
                    </a>
                  </div>
                </div>
              </section>
            </div>

            {/* SUB-COLUMN 2: OUTER RIGHT (J.A.R.V.I.S. & Code Base) */}
            <div className="right-subcol outer">
              {/* TERMINAL 5: J.A.R.V.I.S. AI ASSISTANT */}
              <section className="hud-glass-terminal jarvis-hud-terminal">
                <div className="conduit-dock-flange left" />
                <div className="terminal-inner-frame">
                  {/* Luminous Cybernetic Hologram Head of J.A.R.V.I.S. */}
                  <div className="jarvis-head-display">
                    <div className="jarvis-hologram-head-frame" title="J.A.R.V.I.S. Neural Core Online">
                      <img
                        src="/assets/jarvis-face.jpg"
                        alt="J.A.R.V.I.S. Cybernetic Hologram"
                        className="jarvis-photo-img"
                      />
                      <div className="jarvis-halo-ring" />
                    </div>
                    <div className="jarvis-meta-badge">
                      <h2 className="jarvis-name">J.A.R.V.I.S.</h2>
                      <span className="jarvis-sub">Your Personal AI Assistant</span>
                    </div>
                  </div>

                  {/* Holographic Speech Bubble Box */}
                  <div className="jarvis-dialogue-screen">
                    <p className="jarvis-quote-text">{jarvisDialogue}</p>
                    <div className="jarvis-wave-meter">
                      <span className={`bar ${isTalkingJarvis ? "talk" : ""}`} />
                      <span className={`bar ${isTalkingJarvis ? "talk" : ""}`} />
                      <span className={`bar ${isTalkingJarvis ? "talk" : ""}`} />
                      <span className={`bar ${isTalkingJarvis ? "talk" : ""}`} />
                      <span className={`bar ${isTalkingJarvis ? "talk" : ""}`} />
                    </div>
                  </div>

                  {/* Voice Interaction Button */}
                  <button
                    type="button"
                    className={`btn-talk-jarvis ${isTalkingJarvis ? "speaking" : ""}`}
                    onClick={handleTalkToJarvis}
                    title="Speak to J.A.R.V.I.S. (Web Speech API Synthesis)"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                    <span>{isTalkingJarvis ? "J.A.R.V.I.S. Speaking..." : "Talk to Jarvis"}</span>
                  </button>
                </div>
              </section>

              {/* TERMINAL 7: CODE BASE / DEVELOPER ENGINE */}
              <section className="hud-glass-terminal codebase-hud">
                <div className="conduit-dock-flange left" />
                <div className="terminal-inner-frame">
                  <div className="terminal-top-badge">
                    <span className="badge-dot" />
                    <span className="badge-title">CODE BASE</span>
                  </div>

                  {/* Holographic Code Snippet Window */}
                  <div className="codebase-editor-screen">
                    <div className="editor-tab">stark-reactor.js</div>
                    <pre className="code-content">
                      <code>{`// Core Quantum Ignition
const starkCore = new Reactor({
  voltage: "3.85 GW",
  uptime: "99.98%"
});
starkCore.connect();`}</code>
                    </pre>
                  </div>

                  {/* Bot Worker Coding on Server Station */}
                  <div
                    className="code-bot-station"
                    onClick={() => handleBotClick("PIXEL", "Code is life! Compiling React 19 concurrent mode...")}
                  >
                    <div className="bot-speech-tag coder">
                      {activeSpeechBot?.name === "PIXEL" ? activeSpeechBot.phrase : "Code is life!"}
                    </div>
                    <div className="stark-armor-bot coder-bot" title="PIXEL // Click for dialogue">
                      <svg viewBox="0 0 32 36" width="24" height="28">
                        <polygon points="8,4 24,4 27,16 5,16" fill="#e8322f" stroke="#f6b93b" strokeWidth="1.2" />
                        <polygon points="10,6 22,6 24,15 8,15" fill="#f6b93b" />
                        <rect x="11" y="9" width="10" height="2.5" rx="1" fill="#3ee8ff" />
                        <rect x="7" y="17" width="18" height="13" rx="2" fill="#e8322f" stroke="#f6b93b" strokeWidth="1" />
                        <circle cx="16" cy="23" r="2.5" fill="#ffffff" stroke="#3ee8ff" strokeWidth="1" />
                      </svg>
                    </div>
                    <div className="laptop-prop">
                      <div className="laptop-screen" />
                    </div>
                  </div>

                  <div className="build-status-tags">
                    <span className="build-tag">&bull; BUILD</span>
                    <span className="build-tag">&bull; TEST</span>
                    <span className="build-tag">&bull; DEPLOY</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
