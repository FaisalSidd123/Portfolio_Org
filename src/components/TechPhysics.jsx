import { useEffect, useRef } from "react";

const tools = [
  { name: "React 19", color: "var(--accent-cyan)" },
  { name: "Vite", color: "#e3c032" },
  { name: "GSAP", color: "#88ce02" },
  { name: "Three.js", color: "#ffffff" },
  { name: "Framer Motion", color: "var(--accent-pink)" },
  { name: "NodeJS", color: "var(--accent-purple)" },
  { name: "Lenis", color: "#ffffff" },
  { name: "TypeScript", color: "var(--accent-cyan)" },
  { name: "GraphQL", color: "var(--accent-pink)" },
  { name: "Figma", color: "#a259ff" },
  { name: "Docker", color: "#2496ed" },
  { name: "NextJS", color: "#ffffff" }
];

export default function TechPhysics() {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerWidth = rect.width || 800;
    const containerHeight = 350;

    // Initialize physics nodes
    const nodes = tools.map((tool, idx) => {
      // Space them out evenly in a grid/strip initially
      const cols = 4;
      const row = Math.floor(idx / cols);
      const col = idx % cols;
      const baseX = (col + 0.5) * (containerWidth / cols);
      const baseY = (row + 0.5) * (containerHeight / 3);

      return {
        x: baseX,
        y: baseY,
        baseX: baseX,
        baseY: baseY,
        vx: 0,
        vy: 0,
        width: 120,
        height: 45,
        color: tool.color,
        name: tool.name
      };
    });

    let mouseX = -1000;
    let mouseY = -1000;
    let animationFrameId;

    const handleMouseMove = (e) => {
      const containerRect = container.getBoundingClientRect();
      mouseX = e.clientX - containerRect.left;
      mouseY = e.clientY - containerRect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const updatePhysics = () => {
      const repelRadius = 140;
      const repelForce = 0.55;
      const springTension = 0.025;
      const friction = 0.88;

      nodes.forEach((node, idx) => {
        const domEl = elementsRef.current[idx];
        if (!domEl) return;

        // 1. Spring force back to base position
        const dxBase = node.baseX - node.x;
        const dyBase = node.baseY - node.y;
        node.vx += dxBase * springTension;
        node.vy += dyBase * springTension;

        // 2. Mouse repel force
        const dxMouse = node.x - mouseX;
        const dyMouse = node.y - mouseY;
        const dist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius; // 0 to 1
          const pushX = (dxMouse / (dist || 1)) * force * repelForce * 18;
          const pushY = (dyMouse / (dist || 1)) * force * repelForce * 18;
          node.vx += pushX;
          node.vy += pushY;
        }

        // 3. Gentle random drift (brownian-like motion)
        node.vx += (Math.random() - 0.5) * 0.15;
        node.vy += (Math.random() - 0.5) * 0.15;

        // Apply friction and move
        node.vx *= friction;
        node.vy *= friction;
        node.x += node.vx;
        node.y += node.vy;

        // Bounds collision container-relative
        if (node.x < 60) node.x = 60;
        if (node.x > containerWidth - 60) node.x = containerWidth - 60;
        if (node.y < 30) node.y = 30;
        if (node.y > containerHeight - 30) node.y = containerHeight - 30;

        // Apply translation directly to DOM style (bypassing React re-renders)
        domEl.style.transform = `translate3d(${node.x - node.baseX}px, ${node.y - node.baseY}px, 0)`;
      });

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    updatePhysics();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="section-padding"
      style={{
        background: "transparent",
        borderBottom: "1px solid var(--border-color)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", fontSize: "0.9rem", letterSpacing: "0.15em" }}>
          {"// TECH STACK ENGINE"}
        </span>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginTop: "1rem", marginBottom: "3rem", textTransform: "uppercase" }}>
          Stack Interactions
        </h2>

        {/* Physics Container */}
        <div 
          ref={containerRef}
          style={{
            position: "relative",
            height: "350px",
            width: "100%",
            background: "rgba(255, 255, 255, 0.01)",
            border: "1px solid var(--border-color)",
            borderRadius: "16px",
            cursor: "none"
          }}
        >
          {/* Custom Cursor Circle repeller pointer */}
          <div 
            id="cursor-repeller"
            style={{
              position: "absolute",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "1px dashed rgba(0, 243, 255, 0.15)",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              display: "none",
              zIndex: 2
            }}
          />

          {tools.map((tool, idx) => {
            // Distribute items layout coordinates initially
            const cols = 4;
            const row = Math.floor(idx / cols);
            const col = idx % cols;

            return (
              <div
                key={idx}
                ref={(el) => (elementsRef.current[idx] = el)}
                style={{
                  position: "absolute",
                  left: `calc(${(col + 0.5) * 25}% - 60px)`,
                  top: `${(row + 0.5) * 33.33}%`,
                  width: "120px",
                  height: "45px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--bg-card)",
                  border: `1px solid var(--border-color)`,
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-mono)",
                  color: "#fff",
                  boxShadow: `0 4px 10px rgba(0,0,0,0.3)`,
                  userSelect: "none",
                  willChange: "transform"
                }}
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: tool.color, marginRight: "8px" }} />
                {tool.name}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        #cursor-repeller {
          display: block !important;
        }
      `}</style>
    </div>
  );
}
