import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marquee() {
  const marqueeRef = useRef(null);

  const items = [
    { name: "REACT.JS", icon: "⚛️" },
    { name: "GSAP", icon: "🌀" },
    { name: "FRAMER MOTION", icon: "🍿" },
    { name: "LENIS SCROLL", icon: "⛓️" },
    { name: "NODE.JS", icon: "🟢" },
    { name: "DOCKER", icon: "🐳" },
    { name: "TYPESCRIPT", icon: "🔷" },
    { name: "FIGMA", icon: "🎨" },
    { name: "NEXT.JS", icon: "▲" },
    { name: "WEBGL", icon: "📐" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = marqueeRef.current;
      if (!track) return;

      const duration = 20; // Seconds to complete loop
      
      gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: duration,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      style={{
        width: "100%",
        overflow: "hidden",
        background: "rgba(18, 18, 23, 0.6)",
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
        padding: "1.5rem 0",
        transform: "rotate(-1.5deg) scale(1.02)",
        margin: "4rem 0",
        zIndex: 5,
        position: "relative",
      }}
    >
      <div 
        ref={marqueeRef}
        style={{
          display: "flex",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {/* Double items for seamless looping */}
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0 2rem",
              fontFamily: "var(--font-mono)",
              fontSize: "1.1rem",
              fontWeight: "600",
              letterSpacing: "0.1em",
              color: index % 2 === 0 ? "var(--accent-cyan)" : "var(--accent-pink)",
              textShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
