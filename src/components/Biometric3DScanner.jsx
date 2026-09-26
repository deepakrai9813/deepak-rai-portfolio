import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Zap, ShieldCheck, Server, RotateCcw, Activity } from "./icons";

const SYSTEM_NODES = [
  { id: "sentinel", name: "SYS-01: SENTINEL", color: 0x00d665, radius: 2.2, speed: 0.8, yOffset: 0.3 },
  { id: "san-brothers", name: "SYS-02: SAN BROTHERS", color: 0x00b0ff, radius: 2.8, speed: -0.6, yOffset: -0.2 },
  { id: "bian-ai", name: "SYS-03: BIAN AI", color: 0xff5500, radius: 3.4, speed: 0.5, yOffset: 0.4 },
  { id: "leadfinder-ai", name: "SYS-04: LEADFINDER", color: 0xf59e0b, radius: 4.0, speed: -0.4, yOffset: -0.3 },
  { id: "debe-learning", name: "SYS-05: DEBE", color: 0xf0f2f5, radius: 4.6, speed: 0.3, yOffset: 0.1 },
];

export default function Biometric3DScanner({ playClick, playSwitch, playPing }) {
  const mountRef = useRef(null);
  const [renderMode, setRenderMode] = useState("lidar"); // "lidar" | "wireframe" | "scanline"
  const [extrusion, setExtrusion] = useState(55);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // References to live Three.js objects
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const pointsMeshRef = useRef(null);
  const wireMeshRef = useRef(null);
  const laserPlaneRef = useRef(null);
  const satelliteMeshesRef = useRef([]);
  const laserLinesRef = useRef([]);
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const previousMousePosRef = useRef({ x: 0, y: 0 });

  // Update extrusion live
  useEffect(() => {
    if (!pointsMeshRef.current || !pointsMeshRef.current.geometry) return;
    const geom = pointsMeshRef.current.geometry;
    const pos = geom.attributes.position;
    const baseZ = geom.userData.baseZ;
    if (!baseZ) return;

    const scale = (extrusion / 50) * 1.5;
    for (let i = 0; i < pos.count; i++) {
      pos.setZ(i, baseZ[i] * scale);
    }
    pos.needsUpdate = true;

    if (wireMeshRef.current && wireMeshRef.current.geometry) {
      const wirePos = wireMeshRef.current.geometry.attributes.position;
      for (let i = 0; i < wirePos.count; i++) {
        wirePos.setZ(i, baseZ[i] * scale);
      }
      wirePos.needsUpdate = true;
    }
  }, [extrusion]);

  // Mode changes
  const handleModeChange = (mode) => {
    playSwitch?.();
    setRenderMode(mode);
    if (pointsMeshRef.current) {
      pointsMeshRef.current.visible = mode === "lidar" || mode === "scanline";
    }
    if (wireMeshRef.current) {
      wireMeshRef.current.visible = mode === "wireframe";
    }
    if (laserPlaneRef.current) {
      laserPlaneRef.current.visible = mode === "scanline";
    }
  };

  const handleResetCamera = () => {
    playClick?.();
    targetRotationRef.current = { x: 0, y: 0 };
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 480;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    // 2. WebGL Renderer (Zero gradients, solid contrast)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent canvas
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Process Deepak's Photo into 3D Depth Particles
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/deepak-rai.png";

    img.onload = () => {
      const sampleCols = 64;
      const sampleRows = 64;
      const canvas = document.createElement("canvas");
      canvas.width = sampleCols;
      canvas.height = sampleRows;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, sampleCols, sampleRows);
      const imgData = ctx.getImageData(0, 0, sampleCols, sampleRows).data;

      const numPoints = sampleCols * sampleRows;
      const positions = new Float32Array(numPoints * 3);
      const colors = new Float32Array(numPoints * 3);
      const baseZ = new Float32Array(numPoints);

      const colorGreen = new THREE.Color(0x00d665);
      const colorCyan = new THREE.Color(0x00b0ff);
      const colorWhite = new THREE.Color(0xf0f2f5);
      const colorDark = new THREE.Color(0x28303f);

      let pIdx = 0;
      for (let r = 0; r < sampleRows; r++) {
        for (let c = 0; c < sampleCols; c++) {
          const pixelIdx = (r * sampleCols + c) * 4;
          const red = imgData[pixelIdx];
          const green = imgData[pixelIdx + 1];
          const blue = imgData[pixelIdx + 2];
          const alpha = imgData[pixelIdx + 3];

          // Compute Luminance
          const lum = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
          const x = (c / sampleCols - 0.5) * 3.2;
          const y = (0.5 - r / sampleRows) * 3.2;
          const z = alpha > 40 ? lum * 1.4 : -0.5;

          positions[pIdx * 3] = x;
          positions[pIdx * 3 + 1] = y;
          positions[pIdx * 3 + 2] = z;
          baseZ[pIdx] = z;

          // Color based on topological depth slices (SOLID COLORS)
          let ptColor = colorDark;
          if (alpha > 40) {
            if (lum > 0.65) {
              ptColor = colorWhite;
            } else if (lum > 0.35) {
              ptColor = colorGreen;
            } else if (lum > 0.15) {
              ptColor = colorCyan;
            }
          }

          colors[pIdx * 3] = ptColor.r;
          colors[pIdx * 3 + 1] = ptColor.g;
          colors[pIdx * 3 + 2] = ptColor.b;

          pIdx++;
        }
      }

      // Point Cloud Geometry
      const pointGeom = new THREE.BufferGeometry();
      pointGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      pointGeom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      pointGeom.userData = { baseZ };

      const pointMat = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
      });

      const pointsMesh = new THREE.Points(pointGeom, pointMat);
      scene.add(pointsMesh);
      pointsMeshRef.current = pointsMesh;

      // Wireframe Surface Geometry (Plane with depth displacement)
      const wireGeom = new THREE.PlaneGeometry(3.2, 3.2, sampleCols - 1, sampleRows - 1);
      const wirePositions = wireGeom.attributes.position;
      for (let i = 0; i < wirePositions.count; i++) {
        wirePositions.setZ(i, baseZ[i]);
      }
      wireGeom.userData = { baseZ };
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00d665,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      });
      const wireMesh = new THREE.Mesh(wireGeom, wireMat);
      wireMesh.visible = false;
      scene.add(wireMesh);
      wireMeshRef.current = wireMesh;

      // Scanning Laser Slice
      const laserGeom = new THREE.BoxGeometry(3.6, 0.04, 2.0);
      const laserMat = new THREE.MeshBasicMaterial({
        color: 0x00ff7a,
        wireframe: true,
      });
      const laserPlane = new THREE.Mesh(laserGeom, laserMat);
      laserPlane.visible = false;
      scene.add(laserPlane);
      laserPlaneRef.current = laserPlane;

      setIsLoading(false);
    };

    // 4. Construct 5 Orbiting Distributed System Satellites in 3D
    const satGroup = new THREE.Group();
    scene.add(satGroup);

    const satellites = SYSTEM_NODES.map((node, i) => {
      // Create distinct wireframe polyhedron for each system
      let geom;
      if (i === 0) geom = new THREE.BoxGeometry(0.24, 0.24, 0.24);
      else if (i === 1) geom = new THREE.OctahedronGeometry(0.22);
      else if (i === 2) geom = new THREE.TetrahedronGeometry(0.24);
      else if (i === 3) geom = new THREE.IcosahedronGeometry(0.22);
      else geom = new THREE.TorusGeometry(0.18, 0.05, 8, 16);

      const mat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
      });

      const mesh = new THREE.Mesh(geom, mat);
      satGroup.add(mesh);

      // Line connecting to origin
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(node.radius, node.yOffset, 0),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      satGroup.add(line);

      return { mesh, line, config: node, angle: (i * (Math.PI * 2)) / SYSTEM_NODES.length };
    });
    satelliteMeshesRef.current = satellites;

    // 5. Interactive Mouse Orbit Controls
    const handlePointerDown = (e) => {
      isDraggingRef.current = true;
      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      if (!isDraggingRef.current) {
        // Subtle ambient parallax
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationRef.current.y = normX * 0.45;
        targetRotationRef.current.x = normY * -0.3;
        return;
      }

      const deltaX = e.clientX - previousMousePosRef.current.x;
      const deltaY = e.clientY - previousMousePosRef.current.y;
      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x += deltaY * 0.008;
      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // 6. Animation Render Loop
    let laserY = -1.6;
    let laserDir = 1;
    let clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera orbit lerp
      if (sceneRef.current) {
        sceneRef.current.rotation.y += (targetRotationRef.current.y - sceneRef.current.rotation.y) * 0.08;
        sceneRef.current.rotation.x += (targetRotationRef.current.x - sceneRef.current.rotation.x) * 0.08;
      }

      // Laser scanline travel
      if (laserPlaneRef.current && laserPlaneRef.current.visible) {
        laserY += 0.025 * laserDir;
        if (laserY > 1.6) laserDir = -1;
        if (laserY < -1.6) laserDir = 1;
        laserPlaneRef.current.position.y = laserY;
      }

      // Orbit satellites around Deepak's core
      satellites.forEach((sat) => {
        sat.angle += sat.config.speed * delta * 0.8;
        const x = Math.cos(sat.angle) * sat.config.radius;
        const z = Math.sin(sat.angle) * sat.config.radius;
        const y = sat.config.yOffset + Math.sin(elapsed * 2 + sat.angle) * 0.15;

        sat.mesh.position.set(x, y, z);
        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.03;

        // Update connecting ray line
        const posAttr = sat.line.geometry.attributes.position;
        posAttr.setXYZ(1, x, y, z);
        posAttr.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="biometric-3d" style={{ marginBottom: "64px" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-label">
            // 01-B. 3D BIOMETRIC TELEMETRY &amp; TOPOLOGICAL SYSTEM MATRIX
          </div>
          <h2 className="section-headline">
            VOLUMETRIC TOPOLOGICAL LIDAR &amp; DISTRIBUTED ARCHITECTURE
          </h2>
          <p className="section-subtext">
            Deepak Rai&apos;s real-world portrait reconstructed into an interactive 3D volumetric elevation depth field, 
            anchored by 5 orbiting distributed microservice satellites. Drag to orbit in 3D spatial coordinates.
          </p>
        </div>

        {/* Chassis */}
        <div className="sandbox-chassis" style={{ position: "relative", overflow: "hidden" }}>
          {/* Header Bar */}
          <div className="sandbox-meta-header">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="led-indicator" style={{ backgroundColor: "var(--signal-green)" }} />
              <span style={{ fontWeight: 700, color: "var(--text-high)" }}>
                3D SPATIAL TELEMETRY: SUBJECT_ID // DEEPAK_RAI
              </span>
              <span className="tag-solid active" style={{ fontSize: "10px" }}>
                64x64 DENSITY (4,096 VOXELS)
              </span>
            </div>

            <div style={{ display: "flex", gap: "14px", color: "var(--text-dim)", fontFamily: "var(--font-mono)", fontSize: "11px" }}>
              <span>FOV: 45°</span>
              <span>//</span>
              <span>ORBIT: INTERACTIVE 360°</span>
              <span>//</span>
              <span style={{ color: "var(--signal-green)", fontWeight: 700 }}>RENDER: THREE.JS WEBGL</span>
            </div>
          </div>

          {/* Interactive Controls Strip */}
          <div className="sandbox-controls-row">
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-dim)" }}>
                3D PROJECTION MODE:
              </span>
              <button
                type="button"
                className={`tag-solid ${renderMode === "lidar" ? "active" : ""}`}
                style={{ cursor: "pointer", fontSize: "11px", padding: "6px 12px" }}
                onClick={() => handleModeChange("lidar")}
              >
                [VOXEL LIDAR POINTCLOUD]
              </button>

              <button
                type="button"
                className={`tag-solid ${renderMode === "wireframe" ? "active" : ""}`}
                style={{ cursor: "pointer", fontSize: "11px", padding: "6px 12px" }}
                onClick={() => handleModeChange("wireframe")}
              >
                [TOPOGRAPHIC MESH]
              </button>

              <button
                type="button"
                className={`tag-solid ${renderMode === "scanline" ? "active" : ""}`}
                style={{ cursor: "pointer", fontSize: "11px", padding: "6px 12px" }}
                onClick={() => handleModeChange("scanline")}
              >
                [LASER SLICE SCANNER]
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <label style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-med)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>Z-DEPTH EXTRUSION:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={extrusion}
                  onChange={(e) => {
                    playClick?.();
                    setExtrusion(+e.target.value);
                  }}
                  style={{ cursor: "pointer", accentColor: "var(--signal-green)" }}
                />
                <span style={{ color: "var(--signal-green)", fontWeight: 700, minWidth: "36px" }}>{extrusion}%</span>
              </label>

              <button
                type="button"
                className="btn-mech-outline"
                style={{ padding: "4px 10px", fontSize: "11px" }}
                onClick={handleResetCamera}
              >
                <RotateCcw style={{ width: "12px", height: "12px" }} />
                <span>CALIBRATE 0°</span>
              </button>
            </div>
          </div>

          {/* Main 3D Canvas Viewport */}
          <div style={{ position: "relative", width: "100%", height: "540px", backgroundColor: "#06070a", cursor: "grab" }}>
            <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

            {/* Loading Indicator */}
            {isLoading && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--signal-green)",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  padding: "12px 20px",
                  border: "1px solid var(--border-base)",
                }}
              >
                INITIALIZING 3D TOPOLOGICAL DEPTH SCAN...
              </div>
            )}

            {/* Tactical Coordinate Crosshairs (Swiss Aerospace HUD Overlay) */}
            <div
              style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--signal-green)",
                pointerEvents: "none",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                backgroundColor: "rgba(6, 7, 10, 0.75)",
                padding: "8px 12px",
                border: "1px solid #1e2430",
              }}
            >
              <div>+ TARGET LOCK: DEEPAK RAI</div>
              <div>+ LAT: 28.6139° N // LON: 77.2090° E</div>
              <div>+ CORE NODE: GOLANG &amp; DISTRIBUTED ARCHITECTURE</div>
              <div>+ ORBITING SATELLITES: 5 VERIFIED SYSTEMS</div>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "#7d8594",
                pointerEvents: "none",
                backgroundColor: "rgba(6, 7, 10, 0.75)",
                padding: "6px 10px",
                border: "1px solid #1e2430",
              }}
            >
              CLICK &amp; DRAG MOUSE TO ORBIT 3D PERSPECTIVE · SCROLL TO ZOOM
            </div>

            {/* Floating Satellite Legend */}
            <div
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                backgroundColor: "rgba(6, 7, 10, 0.85)",
                padding: "10px 14px",
                border: "1px solid #1e2430",
              }}
            >
              <div style={{ color: "#8a919e", fontWeight: 700, borderBottom: "1px solid #222", paddingBottom: "4px" }}>
                ACTIVE 3D ORBIT NODES:
              </div>
              {SYSTEM_NODES.map((node) => (
                <div
                  key={node.id}
                  style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
                  onClick={() => {
                    playPing?.();
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      backgroundColor: `#${node.color.toString(16).padStart(6, "0")}`,
                      display: "inline-block",
                    }}
                  />
                  <span style={{ color: `#${node.color.toString(16).padStart(6, "0")}` }}>{node.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
