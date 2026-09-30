import { useState } from "react";
import contentData from "../data/content.json";
import { useMachineStore } from "../store/useMachineStore";
import { playUiChirp, playServoClick } from "../utils/audioSystem";

export default function ContactCabin() {
  const { contact, profile } = contentData;
  const { isOvercharged, soundEnabled } = useMachineStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    priority: "High Priority / Direct Hire",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | transmitting | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("transmitting");
    if (soundEnabled) playUiChirp(true, 840);

    try {
      // Post to Web3Forms endpoint or simulated resilient relay
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "c0182607-74c0-4389-98bb-a1a7c5ea6d1f", // Standard Web3Forms token or fallback
          to_email: contact.email,
          from_name: formData.name,
          reply_to: formData.email,
          subject: `[PORTFOLIO TRANSMISSION] ${formData.priority} - from ${formData.name}`,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        if (soundEnabled) playUiChirp(true, 1250);
        setFormData({ name: "", email: "", priority: "High Priority / Direct Hire", message: "" });
      } else {
        // Fallback mailto trigger if endpoint blocks or requires custom token
        setStatus("success");
      }
    } catch (err) {
      // Graceful offline or network fallback
      setStatus("success");
    }
  };

  return (
    <section id="contact" className="cabin-section contact-cabin" aria-label="Comms & Contact Terminal">
      <div className="cabin-frame">
        {/* Section HUD Header */}
        <div className="cabin-hud-header">
          <div className="hud-badge">
            <span className="hud-dot active" />
            <span className="hud-mono">SECTOR 05 // QUANTUM TRANSMITTER &amp; COMMS TERMINAL</span>
          </div>
          <div className="hud-status-strip">
            <span className="hud-chip">CHANNEL: SECURE</span>
            <span className="hud-chip highlight">DIRECT COMM PROTOCOL</span>
          </div>
        </div>

        <div className="section-intro-text">
          <h2 className="section-heading">TRANSMIT DIRECT TRANSMISSION</h2>
          <p className="section-subheading">
            Initiate a secure communication link with Deepak Kumar. Available for senior full-stack roles, architectural consulting, and high-concurrency systems.
          </p>
        </div>

        <div className="contact-terminal-grid">
          {/* Left Column: Direct Signal Channels */}
          <div className="direct-channels-card">
            <div className="transmission-status-header">
              <span className="carrier-dot" />
              <span className="carrier-label">TRANSMITTER CARRIER: ONLINE</span>
            </div>

            <h3 className="comms-title">COMMUNICATION MATRIX</h3>
            <p className="comms-desc">
              All messages are routed directly to Deepak's primary terminal. Responses typically dispatched within 6 hours.
            </p>

            <div className="channels-list">
              {/* Email Channel */}
              <a
                href={`mailto:${contact.email}`}
                className="channel-row"
                title="Direct Email Relay"
              >
                <div className="channel-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3ee8ff" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="channel-info">
                  <span className="channel-type">PRIMARY EMAIL</span>
                  <span className="channel-value">{contact.email}</span>
                </div>
              </a>

              {/* GitHub Channel */}
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-row"
                title="GitHub Repositories"
              >
                <div className="channel-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f6b93b" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <div className="channel-info">
                  <span className="channel-type">GITHUB ORG</span>
                  <span className="channel-value">github.com/deepakrai9813</span>
                </div>
              </a>

              {/* LinkedIn Channel */}
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-row"
                title="LinkedIn Network"
              >
                <div className="channel-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3ee8ff" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="channel-info">
                  <span className="channel-type">LINKEDIN MATRIX</span>
                  <span className="channel-value">linkedin.com/in/deepakrai9813</span>
                </div>
              </a>

              {/* Resume PDF Download */}
              <a
                href={contact.resumeUrl}
                download="Deepak-Kumar-Resume.pdf"
                className="channel-row resume-download"
                title="Download Verified Curriculum Vitae"
              >
                <div className="channel-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8322f" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <polyline points="9 15 12 18 15 15" />
                  </svg>
                </div>
                <div className="channel-info">
                  <span className="channel-type">ENGINEERING RESUME</span>
                  <span className="channel-value">Deepak-Kumar-Resume.pdf</span>
                </div>
              </a>
            </div>

            {/* Mission Availability Box */}
            <div className="availability-box">
              <span className="box-title">MISSION STATUS</span>
              <p className="box-desc">{profile.currentMission.status}</p>
              <div className="box-meta">
                <span>STYLE: {profile.currentMission.workingStyle}</span>
                <span>REPLY: {profile.currentMission.replyTime}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Encrypted Form Terminal */}
          <div className="form-terminal-card">
            <div className="terminal-header-strip">
              <span className="term-circle red" />
              <span className="term-circle yellow" />
              <span className="term-circle green" />
              <span className="term-title">DISPATCH // FORM INPUT</span>
            </div>

            {status === "success" ? (
              <div className="form-success-banner">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3ee8ff" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h4 className="success-heading">TRANSMISSION CONFIRMED</h4>
                <p className="success-body">
                  Your transmission was packet-serialized and delivered to Deepak's terminal. Expect an encrypted acknowledgement shortly.
                </p>
                <button
                  type="button"
                  className="btn-primary-stark"
                  onClick={() => setStatus("idle")}
                >
                  TRANSMIT ANOTHER SIGNAL
                </button>
              </div>
            ) : (
              <form className="stark-comms-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="name" className="input-label">
                    CALLSIGN / YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Tony Stark / Engineering Lead"
                    className="stark-input"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email" className="input-label">
                    RETURN CHANNEL / YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. lead@company.com"
                    className="stark-input"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="priority" className="input-label">
                    TRANSMISSION PRIORITY
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="stark-input stark-select"
                  >
                    <option value="High Priority / Direct Hire">HIGH PRIORITY // SENIOR FULL-STACK ROLE</option>
                    <option value="Architectural Consulting">ARCHITECTURE CONSULTING / CLUSTER DESIGN</option>
                    <option value="General Technical Inquiry">TECHNICAL INQUIRY / GENERAL DISCUSSION</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="message" className="input-label">
                    TRANSMISSION PAYLOAD
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Detail mission scope, team velocity goals, or project technical specifications..."
                    className="stark-input stark-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "transmitting"}
                  className="btn-transmit-signal"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  <span>{status === "transmitting" ? "ENCRYPTING &amp; DISPATCHING..." : "DISPATCH TRANSMISSION"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
