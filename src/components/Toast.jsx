import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles, X } from "./icons";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 3200);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  return (
    <div className="toast-container" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`toast toast--${toast.type || "info"}`}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="toast__icon">
              {toast.type === "success" ? (
                <Check width={16} height={16} />
              ) : (
                <Sparkles width={16} height={16} />
              )}
            </span>
            <div className="toast__content">
              {toast.title && <strong className="toast__title">{toast.title}</strong>}
              <span className="toast__message">{toast.message}</span>
            </div>
            <button
              className="toast__close"
              onClick={onClose}
              aria-label="Dismiss notification"
            >
              <X width={14} height={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
