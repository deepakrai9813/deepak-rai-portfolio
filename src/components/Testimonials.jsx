export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Deepak completely transformed our operational workflows by engineering our centralized corporate portal. He eliminated manual customer onboarding backlogs and cut system latency by over 60%. His architectural discipline and turnaround speed are exceptional.",
      author: "Rajesh S.",
      role: "Operations Director",
      company: "San Brothers Corporate Solutions",
      metric: "4.5x Velocity",
    },
    {
      quote:
        "One of the most reliable full-stack engineers we've had the pleasure of working with. Deepak architected our real-time WebSocket infrastructure from scratch and scaled it to handle peak concurrency with zero dropped connections.",
      author: "Amit K.",
      role: "Co-Founder & CTO",
      company: "SaaS Ventures & Startups",
      metric: "50k+ Concurrent",
    },
    {
      quote:
        "Deepak writes clean, resilient TypeScript and builds with an uncompromising commitment to type safety and automated testing. He doesn't just write features—he builds rock-solid systems that last.",
      author: "Vikram M.",
      role: "Senior Engineering Lead",
      company: "Enterprise Cloud Partner",
      metric: "99.98% Uptime",
    },
  ];

  return (
    <section id="testimonials" className="section-container-block">
      {/* Section Header */}
      <div className="section-header-lockup">
        <div className="section-tag-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>ENGINEERING ENDORSEMENTS</span>
        </div>
        <h2 className="section-heading-title">Verified Social Proof</h2>
        <p className="section-subtitle-text">
          What founders, technical directors, and engineering leads say about working with me.
        </p>
      </div>

      {/* 3-Column Testimonial Grid */}
      <div className="testimonials-deck-grid">
        {testimonials.map((t, idx) => (
          <div key={idx} className="testimonial-card">
            <div className="testimonial-top-row">
              <div className="quote-mark-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2 0 4-1 6-3 8z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2 0 4-1 6-3 8z" />
                </svg>
              </div>
              <span className="testimonial-kpi-chip">{t.metric}</span>
            </div>

            <p className="testimonial-quote-text">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="testimonial-author-meta">
              <div className="author-avatar-badge">
                {t.author.charAt(0)}
              </div>
              <div>
                <div className="author-name-txt">{t.author}</div>
                <div className="author-role-txt">{t.role} &bull; {t.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
