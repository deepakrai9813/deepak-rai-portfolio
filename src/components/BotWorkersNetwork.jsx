import { useState, useEffect } from "react";

const INITIAL_BOTS = [
  // Pair 1: Cabin 01 (Armory)
  {
    id: "bot-1a",
    name: "FRIDAY-LITE",
    role: "DATA COURIER",
    color: "#00f0ff", // Arc Cyan
    x: 15,
    startY: 28,
    direction: 1,
    speed: 0.09,
    status: "Rerouting zero-alloc byte packets to Sentinel proxy...",
    pairId: "bot-1b",
  },
  {
    id: "bot-1b",
    name: "PROXY-SENTINEL (MK-V)",
    role: "CIRCUIT MONITOR",
    color: "#ffc107", // Armor Gold
    x: 75,
    startY: 28,
    direction: -1,
    speed: 0.08,
    status: "Verifying upstream health check intervals (500ms)...",
    pairId: "bot-1a",
  },

  // Pair 2: Cabin 02 (Propulsion Bench)
  {
    id: "bot-2a",
    name: "GO-RUNNER (MK-IV)",
    role: "CONCURRENCY TESTER",
    color: "#ffc107", // Armor Gold
    x: 20,
    startY: 56,
    direction: 1,
    speed: 0.07,
    status: "Benchmarking 50K goroutines with sync.Pool...",
    pairId: "bot-2b",
  },
  {
    id: "bot-2b",
    name: "BENCH-SCOUT",
    role: "GC ANALYZER",
    color: "#00ff9d", // Emerald Matrix
    x: 80,
    startY: 56,
    direction: -1,
    speed: 0.08,
    status: "Measuring heap memory: Sub-100 microsecond pause confirmed.",
    pairId: "bot-2a",
  },

  // Pair 3: Cabin 03 (Secure Uplink)
  {
    id: "bot-3a",
    name: "COMM-RELAY (MK-III)",
    role: "TRANSMISSION DISPATCH",
    color: "#00f0ff", // Arc Cyan
    x: 18,
    startY: 82,
    direction: 1,
    speed: 0.06,
    status: "Monitoring encrypted comm frequency to Deepak's inbox...",
    pairId: "bot-3b",
  },
  {
    id: "bot-3b",
    name: "STARK-PLANNER",
    role: "SYSTEMS ARCHITECT",
    color: "#e62429", // Stark Crimson
    x: 78,
    startY: 82,
    direction: -1,
    speed: 0.07,
    status: "Planning next sprint: Tokyo onsite & distributed contracts.",
    pairId: "bot-3a",
  },
];

export default function BotWorkersNetwork() {
  const [bots, setBots] = useState(
    INITIAL_BOTS.map((b) => ({
      ...b,
      meeting: false,
      meetingDialogue: null,
      reactionText: null,
      isPaused: false,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBots((prevBots) => {
        // Find pairs within close proximity (< 8% distance) on same startY
        const nextBots = [...prevBots];
        const meetingPairs = new Set();

        for (let i = 0; i < nextBots.length; i++) {
          const b1 = nextBots[i];
          if (!b1.pairId) continue;
          const b2 = nextBots.find((b) => b.id === b1.pairId);

          if (b2 && Math.abs(b1.x - b2.x) < 7.5 && !b1.reactionText && !b2.reactionText) {
            // Meeting condition satisfied
            meetingPairs.add(b1.id);
            meetingPairs.add(b2.id);
          }
        }

        return nextBots.map((bot) => {
          // If clicked and reacting, or in meeting, don't move
          const isMeeting = meetingPairs.has(bot.id);
          let dialogue = bot.meetingDialogue;

          if (isMeeting && !bot.meeting) {
            if (bot.id.startsWith("bot-1")) {
              dialogue =
                bot.direction > 0
                  ? "MEETING: Syncing circuit breaker state with Sentinel!"
                  : "MEETING: Acknowledged! 0.00% packet loss maintained.";
            } else if (bot.id.startsWith("bot-2")) {
              dialogue =
                bot.direction > 0
                  ? "MEETING: Benchmarking 50K goroutines with sync.Pool!"
                  : "MEETING: GC pause nominal at 0.08ms. Allocation zero!";
            } else {
              dialogue =
                bot.direction > 0
                  ? "MEETING: Checking dispatch uplink queue!"
                  : "MEETING: Frequency clear to deepakkumar740@gmail.com!";
            }
          }

          if (isMeeting) {
            return {
              ...bot,
              meeting: true,
              meetingDialogue: dialogue,
            };
          }

          // If exiting meeting or normal walk
          let nextX = bot.x + bot.direction * bot.speed;
          let nextDir = bot.direction;

          if (nextX > 88) {
            nextX = 88;
            nextDir = -1;
          } else if (nextX < 10) {
            nextX = 10;
            nextDir = 1;
          }

          return {
            ...bot,
            x: nextX,
            direction: nextDir,
            meeting: false,
            meetingDialogue: null,
          };
        });
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const handleBotClick = (botId) => {
    const cheers = [
      "Stark OS verified! Power at 100%!",
      "Zero packet loss maintained on Go proxy!",
      "Deepak's systems engineering is locked and loaded!",
      "Conduits operating at peak efficiency!",
      "Reporting to JARVIS: Systems fully operational!",
    ];
    const cheer = cheers[Math.floor(Math.random() * cheers.length)];

    setBots((prev) =>
      prev.map((b) =>
        b.id === botId ? { ...b, reactionText: cheer } : b
      )
    );

    setTimeout(() => {
      setBots((prev) =>
        prev.map((b) => (b.id === botId ? { ...b, reactionText: null } : b))
      );
    }, 3200);
  };

  return (
    <div className="bot-workers-network-layer" aria-label="Autonomous Bot Workers">
      {bots.map((bot) => (
        <div
          key={bot.id}
          className={`bot-worker-unit ${bot.meeting ? "in-meeting" : ""}`}
          style={{
            left: `${bot.x}%`,
            top: `${bot.startY}%`,
          }}
          onClick={() => handleBotClick(bot.id)}
          title={`Click to interact with ${bot.name} (${bot.role})`}
        >
          {/* Bot Speech / Meeting Dialogue Bubble */}
          <div className="bot-speech-bubble">
            <span className="bubble-bot-name">{bot.name}:</span>
            <span className="bubble-text">
              {bot.reactionText || bot.meetingDialogue || bot.status}
            </span>
          </div>

          {/* Bot Physical Walking Chassis */}
          <div
            className={`bot-walker-body ${bot.direction < 0 ? "facing-left" : "facing-right"} ${
              bot.reactionText ? "celebrating" : ""
            }`}
          >
            {/* Bot Head with Glowing Optic */}
            <div className="walker-head">
              <span
                className="walker-optic-eye"
                style={{ backgroundColor: bot.color, boxShadow: `0 0 8px ${bot.color}` }}
              />
              <span className="walker-antenna" />
            </div>

            {/* Bot Torso with Power Core */}
            <div className="walker-torso">
              <span
                className="walker-micro-arc"
                style={{ backgroundColor: bot.color, boxShadow: `0 0 6px ${bot.color}` }}
              />
              <span className="walker-tool-arm left" />
              <span className="walker-tool-arm right" />
            </div>

            {/* Animated Walking Legs */}
            <div className="walker-legs">
              <span className={`walker-leg leg-left ${bot.meeting ? "paused" : ""}`} />
              <span className={`walker-leg leg-right ${bot.meeting ? "paused" : ""}`} />
            </div>
          </div>

          {/* Rail Track below bot */}
          <div className="bot-conduit-track" />
        </div>
      ))}
    </div>
  );
}
