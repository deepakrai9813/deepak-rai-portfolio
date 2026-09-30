import { useEffect, useRef, useState } from "react";
import { playWebZippingSfx } from "../utils/audioSystem";
import { useMachineStore } from "../store/useMachineStore";

export default function SpiderWebCanvas() {
  const canvasRef = useRef(null);
  const { soundEnabled } = useMachineStore();
  const [spiderAlert, setSpiderAlert] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    // Corner size: 360 x 360 px
    const width = 360;
    const height = 360;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Origin: Top-right corner (width, 0)
    const originX = width;
    const originY = 0;

    // Radial strands: 12 lines originating from (width, 0)
    const numRadials = 11;
    const numRings = 7;
    const maxRadius = 340;

    // Nodes for Verlet simulation
    // Each node has x, y, oldX, oldY, pinned (boolean)
    const nodes = [];
    const radials = [];

    // Create radial points
    for (let r = 0; r < numRadials; r++) {
      const angle = (Math.PI / 2) * (r / (numRadials - 1)) + Math.PI / 2; // from PI/2 (down) to PI (left)
      const strandNodes = [];

      for (let ring = 0; ring <= numRings; ring++) {
        const dist = (ring / numRings) * maxRadius;
        const x = originX + Math.cos(angle) * dist;
        const y = originY + Math.sin(angle) * dist;

        const isPinned = ring === 0 || ring === numRings;
        const node = {
          x,
          y,
          oldX: x,
          oldY: y,
          baseX: x,
          baseY: y,
          pinned: isPinned,
        };
        nodes.push(node);
        strandNodes.push(node);
      }
      radials.push(strandNodes);
    }

    // Constraints (links between nodes)
    const links = [];

    // 1. Radial links
    for (let r = 0; r < numRadials; r++) {
      for (let ring = 0; ring < numRings; ring++) {
        links.push({
          p1: radials[r][ring],
          p2: radials[r][ring + 1],
          length: maxRadius / numRings,
        });
      }
    }

    // 2. Spiral/Catenary ring links
    for (let ring = 1; ring <= numRings; ring++) {
      for (let r = 0; r < numRadials - 1; r++) {
        const p1 = radials[r][ring];
        const p2 = radials[r + 1][ring];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        links.push({
          p1,
          p2,
          length: Math.sqrt(dx * dx + dy * dy),
        });
      }
    }

    // Mouse interaction
    let mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
    let spider = {
      targetNode: radials[4][4], // Hangs from central strand
      hangDist: 28,
      sway: 0,
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.vx = x - mouse.x;
      mouse.vy = y - mouse.y;
      mouse.x = x;
      mouse.y = y;

      // Check distance to spider
      const spiderX = spider.targetNode.x;
      const spiderY = spider.targetNode.y + spider.hangDist;
      const dist = Math.hypot(x - spiderX, y - spiderY);
      if (dist < 40) {
        setSpiderAlert(true);
      } else {
        setSpiderAlert(false);
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = () => {
      if (soundEnabled && typeof playWebZippingSfx === "function") {
        playWebZippingSfx(true);
      }
      // Give spider a startled bounce
      spider.hangDist = 45;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    // Physics step
    const updatePhysics = () => {
      // 1. Verlet Integration
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n.pinned) continue;

        const vx = (n.x - n.oldX) * 0.92; // Damping
        const vy = (n.y - n.oldY) * 0.92;
        n.oldX = n.x;
        n.oldY = n.y;

        // Restore towards base resting pos
        const rx = (n.baseX - n.x) * 0.08;
        const ry = (n.baseY - n.y) * 0.08;

        n.x += vx + rx;
        n.y += vy + ry;

        // Mouse repulsion
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 55 && dist > 0) {
          const force = (55 - dist) * 0.22;
          n.x += (dx / dist) * force;
          n.y += (dy / dist) * force;
        }
      }

      // 2. Solve Distance Constraints
      for (let iter = 0; iter < 3; iter++) {
        for (let i = 0; i < links.length; i++) {
          const { p1, p2, length } = links[i];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const currentDist = Math.hypot(dx, dy);
          if (currentDist === 0) continue;

          const diff = (currentDist - length) / currentDist;
          const offsetX = dx * diff * 0.45;
          const offsetY = dy * diff * 0.45;

          if (!p1.pinned) {
            p1.x += offsetX;
            p1.y += offsetY;
          }
          if (!p2.pinned) {
            p2.x -= offsetX;
            p2.y -= offsetY;
          }
        }
      }

      // Smooth spider return
      spider.hangDist += (28 - spider.hangDist) * 0.1;
      spider.sway += 0.05;
    };

    // Render loop
    const render = () => {
      updatePhysics();
      ctx.clearRect(0, 0, width, height);

      // Render Web Strands
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(234, 254, 255, 0.28)";

      // Draw Spiral Links
      ctx.beginPath();
      for (let i = 0; i < links.length; i++) {
        const { p1, p2 } = links[i];
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.stroke();

      // Highlight radials with subtle metallic glow
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgba(62, 232, 255, 0.38)";
      for (let r = 0; r < numRadials; r++) {
        ctx.beginPath();
        ctx.moveTo(radials[r][0].x, radials[r][0].y);
        for (let ring = 1; ring <= numRings; ring++) {
          ctx.lineTo(radials[r][ring].x, radials[r][ring].y);
        }
        ctx.stroke();
      }

      // Draw Tiny Mechanical Spider
      const targetNode = spider.targetNode;
      const spiderX = targetNode.x + Math.sin(spider.sway) * 4;
      const spiderY = targetNode.y + spider.hangDist;

      // Silk dragline thread
      ctx.beginPath();
      ctx.moveTo(targetNode.x, targetNode.y);
      ctx.lineTo(spiderX, spiderY);
      ctx.strokeStyle = "rgba(234, 254, 255, 0.65)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Spider Body (Nano-tech Stark/Spider palette: Crimson + Gold)
      ctx.fillStyle = "#e8322f";
      ctx.beginPath();
      ctx.ellipse(spiderX, spiderY, 4.5, 6, Math.PI / 8, 0, Math.PI * 2);
      ctx.fill();

      // Golden head & ocular dots
      ctx.fillStyle = "#f6b93b";
      ctx.beginPath();
      ctx.arc(spiderX, spiderY - 4.5, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Tiny cyan eyes
      ctx.fillStyle = "#3ee8ff";
      ctx.fillRect(spiderX - 1.2, spiderY - 5.5, 0.8, 0.8);
      ctx.fillRect(spiderX + 0.4, spiderY - 5.5, 0.8, 0.8);

      // Spider Legs (8 joints)
      ctx.strokeStyle = "#0f1c2f";
      ctx.lineWidth = 1.1;
      const legAngles = [-0.7, -0.2, 0.2, 0.7];
      for (let side = -1; side <= 1; side += 2) {
        legAngles.forEach((ang, idx) => {
          const legReach = 8 + idx * 1.5;
          const kx = spiderX + side * 4;
          const ky = spiderY + (idx - 1.5) * 2;
          const jx = kx + side * Math.cos(ang) * (legReach * 0.6);
          const jy = ky + Math.sin(ang) * (legReach * 0.6) - 2;
          const tx = jx + side * Math.cos(ang + 0.3) * (legReach * 0.5);
          const ty = jy + Math.sin(ang + 0.3) * (legReach * 0.5) + 3;

          ctx.beginPath();
          ctx.moveTo(kx, ky);
          ctx.lineTo(jx, jy);
          ctx.lineTo(tx, ty);
          ctx.stroke();
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animId);
    };
  }, [soundEnabled]);

  return (
    <div className="spider-web-corner" title="Iron Spider Recon Unit — Click strand to interact">
      <canvas ref={canvasRef} className="spider-web-canvas" />
      <div className={`spider-recon-badge ${spiderAlert ? "visible" : ""}`}>
        <span className="badge-dot" />
        <span className="badge-text">UNIT: PETER-01 // RECON PASSIVE</span>
      </div>
    </div>
  );
}
