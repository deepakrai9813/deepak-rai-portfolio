import { useState, useRef, useEffect } from "react";
import { PERSONAL_INFO, PROJECTS } from "../utils/data";
import contentData from "../data/content.json";

export default function InteractiveTerminal() {
  const [history, setHistory] = useState([
    {
      type: "system",
      text: "Deepak Kumar Engineering Terminal [v3.4.1]\nType 'help' or click any command chip below to inspect system telemetry.",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const executeCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    let response = "";

    switch (cmd) {
      case "help":
        response =
          "Available Commands:\n  bio        Print architectural philosophy and background\n  stack      Inspect frontend, backend, database and cloud skills\n  projects   List production systems and metrics\n  metrics    Display real-time cluster telemetry\n  contact    Show verified direct contact channels\n  clear      Clear the terminal console buffer";
        break;

      case "bio":
      case "cat bio.md":
        response = `Profile: ${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}\nLocation: ${PERSONAL_INFO.location}\nExperience: 3+ Years in Production Engineering\nPhilosophy: Resilient distributed systems, strict type safety, event-driven Node.js backends and high-performance React/Next.js interfaces.`;
        break;

      case "stack":
      case "ls stack":
        response = `Frontend:  React 19, Next.js 15, TypeScript, Tailwind CSS, WebGL\nBackend:   Node.js, Express, Python, FastAPI, WebSockets, gRPC\nDatabase:  MongoDB (Sharding), PostgreSQL, Redis (Pub/Sub & Caching)\nCloud:     Docker, CI/CD Actions, AWS (S3, EC2), Linux, Nginx`;
        break;

      case "projects":
      case "ls projects":
        response = PROJECTS.map(
          (p) =>
            `• ${p.title} (${p.category})\n  Impact: ${p.impact[0].metric} ${p.impact[0].label} | ${p.impact[1].metric} ${p.impact[1].label}\n  Stack: ${p.tags.join(", ")}`
        ).join("\n\n");
        break;

      case "metrics":
      case "curl /metrics":
        response = `HTTP/2.0 200 OK\n{\n  "cluster_uptime": "99.98%",\n  "api_p95_latency": "<18ms",\n  "production_commits": "1,450+",\n  "active_microservices": 16,\n  "sla_status": "HEALTHY_ALL_NODES"\n}`;
        break;

      case "contact":
        response = `Email:    ${PERSONAL_INFO.email}\nLinkedIn: ${PERSONAL_INFO.linkedin}\nGitHub:   ${PERSONAL_INFO.github}\nResume:   ${PERSONAL_INFO.resumeUrl}`;
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        response = `Command not recognized: '${cmd}'. Type 'help' to view available commands.`;
        break;
    }

    setHistory((prev) => [
      ...prev,
      { type: "user", text: `deepak@arch-macbook:~$ ${rawCmd}` },
      { type: "output", text: response },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    }
  };

  const quickChips = [
    { label: "help", cmd: "help" },
    { label: "cat bio.md", cmd: "bio" },
    { label: "curl /metrics", cmd: "metrics" },
    { label: "ls projects", cmd: "projects" },
    { label: "stack", cmd: "stack" },
    { label: "clear", cmd: "clear" },
  ];

  return (
    <div className="terminal-widget-container">
      {/* Chrome Header */}
      <div className="terminal-chrome-header">
        <div className="chrome-dots">
          <span className="chrome-dot red" />
          <span className="chrome-dot yellow" />
          <span className="chrome-dot green" />
        </div>
        <div className="terminal-title">deepak@arch-linux: ~ (zsh)</div>
        <div className="terminal-status-tag">
          <span className="terminal-pulse" />
          <span>PORT: 8080</span>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div className="terminal-screen-body">
        {history.map((entry, idx) => (
          <div
            key={idx}
            className={`terminal-log-row ${entry.type}`}
          >
            {entry.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Action Chips */}
      <div className="terminal-quick-chips">
        <span className="quick-chip-label">Quick Run:</span>
        {quickChips.map((chip) => (
          <button
            key={chip.label}
            type="button"
            className="terminal-chip-btn"
            onClick={() => executeCommand(chip.cmd)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Input Prompt */}
      <div className="terminal-input-row">
        <span className="terminal-prompt-prefix">deepak@arch-linux:~$</span>
        <input
          type="text"
          className="terminal-text-input"
          placeholder="Type command ('help', 'bio', 'metrics')..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Interactive terminal input"
        />
      </div>
    </div>
  );
}
