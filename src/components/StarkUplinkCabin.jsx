import { useState } from "react";
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight, ShieldCheck } from "./icons";

const DISPATCH_TIERS = [
  { id: "P1", label: "01 // SENIOR FULL-STACK / SYSTEMS ROLE", subject: "[STARK UPLINK] Full-Stack / Backend Engineering Role" },
  { id: "P2", label: "02 // DISTRIBUTED GO CONTRACT", subject: "[STARK UPLINK] Go / High-Concurrency Architecture Contract" },
  { id: "P3", label: "03 // ARCHITECTURAL AUDIT", subject: "[STARK UPLINK] Systems Review / Resilience Advisory" },
];

export default function StarkUplinkCabin() {
  const [tier, setTier] = useState("P1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const selectedTier = DISPATCH_TIERS.find((t) => t.id === tier) || DISPATCH_TIERS[0];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("deepakkumar740@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* fallback */
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(`${selectedTier.subject} - from ${name || "Peer"}`);
    const mailtoBody = encodeURIComponent(
      `TIER: ${selectedTier.label}\nSENDER NAME: ${name}\nCONTACT EMAIL: ${email}\n\nPROJECT DETAILS:\n${message}\n\n---\nSent via Deepak Rai Stark Industries Portfolio`
    );
    window.location.href = `mailto:deepakkumar740@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSent(true);
  };

  return (
    <section id="uplink-cabin" className="stark-cabin-section">
      <div className="container">
        {/* Pipeline Junction Node Entrance */}
        <div className="cabin-pipeline-junction">
          <span className="junction-pipe-feed" />
          <span className="junction-indicator-light" />
          <span className="junction-label">POWER INFEED // SECURE STARK TRANSMISSION BUS</span>
        </div>

        {/* Section Header */}
        <div className="stark-cabin-header">
          <div className="header-kicker">
            <span className="kicker-tag cyan">CABIN 03 // SECURE UPLINK</span>
            <span>SUPERVISED BY BOT: COMM-RELAY (MK-III)</span>
          </div>
          <h2 className="cabin-title">
            ESTABLISH DIRECT COMM-LINK
          </h2>
          <p className="cabin-description">
            Initiate direct transmission regarding full-stack engineering roles, distributed systems
            contracts, or architectural reviews. Routed directly to Deepak&apos;s personal terminal.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="stark-uplink-grid">
          {/* Dispatch Form */}
          <form onSubmit={handleSubmit} className="stark-dispatch-form">
            <div className="form-legend-header">
              <span className="legend-dot crimson" />
              <span>TRANSMISSION TERMINAL // DIRECT INBOX DISPATCH</span>
            </div>

            {/* Tier Selector */}
            <div className="form-field-unit">
              <label className="field-title">SELECT INQUIRY CLASSIFICATION:</label>
              <div className="tier-button-cluster">
                {DISPATCH_TIERS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`btn-tier-select ${tier === t.id ? "active" : ""}`}
                    onClick={() => setTier(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="form-field-unit">
              <label htmlFor="caller-name" className="field-title">
                CALLER NAME / ORGANIZATION
              </label>
              <input
                id="caller-name"
                type="text"
                required
                placeholder="e.g. Tony Stark, Principal Architect"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="stark-text-input"
              />
            </div>

            {/* Email */}
            <div className="form-field-unit">
              <label htmlFor="caller-email" className="field-title">
                RETURN TRANSMISSION ADDRESS
              </label>
              <input
                id="caller-email"
                type="email"
                required
                placeholder="architect@stark-industries.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="stark-text-input"
              />
            </div>

            {/* Message */}
            <div className="form-field-unit">
              <label htmlFor="caller-message" className="field-title">
                PROJECT OR ROLE SPECIFICATIONS
              </label>
              <textarea
                id="caller-message"
                required
                placeholder="Detail your engineering challenges, throughput requirements, or team objectives..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="stark-textarea-input"
              />
            </div>

            {/* Submit Action */}
            <button type="submit" className="btn-dispatch-launch">
              <span>{sent ? "TRANSMISSION DISPATCHED!" : "TRANSMIT DISPATCH VIA JARVIS"}</span>
              <ArrowUpRight width={14} height={14} />
            </button>
          </form>

          {/* Direct Verified Channels Column */}
          <div className="stark-channels-column">
            {/* 1-Click Copy Email Card */}
            <div className="stark-direct-email-card">
              <div className="email-card-eyebrow">ENCRYPTED COMM FREQUENCY</div>
              <div className="email-card-address">deepakkumar740@gmail.com</div>
              <p className="email-card-desc">
                Direct to mobile notification. Response time typically under 4 hours for technical inquiries.
              </p>
              <button
                type="button"
                className="btn-copy-frequency"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
              >
                {copied ? <Check width={14} height={14} /> : <Copy width={14} height={14} />}
                <span>{copied ? "COPIED TO CLIPBOARD!" : "COPY COMM FREQUENCY"}</span>
              </button>
            </div>

            {/* Verified Network Links */}
            <div className="stark-network-links">
              <a
                href="https://github.com/deepakrai9813"
                target="_blank"
                rel="noreferrer"
                className="stark-channel-btn"
              >
                <div className="channel-id-block">
                  <Github width={16} height={16} />
                  <span>GITHUB ARCHIVE</span>
                </div>
                <div className="channel-jump">
                  <span>github.com/deepakrai9813</span>
                  <ArrowUpRight width={12} height={12} />
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="stark-channel-btn"
              >
                <div className="channel-id-block">
                  <Linkedin width={16} height={16} />
                  <span>LINKEDIN NETWORK</span>
                </div>
                <div className="channel-jump">
                  <span>Verified Profile</span>
                  <ArrowUpRight width={12} height={12} />
                </div>
              </a>

              <a
                href="/Deepak-Kumar-Resume.pdf"
                download="Deepak-Kumar-Resume.pdf"
                className="stark-channel-btn highlight-gold"
              >
                <div className="channel-id-block">
                  <ShieldCheck width={16} height={16} />
                  <span>RESUME SPECIFICATION (PDF)</span>
                </div>
                <div className="channel-jump">
                  <span>Verified 2026 Edition</span>
                  <ArrowUpRight width={12} height={12} />
                </div>
              </a>
            </div>

            {/* Status Shard */}
            <div className="stark-availability-pod">
              <div className="pod-top-line">
                <span className="pod-indicator-beacon" />
                <span className="pod-heading">STATUS: ACTIVELY INTERVIEWING</span>
              </div>
              <p className="pod-copy">
                Available for Senior Full-Stack Engineer, Distributed Systems Architect, and High-Throughput
                Go developer roles worldwide (Tokyo / Remote / Hybrid).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
