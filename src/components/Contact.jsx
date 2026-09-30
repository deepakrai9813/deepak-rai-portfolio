import { useState } from "react";
import { PERSONAL_INFO } from "../utils/data";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setStatusMessage("Please fill in all required fields.");
      return;
    }

    setStatus("sending");

    try {
      // Send via Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "66fc7df2-2f3b-48aa-bda4-8b6567228833", // Web3Forms key
          from_name: formData.name,
          email: formData.email,
          subject: formData.subject || `Portfolio Contact from ${formData.name}`,
          message: formData.message,
          to: PERSONAL_INFO.email,
        }),
      });

      const result = await response.json();
      if (result.success || response.ok) {
        setStatus("success");
        setStatusMessage("Message transmitted successfully. Deepak will reply within 6 hours.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // Graceful fallback mailto
        window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject || "Portfolio Contact")}&body=${encodeURIComponent(formData.message)}`;
        setStatus("success");
        setStatusMessage("Redirected to your email client to send message.");
      }
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject || "Portfolio Contact")}&body=${encodeURIComponent(formData.message)}`;
      setStatus("success");
      setStatusMessage("Redirected to your email client to send message.");
    }
  };

  return (
    <section id="contact" className="section-container-block">
      {/* Section Header */}
      <div className="section-header-lockup">
        <div className="section-tag-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 2L11 13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          <span>GET IN TOUCH</span>
        </div>
        <h2 className="section-heading-title">Direct Signal Transmitter</h2>
        <p className="section-subtitle-text">
          Have an ambitious engineering project, a high-impact senior role, or an architectural challenge? Send a message directly.
        </p>
      </div>

      {/* Contact Wrapper Grid */}
      <div className="contact-section-wrapper">
        {/* Left Column: Direct Info Cards */}
        <div className="contact-info-panel">
          {/* Email Card */}
          <div
            className="contact-method-card"
            style={{ cursor: "pointer" }}
            onClick={handleCopyEmail}
            title="Click to copy email address"
          >
            <div className="contact-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="contact-method-meta">
              <span className="contact-lbl-txt">Direct Email (Click to Copy)</span>
              <span className="contact-val-txt">{PERSONAL_INFO.email}</span>
              {copiedEmail && (
                <span style={{ fontSize: "11px", color: "var(--accent-emerald)", marginTop: "2px" }}>
                  Copied to clipboard!
                </span>
              )}
            </div>
          </div>

          {/* Location Card */}
          <div className="contact-method-card">
            <div className="contact-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="contact-method-meta">
              <span className="contact-lbl-txt">Current Base</span>
              <span className="contact-val-txt">{PERSONAL_INFO.location}</span>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                IST / UTC+5:30 (Open to Remote Worldwide)
              </span>
            </div>
          </div>

          {/* LinkedIn Card */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-method-card"
          >
            <div className="contact-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>
            <div className="contact-method-meta">
              <span className="contact-lbl-txt">Professional Network</span>
              <span className="contact-val-txt">linkedin.com/in/deepakrai9813</span>
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-method-card"
          >
            <div className="contact-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </div>
            <div className="contact-method-meta">
              <span className="contact-lbl-txt">Source Code</span>
              <span className="contact-val-txt">github.com/deepakrai9813</span>
            </div>
          </a>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="contact-form-card">
          {status === "success" ? (
            <div className="form-feedback-banner">
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid var(--accent-emerald)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-emerald)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="feedback-headline">Message Transmitted</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "420px" }}>
                {statusMessage}
              </p>
              <button
                type="button"
                className="btn-secondary-action"
                style={{ marginTop: "12px" }}
                onClick={() => setStatus("idle")}
              >
                <span>Send Another Message</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="direct-comms-form">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group-field">
                  <label htmlFor="name" className="form-field-label">YOUR NAME *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-field-input"
                  />
                </div>

                <div className="form-group-field">
                  <label htmlFor="email" className="form-field-label">EMAIL ADDRESS *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-field-input"
                  />
                </div>
              </div>

              <div className="form-group-field">
                <label htmlFor="subject" className="form-field-label">SUBJECT</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Senior Full Stack Role / Architecture Project"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-field-input"
                />
              </div>

              <div className="form-group-field">
                <label htmlFor="message" className="form-field-label">MESSAGE *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  placeholder="Tell me about your project, timeline, or engineering opportunity..."
                  value={formData.message}
                  onChange={handleChange}
                  className="form-field-input form-field-textarea"
                />
              </div>

              {status === "error" && (
                <div style={{ color: "#ef4444", fontSize: "13px", fontFamily: "var(--font-mono)" }}>
                  {statusMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-submit-message"
              >
                {status === "sending" ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
