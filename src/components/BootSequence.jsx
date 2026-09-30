import { useState, useEffect } from "react";
import { useMachineStore } from "../store/useMachineStore";
import { playUiChirp, playOverchargeSfx } from "../utils/audioSystem";

const BOOT_LOGS = [
  "INITIALIZING MARK-85 QUANTUM PROCESSOR DIE...",
  "ENERGIZING 10 COPPER HARMONIC INDUCTION COILS...",
  "PRESSURIZING CYAN DATA & GOLD POWER CONDUITS...",
  "DISPATCHING 8 AUTOMATED BOT CREW WORKERS...",
  "CALIBRATING VERLET SPIDER RECON MESH...",
  "ENGAGING J.A.R.V.I.S. QUANTUM INTELLIGENCE...",
  "ALL SYSTEMS FULLY OPERATIONAL. GRID ONLINE.",
];

export default function BootSequence({ onComplete }) {
  const { soundEnabled } = useMachineStore();
  const [logIndex, setLogIndex] = useState(0);
  const [progress, setProgress] = useState(12);

  const handleSkip = () => {
    if (soundEnabled) playUiChirp(true, 1040);
    onComplete?.();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.code === "Space") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => {
        const next = prev + 1;
        if (next >= BOOT_LOGS.length) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 400);
          return prev;
        }
        return next;
      });
      setProgress((p) => Math.min(p + 15, 100));
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="boot-sequence-overlay" role="dialog" aria-modal="true" aria-label="System Boot Sequence">
      <div className="boot-terminal-box">
        {/* Arc Core Emblem */}
        <div className="boot-emblem-wrap">
          <svg className="boot-reactor-svg" viewBox="0 0 100 100" width="80" height="80">
            <polygon points="50,6 90,28 90,72 50,94 10,72 10,28" fill="none" stroke="#1d3654" strokeWidth="3" />
            <circle cx="50" cy="50" r="32" fill="none" stroke="#3ee8ff" strokeWidth="2.5" strokeDasharray="6 4" />
            <circle cx="50" cy="50" r="16" fill="#04070d" stroke="#f6b93b" strokeWidth="2" />
            <circle cx="50" cy="50" r="8" fill="#eafeff" />
          </svg>
        </div>

        <div className="boot-header-text">
          <h2 className="boot-title">STARK INDUSTRIES // MARK-85</h2>
          <p className="boot-subtitle">PORTFOLIO QUANTUM GRID IGNITION</p>
        </div>

        {/* Progress Bar */}
        <div className="boot-progress-track">
          <div className="boot-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Diagnostic Logs Stream */}
        <div className="boot-logs-console">
          {BOOT_LOGS.slice(0, logIndex + 1).map((log, i) => (
            <div key={i} className="boot-log-line">
              <span className="log-prefix">&gt;</span>
              <span className="log-text">{log}</span>
            </div>
          ))}
        </div>

        {/* Skip Action Button */}
        <div className="boot-actions">
          <button type="button" className="boot-skip-btn" onClick={handleSkip}>
            <span>BYPASS INITIALIZATION</span>
            <kbd className="boot-kbd">[ESC / SPACE]</kbd>
          </button>
        </div>
      </div>
    </div>
  );
}
