import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function BackgroundSystem({ activeSection = "hero" }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [reducedMotion, setReducedMotion] = useState(() => 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Check prefers-reduced-motion
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (e) => setReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Sync mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Spark Particle Canvas Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let isTabVisible = true;

    // Visibility API listener
    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Resize handler with devicePixelRatio capped at 2.0
    const resize = () => {
      const dpr = Math.min(2.0, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const particleCount = 75;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.2) * 0.25, // Slow drift diagonal/upwards
        vy: -0.2 - Math.random() * 0.45,
        size: 0.8 + Math.random() * 1.4, // 1px - 2px sparks
        baseOpacity: 0.3 + Math.random() * 0.65,
        flickerSpeed: 0.02 + Math.random() * 0.06,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Set target spark opacity multiplier based on section
    let currentGlobalOpacity = 0.8;
    const getTargetOpacity = () => {
      if (activeSection === "hero") return 0.85;
      if (activeSection === "mid") return 0.22; // Mid-page is near-invisible texture
      if (activeSection === "cta") return 0.9;  // Intensifies before conversion
      if (activeSection === "footer") return 0.05; // Fade out almost completely
      return 0.5;
    };

    const render = () => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Smoothly transition global opacity towards target
      const targetOpacity = getTargetOpacity();
      currentGlobalOpacity += (targetOpacity - currentGlobalOpacity) * 0.08;

      if (currentGlobalOpacity > 0.01) {
        // Draw sparks
        particles.forEach((p) => {
          if (!reducedMotion) {
            // Update position
            p.x += p.vx;
            p.y += p.vy;

            // Mouse proximity repel
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 130;
            if (dist < repelRadius) {
              const force = (repelRadius - dist) / repelRadius;
              // Repel direction vectors
              p.x += (dx / (dist || 1)) * force * 1.8;
              p.y += (dy / (dist || 1)) * force * 1.8;
            }

            // Boundary Wrap-around
            if (p.y < -10) {
              p.y = window.innerHeight + 10;
              p.x = Math.random() * window.innerWidth;
            }
            if (p.x < -10) p.x = window.innerWidth + 10;
            if (p.x > window.innerWidth + 10) p.x = -10;

            // Pulsing opacity (flicker)
            p.phase += p.flickerSpeed;
          }

          // Calculate flickering opacity
          const flicker = Math.sin(p.phase) * 0.35 + 0.65; // 0.3 to 1.0
          const finalOpacity = p.baseOpacity * flicker * currentGlobalOpacity;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeSection, reducedMotion]);

  // Glow Pocket configuration transitions
  const glowOpacity = {
    hero: 0.18,
    mid: 0.06,
    cta: 0.22,
    footer: 0.0
  }[activeSection] ?? 0.1;

  // Render glow positions
  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "#000000",
        overflow: "hidden"
      }}
    >
      {/* 1. Spark Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "block"
        }}
      />

      {/* 2. Drifting Radial Glow Pockets */}
      {/* Glow Pocket 1 (Cyan/Acid Green): Moves slowly, visible in Hero/CTA */}
      {!reducedMotion && (
        <motion.div
          animate={{
            x: [0, 45, -30, 20, 0],
            y: [0, -30, 50, -40, 0]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            width: "55vw",
            height: "55vw",
            top: "5%",
            left: "5%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 243, 255, 0.45) 0%, rgba(189, 0, 255, 0) 70%)",
            filter: "blur(130px)",
            opacity: activeSection === "hero" ? glowOpacity : activeSection === "cta" ? glowOpacity * 0.7 : 0,
            transition: "opacity 1.2s ease-in-out",
            mixBlendMode: "screen"
          }}
        />
      )}

      {/* Glow Pocket 2 (Magenta/Pink): Drifts slowly, visible in Hero/CTA */}
      {!reducedMotion && (
        <motion.div
          animate={{
            x: [0, -50, 40, -20, 0],
            y: [0, 40, -30, 30, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            width: "50vw",
            height: "50vw",
            bottom: "10%",
            right: "5%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 0, 127, 0.4) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(140px)",
            opacity: activeSection === "hero" ? glowOpacity * 0.8 : activeSection === "cta" ? glowOpacity : 0,
            transition: "opacity 1.2s ease-in-out",
            mixBlendMode: "screen"
          }}
        />
      )}

      {/* Glow Pocket 3 (Localized Mid Glow): Visible behind mid page portals */}
      {!reducedMotion && (
        <motion.div
          animate={{
            x: [-15, 20, -10, 15, -15],
            y: [10, -25, 15, -10, 10]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            width: "40vw",
            height: "40vw",
            top: "35%",
            left: "30%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(189, 0, 255, 0.3) 0%, rgba(0,0,0,0) 75%)",
            filter: "blur(120px)",
            opacity: activeSection === "mid" ? glowOpacity : 0,
            transition: "opacity 1.0s ease-in-out",
            mixBlendMode: "screen"
          }}
        />
      )}

      {/* Static Reduced-Motion Glow backup */}
      {reducedMotion && activeSection !== "footer" && (
        <div
          style={{
            position: "absolute",
            width: "60vw",
            height: "60vw",
            top: "15%",
            left: "20%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 243, 255, 0.25) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(120px)",
            opacity: activeSection === "hero" ? 0.15 : activeSection === "cta" ? 0.2 : 0.05,
            mixBlendMode: "screen"
          }}
        />
      )}
    </div>
  );
}
