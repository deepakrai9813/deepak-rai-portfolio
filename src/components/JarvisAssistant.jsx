import { useState, useEffect, useRef } from "react";
import { Zap, Volume2, VolumeX, ArrowUpRight, ShieldCheck, Mail, X } from "./icons";

const JARVIS_KNOWLEDGE = {
  about:
    "Good day, sir. Deepak Rai is a premier Full-Stack & Distributed Systems Architect. He specializes in high-throughput Go backend infrastructure, lock-free concurrency engines, and resilient cloud architectures.",
  sentinel:
    "Project Sentinel is Deepak's flagship distributed reverse proxy built in Go. It features a zero-dependency autonomous 3-state circuit breaker, zero-alloc sync.Pool buffers, and achieved 0.00% packet loss under severe 500ms chaos testing.",
  concurrency:
    "In high-concurrency benchmarks, Deepak's Go architectures handle over 50,000 QPS with sub-10ms P99 tail latencies by utilizing sync.Pool byte buffers and lock-free atomic concurrency, reducing memory churn by 97%.",
  sanbrothers:
    "San Brothers is an enterprise legal compliance web platform architected and deployed by Deepak in production. It achieved Rank #1 on Google search for brand keywords, 0.74s LCP, and maintains 99.99% verified uptime at sanbrothers.co.in.",
  resume:
    "Deepak's verified resume is available for immediate download as a PDF specification. It details his full-stack competencies, Go distributed systems experience, and production achievements.",
  contact:
    "You may establish direct encrypted communication with Deepak at deepakkumar740@gmail.com. He is currently interviewing for Senior Backend, Full-Stack, and Systems Architect roles in Tokyo or Global Remote.",
  default:
    "Understood, sir. Deepak Rai has engineered full-stack platforms, high-concurrency Go proxies, and AI streaming engines with zero compromised availability. How else may I assist your inquiry?",
};

