import { motion } from "framer-motion";
import RevealText from "./RevealText";

const TESTIMONIALS = [
  {
    quote:
      "Deepak shipped our platform ahead of schedule — the frontend feels instant and the API held up perfectly under load. Rare to find someone this strong across the whole stack.",
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechNova",
  },
  {
    quote:
      "A rare combination of design taste and backend rigor. He took our vague idea, added AI features we didn't think were possible in the timeframe, and delivered an MVP that impressed investors.",
    name: "Michael Okafor",
    role: "Engineering Lead",
    company: "Cloudline",
  },
  {
    quote:
      "Deepak is the person you want when something needs to actually ship. Clear communication, clean code, and he always thinks one step ahead about edge cases and scale.",
    name: "Priya Sharma",
    role: "Founder",
    company: "StudyLoop",
  },
];

const EASE = [0.22, 1, 0.36, 1];

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials" aria-label="Testimonials">
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
              <span className="idx">04</span> — Testimonials
            </p>
            <RevealText
              as="h2"
              className="section-title"
              parts={[{ t: "Kind words from people I've worked with" }]}
              delay={0.05}
            />
          </div>
        </motion.div>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => {
            const initials = t.name
              .split(" ")
              .map((w) => w[0])
              .join("");
            return (
              <motion.figure
                className="testimonial"
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              >
                <span className="testimonial__mark" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <span className="testimonial__avatar" aria-hidden="true">
                    {initials}
                  </span>
                  <div>
                    <strong>{t.name}</strong>
                    <small>
                      {t.role} · {t.company}
                    </small>
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
