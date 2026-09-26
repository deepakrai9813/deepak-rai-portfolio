import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default"); // 'default' | 'hover' | 'project' | 'hidden'
  const [visible, setVisible] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Instantly position the dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check element under cursor for special cursor states
      const target = e.target;
      if (!target) return;

      const projectEl = target.closest(".project, .project__preview, .project-row");
      const buttonEl = target.closest("button, a, .btn, .filter-pill, .tag--clickable, .cmd-item");
      const inputEl = target.closest("input, textarea, [contenteditable]");

      if (inputEl) {
        setCursorVariant("hidden");
        setCursorText("");
      } else if (projectEl) {
        setCursorVariant("project");
        setCursorText("VIEW");
      } else if (buttonEl) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const onMouseDown = () => {
      if (ringRef.current) {
        ringRef.current.classList.add("is-active");
      }
    };

    const onMouseUp = () => {
      if (ringRef.current) {
        ringRef.current.classList.remove("is-active");
      }
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // Smooth lerp loop for the trailing ring
    const render = () => {
      const lerp = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Inner precise dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot${cursorVariant === "hidden" ? " is-hidden" : ""}`}
        aria-hidden="true"
      />
      {/* Outer fluid trailing ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring custom-cursor-ring--${cursorVariant}${
          cursorVariant === "hidden" ? " is-hidden" : ""
        }`}
        aria-hidden="true"
      >
        {cursorText && <span className="custom-cursor-text">{cursorText}</span>}
      </div>
    </>
  );
}
