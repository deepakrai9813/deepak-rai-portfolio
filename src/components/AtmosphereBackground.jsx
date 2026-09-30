import { useEffect, useRef } from "react";
import { useMachineStore } from "../store/useMachineStore";

export default function AtmosphereBackground() {
  const canvasRef = useRef(null);
  const { isOvercharged } = useMachineStore();

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

    // Floating micro-dust / plasma motes in volumetric light
    const particleCount = 48;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.15 - Math.random() * 0.35,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.45 + 0.15,
        color: Math.random() > 0.8 ? "#f6b93b" : "#3ee8ff",
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render micro-particles (dust motes in workshop lighting)
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
    <div className={`workshop-atmosphere-layer ${isOvercharged ? "overcharge-bloom" : ""}`} aria-hidden="true">
      {/* 1. Photorealistic 3D Stark Command Center Workshop Backdrop Plate */}
      <div className="workshop-backdrop-photo" />

      {/* 2. Cinematic Atmospheric Lighting & Vignette Overlay */}
      <div className="workshop-backdrop-vignette" />

      {/* 3. Blueprint Grid & Structural Seam Traces */}
      <div className="workshop-blueprint-grid" />

      {/* 4. Floating Dust Motes & Plasma Particles Canvas */}
      <canvas ref={canvasRef} className="workshop-dust-canvas" />
    </div>
  );
}
