import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function InteractiveCTA() {
  const ctaRef = useRef(null);
  const canvasRef = useRef(null);
  const buttonRef = useRef(null);
  const [btnTranslate, setBtnTranslate] = useState({ x: 0, y: 0 });

  // Magnetic button interaction
  const handleMagneticMove = (e) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dx = e.clientX - btnCenterX;
    const dy = e.clientY - btnCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If mouse is within 80px, pull the button
    if (distance < 80) {
      const pullForce = 0.35; // Factor of translation
      setBtnTranslate({
        x: dx * pullForce,
        y: dy * pullForce
      });
    } else {
      setBtnTranslate({ x: 0, y: 0 });
    }
  };

  const handleMagneticLeave = () => {
    setBtnTranslate({ x: 0, y: 0 });
  };

  // Canvas grid distortion
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 350;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track mouse container coordinates
    let mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    canvas.parentElement.addEventListener("mousemove", handleMouseMove);
    canvas.parentElement.addEventListener("mouseleave", handleMouseLeave);

    // Grid config
    const rows = 12;
    const cols = 16;
    const points = [];

    // Initialize base points grid
    const updateGridPoints = () => {
      points.length = 0;
      const w = canvas.width;
      const h = canvas.height;
      const stepX = w / (cols - 1);
      const stepY = h / (rows - 1);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * stepX;
          const by = r * stepY;
          points.push({
            x: bx,
            y: by,
            bx: bx,
            by: by,
            vx: 0,
            vy: 0
          });
        }
      }
    };
    updateGridPoints();

    // Re-init on resize
    const onResizeWidth = () => {
      resize();
      updateGridPoints();
    };
    window.addEventListener("resize", onResizeWidth);

    const render = () => {
      ctx.fillStyle = "#0c0c10";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const repelRadius = 100;
      const repelForce = 0.45;
      const returnForce = 0.08;
      const friction = 0.85;

      // Update positions
      points.forEach((pt) => {
        // Return spring force
        const dxBase = pt.bx - pt.x;
        const dyBase = pt.by - pt.y;
        pt.vx += dxBase * returnForce;
        pt.vy += dyBase * returnForce;

        // Repel mouse force
        if (mouse.active) {
          const dxMouse = pt.x - mouse.x;
          const dyMouse = pt.y - mouse.y;
          const dist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (dist < repelRadius) {
            const force = (repelRadius - dist) / repelRadius; // 0 to 1
            pt.vx += (dxMouse / (dist || 1)) * force * repelForce * 12;
            pt.vy += (dyMouse / (dist || 1)) * force * repelForce * 12;
          }
        }

        pt.vx *= friction;
        pt.vy *= friction;
        pt.x += pt.vx;
        pt.y += pt.vy;
      });

      // Draw Grid Lines
      ctx.strokeStyle = "rgba(0, 243, 255, 0.06)";
      ctx.lineWidth = 1;

      // Horizontal lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const pt = points[r * cols + c];
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Vertical lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const pt = points[r * cols + c];
          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Draw small glowing dots at intersections near mouse
      points.forEach((pt) => {
        const dx = pt.x - mouse.x;
        const dy = pt.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 243, 255, ${1 - dist / 100})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResizeWidth);
      window.removeEventListener("resize", resize);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener("mousemove", handleMouseMove);
        canvas.parentElement.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
      ref={ctaRef}
      className="section-padding"
      style={{
        background: "transparent",
        borderBottom: "1px solid var(--border-color)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div 
        style={{ 
          maxWidth: "1200px", 
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "4rem",
          alignItems: "center"
        }}
        className="cta-grid"
      >
        {/* Left Side */}
        <div style={{ textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-pink)", fontSize: "0.9rem", letterSpacing: "0.15em" }}>
            {"// ACTIVE PORTAL CONVERSION"}
          </span>
          <h2 style={{ fontSize: "3.5rem", fontWeight: "900", lineHeight: "1.1", textTransform: "uppercase", margin: "1.5rem 0" }}>
            LET'S CONSTRUCT <span style={{ color: "var(--accent-cyan)" }}>SOMETHING</span> DIGITAL.
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: "1.6", marginBottom: "2.5rem", maxWidth: "500px" }}>
            Initialize connection coordinates to deploy your visual identity, performant systems, and modular native mobile architectures.
          </p>

          {/* Magnetic CTA Button */}
          <div 
            style={{ 
              padding: "20px", 
              margin: "-20px",
              display: "inline-block"
            }}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
          >
            <button
              ref={buttonRef}
              style={{
                transform: `translate3d(${btnTranslate.x}px, ${btnTranslate.y}px, 0)`,
                transition: btnTranslate.x === 0 ? "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)" : "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "1.2rem 2.5rem",
                background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-pink))",
                color: "#000",
                fontFamily: "var(--font-mono)",
                fontSize: "0.9rem",
                fontWeight: "bold",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(0, 243, 255, 0.15)",
                willChange: "transform"
              }}
              className="glitch-hover"
            >
              <span>INITIALIZE_PROJECT_COORDS</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Side - Interactive canvas grid distortion */}
        <div 
          style={{
            position: "relative",
            height: "350px",
            border: "1px solid var(--border-color)",
            borderRadius: "16px",
            overflow: "hidden",
            background: "#0c0c10",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
          }}
        >
          <div 
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-cyan)", animation: "blink-anim 1s infinite alternate" }}></div>
            <span>{"system_mesh_warp.cpp"}</span>
          </div>

          <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
        </div>
      </div>

      <style>{`
        @keyframes blink-anim {
          from { opacity: 0.3; }
          to { opacity: 1; }
        }
        @media (max-width: 768px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
