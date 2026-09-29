import { useState, useEffect } from "react";

export default function CommandCenterJarvis({ isHighlighted }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);

  const jarvisLines = [
    "Hey Deepak! Your portfolio is running smoothly. The Iron Heart is at 98% efficiency. Would you like me to show your latest project stats or skills overview?",
    "All systems nominal, sir. Project Sentinel proxy achieved 0.00% packet loss, and San Brothers is running live at 99.99% uptime.",
    "Arc conduits are routing data pulses across all 8 skill modules and the Go propulsion bench.",
  ];

  const handleTalkToJarvis = () => {
    const textToSpeak = jarvisLines[currentLineIdx];
    setCurrentLineIdx((prev) => (prev + 1) % jarvisLines.length);

    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 1.05;
        utterance.pitch = 0.95;

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
    }
  };

  return (
    <div className={`cc-jarvis-station ${isHighlighted ? "highlighted" : ""}`}>
      {/* 1. Holographic Avatar Face */}
      <div className="cc-jarvis-avatar-container">
        <div className={`cc-jarvis-holo-head ${isSpeaking ? "speaking" : ""}`}>
          <svg viewBox="0 0 100 120" className="cc-jarvis-face-svg">
            <defs>
              <linearGradient id="jarvisGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {/* Cybernetic Head Contour */}
            <path
              d="M 50,15 C 28,15 22,35 22,60 C 22,85 35,108 50,112 C 65,108 78,85 78,60 C 78,35 72,15 50,15 Z"
              fill="url(#jarvisGlow)"
              stroke="#38bdf8"
              strokeWidth="1.5"
            />
            {/* Forehead Circuit Plate */}
            <path d="M 40,25 L 50,32 L 60,25" fill="none" stroke="#7dd3fc" strokeWidth="1.2" />
            <circle cx="50" cy="32" r="2.5" fill="#ffffff" />
            {/* Glowing Eyes */}
            <ellipse cx="36" cy="55" rx="5" ry="3.5" fill="#ffffff" filter="drop-shadow(0 0 4px #00e5ff)" />
            <ellipse cx="64" cy="55" rx="5" ry="3.5" fill="#ffffff" filter="drop-shadow(0 0 4px #00e5ff)" />
            {/* Nose & Mouth Geometric lines */}
            <line x1="50" y1="58" x2="50" y2="72" stroke="#7dd3fc" strokeWidth="1" />
            <line x1="44" y1="84" x2="56" y2="84" stroke="#7dd3fc" strokeWidth="1.5" />
            {/* Side Node Ears */}
            <circle cx="19" cy="62" r="4.5" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="81" cy="62" r="4.5" fill="none" stroke="#38bdf8" strokeWidth="2" />
          </svg>
        </div>

        <div className="cc-jarvis-title-block">
          <span className="cc-jarvis-name">J.A.R.V.I.S.</span>
          <span className="cc-jarvis-role">Your Personal AI Assistant</span>
        </div>
      </div>

      {/* 2. Holographic Chatbox Terminal */}
      <div className="cc-panel cc-jarvis-chatbox">
        <div className="cc-chat-speech">
          <p className="cc-chat-greeting">Hey Deepak! 👋</p>
          <p className="cc-chat-p">
            Your portfolio is running smoothly. The Iron Heart is at 98% efficiency.
          </p>
          <p className="cc-chat-p">
            Would you like me to show your latest project stats or skills overview?
          </p>
        </div>

        {/* Audio Waveform Visualizer */}
        <div className={`cc-jarvis-audio-wave ${isSpeaking ? "active" : ""}`}>
          <span className="wave-bar b1" />
          <span className="wave-bar b2" />
          <span className="wave-bar b3" />
          <span className="wave-bar b4" />
          <span className="wave-bar b5" />
          <span className="wave-bar b6" />
          <span className="wave-bar b7" />
          <span className="wave-bar b8" />
          <span className="wave-bar b9" />
          <span className="wave-bar b10" />
        </div>

        {/* Talk To Jarvis Action Button */}
        <button
          type="button"
          className="cc-btn-talk-jarvis"
          onClick={handleTalkToJarvis}
          title="Click to talk with J.A.R.V.I.S."
        >
          <span className="cc-mic-icon">🎙️</span>
          <span>{isSpeaking ? "J.A.R.V.I.S. Speaking..." : "Talk to Jarvis"}</span>
        </button>
      </div>
    </div>
  );
}
