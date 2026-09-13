import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
      {/* Ambient Radial Backlight behind the header */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "650px",
          maxWidth: "92vw",
          height: "320px",
          background: "radial-gradient(ellipse at center, rgba(0, 243, 255, 0.16) 0%, rgba(189, 0, 255, 0.12) 35%, rgba(255, 0, 127, 0.08) 60%, transparent 75%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Main Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.6rem",
          padding: "0 1.5rem",
          maxWidth: "1100px",
          width: "100%"
        }}
      >
        {/* Kicker badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.35rem 0.95rem",
            borderRadius: "999px",
            background: "rgba(0, 243, 255, 0.04)",
            border: "1px solid rgba(0, 243, 255, 0.22)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 20px rgba(0, 243, 255, 0.12)"
          }}
        >
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-cyan)", boxShadow: "0 0 8px var(--accent-cyan)" }} />
          <span 
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              color: "var(--accent-cyan)",
              letterSpacing: "0.18em",
              textTransform: "uppercase"
            }}
          >
            {"// CORE ENGINE_LOADED"}
          </span>
        </motion.div>

        {/* Primary Hero Heading: F&W GLLITCH */}
        <motion.h1
          initial={{ opacity: 0, y: 25, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hero-main-title"
        >
          <span className="title-highlight">F&amp;W</span>{" "}
          <span className="title-brand">GLLITCH</span>
        </motion.h1>

        {/* Typewriter tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
          <span className="blinking-cursor" style={{ color: "var(--accent-pink)", fontWeight: "bold" }}>_</span>
        </motion.div>

        {/* CTA glitch-flicker hover button */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: "1rem" }}
        >
          <a 
            href="#portals"
            style={{
              display: "inline-flex",
              padding: "1rem 2.4rem",
              fontSize: "0.85rem",
              background: "rgba(18, 18, 23, 0.7)",
              color: "#fff",
              border: "1px solid var(--border-color)",
              fontFamily: "var(--font-mono)",
              fontWeight: "bold",
              borderRadius: "4px",
              cursor: "pointer",
              textDecoration: "none",
              letterSpacing: "0.1em",
              backdropFilter: "blur(12px)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
            }}
            className="glitch-hover btn-magnetic"
          >
            ESTABLISH_CONNECTION
          </a>
        </motion.div>
      </motion.div>

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
        .hero-main-title {
          font-family: var(--font-sans);
          font-size: clamp(3rem, 7.5vw, 6.2rem);
          font-weight: 950;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin: 0;
          color: #ffffff;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.28em;
          user-select: none;
          text-shadow: 0 0 40px rgba(255, 255, 255, 0.12);
          transition: text-shadow 0.3s ease, transform 0.3s ease;
        }
        .hero-main-title:hover {
          text-shadow: -2px 0 var(--accent-cyan), 2px 0 var(--accent-pink), 0 0 50px rgba(0, 243, 255, 0.4);
        }
        .title-highlight {
          color: #ffffff;
        }
        .title-brand {
          background: linear-gradient(135deg, #ffffff 40%, var(--accent-cyan) 85%, var(--accent-pink) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @media (max-width: 768px) {
          .hero-main-title {
            font-size: clamp(2.3rem, 9.5vw, 4rem);
            letter-spacing: -0.03em;
          }
        }
        @media (max-width: 480px) {
          .hero-main-title {
            font-size: 2.2rem;
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
