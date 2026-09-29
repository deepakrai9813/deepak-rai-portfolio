import { useState } from "react";
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight, ShieldCheck } from "./icons";

const TIERS = [
  { id: "P1", label: "01 // SENIOR FULL-TIME ROLE", subject: "[ROLE INQUIRY] Senior Backend / Systems Engineering" },
  { id: "P2", label: "02 // DISTRIBUTED SYSTEMS CONTRACT", subject: "[CONTRACT] Go / High-Concurrency Architecture" },
  { id: "P3", label: "03 // ARCHITECTURAL AUDIT", subject: "[AUDIT] Performance & Fault-Tolerance Review" },
];

export default function SpatialContact() {
  const [tier, setTier] = useState("P1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedTier = TIERS.find((t) => t.id === tier) || TIERS[0];

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
      `TIER: ${selectedTier.label}\nSENDER NAME: ${name}\nCONTACT EMAIL: ${email}\n\nPROJECT DETAILS:\n${message}\n\n---\nSent via Deepak Rai Spatial Architectural Portfolio`
    );
    window.location.href = `mailto:deepakkumar740@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="spatial-contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="spatial-section-header">
          <div className="section-kicker">
            <span className="kicker-index">// 06</span>
            <span>DIRECT CHANNELS · NO RECRUITER SPAM</span>
          </div>
          <h2 className="spatial-section-title">
            INITIATE DIRECT CONTACT
          </h2>
          <p className="spatial-section-desc">
            Open for high-impact senior backend engineering roles, Go distributed systems contracts,
            and production architectural reviews. Messages route directly to my personal inbox.
          </p>
        </div>

        {/* Contact Grid Chassis */}
        <div className="spatial-contact-grid">
          {/* Left Column: Direct Dispatch Form */}
          <form onSubmit={handleSubmit} className="contact-dispatch-form">
            <div className="form-header-badge">
              <span className="form-dot green" />
              <span>DIRECT DISPATCH PORTAL</span>
            </div>

            {/* Inquiry Tier Selection */}
            <div className="form-field-group">
              <label className="field-label">SELECT INQUIRY CLASSIFICATION:</label>
              <div className="tier-pills-row">
                {TIERS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`tier-pill-btn ${tier === t.id ? "active" : ""}`}
                    onClick={() => setTier(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sender Name */}
            <div className="form-field-group">
              <label htmlFor="input-name" className="field-label">
                NAME / COMPANY
              </label>
              <input
                id="input-name"
                type="text"
                required
                placeholder="e.g. Alex Vance, Principal Architect"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="spatial-text-input"
              />
            </div>

            {/* Sender Email */}
            <div className="form-field-group">
              <label htmlFor="input-email" className="field-label">
                RETURN EMAIL ADDRESS
              </label>
              <input
                id="input-email"
                type="email"
                required
                placeholder="alex@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="spatial-text-input"
              />
            </div>

            {/* Message Body */}
            <div className="form-field-group">
              <label htmlFor="input-message" className="field-label">
                PROJECT OR ROLE SPECIFICATIONS
              </label>
              <textarea
                id="input-message"
                required
                placeholder="Describe your technical scope, throughput requirements, or team objectives..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="spatial-textarea-input"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-dispatch-submit">
              <span>{submitted ? "OPENING INBOX CLIENT..." : "DISPATCH INQUIRY MESSAGE"}</span>
              <ArrowUpRight width={14} height={14} />
            </button>
          </form>

          {/* Right Column: Direct Verified Channels */}
          <div className="contact-channels-column">
            {/* Quick Email Copy Card */}
            <div className="direct-card-monolith">
              <div className="direct-card-label">PRIMARY INBOX (ENCRYPTED)</div>
              <div className="direct-card-val">deepakkumar740@gmail.com</div>
              <p className="direct-card-note">
                Direct to mobile notification. Typical response time under 4 hours for technical inquiries.
              </p>
              <button
                type="button"
                className="btn-copy-email"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
              >
                {copied ? <Check width={14} height={14} /> : <Copy width={14} height={14} />}
                <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL ADDRESS"}</span>
              </button>
            </div>

            {/* Social & Source Links */}
            <div className="direct-links-list">
              <a
                href="https://github.com/deepakrai9813"
                target="_blank"
                rel="noreferrer"
                className="direct-channel-link"
              >
                <div className="channel-icon-name">
                  <Github width={16} height={16} />
                  <span>GITHUB ARCHIVE</span>
                </div>
                <div className="channel-meta">
                  <span>github.com/deepakrai9813</span>
                  <ArrowUpRight width={12} height={12} />
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="direct-channel-link"
              >
                <div className="channel-icon-name">
                  <Linkedin width={16} height={16} />
                  <span>LINKEDIN NETWORK</span>
                </div>
                <div className="channel-meta">
                  <span>Verified Profile</span>
                  <ArrowUpRight width={12} height={12} />
                </div>
              </a>

              <a
                href="/Deepak-Kumar-Resume.pdf"
                download="Deepak-Kumar-Resume.pdf"
                className="direct-channel-link highlight"
              >
                <div className="channel-icon-name">
                  <ShieldCheck width={16} height={16} />
                  <span>RESUME SPECIFICATION (PDF)</span>
                </div>
                <div className="channel-meta">
                  <span>Latest 2026 Edition</span>
                  <ArrowUpRight width={12} height={12} />
                </div>
              </a>
            </div>

            {/* Availability Shard */}
            <div className="availability-card">
              <div className="avail-top">
                <span className="avail-dot" />
                <span className="avail-title">CURRENT STATUS: ACTIVELY INTERVIEWING</span>
              </div>
              <p className="avail-text">
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
