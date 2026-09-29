export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="framer-toast-container" role="status" aria-live="polite">
      <div className="framer-toast-pill">
        <span className="toast-glow-dot" />
        <span className="toast-text">{message}</span>
      </div>
    </div>
  );
}
