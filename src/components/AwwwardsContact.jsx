import { useState } from "react";
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight, ShieldCheck } from "./icons";

const CONTACT_TIERS = [
  { id: "P1", label: "01 // SENIOR FULL-TIME ROLE", subject: "[ROLE INQUIRY] Senior Backend / Systems Engineering" },
  { id: "P2", label: "02 // DISTRIBUTED SYSTEMS CONTRACT", subject: "[CONTRACT] Go / High-Concurrency Architecture" },
  { id: "P3", label: "03 // ARCHITECTURAL AUDIT", subject: "[AUDIT] Performance & Fault-Tolerance Review" },
];

export default function AwwwardsContact() {
  const [tier, setTier] = useState("P1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedTier = CONTACT_TIERS.find((t) => t.id === tier) || CONTACT_TIERS[0];

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
      `TIER: ${selectedTier.label}\nSENDER NAME: ${name}\nCONTACT EMAIL: ${email}\n\nPROJECT DETAILS:\n${message}\n\n---\nSent via Deepak Rai Creative Technologist Portfolio`
    );
    window.location.href = `mailto:deepakkumar740@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="awwwards-contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="awwwards-section-header">
          <div className="header-eyebrow">
            <span className="eyebrow-num">// 06</span>
            <span>DIRECT CHANNELS · NO RECRUITER SPAM</span>
          </div>
          <h2 className="header-headline">
            INITIATE DIRECT CONTACT
          </h2>
          <p className="header-description">
            Open for high-impact senior backend engineering roles, Go distributed systems contracts,
            and production architectural reviews. Messages route directly to my personal inbox.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="awwwards-contact-grid">
          {/* Left Column: Direct Dispatch Form */}
          <form onSubmit={handleSubmit} className="uiverse-dispatch-form">
            <div className="form-legend-bar">
              <span className="form-status-dot" />
              <span>DIRECT DISPATCH PORTAL</span>
            </div>

            {/* Tier Selection */}
            <div className="form-row-group">
              <label className="uiverse-field-label">SELECT INQUIRY CLASSIFICATION:</label>
              <div className="tier-pill-stack">
                {CONTACT_TIERS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`uiverse-tier-btn ${tier === t.id ? "active" : ""}`}
                    onClick={() => setTier(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div className="form-row-group">
              <label htmlFor="awwwards-input-name" className="uiverse-field-label">
                NAME / COMPANY
              </label>
              <input
                id="awwwards-input-name"
                type="text"
                required
                placeholder="e.g. Alex Vance, Principal Architect"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="uiverse-glow-input"
              />
            </div>

            {/* Email Input */}
            <div className="form-row-group">
              <label htmlFor="awwwards-input-email" className="uiverse-field-label">
                RETURN EMAIL ADDRESS
              </label>
              <input
                id="awwwards-input-email"
                type="email"
                required
                placeholder="alex@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="uiverse-glow-input"
              />
            </div>

            {/* Message Area */}
            <div className="form-row-group">
              <label htmlFor="awwwards-input-message" className="uiverse-field-label">
                PROJECT OR ROLE SPECIFICATIONS
              </label>
              <textarea
                id="awwwards-input-message"
                required
                placeholder="Describe your technical scope, throughput requirements, or team objectives..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="uiverse-glow-textarea"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="uiverse-submit-action-btn">
              <span>{submitted ? "OPENING INBOX CLIENT..." : "DISPATCH INQUIRY MESSAGE"}</span>
              <ArrowUpRight width={14} height={14} />
            </button>
          </form>

          {/* Right Column: Direct Verified Channels */}
          <div className="contact-meta-column">
            {/* Uiverse 1-Click Copy Email Card */}
            <div className="uiverse-copy-card">
              <div className="card-ambient-light" />
              <div className="copy-card-tag">PRIMARY INBOX (ENCRYPTED)</div>
              <div className="copy-card-address">deepakkumar740@gmail.com</div>
              <p className="copy-card-note">
                Direct to mobile notification. Typical response time under 4 hours for technical inquiries.
              </p>
              <button
                type="button"
                className="uiverse-copy-trigger-btn"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
              >
                {copied ? <Check width={14} height={14} /> : <Copy width={14} height={14} />}
                <span>{copied ? "COPIED TO CLIPBOARD!" : "COPY EMAIL ADDRESS"}</span>
              </button>
            </div>

            {/* Social & Source Links */}
            <div className="channels-stack">
              <a
                href="https://github.com/deepakrai9813"
                target="_blank"
                rel="noreferrer"
                className="uiverse-channel-card"
              >
                <div className="channel-id">
                  <Github width={16} height={16} />
                  <span>GITHUB ARCHIVE</span>
                </div>
                <div className="channel-action">
                  <span>github.com/deepakrai9813</span>
                  <ArrowUpRight width={12} height={12} />
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="uiverse-channel-card"
              >
                <div className="channel-id">
                  <Linkedin width={16} height={16} />
                  <span>LINKEDIN NETWORK</span>
                </div>
                <div className="channel-action">
                  <span>Verified Profile</span>
                  <ArrowUpRight width={12} height={12} />
                </div>
              </a>

              <a
                href="/Deepak-Kumar-Resume.pdf"
                download="Deepak-Kumar-Resume.pdf"
                className="uiverse-channel-card highlight"
              >
                <div className="channel-id">
                  <ShieldCheck width={16} height={16} />
                  <span>RESUME SPECIFICATION (PDF)</span>
                </div>
                <div className="channel-action">
                  <span>Latest 2026 Edition</span>
                  <ArrowUpRight width={12} height={12} />
                </div>
              </a>
            </div>

            {/* Availability Shard */}
            <div className="uiverse-status-shard">
              <div className="shard-top-row">
                <span className="shard-beacon" />
                <span className="shard-caption">CURRENT STATUS: ACTIVELY INTERVIEWING</span>
              </div>
              <p className="shard-body-text">
                Available for Senior Backend Engineer, Distributed Systems Architect, and High-Throughput
                Go developer roles worldwide (Tokyo / Remote / Hybrid).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
