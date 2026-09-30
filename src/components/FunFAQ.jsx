import { useState } from "react";

export default function FunFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Can Deepak lead both frontend architecture and distributed backends?",
      a: "Yes. With 3+ years of end-to-end production engineering, I architect modern React 19/Next.js 15 client interfaces while engineering scalable, event-driven Node.js and Python microservices, distributed Redis caching pipelines, and sharded MongoDB/PostgreSQL database clusters.",
    },
    {
      q: "What are his production latency and performance benchmarks?",
      a: "Sub-50ms message latency for real-time WebSocket clusters and sub-18ms p95 API response times. At San Brothers Corporate Solutions, I optimized database aggregation pipelines and introduced distributed Redis caching, slashing p95 response times by 60% and speeding up onboarding by 4.5x.",
    },
    {
      q: "How does he handle asynchronous and remote collaboration?",
      a: "I work with an async-first mindset: thorough PR descriptions, clear architectural decision records (ADRs), comprehensive unit/integration test suites, and transparent daily milestone updates. My verified response SLA is under 6 hours across global time zones.",
    },
    {
      q: "Is he open to full-time Senior or Lead engineering roles?",
      a: "Yes. I am actively available for Senior Full-Stack Developer, Backend Architect, and Lead Engineering roles with forward-thinking teams, fast-growing SaaS startups, and high-scale enterprise platforms.",
    },
  ];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="section-container-block">
      <div className="section-header-lockup">
        <div className="section-tag-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>QUICK ANSWERS</span>
        </div>
        <h2 className="section-heading-title">Frequently Asked Questions</h2>
        <p className="section-subtitle-text">
          Everything you need to know about my engineering capabilities, work philosophy, and availability.
        </p>
      </div>

      <div className="faq-accordion-list">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`faq-accordion-item ${isOpen ? "open" : ""}`}
              onClick={() => toggle(idx)}
            >
              <button
                type="button"
                className="faq-question-btn"
                aria-expanded={isOpen}
              >
                <span className="faq-question-text">{faq.q}</span>
                <span className="faq-toggle-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div className="faq-answer-panel">
                  <p className="faq-answer-text">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
