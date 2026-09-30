import { create } from "zustand";

export const useMachineStore = create((set, get) => ({
  // Machine & Reactor State
  powerState: "normal", // 'off' | 'igniting' | 'normal' | 'overcharge' | 'maintenance'
  heartbeatPhase: 0, // 0 to 1 cycle
  heartbeatTick: 0, // integer count of beats
  isBooted: true, // boot sequence complete
  bootProgress: 100, // 0 to 100
  powerLevel: 100, // 0 to 100
  coreHealth: 98,
  coreTempK: 310,
  isOvercharged: false,

  // Audio & Voice
  soundEnabled: false,
  isSpeaking: false,
  isListening: false,
  audioMuted: true,

  // Network & Cabins
  poweredCabins: {
    "reactor-control": true,
    "mission-control": true,
    "frontend-lab": true,
    "api-gateway": true,
    "database-vault": true,
    "devops-deck": true,
    "security-bay": true,
    "qa-lab": true,
    "design-studio": true,
    "skills-hub": true,
    "projects-bay": true,
    "experience-grid": true,
    "contact-terminal": true,
  },
  activePackets: [], // [{ id, from, to, type, progress, color }]
  pipeVibration: 0,

  // Bots State
  botStates: {
    SPARK: { status: "inspecting", currentCabin: "reactor-control", x: 0, y: 0, z: 0, toolActive: true },
    PIXEL: { status: "coding", currentCabin: "frontend-lab", x: -280, y: -160, z: 0, toolActive: true },
    ROOT: { status: "routing", currentCabin: "api-gateway", x: 280, y: -160, z: 0, toolActive: true },
    QUERY: { status: "indexing", currentCabin: "database-vault", x: -320, y: 140, z: 0, toolActive: true },
    KUBO: { status: "welding", currentCabin: "devops-deck", x: 320, y: 140, z: 0, toolActive: true },
    AEGIS: { status: "scanning", currentCabin: "security-bay", x: -180, y: 320, z: 0, toolActive: true },
    BUGSY: { status: "testing", currentCabin: "qa-lab", x: 180, y: 320, z: 0, toolActive: true },
    NOVA: { status: "designing", currentCabin: "mission-control", x: 0, y: 220, z: 0, toolActive: true },
  },
  highlightedBot: null,
  activeSpeechBubble: null, // { botId, text, timeoutId }

  // JARVIS State
  jarvisMode: "idle", // 'idle' | 'listening' | 'thinking' | 'speaking'
  jarvisMessages: [
    {
      sender: "jarvis",
      text: "Good day, sir. Systems operational at 100%. The Mark-85 Arc Reactor is distributing power to all engineering sectors.",
      timestamp: Date.now(),
    },
  ],

  // Actions
  triggerHeartbeat: () => {
    set((state) => ({
      heartbeatTick: state.heartbeatTick + 1,
      heartbeatPhase: 0,
    }));
  },

  overchargeReactor: () => {
    if (get().isOvercharged) return;
    set({
      powerState: "overcharge",
      isOvercharged: true,
      powerLevel: 145,
      coreTempK: 420,
    });

    // Add overcharge packet burst
    const burst = [
      { id: `pkt-oc-1-${Date.now()}`, from: "reactor", to: "frontend-lab", type: "BURST", progress: 0, color: "#eafeff" },
      { id: `pkt-oc-2-${Date.now()}`, from: "reactor", to: "api-gateway", type: "BURST", progress: 0, color: "#eafeff" },
      { id: `pkt-oc-3-${Date.now()}`, from: "reactor", to: "database-vault", type: "BURST", progress: 0, color: "#eafeff" },
      { id: `pkt-oc-4-${Date.now()}`, from: "reactor", to: "devops-deck", type: "BURST", progress: 0, color: "#eafeff" },
    ];
    set((state) => ({ activePackets: [...state.activePackets, ...burst] }));

    setTimeout(() => {
      set({
        powerState: "normal",
        isOvercharged: false,
        powerLevel: 100,
        coreTempK: 310,
      });
    }, 3200);
  },

  setMaintenanceMode: (active) => {
    set({
      powerState: active ? "maintenance" : "normal",
      coreHealth: active ? 99 : 98,
    });
  },

  toggleSound: () => {
    set((state) => ({ soundEnabled: !state.soundEnabled }));
  },

  setBotSpeech: (botId, text, duration = 3500) => {
    set({ activeSpeechBubble: { botId, text } });
    setTimeout(() => {
      if (get().activeSpeechBubble?.botId === botId) {
        set({ activeSpeechBubble: null });
      }
    }, duration);
  },

  addJarvisMessage: (sender, text) => {
    set((state) => ({
      jarvisMessages: [...state.jarvisMessages, { sender, text, timestamp: Date.now() }],
    }));
  },

  setJarvisMode: (mode) => {
    set({ jarvisMode: mode });
  },

  setPowerCabin: (cabinId, powered) => {
    set((state) => ({
      poweredCabins: { ...state.poweredCabins, [cabinId]: powered },
    }));
  },
}));
