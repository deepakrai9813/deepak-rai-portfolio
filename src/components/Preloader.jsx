import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem("dr-loaded") === "1";
    } catch {
      /* ignore */
    }

    // Skip entirely (or clean up a stale timer from a StrictMode re-mount)
    if (reduced || alreadyShown) {
      setVisible(false);
      return;
    }

    setVisible(true);
    try {
      sessionStorage.setItem("dr-loaded", "1");
    } catch {
      /* ignore */
    }

    // Primary hide timer
    const t = setTimeout(() => setVisible(false), 900);
    // Failsafe: never allow the overlay to persist, no matter what
    const failSafe = setTimeout(() => setVisible(false), 2500);

    return () => {
      clearTimeout(t);
      clearTimeout(failSafe);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          aria-hidden="true"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="preloader__logo"
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            DR<span>.</span>
          </motion.div>
          <div className="preloader__bar" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
