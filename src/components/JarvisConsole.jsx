import { useState, useRef, useEffect } from "react";
import { useMachineStore } from "../store/useMachineStore";
import { speakJarvis, stopSpeaking, initSpeechRecognition } from "../utils/speechSystem";
import { playUiChirp, playServoClick } from "../utils/audioSystem";
import contentData from "../data/content.json";

export default function JarvisConsole({ onNavigate }) {
  const {
    isOvercharged,
    overchargeReactor,
    soundEnabled,
    jarvisMode,
    setJarvisMode,
    jarvisMessages,
    addJarvisMessage,
  } = useMachineStore();

  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [jarvisMessages, isOpen]);

  // Handle User Message & Knowledge Base lookup
  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    // Add user message
    addJarvisMessage("user", query);
    setInputText("");
    setJarvisMode("thinking");

    if (soundEnabled) {
      playUiChirp(true, 750);
    }

    // Process intelligence
    setTimeout(() => {
      const q = query.toLowerCase();
      let response = "";

      if (q.includes("overcharge") || q.includes("reactor") && q.includes("power")) {
        overchargeReactor();
        response = "Arc Reactor output increased to 145%. Discharging quantum energy surge across all distribution pipelines!";
      } else if (q.includes("experience") || q.includes("career") || q.includes("background") || q.includes("san brothers")) {
        response = `Deepak has 3+ years of full-stack software engineering experience. Currently at San Brothers Corporate Solutions, where he architected the corporate customer onboarding portal and cut p95 database response times by 60%. Prior to that, he delivered 6+ production web applications as an independent consultant.`;
      } else if (q.includes("project") || q.includes("portfolio") || q.includes("leadfinder") || q.includes("work")) {
        response = `Deepak's notable projects include: 1) San Brothers Corporate Solutions (4.5x onboarding acceleration); 2) LeadFinder AI™ (autonomous LLM prospect discovery engine); 3) Nexus Cloud Engine (distributed WebSocket cluster supporting 50k+ connections); and 4) CodeCraft Cloud Studio (<200ms WebAssembly sandbox).`;
      } else if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language")) {
        response = `Deepak's core stack spans React 19/Next.js 15, TypeScript, Node.js/Express, Python/FastAPI, MongoDB, PostgreSQL, Redis, Docker, and AWS Cloud infrastructure.`;
      } else if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("message")) {
        onNavigate?.("contact");
        response = `You can connect with Deepak directly at deepakkumar740@gmail.com, or through his verified GitHub (deepakrai9813) and LinkedIn profiles. I have navigated to Sector 05 for your convenience.`;
      } else if (q.includes("hello") || q.includes("hi") || q.includes("jarvis") || q.includes("who are you")) {
        response = `Greetings. I am J.A.R.V.I.S., running on Deepak Kumar's Mark-85 portfolio core. I am here to assist your inspection of his architecture, code, and systems.`;
      } else {
        response = `Understood, sir. Deepak is an engineer focused on resilient distributed architectures, sub-50ms latency systems, and production AI pipelines. Would you like me to highlight his projects or contact terminal?`;
      }

      addJarvisMessage("jarvis", response);
      setJarvisMode("speaking");

      if (soundEnabled) {
        speakJarvis(
          response,
          () => setJarvisMode("speaking"),
          () => setJarvisMode("idle")
        );
      } else {
        setTimeout(() => setJarvisMode("idle"), 1200);
      }
    }, 450);
  };

  const handleVoiceToggle = () => {
    if (isVoiceActive) {
      recognitionRef.current?.stop();
      setIsVoiceActive(false);
      setJarvisMode("idle");
    } else {
      const rec = initSpeechRecognition(
        (transcript) => {
          setIsVoiceActive(false);
          handleSendMessage(transcript);
        },
        () => {
          setIsVoiceActive(false);
          setJarvisMode("idle");
        }
      );
      if (rec) {
        recognitionRef.current = rec;
        rec.start();
        setIsVoiceActive(true);
        setJarvisMode("listening");
      }
    }
  };

  const toggleConsole = () => {
    if (soundEnabled) playServoClick(true);
    setIsOpen(!isOpen);
  };

  return (
    <div className="jarvis-system-wrapper" aria-label="J.A.R.V.I.S. AI Interface">
      {/* Floating HUD Orb Trigger */}
      <button
        type="button"
        className={`jarvis-floating-orb ${isOpen ? "active" : ""} ${isOvercharged ? "overcharge-glow" : ""}`}
        onClick={toggleConsole}
        title="J.A.R.V.I.S. Protocol — Click to converse"
        aria-expanded={isOpen}
      >
        <div className="orb-iris-mechanism">
          {/* 24-Blade Holographic Iris SVG */}
          <svg className="iris-svg" viewBox="0 0 100 100" width="48" height="48">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#1d3654" strokeWidth="2" />
            <circle cx="50" cy="50" r="38" fill="#04070d" stroke="#3ee8ff" strokeWidth="1.5" strokeDasharray="3 3" />
            
            {/* Rotating Iris Petals */}
            <g className="iris-blades">
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 34 * Math.cos((i * Math.PI) / 6)}
                  y2={50 + 34 * Math.sin((i * Math.PI) / 6)}
                  stroke="#3ee8ff"
                  strokeWidth="1.2"
                  opacity="0.65"
                />
              ))}
            </g>

            {/* Glowing Core Pupil */}
            <circle
              cx="50"
              cy="50"
              r={jarvisMode === "speaking" ? 14 : jarvisMode === "thinking" ? 12 : 9}
              fill={jarvisMode === "speaking" ? "#eafeff" : "#3ee8ff"}
              className={`orb-core ${jarvisMode}`}
            />
          </svg>
        </div>

        <div className="orb-status-text">
          <span className="orb-callsign">J.A.R.V.I.S.</span>
          <span className="orb-state">{jarvisMode.toUpperCase()}</span>
        </div>
      </button>

      {/* Expandable Holographic Chat Console */}
      {isOpen && (
        <div className="jarvis-console-window" role="dialog" aria-modal="true" aria-label="J.A.R.V.I.S. Command Interface">
          {/* HUD Header Bar */}
          <div className="console-hud-header">
            <div className="hud-title-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3ee8ff" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <div className="hud-label">
                <span className="hud-main">J.A.R.V.I.S. INTERFACE</span>
                <span className="hud-sub">MARK-85 ARCHITECTURE // VERIFIED</span>
              </div>
            </div>

            <div className="hud-actions">
              <span className="hud-pill">ONLINE</span>
              <button
                type="button"
                className="hud-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close J.A.R.V.I.S. console"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Action Chips */}
          <div className="console-quick-prompts">
            {contentData.jarvis.suggestedPrompts.slice(0, 4).map((prompt, i) => (
              <button
                key={i}
                type="button"
                className="quick-chip"
                onClick={() => handleSendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="console-messages-viewport">
            {jarvisMessages.map((msg, index) => (
              <div key={index} className={`console-msg ${msg.sender}`}>
                <div className="msg-meta">
                  <span className="msg-sender-name">
                    {msg.sender === "jarvis" ? "J.A.R.V.I.S." : "ENGINEER"}
                  </span>
                </div>
                <div className="msg-body">
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input & Voice Controls */}
          <form
            className="console-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            {/* Microphone Button */}
            <button
              type="button"
              className={`mic-btn ${isVoiceActive ? "listening" : ""}`}
              onClick={handleVoiceToggle}
              title={isVoiceActive ? "Listening... click to stop" : "Voice input"}
              aria-label="Voice input"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about architecture, projects, or say 'Overcharge'..."
              className="console-text-input"
            />

            {/* Send Button */}
            <button type="submit" className="send-btn" aria-label="Send message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
