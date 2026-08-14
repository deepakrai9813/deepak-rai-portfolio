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
    small: "Email me at",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    copy: true,
  },
  {
    Icon: MapPin,
    small: "Based in",
    value: "Remote-friendly · Worldwide",
  },
  {
    Icon: Clock,
    small: "Response time",
    value: "Within 24 hours",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

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
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "your website"}`);
    const body = encodeURIComponent(
      `Hi Deepak,\n\n${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
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
                <span className="idx">05</span> — Contact
              </p>
              <RevealText
                as="h2"
                className="contact__title"
                parts={[
                  { t: "Let's build something" },
                  { t: "great", cls: "accent" },
                  { t: "together." },
                ]}
                delay={0.1}
              />
              <p className="contact__sub">
                Have a project in mind, a role to fill, or just want to say hi? My inbox
                is always open — I&apos;ll get back to you within a day.
              </p>

              <div className="contact__pill">
                <span className="status-dot" aria-hidden="true" />
                Open to freelance &amp; full-time opportunities
              </div>

              <div className="contact__cards">
                {CARDS.map(({ Icon, small, value, href, copy }) => (
                  <div className="contact__card" key={small}>
                    <span className="contact__card-icon">
                      <Icon />
                    </span>
                    <div className="contact__card-body">
                      <small>{small}</small>
                      {href ? (
                        <a href={href}>{value}</a>
                      ) : (
                        <strong>{value}</strong>
                      )}
                    </div>
                    {copy && (
                      <button
                        className="copy-btn"
                        onClick={copyEmail}
                        aria-label="Copy email address"
                        title="Copy email address"
                      >
                        {copied ? <Check /> : <Copy />}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="hero__socials contact__socials">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer">
                    <Icon width={16} height={16} /> {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: message form */}
            <form className="contact__form" onSubmit={onSubmit}>
              <div className="contact__form-head">
                <h3>Send a message</h3>
                <p>
                  Fill this in and it opens your email app — everything is prefilled,
                  just hit send.
                </p>
              </div>

              <div className="field">
                <label htmlFor="cf-name">Name</label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={onChange}
                />
              </div>

              <div className="field">
                <label htmlFor="cf-email">Email</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={onChange}
                />
              </div>

              <div className="field">
                <label htmlFor="cf-msg">Message</label>
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

              <button type="submit" className="btn btn-primary contact__send">
                {sent ? (
                  <>
                    Opening your email… <Check width={16} height={16} />
                  </>
                ) : (
                  <>
                    Send message <Send width={16} height={16} />
                  </>
                )}
              </button>

              <p className="contact__hint">
                Prefer email?{" "}
                <a href={`mailto:${EMAIL}`}>
                  {EMAIL} <ArrowUpRight width={12} height={12} />
                </a>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
