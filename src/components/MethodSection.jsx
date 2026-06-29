import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MethodSection() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const [activeNode, setActiveNode] = useState(-1);

  const steps = [
    { name: "DISCOVER", desc: "Audit existing landscapes, extract brand positioning DNA, map system flows.", color: "var(--accent-cyan)", x: 100, y: 120 },
    { name: "DESIGN", desc: "Craft custom UI grids, typography modular scales, and layout variables.", color: "var(--accent-pink)", x: 300, y: 60 },
    { name: "BUILD", desc: "Assemble responsive, micro-interactive React and native system architectures.", color: "var(--accent-purple)", x: 500, y: 180 },
    { name: "DEPLOY", desc: "Push to edge nodes, configure caches, optimize core web vitals.", color: "#ffffff", x: 700, y: 60 },
    { name: "GROW", desc: "Continuous analytical iteration, lead tracking, conversion optimization.", color: "var(--accent-cyan)", x: 900, y: 120 }
  ];

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    const ctx = gsap.context(() => {
      // Timeline to scrub drawing of line and trigger active nodes
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          end: "bottom 80%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        }
      });

      tl.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 1
      });

      // Bind node activations along the progress
      // We can use GSAP ScrollTrigger callbacks or time values inside the timeline
      const nodeProgresses = [0.1, 0.32, 0.52, 0.72, 0.95];
      nodeProgresses.forEach((prog, index) => {
        tl.call(() => {
          setActiveNode(index);
        }, null, prog);
        
        // Also add a reverse callback to turn off node when scrolling back
        tl.call(() => {
          setActiveNode(index - 1);
        }, null, Math.max(0, prog - 0.05));
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-padding" 
      style={{
        background: "transparent",
        borderBottom: "1px solid var(--border-color)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Decorative background grid */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", fontSize: "0.9rem", letterSpacing: "0.15em" }}>
            {"// OPERATION PIPELINE"}
          </span>
          <h2 style={{ fontSize: "3rem", fontWeight: "800", marginTop: "1rem", textTransform: "uppercase" }}>
            THE GLLITCH METHOD
          </h2>
        </div>

        {/* Desktop Circuit SVG */}
        <div style={{ width: "100%", overflowX: "auto", padding: "2rem 0" }} className="hide-scrollbar">
          <div style={{ width: "1000px", position: "relative", margin: "0 auto" }}>
            <svg viewBox="0 0 1000 240" style={{ width: "100%", height: "auto" }}>
              {/* Grid Circuit Backplates */}
              <path d="M 50 120 L 950 120" stroke="rgba(255,255,255,0.02)" strokeWidth="8" />

              {/* Background Path (Dull guide line) */}
              <path
                d="M 50 120 L 100 120 L 220 120 L 260 60 L 300 60 L 420 60 L 460 180 L 500 180 L 620 180 L 660 60 L 700 60 L 820 60 L 860 120 L 950 120"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Animated Foreground Path (Circuit Signal) */}
              <path
                ref={pathRef}
                d="M 50 120 L 100 120 L 220 120 L 260 60 L 300 60 L 420 60 L 460 180 L 500 180 L 620 180 L 660 60 L 700 60 L 820 60 L 860 120 L 950 120"
                fill="none"
                stroke="var(--accent-cyan)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: "drop-shadow(0px 0px 5px var(--accent-cyan))"
                }}
              />

              {/* Circuit Nodes */}
              {steps.map((step, idx) => {
                const isActive = activeNode >= idx;
                return (
                  <g key={idx}>
                    {/* Pulsing ring for active node */}
                    {isActive && (
                      <circle
                        cx={step.x}
                        cy={step.y}
                        r="18"
                        fill="none"
                        stroke={step.color}
                        strokeWidth="1.5"
                        opacity="0.6"
                        className="glow-pulse"
                      />
                    )}
                    {/* Node Circle */}
                    <circle
                      cx={step.x}
                      cy={step.y}
                      r="8"
                      fill={isActive ? step.color : "#121217"}
                      stroke={isActive ? "#fff" : "rgba(255, 255, 255, 0.2)"}
                      strokeWidth="2"
                      style={{
                        transition: "fill 0.4s ease, stroke 0.4s ease",
                        filter: isActive ? `drop-shadow(0px 0px 8px ${step.color})` : "none"
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Labels beneath coordinate points */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              {steps.map((step, idx) => {
                const isActive = activeNode >= idx;
                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      left: `${step.x - 90}px`,
                      top: `${step.y + 15}px`,
                      width: "180px",
                      textAlign: "center",
                      transition: "opacity 0.5s ease, transform 0.5s ease",
                      opacity: isActive ? 1 : 0.35,
                      transform: isActive ? "translateY(0)" : "translateY(5px)"
                    }}
                  >
                    <span 
                      style={{ 
                        display: "block", 
                        fontFamily: "var(--font-mono)", 
                        fontSize: "0.8rem", 
                        color: isActive ? step.color : "var(--text-secondary)",
                        fontWeight: "bold",
                        marginBottom: "0.25rem",
                        textShadow: isActive ? `0 0 8px ${step.color}` : "none"
                      }}
                    >
                      {step.name}
                    </span>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
