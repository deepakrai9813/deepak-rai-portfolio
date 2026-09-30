import { useEffect, useRef } from "react";
import { useMachineStore } from "../store/useMachineStore";

export default function AtmosphereBackground() {
  const canvasRef = useRef(null);
  const { powerState, isOvercharged } = useMachineStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Floating micro-dust / plasma particles
    const particleCount = 42;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.15 - Math.random() * 0.35,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.8 ? "#f6b93b" : "#3ee8ff",
      });
    }

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Subtle atmospheric volumetric light beam from reactor center
      const centerX = width / 2;
      const centerY = 380; // approximate Arc Reactor center on desktop

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        30,
        centerX,
        centerY,
        isOvercharged ? width * 0.9 : width * 0.6
      );
      gradient.addColorStop(0, isOvercharged ? "rgba(234, 254, 255, 0.12)" : "rgba(62, 232, 255, 0.06)");
      gradient.addColorStop(0.4, isOvercharged ? "rgba(62, 232, 255, 0.08)" : "rgba(29, 54, 84, 0.04)");
      gradient.addColorStop(1, "rgba(4, 7, 13, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render micro-particles (dust motes in projector light)
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = isOvercharged ? Math.min(p.alpha * 2, 0.9) : p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isOvercharged ? 8 : 4;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOvercharged]);

  return (
    <div className="workshop-atmosphere-layer" aria-hidden="true">
      {/* Workshop Steel Seams & Rivet Background Grid */}
      <div className="workshop-hull-texture" />
      <div className="workshop-blueprint-grid" />
      <canvas ref={canvasRef} className="workshop-dust-canvas" />
    </div>
  );
}