export default function JarvisAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [messages, setMessages] = useState([
    {
      sender: "jarvis",
      text: "All systems online, sir. I am J.A.R.V.I.S., your interactive interface for Deepak Rai's portfolio. How may I assist you?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const eyeRef = useRef(null);

  // Eye tracks cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);

      const clampX = Math.max(-12, Math.min(12, dx * 14));
      const clampY = Math.max(-12, Math.min(12, dy * 14));
      setEyePos({ x: clampX, y: clampY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Web Speech API Voice Synthesis
  const speakText = (text) => {
    if (!soundEnabled || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 0.95;

      // Select British or neutral English voice if available
      const voices = window.speechSynthesis.getVoices();
      const jarvisVoice =
        voices.find(
          (v) =>
            v.name.includes("UK") ||
            v.name.includes("British") ||
            v.name.includes("Oliver") ||
            v.name.includes("George") ||
            v.lang === "en-GB"
        ) || voices.find((v) => v.lang.startsWith("en"));

      if (jarvisVoice) utterance.voice = jarvisVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  const handleQuery = (queryType, customText = "") => {
    const userMsg = customText || getLabelForQuery(queryType);
    const reply = JARVIS_KNOWLEDGE[queryType] || JARVIS_KNOWLEDGE.default;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMsg },
      { sender: "jarvis", text: reply },
    ]);

    speakText(reply);

    // If query is resume, trigger download
    if (queryType === "resume") {
      const a = document.createElement("a");
      a.href = "/Deepak-Kumar-Resume.pdf";
      a.download = "Deepak-Kumar-Resume.pdf";
      a.click();
    }
  };

  const getLabelForQuery = (type) => {
    switch (type) {
      case "about": return "Tell me about Deepak Rai";
      case "sentinel": return "Explain Project Sentinel";
      case "concurrency": return "What is his Go concurrency benchmark?";
      case "sanbrothers": return "What is San Brothers?";
      case "resume": return "Download Deepak's Resume";
      case "contact": return "How do I contact Deepak?";
      default: return "System inquiry";
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const lower = inputText.toLowerCase();
    let query = "default";
    if (lower.includes("sentinel") || lower.includes("proxy")) query = "sentinel";
    else if (lower.includes("concurr") || lower.includes("go") || lower.includes("bench")) query = "concurrency";
    else if (lower.includes("san") || lower.includes("brothers") || lower.includes("legal")) query = "sanbrothers";
    else if (lower.includes("resume") || lower.includes("cv") || lower.includes("pdf")) query = "resume";
    else if (lower.includes("contact") || lower.includes("email") || lower.includes("hire")) query = "contact";
    else if (lower.includes("who") || lower.includes("about") || lower.includes("deepak")) query = "about";

    handleQuery(query, inputText);
    setInputText("");
  };

  return (
    <div className="jarvis-system-dock">
      {/* Floating Interactive JARVIS Eye Trigger */}
      <div
        ref={eyeRef}
        className={`jarvis-eye-capsule ${isOpen ? "active" : ""} ${isSpeaking ? "speaking" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        title="J.A.R.V.I.S. Artificial Intelligence Terminal (Click to activate)"
      >
        {/* Holographic Concentric Eye Reticle */}
        <div className="jarvis-eye-iris">
          <div className="iris-outer-ring" />
          <div className="iris-rotating-aperture" />

          {/* Pupil Tracking Cursor */}
          <div
            className="iris-pupil"
            style={{
              transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
            }}
          >
            <span className="pupil-core" />
            <span className="pupil-glow" />
          </div>

          {/* Audio Pulsing Waves when JARVIS speaks */}
          {isSpeaking && <div className="jarvis-voice-wave" />}
        </div>

        <div className="jarvis-eye-label">
          <span className="jarvis-brand">J.A.R.V.I.S.</span>
          <span className="jarvis-status">{isSpeaking ? "VOICE ACTIVE" : "STARK AI READY"}</span>
        </div>
      </div>

      {/* Expanded Holographic JARVIS HUD Terminal */}
      {isOpen && (
        <div className="jarvis-hud-modal">
          <div className="hud-top-bar">
            <div className="hud-brand-info">
              <span className="hud-arc-icon">◤ J.A.R.V.I.S. ◢</span>
              <span className="hud-subtitle">STARK OS MARK-85 // REASONING CORE</span>
            </div>

            <div className="hud-controls-group">
              {/* Sound Voice Toggle */}
              <button
                type="button"
                className={`btn-hud-sound ${soundEnabled ? "on" : "off"}`}
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  if (soundEnabled) window.speechSynthesis?.cancel();
                }}
                title={soundEnabled ? "Mute JARVIS Voice" : "Enable JARVIS Voice"}
              >
                {soundEnabled ? <Volume2 width={14} height={14} /> : <VolumeX width={14} height={14} />}
                <span>{soundEnabled ? "VOICE: ON" : "VOICE: MUTED"}</span>
              </button>

              <button
                type="button"
                className="btn-hud-close"
                onClick={() => setIsOpen(false)}
                title="Minimize J.A.R.V.I.S."
              >
                <X width={14} height={14} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="hud-messages-scroll">
            {messages.map((m, idx) => (
              <div key={idx} className={`hud-message-row ${m.sender}`}>
                <span className="msg-sender-tag">
                  {m.sender === "jarvis" ? "J.A.R.V.I.S. >" : "USER >"}
                </span>
                <p className="msg-text">{m.text}</p>
              </div>
            ))}
          </div>

          {/* Quick Action Prompt Chips */}
          <div className="hud-quick-pills">
            <button
              type="button"
              className="quick-prompt-pill"
              onClick={() => handleQuery("about")}
            >
              Who is Deepak?
            </button>
            <button
              type="button"
              className="quick-prompt-pill"
              onClick={() => handleQuery("sentinel")}
            >
              Project Sentinel (Go Proxy)
            </button>
            <button
              type="button"
              className="quick-prompt-pill"
              onClick={() => handleQuery("concurrency")}
            >
              50K Concurrency Bench
            </button>
            <button
              type="button"
              className="quick-prompt-pill highlight"
              onClick={() => handleQuery("resume")}
            >
              Download Resume (PDF)
            </button>
            <button
              type="button"
              className="quick-prompt-pill"
              onClick={() => handleQuery("contact")}
            >
              Contact Deepak
            </button>
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleFormSubmit} className="hud-prompt-form">
            <input
              type="text"
              placeholder="Ask JARVIS about Deepak's Go systems, projects, or background..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="hud-prompt-input"
            />
            <button type="submit" className="hud-send-btn">
              <span>DISPATCH</span>
              <ArrowUpRight width={12} height={12} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
