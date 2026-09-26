import { useState } from "react";
import { motion } from "framer-motion";
import RevealText from "./RevealText";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  Send,
  MapPin,
  Clock,
  Sparkles,
} from "./icons";

const EMAIL = "deepakkumar740@gmail.com";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/deepakrai9813",
    Icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/deepak-rai-990502236",
    Icon: Linkedin,
  },
  { label: "Email", href: `mailto:${EMAIL}`, Icon: Mail },
];

const CARDS = [
  {
    Icon: Mail,
    small: "Direct Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    copy: true,
  },
  {
    Icon: MapPin,
    small: "Location & Working Hours",
    value: "Remote Worldwide · IST (UTC+5:30)",
  },
  {
    Icon: Clock,
    small: "Guaranteed Turnaround",
    value: "Within 24 hours (Usually < 4 hrs)",
  },
];

const INTENTS = [
  {
    label: "🚀 New Project / MVP",
    subject: "New Project Inquiry",
    starter:
      "Hi Deepak,\n\nI'm looking to build a high-performance web/AI application. Here are our main requirements, target timeline, and goals:\n\n",
  },
  {
    label: "💼 Hiring for a Role",
    subject: "Engineering Role Opportunity",
    starter:
      "Hi Deepak,\n\nI came across your portfolio and would love to speak with you about a software engineering role at our company:\n\nRole details & stack:\n\n",
  },
  {
    label: "⚡ AI & Systems Advisory",
    subject: "Technical Consultation",
    starter:
      "Hi Deepak,\n\nWe need technical advisory on optimizing our backend architecture / integrating LLMs. Here is what we're working on:\n\n",
  },
  {
    label: "👋 General Connect",
    subject: "Hello from your portfolio",
    starter: "Hi Deepak,\n\nLoved your projects and architecture writeups! Just wanted to connect and say hi.\n\n",
  },
];

export default function Contact({ showToast, playSuccess, playClick }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState(null);

  const copyEmail = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(EMAIL);
      ok = true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = EMAIL;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        ta.remove();
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      playSuccess?.();
      showToast?.({
        type: "success",
        title: "Email Copied!",
        message: `${EMAIL} copied to your clipboard.`,
      });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleIntentClick = (intent) => {
    setSelectedIntent(intent.label);
    playClick?.();
    setForm((prev) => ({
      ...prev,
      message: intent.starter,
    }));
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      selectedIntent
        ? `${selectedIntent} — from ${form.name || "Portfolio Visitor"}`
        : `Portfolio inquiry from ${form.name || "your website"}`
    );
    const body = encodeURIComponent(
      `Hi Deepak,\n\n${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    playSuccess?.();
    showToast?.({
      type: "success",
      title: "Opening Email Client",
      message: "Your message is pre-filled and ready to send!",
    });
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section className="contact" id="contact" aria-label="Contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="contact__grid">
            {/* Left: pitch + direct info */}
            <div className="contact__info">
              <p className="eyebrow">
                <span className="idx">05</span> — Direct Inquiries
              </p>
              <RevealText
                as="h2"
                className="contact__title"
                parts={[
                  { t: "Let's build something" },
                  { t: "exceptional", cls: "accent" },
                  { t: "together." },
                ]}
                delay={0.1}
              />
              <p className="contact__sub">
                Have a production system to architect, a high-impact engineering role to fill,
                or a product idea that needs rapid, rock-solid execution? Send a note or reach out
                directly.
              </p>

              <div className="contact__pill">
                <span className="status-dot" aria-hidden="true" />
                Available for Freelance &amp; Full-Time Engineering Roles
              </div>

              <div className="contact__cards">
                {CARDS.map(({ Icon, small, value, href, copy }) => (
                  <div className="contact__card" key={small}>
                    <span className="contact__card-icon">
                      <Icon width={18} height={18} />
                    </span>
                    <div className="contact__card-body">
                      <small>{small}</small>
                      {href ? <a href={href}>{value}</a> : <strong>{value}</strong>}
                    </div>
                    {copy && (
                      <button
                        className={`copy-btn${copied ? " is-copied" : ""}`}
                        onClick={copyEmail}
                        aria-label="Copy email address"
                        title="Copy email address"
                      >
                        {copied ? <Check width={15} height={15} /> : <Copy width={15} height={15} />}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="hero__socials contact__socials">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" onClick={playClick}>
                    <Icon width={16} height={16} /> {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: message form */}
            <form className="contact__form" onSubmit={onSubmit}>
              <div className="contact__form-head">
                <h3>Send a Message</h3>
                <p>
                  Select what you have in mind to auto-fill a template, or write directly.
                </p>
              </div>

              {/* Intent Quick Chips */}
              <div className="contact__intents">
                {INTENTS.map((intent) => {
                  const isSelected = selectedIntent === intent.label;
                  return (
                    <button
                      type="button"
                      key={intent.label}
                      className={`intent-chip${isSelected ? " is-selected" : ""}`}
                      onClick={() => handleIntentClick(intent)}
                    >
                      {intent.label}
                    </button>
                  );
                })}
              </div>

              <div className="field">
                <label htmlFor="cf-name">Your Name</label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. Alex Morgan"
                  value={form.name}
                  onChange={onChange}
                />
              </div>

              <div className="field">
                <label htmlFor="cf-email">Your Email</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="alex@company.com"
                  value={form.email}
                  onChange={onChange}
                />
              </div>

              <div className="field">
                <label htmlFor="cf-msg">Message &amp; Project Details</label>
                <textarea
                  id="cf-msg"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project, timeline, and goals…"
                  value={form.message}
                  onChange={onChange}
                />
              </div>

              <button type="submit" className="btn btn-primary contact__send" onClick={playClick}>
                {sent ? (
                  <>
                    Opening your email client… <Check width={16} height={16} />
                  </>
                ) : (
                  <>
                    Send Message <Send width={16} height={16} />
                  </>
                )}
              </button>

              <div className="contact__direct-row">
                <span className="contact__hint">
                  Or email directly:{" "}
                  <a href={`mailto:${EMAIL}`}>
                    {EMAIL} <ArrowUpRight width={12} height={12} />
                  </a>
                </span>
                <button
                  type="button"
                  className="contact__copy-text"
                  onClick={copyEmail}
                >
                  <Copy width={12} height={12} /> {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
