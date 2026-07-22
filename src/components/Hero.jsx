import { useEffect, useState } from "react";
import GlitchText from "./GlitchText";
import Marquee from "./Marquee";
import { ArrowDown } from "lucide-react";

const taglines = [
  "We design premium experiences.",
  "We build robust web engines.",
  "We deploy to global edges.",
  "We grow conversion metrics."
];

export default function Hero() {
  const [taglineText, setTaglineText] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter loop
  useEffect(() => {
    let timer;
    const currentFullText = taglines[taglineIndex];

    const type = () => {
      if (!isDeleting) {
        // Typing characters
        setTaglineText(currentFullText.slice(0, taglineText.length + 1));
        
        if (taglineText === currentFullText) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 1800);
          return;
        }
        
        timer = setTimeout(type, 65);
      } else {
        // Backspacing characters
        setTaglineText(currentFullText.slice(0, taglineText.length - 1));
        
        if (taglineText === "") {
          setIsDeleting(false);
          setTaglineIndex((prev) => (prev + 1) % taglines.length);
          return;
        }
        
        timer = setTimeout(type, 35);
      }
    };

    timer = setTimeout(type, 80);
    return () => clearTimeout(timer);
  }, [taglineText, isDeleting, taglineIndex]);

  return (
    <section 
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        background: "transparent",
        borderBottom: "1px solid var(--border-color)",
      }}
      className="scanlines"
    >


      {/* Main Hero Header */}
      <div 
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          padding: "0 1.5rem"
        }}
      >
        <span 
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "var(--accent-cyan)",
            letterSpacing: "0.2em"
          }}
        >
          {"// CORE ENGINE_LOADED"}
        </span>

        {/* Huge brand heading */}
        <GlitchText 
          text="F&W GLLITCH" 
          className="glitch-title"
          hoverGlitch={true}
        />

        {/* Typewriter tagline */}
        <div 
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            minHeight: "26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px"
          }}
        >
          <span>&gt; {taglineText}</span>
          <span className="blinking-cursor" style={{ color: "var(--accent-pink)" }}>_</span>
        </div>

        {/* CTA glitch-flicker hover button */}
        <div style={{ marginTop: "2rem" }}>
          <a 
            href="#portals"
            style={{
              display: "inline-flex",
              padding: "1rem 2.2rem",
              fontSize: "0.85rem",
              background: "transparent",
              color: "#fff",
              border: "1px solid var(--border-color)",
              fontFamily: "var(--font-mono)",
              fontWeight: "bold",
              borderRadius: "4px",
              cursor: "pointer",
              textDecoration: "none",
              letterSpacing: "0.1em"
            }}
            className="glitch-hover btn-magnetic"
          >
            ESTABLISH_CONNECTION
          </a>
        </div>
      </div>

      {/* Tilted infinite client logo marquee */}
      <div style={{ position: "absolute", bottom: "10%", left: 0, width: "100%" }}>
        <Marquee />
      </div>

      {/* Down Scroll Indicator */}
      <div 
        style={{
          position: "absolute",
          bottom: "2rem",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "var(--text-secondary)",
          fontSize: "0.75rem",
          fontFamily: "var(--font-mono)",
          gap: "8px"
        }}
      >
        <span>SCROLL DOWN</span>
        <ArrowDown size={14} style={{ animation: "bounce 2s infinite" }} />
      </div>

      {/* CSS overrides inside hero */}
      <style>{`
        .glitch-title {
          font-size: 5.5rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.0;
          color: #fff;
          text-transform: uppercase;
        }
        @media (max-width: 768px) {
          .glitch-title {
            font-size: 3.2rem;
          }
        }
        @media (max-width: 480px) {
          .glitch-title {
            font-size: 2.3rem;
            letter-spacing: -0.02em;
          }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
          60% { transform: translateY(-3px); }
        }
      `}</style>
    </section>
  );
}
