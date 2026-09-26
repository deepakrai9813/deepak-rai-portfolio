import { useState, useEffect, useRef } from "react";
import { Zap, Activity } from "./icons";

export default function WorkstationHUD({
  lens,
  setLens,
  theme,
  toggleTheme,
  soundEnabled,
  toggleSound,
  audioTriggerCount,
  playClick,
  playSwitch,
}) {
  const [fps, setFps] = useState(60);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [domNodes, setDomNodes] = useState(240);
  const [showHotkeys, setShowHotkeys] = useState(false);
  const [audioPulse, setAudioPulse] = useState(false);

  // FPS Counter
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    let animId;
    const calcFps = (now) => {
      frameCountRef.current++;
      if (now - lastTimeRef.current >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current)));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
        setDomNodes(document.querySelectorAll("*").length);
      }
      animId = requestAnimationFrame(calcFps);
    };
    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Session Stopwatch
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSec((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Audio Pulse Trigger
  useEffect(() => {
    if (audioTriggerCount > 0) {
      setAudioPulse(true);
      const t = setTimeout(() => setAudioPulse(false), 200);
      return () => clearTimeout(t);
    }
  }, [audioTriggerCount]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input or textarea
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      const key = e.key.toLowerCase();
      if (key === "1") {
        playSwitch?.();
        setLens("executive");
      } else if (key === "2") {
        playSwitch?.();
        setLens("architect");
      } else if (key === "3") {
        playSwitch?.();
        setLens("terminal");
        document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" });
      } else if (key === "c") {
        playClick?.();
        document.getElementById("sentinel-lab")?.scrollIntoView({ behavior: "smooth" });
      } else if (key === "m") {
        playSwitch?.();
        toggleSound();
      } else if (key === "l") {
        playClick?.();
        toggleTheme();
      } else if (key === "?" || key === "/") {
        e.preventDefault();
        playClick?.();
        setShowHotkeys((v) => !v);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setLens, toggleSound, toggleTheme, playClick, playSwitch]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `T+${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
        zIndex: 998,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "8px",
        pointerEvents: "auto",
      }}
    >
      {/* Hotkeys Drawer Modal */}
      {showHotkeys && (
        <div
          style={{
            border: "1px solid var(--border-strong)",
            backgroundColor: "var(--bg-canvas)",
            boxShadow: "var(--btn-shadow)",
            padding: "16px",
            width: "280px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            marginBottom: "6px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid var(--border-base)",
              paddingBottom: "8px",
              marginBottom: "10px",
              fontWeight: 700,
              color: "var(--text-high)",
            }}
          >
            <span>[HOTKEY ASSISTANT]</span>
            <button
              type="button"
              onClick={() => setShowHotkeys(false)}
              style={{ color: "var(--text-dim)", cursor: "pointer" }}
            >
              [ESC ×]
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px", color: "var(--text-med)" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--signal-green)" }}>KEY 1</span>
              <span>Executive Lens</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--signal-green)" }}>KEY 2</span>
              <span>Architect Lens</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--signal-green)" }}>KEY 3</span>
              <span>Terminal Mode</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--signal-green)" }}>KEY C</span>
              <span>Chaos Simulator</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--signal-green)" }}>KEY M</span>
              <span>Toggle Audio ({soundEnabled ? "ON" : "OFF"})</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--signal-green)" }}>KEY L</span>
              <span>Toggle Theme ({theme.toUpperCase()})</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--signal-green)" }}>KEY ?</span>
              <span>Toggle Hotkey HUD</span>
            </div>
          </div>
        </div>
      )}

      {/* Main HUD Bar */}
      <div
        style={{
          border: "1px solid var(--border-base)",
          backgroundColor: "var(--bg-surface)",
          boxShadow: "var(--panel-shadow)",
          padding: "6px 12px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-dim)",
        }}
      >
        {/* Oscilloscope bars */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "12px" }}>
          {[8, 12, 6, 14, 10].map((h, i) => (
            <div
              key={i}
              style={{
                width: "3px",
                height: audioPulse ? `${h}px` : "3px",
                backgroundColor: audioPulse ? "var(--signal-green)" : "var(--border-strong)",
                transition: "height 0.1s ease",
              }}
            />
          ))}
        </div>

        {/* FPS */}
        <div style={{ color: fps >= 55 ? "var(--signal-green)" : "var(--signal-amber)", fontWeight: 700 }}>
          {fps} FPS
        </div>

        <span>//</span>

        {/* Stopwatch */}
        <div style={{ color: "var(--text-high)" }}>{formatTime(elapsedSec)}</div>

        <span>//</span>

        {/* Nodes */}
        <div>{domNodes} DOM</div>

        {/* Hotkeys Toggle Button */}
        <button
          type="button"
          className="btn-mech-outline"
          style={{ padding: "2px 6px", fontSize: "10px", marginLeft: "4px" }}
          onClick={() => {
            playClick?.();
            setShowHotkeys((v) => !v);
          }}
          title="Press '?' on keyboard for hotkey shortcuts"
        >
          [?] KEYS
        </button>
      </div>
    </div>
  );
}
