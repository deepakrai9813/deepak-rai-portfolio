import { useState } from "react";
import { Mail, Github, Linkedin, Copy, Check, Send, ArrowUpRight } from "./icons";

const PRIORITIES = [
  { id: "P1", label: "P1 // HIGH-IMPACT ROLE (FULL-TIME)", subject: "[P1 DISPATCH] Engineering Role Inquiry" },
  { id: "P2", label: "P2 // DISTRIBUTED SYSTEMS CONTRACT", subject: "[P2 DISPATCH] Backend / Go Systems Contract" },
  { id: "P3", label: "P3 // ARCHITECTURAL REVIEW / AUDIT", subject: "[P3 DISPATCH] Architecture Advisory Inquiry" },
];

export default function UplinkContact({ playClick, playSuccess }) {
  const [priority, setPriority] = useState("P1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const selectedPriorityObj = PRIORITIES.find((p) => p.id === priority) || PRIORITIES[0];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("deepakkumar740@gmail.com");
      playSuccess?.();
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* fallback */
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playClick?.();
    const mailtoSubject = encodeURIComponent(`${selectedPriorityObj.subject} from ${name || "Peer"}`);
    const mailtoBody = encodeURIComponent(
      `PRIORITY: ${selectedPriorityObj.id}\nNAME: ${name}\nSENDER EMAIL: ${email}\n\nMESSAGE:\n${message}\n\n---\nSent via Deepak Rai Engineering Workstation`
    );
    window.location.href = `mailto:deepakkumar740@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setIsSent(true);
  };

  return (
    <section id="dispatch" className="modern-portfolio-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-label">// 06. DIRECT UPLINK // TRANSMISSION STATION</div>
          <h2 className="section-headline">
            INITIATE SECURE TRANSMISSION
          </h2>
          <p className="section-subtext">
            Send a direct dispatch regarding high-impact full-stack roles, distributed systems contracts, or architectural audits. Zero spam brokers. Direct to engineer inbox.
          </p>
        </div>

        {/* Uplink Chassis */}
        <div className="uplink-chassis">
          <div className="uplink-header">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="led-indicator" />
              <span style={{ fontWeight: 700, color: "var(--text-high)" }}>
                TRANSMISSION CHANNEL: OPEN
              </span>
            </div>
            <div style={{ color: "var(--text-dim)" }}>
              DESTINATION: <strong>deepakkumar740@gmail.com</strong>
            </div>
          </div>

          <div className="uplink-grid">
            {/* Left: Dispatch Form */}
            <form onSubmit={handleSubmit} className="uplink-dispatch-form">
              {/* Priority Selector */}
              <div className="priority-selector-row">
                <span className="priority-label">SELECT INQUIRY PRIORITY TIER:</span>
                <div className="priority-btn-group">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`priority-chip ${priority === p.id ? "selected" : ""}`}
                      onClick={() => {
                        playClick?.();
                        setPriority(p.id);
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sender Name */}
              <div className="input-block">
                <label className="input-label" htmlFor="caller-name">
                  CALLER NAME / ORGANIZATION
                </label>
                <input
                  id="caller-name"
                  type="text"
                  required
                  className="input-control"
                  placeholder="e.g. Sarah Jenkins / Engineering Lead"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Sender Channel */}
              <div className="input-block">
                <label className="input-label" htmlFor="caller-email">
                  RETURN TRANSMISSION CHANNEL (EMAIL)
                </label>
                <input
                  id="caller-email"
                  type="email"
                  required
                  className="input-control"
                  placeholder="e.g. s.jenkins@infra-systems.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Message Payload */}
              <div className="input-block">
                <label className="input-label" htmlFor="caller-message">
                  TRANSMISSION PAYLOAD (MESSAGE)
                </label>
                <textarea
                  id="caller-message"
                  required
                  className="input-control"
                  placeholder="Detail your engineering requirements, technical stack context, or role specifications..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Transmit Button */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
                <button type="submit" className="btn-mech-signal">
                  <Send style={{ width: "14px", height: "14px" }} />
                  <span>TRANSMIT DISPATCH VIA MAILTO</span>
                </button>

                {isSent && (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--signal-green)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <Check style={{ width: "12px", height: "12px" }} />
                    <span>DISPATCH LAUNCHED</span>
                  </span>
                )}
              </div>
            </form>

            {/* Right: Direct Channels & Instant Copy */}
            <div className="uplink-direct-channels">
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--text-high)",
                    borderBottom: "1px solid var(--border-base)",
                    paddingBottom: "8px",
                    marginBottom: "16px",
                  }}
                >
                  VERIFIED DIRECT CHANNELS
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {/* Channel 1: Primary Email */}
                  <div className="direct-channel-card">
                    <div className="channel-label">PRIMARY INBOX // DIRECT</div>
                    <div className="channel-value">deepakkumar740@gmail.com</div>
                    <button
                      type="button"
                      className="btn-mech-outline"
                      style={{ marginTop: "8px", padding: "6px 10px", fontSize: "11px" }}
                      onClick={handleCopyEmail}
                    >
                      {copied ? (
                        <>
                          <Check style={{ width: "12px", height: "12px", color: "var(--signal-green)" }} />
                          <span style={{ color: "var(--signal-green)" }}>COPIED TO CLIPBOARD</span>
                        </>
                      ) : (
                        <>
                          <Copy style={{ width: "12px", height: "12px" }} />
                          <span>COPY EMAIL CHECKSUM</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Channel 2: GitHub Repository */}
                  <div className="direct-channel-card">
                    <div className="channel-label">CODE REPOSITORY</div>
                    <div className="channel-value">github.com/deepakrai9813</div>
                    <a
                      href="https://github.com/deepakrai9813"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-mech-outline"
                      style={{ marginTop: "8px", padding: "6px 10px", fontSize: "11px" }}
                      onClick={() => playClick?.()}
                    >
                      <Github style={{ width: "12px", height: "12px" }} />
                      <span>EXPLORE REPOSITORIES</span>
                      <ArrowUpRight style={{ width: "11px", height: "11px" }} />
                    </a>
                  </div>

                  {/* Channel 3: Physical Station Base */}
                  <div className="direct-channel-card">
                    <div className="channel-label">OPERATIONAL LOCATION</div>
                    <div className="channel-value">New Delhi, India (IST / UTC+5:30)</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-dim)" }}>
                      Open to global remote roles &amp; relocation
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Guarantee */}
              <div
                style={{
                  padding: "10px 14px",
                  border: "1px solid var(--border-base)",
                  backgroundColor: "var(--bg-surface)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ color: "var(--text-dim)" }}>DISPATCH SLA:</span>
                <span style={{ color: "var(--signal-green)", fontWeight: 700 }}>
                  RESPONSE &lt; 24 HOURS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
