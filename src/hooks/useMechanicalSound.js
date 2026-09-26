import { useState, useEffect, useCallback, useRef } from "react";

// Web Audio API synthesized mechanical instrument clicks (zero audio files, pure code)
export function useMechanicalSound() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem("dr-mech-sound");
      return saved !== null ? saved === "true" : true;
    } catch {
      return true;
    }
  });

  const [audioTriggerCount, setAudioTriggerCount] = useState(0);

  const audioCtxRef = useRef(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const triggerImpulse = useCallback(() => {
    setAudioTriggerCount((c) => c + 1);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("dr-mech-sound", String(soundEnabled));
    } catch {
      /* ignore */
    }
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((v) => !v);
  }, []);

  // Physical mechanical key click (tactile switch)
  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      triggerImpulse();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch {
      /* ignore */
    }
  }, [soundEnabled, getAudioContext, triggerImpulse]);

  // Heavy mechanical switch clack (mode change / toggle)
  const playSwitch = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      triggerImpulse();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      /* ignore */
    }
  }, [soundEnabled, getAudioContext, triggerImpulse]);

  // Electrical Relay trip sound (Circuit Breaker OPEN / ALARM)
  const playRelayTrip = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      triggerImpulse();
      [0, 0.015].forEach((offset, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(idx === 0 ? 800 : 350, ctx.currentTime + offset);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.02);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + offset);
        osc.stop(ctx.currentTime + offset + 0.02);
      });
    } catch {
      /* ignore */
    }
  }, [soundEnabled, getAudioContext, triggerImpulse]);

  // Relay Reset / Healthy chime
  const playRelayReset = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      triggerImpulse();
      [440, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.04, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.08);
      });
    } catch {
      /* ignore */
    }
  }, [soundEnabled, getAudioContext, triggerImpulse]);

  // Telemetry ping / keystroke blip
  const playPing = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      triggerImpulse();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch {
      /* ignore */
    }
  }, [soundEnabled, getAudioContext, triggerImpulse]);

  // Outage alarm buzzer (incident challenge failure)
  const playAlarm = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      triggerImpulse();
      [0, 0.08, 0.16].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(260, ctx.currentTime + offset);
        gain.gain.setValueAtTime(0.05, ctx.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + offset);
        osc.stop(ctx.currentTime + offset + 0.06);
      });
    } catch {
      /* ignore */
    }
  }, [soundEnabled, getAudioContext, triggerImpulse]);

  // Success fanfare (incident challenge solved)
  const playSuccessFanfare = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      triggerImpulse();
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.05, ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.18);
      });
    } catch {
      /* ignore */
    }
  }, [soundEnabled, getAudioContext, triggerImpulse]);

  return {
    soundEnabled,
    toggleSound,
    playClick,
    playSwitch,
    playRelayTrip,
    playRelayReset,
    playPing,
    playAlarm,
    playSuccessFanfare,
    audioTriggerCount,
  };
}
