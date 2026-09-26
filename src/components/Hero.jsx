import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Sparkles,
  CommandIcon,
  Clock,
  ShieldCheck,
  FileText,
  Mail,
} from "./icons";
import RevealText from "./RevealText";

const ROLES = [
  "Full-Stack Software Engineer",
  "Distributed Systems & Go Developer",
  "AI Integration & LLM Specialist",
  "High-Performance React & Node.js Architect",
];

const NAME_PARTS = [{ t: "Deepak" }, { t: "Rai", cls: "outline" }, { t: ".", cls: "accent" }];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function RotatingRole() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="hero__typer" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          className="word"
          key={ROLES[i]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
      <span className="caret" aria-hidden="true" />
    </p>
  );
}

const CMD = "go build -o sentinel ./cmd/proxy  ✓ 0.8s · 8.4 MB binary";

function TypedLine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= CMD.length) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <p className="hero__code" ref={ref} aria-hidden="true">
      <span className="prompt">$</span> {CMD.slice(0, n)}
      <span className="caret" />
    </p>
  );
}

function LocalTimeBadge() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formatted in India Standard Time (IST)
      const formatted = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="hero__time-chip">
      <Clock width={13} height={13} />
      <span>{time ? `${time} IST (New Delhi)` : "Available Worldwide"}</span>
    </span>
  );
}

export default function Hero({ onOpenCommandPalette, playClick }) {
  const photoRef = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 140, damping: 18 });

  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const onMove = (e) => {
    const r = photoRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <section className="hero" aria-label="Intro">
      <div className="container">
        <div className="hero__grid">
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Top Status & Availability Bar */}
            <motion.div variants={item} className="hero__status-bar">
              <span className="hero__intro">
                <span className="status-dot" aria-hidden="true" />
                Available for Freelance &amp; Full-Time Roles
              </span>
              <LocalTimeBadge />
            </motion.div>

            <RevealText
              as="h1"
              className="hero__name"
              parts={NAME_PARTS}
              mode="context"
              stagger={0.1}
              ariaLabel="Deepak Rai."
            />

            <motion.p variants={item} className="hero__role">
              Full-Stack &amp; Systems <em>Software Engineer</em>
            </motion.p>

            <motion.div variants={item}>
              <RotatingRole />
            </motion.div>

            <motion.p variants={item} className="hero__desc">
              I build resilient distributed systems, sub-second API gateways, and
              pixel-crafted web applications with React, Go, and Node.js. Specialized
              in fault tolerance, low-latency telemetry, and production AI integration.
            </motion.p>

            <motion.div variants={item}>
              <TypedLine />
            </motion.div>

            {/* Quick Command Menu Pill */}
            <motion.div variants={item} className="hero__cmd-bar">
              <button
                className="hero__cmd-pill"
                onClick={() => {
                  playClick?.();
                  onOpenCommandPalette?.(true);
                }}
                aria-label="Open command palette"
              >
                <CommandIcon width={14} height={14} />
                <span>Command Menu</span>
                <kbd>⌘K</kbd>
                <span className="cmd-pill-hint">Press to explore anything instantly</span>
              </button>
            </motion.div>

            <motion.div variants={item} className="hero__cta">
              <a href="#work" className="btn btn-primary" onClick={playClick}>
                Explore Featured Work <ArrowUpRight width={16} height={16} />
              </a>
              <a href="#contact" className="btn btn-ghost" onClick={playClick}>
                <Mail width={15} height={15} /> Get in Touch
              </a>
              <a
                href="Deepak-Resume.pdf"
                download="Deepak-Rai-Resume.pdf"
                className="btn btn-ghost"
                onClick={playClick}
              >
                <FileText width={15} height={15} /> Resume
              </a>
            </motion.div>

            <motion.div variants={item} className="hero__socials">
              <a
                href="https://github.com/deepakrai9813"
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
              >
                <Github width={17} height={17} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/deepak-rai-990502236"
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
              >
                <Linkedin width={17} height={17} /> LinkedIn
              </a>
              <span className="hero__response-time">
                Typical response time: &lt; 4 hours
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__photo"
            initial={{ opacity: 0, y: 34, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="hero__photo-inner"
              ref={photoRef}
              style={{ rotateX, rotateY, transformPerspective: 900, y: parallaxY }}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              <img
                src="deepak-rai.png"
                alt="Deepak Rai — full-stack software engineer"
                width="1122"
                height="1402"
              />
            </motion.div>
            <span className="hero__ai-chip">
              <Sparkles width={14} height={14} /> AI &amp; Systems Engineer
            </span>
            <div className="hero__badge">
              <div>
                <b>3+</b>
                <small>Years Engineering Experience</small>
              </div>
            </div>
            <div className="hero__badge-sub">
              <ShieldCheck width={15} height={15} />
              <span>Production Proven</span>
            </div>
          </motion.div>
        </div>

        <motion.p
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          aria-hidden="true"
        >
          Scroll to explore architecture &amp; work
        </motion.p>
      </div>
    </section>
  );
}
