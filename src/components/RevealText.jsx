import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const contextVariants = {
  hidden: { y: "115%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.75, ease: EASE, delay: i * 0.09 },
  }),
};

/**
 * Splits text into words and reveals each one with a masked
 * translateY slide-up.
 *
 * parts: [{ t: "word string", cls?: "accent" | "outline" }]
 *
 * mode:
 *  - "view"    (default) animate when scrolled into view (whileInView)
 *  - "context" animate via inherited variant state — use inside a
 *              motion container with variants (e.g. the hero)
 */
export default function RevealText({
  as: Tag = "h2",
  className = "",
  parts,
  delay = 0,
  stagger = 0.05,
  ariaLabel,
  mode = "view",
}) {
  let wordIndex = 0;

  return (
    <Tag className={className} aria-label={ariaLabel}>
      {parts.map((seg, si) => (
        <span key={si}>
          {seg.t.split(" ").map((word, wi) => {
            const idx = wordIndex++;
            const cls = `reveal-word__inner${seg.cls ? ` ${seg.cls}` : ""}`;
            return (
              <span className="reveal-word" key={wi} aria-hidden="true">
                {mode === "context" ? (
                  <motion.span custom={idx} variants={contextVariants} className={cls}>
                    {word}
                  </motion.span>
                ) : (
                  <motion.span
                    className={cls}
                    initial={{ y: "115%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.75,
                      ease: EASE,
                      delay: delay + idx * stagger,
                    }}
                  >
                    {word}
                  </motion.span>
                )}
              </span>
            );
          })}
          {si < parts.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
