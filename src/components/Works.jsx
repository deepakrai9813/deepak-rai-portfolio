import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectPreview from "./ProjectPreview";
import GitHubStrip from "./GitHubStrip";
import RevealText from "./RevealText";
import { ArrowUpRight, ExternalLink, Github } from "./icons";

const PROJECTS = [
  {
    title: "SAN BROTHERS Corporate Solutions",
    repo: null,
    live: "https://sanbrotherscorporatesolutions.in",
    image: "projects/san-brothers.jpg",
    featured: true,
    wide: true,
    desc: "Production website for a Company Secretary practice serving companies across India — incorporation, statutory compliance, governance, and regulatory filings. Full-stack build with dedicated service pages, SEO-optimized, and live on its own domain — ranking #1 on Google for its brand.",
    tags: ["Full-Stack", "SEO Optimized", "Production", "Custom Domain", "Live on Google"],
  },
  {
    title: "BIAN AI — AI Study Assistant",
    repo: "https://github.com/deepakrai9813/AI_PROJECT",
    live: null,
    variant: "bian",
    wide: false,
    desc: "AI-powered learning platform that reads your PDFs and helps you study — chat with an AI tutor, get structured summaries, generate quizzes, and flip through flashcards, with token-by-token streaming replies.",
    tags: ["React 19", "Vite", "Express", "Groq LLM", "Streaming API", "pdf.js"],
  },
  {
    title: "LeadFinder AI",
    repo: "https://github.com/deepakrai9813/leadfinder-ai",
    live: null,
    variant: "leadfinder",
    desc: "AI-powered lead generation tool — smart business search, AI website analysis, personalized email & WhatsApp outreach, Google OAuth, and an analytics dashboard.",
    tags: ["Next.js 16", "TypeScript", "Prisma", "NextAuth.js", "Tailwind CSS"],
  },
  {
    title: "Debe Learning — Reschedule Widget",
    repo: "https://github.com/deepakrai9813/debe-learning-tech-intern-assessment",
    live: "https://debe-learning-tech-intern-assessmen.vercel.app",
    variant: "debe",
    desc: "Parent-facing widget for tutoring sessions — view the next 3 upcoming sessions and request a reschedule with a 2-hour lead-time lockout, UTC-safe storage, and fully typed code. Deployed on Vercel with a Playwright smoke test.",
    tags: ["Next.js", "TypeScript", "Firebase", "Cloud Functions", "Playwright"],
  },
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export default function Works() {
  return (
    <section className="works" id="work" aria-label="Selected work">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="eyebrow">
              <span className="idx">03</span> — Selected work
            </p>
            <RevealText
              as="h2"
              className="section-title"
              parts={[{ t: "Real projects, shipped end to end" }]}
              delay={0.05}
            />
          </div>
          <a
            href="https://github.com/deepakrai9813?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            <Github width={16} height={16} /> More on GitHub
          </a>
        </motion.div>

        <div className="works__grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        <GitHubStrip />
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index: i }) {
  const previewRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: previewRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);
  const href = p.live || p.repo;

  return (
    <motion.article
      className={`project${p.wide ? " project--wide" : ""}`}
      {...reveal}
      transition={{ ...reveal.transition, delay: (i % 3) * 0.08 }}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${p.title} — open ${p.live ? "live site" : "repository"}`}
        tabIndex={-1}
      >
        <div className="project__preview" ref={previewRef}>
          {p.featured && (
            <span className="project__badge">
              <i aria-hidden="true" /> Live on Google
            </span>
          )}
          <motion.div className="project__parallax" style={{ y: parallaxY }}>
            {p.image ? (
              <img
                className="project__shot"
                src={p.image}
                alt={`${p.title} website screenshot`}
                loading="lazy"
              />
            ) : (
              <ProjectPreview variant={p.variant} />
            )}
          </motion.div>
        </div>
      </a>
      <div className="project__meta">
        <h3>
          {p.title} <span style={{ color: "var(--accent)" }}>/</span>
        </h3>
        <a
          className="project__arrow"
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${p.title} ${p.live ? "live site" : "repository"}`}
          title={p.live ? "Visit live site" : "View on GitHub"}
        >
          <ArrowUpRight width={18} height={18} />
        </a>
      </div>
      <p className="project__desc">{p.desc}</p>
      <div className="project__links">
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noreferrer">
            <Github /> GitHub
          </a>
        )}
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" className="live">
            <ExternalLink /> Visit live site
          </a>
        )}
      </div>
      <div className="project__tags">
        {p.tags.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
