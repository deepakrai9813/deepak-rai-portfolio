import { motion } from "framer-motion";
import RevealText from "./RevealText";
import CountUp from "./CountUp";

const STATS = [
  { value: 3, suffix: "+", label: "Years of experience" },
  { value: 15, suffix: "+", label: "Projects built" },
  { value: 20, suffix: "+", label: "Technologies & tools" },
];

export default function About() {
  return (
    <section className="about" id="about" aria-label="About">
      <div className="container about__grid">
        <motion.div
          className="about__media"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="deepak-rai.png" alt="Deepak Rai" loading="lazy" />
        </motion.div>

        <motion.div
          className="about__body"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">
            <span className="idx">01</span> — About me
          </p>
          <RevealText
            as="h2"
            className="section-title"
            parts={[{ t: "Building the web, end to end." }]}
            delay={0.1}
          />

          <p style={{ marginTop: "1.6rem" }}>
            Hi, I&apos;m <strong>Deepak Rai</strong> — a full-stack software developer
            with a passion for crafting products that are as delightful to use as they
            are robust under the hood.
          </p>
          <p>
            I work across the entire stack:{" "}
            <strong>React front-ends</strong> that feel instant,{" "}
            <strong>Node.js APIs</strong> built for scale, and the databases,
            CI/CD pipelines, and cloud infrastructure that keep everything running
            smoothly in production.
          </p>
          <p>
            When I&apos;m not shipping code, I&apos;m exploring new tools, writing about
            what I learn, and helping teams turn rough ideas into reliable software.
          </p>

          <div className="about__stats">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <CountUp value={s.value} suffix={s.suffix} />
                <small>{s.label}</small>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
