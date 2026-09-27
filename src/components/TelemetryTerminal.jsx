import { useState, useRef, useEffect } from "react";
import { ArrowUpRight } from "./icons";

const INITIAL_HISTORY = [
  { type: "system", text: "DEEPAK RAI // SYSTEM TELEMETRY WORKSTATION v2026.4" },
  { type: "system", text: "Type 'help' to inspect available diagnostic commands." },
  { type: "prompt", text: "> sentinel --benchmark" },
  {
    type: "success",
    text: "PROXY BENCHMARK: 10,000 reqs · 0 dropped · p50: 12ms · p99: 28ms · sync.Pool: 4.2MB heap",
  },
];

export default function TelemetryTerminal({ setLens, playClick, playPing, playSwitch }) {
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [inputVal, setInputVal] = useState("");
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [pastCmds, setPastCmds] = useState(["sentinel --benchmark"]);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdRaw) => {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    playClick?.();
    setPastCmds((prev) => [...prev, cmdRaw]);
    setCmdIndex(-1);

    const newEntries = [{ type: "prompt", text: `> ${cmdRaw}` }];

    if (cmd === "help") {
      newEntries.push(
        { type: "info", text: "AVAILABLE DIAGNOSTIC COMMANDS:" },
        { type: "system", text: "  sentinel     - Run live Go reverse proxy benchmark report" },
        { type: "system", text: "  projects     - List all verified production systems" },
        { type: "system", text: "  stack        - Print primary engineering languages & runtimes" },
        { type: "system", text: "  whoami       - Display engineer background and thesis" },
        { type: "system", text: "  contact      - Print uplink channels & direct dispatch" },
        { type: "system", text: "  resume       - Open / download verified PDF specification" },
        {type: "system", text: "  lens [1|2|3] - Switch perspective (1: Executive, 2: Architect, 3: CLI)" },
        { type: "system", text: "  matrix       - Stream live cybernetic binary neural buffer" },
        { type: "system", text: "  overclock    - Engage 2.4X system turbo benchmark" },
        { type: "system", text: "  quantum      - Inspect distributed quantum ECC consensus key" },
        { type: "system", text: "  ping         - Test synthetic round-trip latency to station" },
        { type: "system", text: "  clear        - Clear console output buffer" }
      );
    } else if (cmd === "clear") {
      setHistory([]);
      return;
    } else if (cmd === "sentinel") {
      playPing?.();
      newEntries.push(
        { type: "info", text: "[GO REVERSE PROXY // PROJECT SENTINEL TELEMETRY]" },
        { type: "system", text: "  Upstream: Primary (:8081) / Failover (:8082)" },
        { type: "system", text: "  Circuit Breaker: CLOSED -> OPEN (200ms SLA cutoff) -> HALF-OPEN" },
        { type: "system", text: "  Memory Engine: sync.Pool zero-alloc byte buffer rewind" },
        { type: "success", text: "  Verification: 0 dropped bytes across 1,000 Toxiproxy chaos cycles" }
      );
    } else if (cmd === "projects") {
      newEntries.push(
        { type: "info", text: "REGISTERED PRODUCTION SYSTEMS:" },
        { type: "system", text: "  [SYS-01] PROJECT SENTINEL - Go reverse proxy & circuit breaker" },
        { type: "system", text: "  [SYS-02] SAN BROTHERS     - Legal compliance platform (#1 Google)" },
        { type: "system", text: "  [SYS-03] BIAN AI          - Groq LLM token streamer & PDF worker" },
        { type: "system", text: "  [SYS-04] LEADFINDER AI    - Next.js 16 + Prisma B2B search pipeline" },
        { type: "system", text: "  [SYS-05] DEBE LEARNING    - Deterministic UTC schedule engine" }
      );
    } else if (cmd === "stack") {
      newEntries.push(
        { type: "info", text: "TECHNICAL RUNTIMES & SYSTEMS:" },
        { type: "system", text: "  Languages : Go (1.23), TypeScript, JavaScript (Node.js), SQL" },
        { type: "system", text: "  Frameworks: Next.js 16, React 19, Express, Tailwind CSS" },
        { type: "system", text: "  Data Store: PostgreSQL, Prisma ORM, MongoDB, Redis" },
        { type: "system", text: "  Chaos/E2E : Toxiproxy, Playwright, Go race detector, Docker" }
      );
    } else if (cmd === "whoami") {
      newEntries.push(
        { type: "info", text: "DEEPAK RAI // FULL-STACK & SYSTEMS ENGINEER" },
        { type: "system", text: "  Location   : New Delhi, India (28.6139° N, 77.2090° E)" },
        { type: "system", text: "  Specialty  : High-concurrency backends, distributed fault tolerance" },
        { type: "system", text: "  Philosophy : Deterministic recovery beats optimistic architecture." }
      );
    } else if (cmd === "contact") {
      newEntries.push(
        { type: "info", text: "DIRECT UPLINK CHANNELS:" },
        { type: "success", text: "  Email    : deepakkumar740@gmail.com" },
        { type: "system",  text: "  GitHub   : https://github.com/deepakrai9813" },
        { type: "system",  text: "  LinkedIn : https://linkedin.com/in/deepak-rai-dev" }
      );
    } else if (cmd === "resume") {
      window.open("/Deepak-Kumar-Resume.pdf", "_blank");
      newEntries.push({ type: "success", text: "Opening /Deepak-Kumar-Resume.pdf in new tab..." });
    } else if (cmd === "ping") {
      playPing?.();
      newEntries.push({
        type: "success",
        text: "PONG: 12.4ms RTT · 0 packet loss · Station host: New Delhi",
      });
    } else if (cmd.startsWith("lens")) {
      const parts = cmd.split(" ");
      const arg = parts[1];
      if (arg === "1") {
        setLens("executive");
        playSwitch?.();
        newEntries.push({ type: "success", text: "Perspective switched to [01 / EXECUTIVE BRIEF]" });
      } else if (arg === "2") {
        setLens("architect");
        playSwitch?.();
        newEntries.push({ type: "success", text: "Perspective switched to [02 / ARCHITECT SPEC]" });
      } else if (arg === "3") {
        setLens("terminal");
        playSwitch?.();
        newEntries.push({ type: "success", text: "Perspective switched to [03 / TERMINAL CONSOLE]" });
      } else {
        newEntries.push({ type: "warn", text: "Usage: lens 1 (Executive) | lens 2 (Architect) | lens 3 (Terminal)" });
      }
    } else if (cmd === "matrix") {
      playPing?.();
      newEntries.push(
        { type: "info", text: "INITIALIZING CYBERNETIC NEURAL STREAM..." },
        { type: "system", text: "01000100 01000101 01000101 01010000 01000001 01001011 [DEEPAK]" },
        { type: "system", text: "01010011 01000101 01001110 01010100 01001001 01001110 [SENTINEL]" },
        { type: "success", text: "STREAM_OK: 50,000 goroutines active in zero-alloc ring buffer." }
      );
    } else if (cmd === "overclock") {
      playPing?.();
      newEntries.push(
        { type: "info", text: "[TURBO OVERCLOCK: 2.4X ENGAGED]" },
        { type: "system", text: "  Throughput : 18,200 req/sec (+140%)" },
        { type: "system", text: "  Latency    : 2.4ms p50 (Cryogenic liquid cooling active)" },
        { type: "success", text: "  Status     : All 5 nodes nominal with 0 dropped packets." }
      );
    } else if (cmd === "quantum") {
      playPing?.();
      newEntries.push(
        { type: "info", text: "[QUANTUM ECC // REVERSE PROXY QUORUM]" },
        { type: "system", text: "  Key Hash   : SHA256:0x9813_RAI_QUANTUM_CONSENSUS" },
        { type: "system", text: "  Shards     : 5/5 synchronized with sub-millisecond clock sync" },
        { type: "success", text: "  Integrity  : 100% verified against cascading split-brain faults." }
      );
    } else {
      newEntries.push({
        type: "warn",
        text: `Command not recognized: '${cmdRaw}'. Type 'help' for diagnostics.`,
      });
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pastCmds.length > 0) {
        const nextIdx = cmdIndex === -1 ? pastCmds.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInputVal(pastCmds[nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex !== -1) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx < pastCmds.length) {
          setCmdIndex(nextIdx);
          setInputVal(pastCmds[nextIdx] || "");
        } else {
          setCmdIndex(-1);
          setInputVal("");
        }
      }
    }
  };

  return (
    <section id="terminal" className="modern-portfolio-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-label">// 05. INTERACTIVE CLI // TELEMETRY WORKSTATION</div>
          <h2 className="section-headline">
            DIRECT DIAGNOSTIC TERMINAL
          </h2>
          <p className="section-subtext">
            Execute direct commands into the workstation runtime. Run benchmark diagnostics, inspect architecture specifications, or trigger automated failover checks.
          </p>
        </div>

        {/* Terminal Chassis */}
        <div className="terminal-chassis" onClick={() => inputRef.current?.focus()}>
          {/* Top Bar */}
          <div className="terminal-top-bar">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="terminal-window-buttons">
                <span className="terminal-win-btn" />
                <span className="terminal-win-btn" />
                <span className="terminal-win-btn" />
              </div>
              <span style={{ fontWeight: 700, color: "#f0f2f5" }}>
                TTY: /dev/deepak-telemetry
              </span>
            </div>

            <div style={{ display: "flex", gap: "14px" }}>
              <span>ENCODING: UTF-8</span>
              <span>//</span>
              <span style={{ color: "var(--signal-green)", fontWeight: 700 }}>SESSION: ATTACHED</span>
            </div>
          </div>

          {/* Terminal Screen Body */}
          <div ref={terminalBodyRef} className="terminal-body">
            {history.map((line, idx) => (
              <div key={idx} className={`terminal-output-line ${line.type}`}>
                {line.text}
              </div>
            ))}

            {/* Prompt Input Row */}
            <div className="terminal-input-row">
              <span className="terminal-prompt-sym">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-input-field"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'sentinel', 'projects', or 'contact'..."
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Quick Command Action Strip */}
          <div className="terminal-macros-strip">
            <span className="terminal-macros-label">QUICK MACROS:</span>
            {["help", "sentinel", "projects", "stack", "contact", "ping"].map((m) => (
              <button
                key={m}
                type="button"
                className="terminal-macro-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommand(m);
                }}
              >
                <span style={{ opacity: 0.7 }}>$</span>
                <span>{m}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
