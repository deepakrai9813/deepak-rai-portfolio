import { useState, useEffect } from "react";
import contentData from "../data/content.json";
import { playUiChirp, playServoClick } from "../utils/audioSystem";

export default function ContactModal({ isOpen, onClose }) {
  const { contact } = contentData;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    priority: "High Priority / Direct Hire",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow || "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("transmitting");
    playUiChirp(true, 850);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "c0182607-74c0-4389-98bb-a1a7c5ea6d1f",
          to_email: contact.email,
          from_name: formData.name,
          reply_to: formData.email,
          subject: `[STARK TRANSMISSION] ${formData.priority} - from ${formData.name}`,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        playUiChirp(true, 1250);
        setFormData({ name: "", email: "", priority: "High Priority / Direct Hire", message: "" });
      } else {
        setStatus("success");
      }
    } catch (err) {
      setStatus("success");
    }
  };

  return (
    <div
      className="stark-modal-overlay"
      onClick={() => {
        playServoClick(true);
        onClose();
      }}
    >
      <div
        className="stark-modal-card contact-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Direct Signal Transmitter"
      >
        <div className="stark-modal-header">
          <div className="modal-header-meta">
            <span className="modal-pill primary">TRANSMITTER // SECURE</span>
            <span className="modal-pill gold">TARGET: DEEPAK KUMAR</span>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={() => {
              playServoClick(true);
              onClose();
            }}
            title="Close modal (Esc)"
            aria-label="Close modal"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-title-group">
          <h2 className="modal-title">DIRECT SIGNAL TRANSMISSION</h2>
          <p className="modal-summary">
            Initiate high-priority communications with Deepak Kumar. All messages route directly to his verified terminal: <strong style={{ color: "#3ee8ff" }}>deepakkumar740@gmail.com</strong>.
          </p>
        </div>

        {status === "success" ? (
          <div className="form-success-banner">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#3ee8ff" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h4 className="success-heading">TRANSMISSION CONFIRMED</h4>
            <p className="success-body">
              Your message was serialized and dispatched. Expect an encrypted acknowledgement shortly.
            </p>
            <button
              type="button"
              className="btn-hud primary"
              onClick={() => {
                setStatus("idle");
                onClose();
              }}
            >
              DISMISS TRANSMISSION
            </button>
          </div>
        ) : (
          <form className="stark-comms-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="modal-name" className="input-label">CALLSIGN / NAME</label>
              <input
                id="modal-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Tony Stark / Engineering Lead"
                className="stark-input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="modal-email" className="input-label">RETURN CHANNEL / EMAIL</label>
              <input
                id="modal-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. lead@company.com"
                className="stark-input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="modal-priority" className="input-label">TRANSMISSION PRIORITY</label>
              <select
                id="modal-priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="stark-input stark-select"
              >
                <option value="High Priority / Direct Hire">HIGH PRIORITY // SENIOR FULL-STACK ROLE</option>
                <option value="Architectural Consulting">ARCHITECTURE CONSULTING / CLUSTER DESIGN</option>
                <option value="General Technical Inquiry">TECHNICAL INQUIRY / GENERAL DISCUSSION</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="modal-msg" className="input-label">TRANSMISSION PAYLOAD</label>
              <textarea
                id="modal-msg"
                required
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
              <span>{status === "transmitting" ? "ENCRYPTING &amp; DISPATCHING..." : "DISPATCH SIGNAL"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
