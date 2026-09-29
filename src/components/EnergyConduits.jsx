import { useEffect, useRef } from "react";

export default function EnergyConduits({ isOvercharged }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    let conduits = [];

    const calculateConduits = () => {
      const fullHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        canvas.parentElement ? canvas.parentElement.offsetHeight : 0,
        window.innerHeight * 3
      );
      canvas.width = window.innerWidth;
      canvas.height = fullHeight;

      const w = canvas.width;
      const h = canvas.height;
      const list = [];

      // Main central spine extending through the page
      list.push({
        pts: [
          { x: w * 0.5, y: 160 },
          { x: w * 0.5, y: h - 100 },
        ],
        type: "spine",
      });

      // Query actual cabin junction elements and cards on the DOM
      const junctions = document.querySelectorAll(".cabin-pipeline-junction");
      const couplers = document.querySelectorAll(".card-conduit-coupler");

      if (junctions.length > 0) {
        junctions.forEach((junc) => {
          const rect = junc.getBoundingClientRect();
          const targetY = rect.top + window.scrollY + rect.height / 2;
          const targetX = rect.left + rect.width / 2;

          const branchStartY = Math.max(180, targetY - 36);
          list.push({
            pts: [
              { x: w * 0.5, y: branchStartY },
              { x: targetX, y: branchStartY },
              { x: targetX, y: targetY },
            ],
            type: "branch",
          });
        });
      }

      if (couplers.length > 0) {
        couplers.forEach((c) => {
          const rect = c.getBoundingClientRect();
          const targetY = rect.top + window.scrollY + rect.height / 2;
          const targetX = rect.left + rect.width / 2;
          const branchY = targetY - 20;

          list.push({
            pts: [
              { x: w * 0.5, y: branchY },
              { x: targetX, y: branchY },
              { x: targetX, y: targetY },
            ],
            type: "card-feed",
          });
        });
      }

      if (list.length === 1) {
        const defaultBranches = [
          [
            { x: w * 0.5, y: h * 0.22 },
            { x: w * 0.16, y: h * 0.22 },
            { x: w * 0.16, y: h * 0.32 },
          ],
          [
            { x: w * 0.5, y: h * 0.45 },
            { x: w * 0.84, y: h * 0.45 },
            { x: w * 0.84, y: h * 0.55 },
          ],
          [
            { x: w * 0.5, y: h * 0.68 },
            { x: w * 0.18, y: h * 0.68 },
            { x: w * 0.18, y: h * 0.78 },
          ],
        ];

        defaultBranches.forEach((pts) => {
          list.push({ pts, type: "branch" });
        });
      }

      list.forEach((c) => {
        let total = 0;
        const segLens = [];
        for (let i = 0; i < c.pts.length - 1; i++) {
          const dx = c.pts[i + 1].x - c.pts[i].x;
          const dy = c.pts[i + 1].y - c.pts[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          segLens.push(dist);
          total += dist;
        }
        c.totalLength = Math.max(total, 1);
        c.segLens = segLens;
      });

      conduits = list;
    };

    calculateConduits();
    window.addEventListener("resize", calculateConduits);
    window.addEventListener("scroll", calculateConduits, { once: true });

    const alignTimer = setTimeout(calculateConduits, 800);

    // Controlled, elegant data packets (no rainbow clutter)
    const PACKET_COUNT = 28;
    const packets = [];
    for (let i = 0; i < PACKET_COUNT; i++) {
      packets.push({
        conduitIdx: Math.floor(Math.random() * (conduits.length || 1)),
        progress: Math.random(),
        speed: 0.0016 + Math.random() * 0.0028,
        color: Math.random() > 0.3 ? "#38bdf8" : "#c5a059", // Arc Ice Blue & Titanium Gold
        size: 2.5 + Math.random() * 1.5,
      });
    }

    const getPointAtProgress = (conduit, t) => {
      const targetDist = t * conduit.totalLength;
      let accum = 0;
      for (let i = 0; i < conduit.segLens.length; i++) {
        const segLen = conduit.segLens[i];
        if (accum + segLen >= targetDist || i === conduit.segLens.length - 1) {
          const segProgress = segLen > 0 ? (targetDist - accum) / segLen : 0;
          const p1 = conduit.pts[i];
          const p2 = conduit.pts[i + 1];
          return {
            x: p1.x + (p2.x - p1.x) * segProgress,
            y: p1.y + (p2.y - p1.y) * segProgress,
            angle: Math.atan2(p2.y - p1.y, p2.x - p1.x),
          };
        }
        accum += segLen;
      }
      const last = conduit.pts[conduit.pts.length - 1];
      return { x: last.x, y: last.y, angle: 0 };
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const speedMultiplier = isOvercharged ? 3.0 : 1.0;

      // 1. Draw Sleek Dark Titanium Conduit Tracks
      conduits.forEach((c) => {
        if (!c.pts || c.pts.length < 2) return;

        // Dark Armor Conduit Base
        ctx.beginPath();
        ctx.moveTo(c.pts[0].x, c.pts[0].y);
        for (let i = 1; i < c.pts.length; i++) {
          ctx.lineTo(c.pts[i].x, c.pts[i].y);
        }
        ctx.strokeStyle = "rgba(185, 28, 28, 0.12)"; // Subtle Stark Crimson under-rail
        ctx.lineWidth = c.type === "spine" ? 5 : 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        // Inner Power Line
        ctx.beginPath();
        ctx.moveTo(c.pts[0].x, c.pts[0].y);
        for (let i = 1; i < c.pts.length; i++) {
          ctx.lineTo(c.pts[i].x, c.pts[i].y);
        }
        ctx.strokeStyle = isOvercharged
          ? "rgba(56, 189, 248, 0.65)"
          : "rgba(56, 189, 248, 0.16)";
        ctx.lineWidth = c.type === "spine" ? 2 : 1.2;
        ctx.stroke();

        // Terminal Coupler
        const endPt = c.pts[c.pts.length - 1];
        ctx.fillStyle = isOvercharged ? "#38bdf8" : "#c5a059";
        ctx.beginPath();
        ctx.arc(endPt.x, endPt.y, c.type === "spine" ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Animate Quantum Energy Packets
      if (conduits.length > 0) {
        packets.forEach((p) => {
          p.progress += p.speed * speedMultiplier;
          if (p.progress >= 1) {
            p.progress = 0;
            p.conduitIdx = Math.floor(Math.random() * conduits.length);
          }

          const c = conduits[p.conduitIdx];
          if (!c || !c.pts) return;

          const pt = getPointAtProgress(c, p.progress);

          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = isOvercharged ? 12 : 6;

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Refined tail
          const trailLen = (isOvercharged ? 16 : 10) * speedMultiplier;
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.lineTo(
            pt.x - Math.cos(pt.angle) * trailLen,
            pt.y - Math.sin(pt.angle) * trailLen
          );
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.6;
          ctx.stroke();
        });
      }

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(alignTimer);
      window.removeEventListener("resize", calculateConduits);
    };
  }, [isOvercharged]);

  return (
    <div className="energy-conduits-overlay" aria-hidden="true">
      <canvas ref={canvasRef} className="conduits-canvas" />
    </div>
  );
}
