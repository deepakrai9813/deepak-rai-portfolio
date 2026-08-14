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
import { ArrowUpRight, Github, Linkedin, Sparkles } from "./icons";
import RevealText from "./RevealText";

const ROLES = [
  "Full-Stack Developer",
  "AI Integration Engineer",
  "React & Node.js Specialist",
  "Problem Solver",
];

const NAME_PARTS = [{ t: "Deepak" }, { t: "Rai", cls: "outline" }, { t: ".", cls: "accent" }];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

function RotatingRole() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2600);
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

const CMD = "npm run build --production  ✓ 14s · 114 kB gz";

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
    }, 42);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <p className="hero__code" ref={ref} aria-hidden="true">
      <span className="prompt">$</span> {CMD.slice(0, n)}
      <span className="caret" />
    </p>
  );
}

export default function Hero() {
  const photoRef = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 140, damping: 18 });

  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [36, -36]);

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
            <motion.p variants={item} className="hero__intro">
              <span className="status-dot" aria-hidden="true" />
              Available for freelance &amp; full-time roles
            </motion.p>

            <RevealText
              as="h1"
              className="hero__name"
              parts={NAME_PARTS}
              mode="context"
              stagger={0.1}
              ariaLabel="Deepak Rai."
            />

            <motion.p variants={item} className="hero__role">
              Full-Stack <em>Software Developer</em>
            </motion.p>

            <motion.div variants={item}>
              <RotatingRole />
            </motion.div>

            <motion.p variants={item} className="hero__desc">
              I design and build fast, scalable web applications — from pixel-perfect
              interfaces and rock-solid APIs to cloud infrastructure and AI-powered
              features that make products genuinely smarter.
            </motion.p>

            <motion.div variants={item}>
              <TypedLine />
            </motion.div>

            <motion.div variants={item} className="hero__cta">
              <a href="#work" className="btn btn-primary">
                View my work <ArrowUpRight width={16} height={16} />
              </a>
              <a href="#contact" className="btn btn-ghost">
                Get in touch
              </a>
              <a href="Deepak-Resume.pdf" download className="btn btn-ghost">
                Download CV
              </a>
            </motion.div>

            <motion.div variants={item} className="hero__socials">
              <a
                href="https://github.com/deepakrai9813"
                target="_blank"
                rel="noreferrer"
              >
                <Github width={17} height={17} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/deepak-rai-990502236"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin width={17} height={17} /> LinkedIn
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__photo"
            initial={{ opacity: 0, y: 34, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
                alt="Deepak Rai — full-stack software developer"
                width="1122"
                height="1402"
              />
            </motion.div>
            <span className="hero__ai-chip">
              <Sparkles width={14} height={14} /> AI Integration
            </span>
            <div className="hero__badge">
              <div>
                <b>3+</b>
                <small>Years of experience</small>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          aria-hidden="true"
        >
          Scroll to explore
        </motion.p>
      </div>
    </section>
  );
}
