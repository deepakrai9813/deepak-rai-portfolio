import { useState, useEffect } from "react";

export default function ScheduleMeetingModal({ isOpen, onClose }) {
  const [meetingType, setMeetingType] = useState("30min");
  const [visitorName, setVisitorName] = useState("");
  const [visitorCompany, setVisitorCompany] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  const meetingTypes = [
    {
      id: "15min",
      title: "15-Min Coffee Chat",
      duration: "15 mins",
      badge: "Quick Intro",
      desc: "Casual conversation to explore engineering synergy, startup ideas, and high-level role fit.",
    },
    {
      id: "30min",
      title: "30-Min Technical Architecture",
      duration: "30 mins",
      badge: "Recommended",
      desc: "Deep-dive into distributed systems, Node.js concurrency, Redis cache strategies, or code walkthrough.",
    },
    {
      id: "45min",
      title: "45-Min Senior Role Interview",
      duration: "45 mins",
      badge: "Formal Interview",
      desc: "Comprehensive engineering evaluation, system design discussion, and team roadmap alignment.",
    },
  ];

  const currentType = meetingTypes.find((t) => t.id === meetingType) || meetingTypes[1];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mailSubject = encodeURIComponent(
    `[Meeting Request] ${currentType.title} with Deepak Kumar (${visitorCompany || "Engineering Team"})`
  );

  const mailBody = encodeURIComponent(
`Hi Deepak,

I'd like to schedule a ${currentType.title} (${currentType.duration}) with you.

Details:
- Name: ${visitorName || "Recruiter / Engineering Manager"}
- Organization: ${visitorCompany || "Our Team"}
- Preferred Date / Timezone: ${preferredTime || "This week (flexible)"}
- Agenda & Topics: ${notes || "Discussing full-stack architecture and opportunities"}

Looking forward to connecting!

Best regards,
${visitorName || "Visitor"}`
  );

  const mailtoLink = `mailto:deepakkumar740@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  const handleCopyAgenda = () => {
    const agendaText = `Meeting Request: ${currentType.title}
From: ${visitorName || "Recruiter / Team"} (${visitorCompany || "Company"})
Time Preference: ${preferredTime || "Flexible"}
Notes: ${notes || "Architecture & Opportunities discussion"}
Contact: deepakkumar740@gmail.com`;

    navigator.clipboard.writeText(agendaText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="schedule-modal-backdrop" onClick={onClose}>
      <div
        className="schedule-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-dialog-title"
      >
        <div className="schedule-modal-header">
          <div className="schedule-header-title-lockup">
            <span className="schedule-tag-pill">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>DIRECT CALENDAR INVITATION</span>
            </span>
            <h3 id="schedule-dialog-title" className="schedule-dialog-title">
              Schedule a Technical Conversation
            </h3>
          </div>
          <button
            type="button"
            className="btn-close-schedule-modal"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="schedule-modal-body">
          {/* Format Selection Radio Tiles */}
          <div className="format-selection-group" role="radiogroup" aria-label="Meeting format">
            {meetingTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                role="radio"
                aria-checked={meetingType === type.id}
                className={`format-tile-btn ${meetingType === type.id ? "active" : ""}`}
                onClick={() => setMeetingType(type.id)}
              >
                <div className="tile-top-row">
                  <span className="tile-title">{type.title}</span>
                  <span className="tile-badge">{type.badge}</span>
                </div>
                <p className="tile-desc">{type.desc}</p>
              </button>
            ))}
          </div>

          {/* Form Fields */}
          <div className="schedule-fields-grid">
            <div className="form-group-item">
              <label htmlFor="sched-name" className="field-label">Your Name</label>
              <input
                id="sched-name"
                type="text"
                className="field-input"
                placeholder="e.g. Sarah Connor"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
              />
            </div>

            <div className="form-group-item">
              <label htmlFor="sched-company" className="field-label">Company / Team</label>
              <input
                id="sched-company"
                type="text"
                className="field-input"
                placeholder="e.g. Stripe, Acme Cloud"
                value={visitorCompany}
                onChange={(e) => setVisitorCompany(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group-item">
            <label htmlFor="sched-time" className="field-label">Preferred Time Window & Timezone</label>
            <input
              id="sched-time"
              type="text"
              className="field-input"
              placeholder="e.g. Thursday 3:00 PM IST / 9:30 AM UTC"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
            />
          </div>

          <div className="form-group-item">
            <label htmlFor="sched-notes" className="field-label">Agenda or Specific Focus Areas</label>
            <textarea
              id="sched-notes"
              rows={2}
              className="field-textarea"
              placeholder="e.g. Discussing the Senior Full Stack opening, reviewing microservices and cache architecture..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="schedule-modal-footer">
          <button
            type="button"
            className="btn-copy-agenda"
            onClick={handleCopyAgenda}
          >
            {copied ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Copied Agenda!</span>
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>Copy Agenda</span>
              </>
            )}
          </button>

          <a
            href={mailtoLink}
            className="btn-launch-mailto"
            onClick={() => {
              setTimeout(onClose, 500);
            }}
          >
            <span>Launch Email Client</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
