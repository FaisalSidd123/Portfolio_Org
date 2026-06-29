import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

// Project Database
const projectsData = [
  {
    id: "proj-1",
    title: "METAVERSE CONSOLE",
    category: "WEB",
    gradient: "linear-gradient(135deg, #00f3ff 0%, #bd00ff 100%)",
    description: "A virtual, browser-based administrative console for rendering real-time mesh coordinates on decentralized networks. Built with Three.js, React 19, and optimized shaders.",
    client: "Aether Grid Labs",
    year: "2026",
    scope: "Frontend Architecture & WebGL",
    metrics: "> conversion_lift: +43% // speed_index: 0.4s",
    sliceOffsets: [-25, 18, -15, 22, -10] // Pre-computed offsets per slice band
  },
  {
    id: "proj-2",
    title: "KINETIC INDEX",
    category: "DESIGN",
    gradient: "linear-gradient(135deg, #ff007f 0%, #00f3ff 100%)",
    description: "An experimental typographic design book utilizing kinetic letterform arrangements. Designed digitally, then split-color silkscreen printed using custom UV inks.",
    client: "Vektor Press",
    year: "2025",
    scope: "Identity & Silkscreen Curation",
    metrics: "> brand_recall: +88% // asset_matrix: 1200+ units",
    sliceOffsets: [20, -18, 25, -15, 12]
  },
  {
    id: "proj-3",
    title: "SIGNAL ARCHIVE",
    category: "MARKETING",
    gradient: "linear-gradient(135deg, #bd00ff 0%, #ff007f 100%)",
    description: "A data aggregation platform that crawls Web3 marketing channels to predict conversion vectors. Features real-time SVG charting and automated Telegram alerts.",
    client: "Signal Group",
    year: "2026",
    scope: "Conversion Funnels & Backend API",
    metrics: "> roas_index: 5.42x // lead_volume: +240%",
    sliceOffsets: [-15, 22, -28, 12, -20]
  },
  {
    id: "proj-4",
    title: "NEON HUB",
    category: "APP",
    gradient: "linear-gradient(135deg, #00f3ff 0%, #ffffff 100%)",
    description: "A companion smartphone application for locking and tracking hardware smart keys. Built in React Native with a full-duplex Bluetooth Low Energy stack.",
    client: "Neon Security Corp",
    year: "2026",
    scope: "iOS/Android App & BLE Integration",
    metrics: "> ble_latency: 4ms // security_score: 99.9%",
    sliceOffsets: [24, -12, 18, -22, 15]
  },
  {
    id: "proj-5",
    title: "PULSE ENGINE",
    category: "WEB",
    gradient: "linear-gradient(135deg, #ff007f 0%, #bd00ff 100%)",
    description: "A customized WebAudio synthesizer that translates CPU load patterns into real-time ambient sonic textures. Crafted entirely in pure React 19.",
    client: "BitSynth Interactive",
    year: "2025",
    scope: "Web Audio API & Sound Design",
    metrics: "> audio_fps: 60 // render_load: 0.8%",
    sliceOffsets: [-22, 25, -12, 18, -15]
  }
];

// Single Fractured Project Card Component
function FracturedCard({ 
  project, 
  mousePos, 
  activeFilter, 
  onSelect, 
  reducedMotion 
}) {
  const cardRef = useRef(null);
  const [fractureRatio, setFractureRatio] = useState(1.0);
  const [isAligned, setIsAligned] = useState(false);
  const [isAmbientFractured, setIsAmbientFractured] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Proximity Calculation Loop
  useEffect(() => {
    if (reducedMotion || isAmbientFractured) return;

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    const checkProximity = () => {
      if (!isVisible || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const cardX = rect.left + rect.width / 2;
      const cardY = rect.top + rect.height / 2;

      // Absolute mouse coordinates relative to window viewport
      const dx = mousePos.x - cardX;
      const dy = mousePos.y - cardY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Distance mapping logic
      // Under 50px: fully aligned (ratio = 0). Over 320px: fully fractured (ratio = 1).
      const minDistance = 50;
      const maxDistance = 320;

      if (dist < minDistance) {
        setFractureRatio(0);
        setIsAligned(true);
      } else if (dist > maxDistance) {
        setFractureRatio(1.0);
        setIsAligned(false);
      } else {
        const ratio = (dist - minDistance) / (maxDistance - minDistance);
        setFractureRatio(ratio);
        setIsAligned(false);
      }
    };

    checkProximity();

    return () => {
      observer.disconnect();
    };
  }, [mousePos, reducedMotion, isAmbientFractured]);

  // Ambient idle fracture/self-correct loop
  useEffect(() => {
    if (reducedMotion || isHovered) return;

    const runAmbientSelfCorrect = () => {
      // 10% chance to self-correct and re-fracture every 10 seconds
      if (Math.random() < 0.12) {
        setIsAmbientFractured(true);
        // Animate down to 0 (aligned) and back to 1.0 (fractured)
        let step = 0;
        const duration = 120; // frames
        const interval = setInterval(() => {
          step++;
          const progress = step / duration; // 0 to 1
          
          // Sinusoidal curve down and back
          const val = Math.abs(Math.sin(progress * Math.PI - Math.PI / 2)); // 1 -> 0 -> 1
          setFractureRatio(val);

          if (val < 0.05) setIsAligned(true);
          else setIsAligned(false);

          if (step >= duration) {
            clearInterval(interval);
            setFractureRatio(1.0);
            setIsAmbientFractured(false);
          }
        }, 16);
      }
    };

    const intervalId = setInterval(runAmbientSelfCorrect, 10000);
    return () => clearInterval(intervalId);
  }, [reducedMotion, isHovered]);

  const isMismatched = activeFilter !== "ALL" && project.category !== activeFilter;

  // Render horizontal slices of mockup
  const sliceHeights = [
    { inset: "inset(0% 0% 80% 0%)", index: 0 },
    { inset: "inset(20% 0% 60% 0%)", index: 1 },
    { inset: "inset(40% 0% 40% 0%)", index: 2 },
    { inset: "inset(60% 0% 20% 0%)", index: 3 },
    { inset: "inset(80% 0% 0% 0%)", index: 4 }
  ];

  return (
    <motion.div
      ref={cardRef}
      layout
      onClick={() => onSelect(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        opacity: isMismatched ? 0.08 : 1.0,
        scale: isMismatched ? 0.9 : isAligned ? 1.04 : 1.0,
        y: isMismatched ? 15 : 0
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{
        width: "100%",
        maxWidth: "340px",
        height: "360px",
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "12px",
        padding: "1.2rem",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: isAligned ? "0 15px 35px rgba(0, 243, 255, 0.12)" : "none",
        borderWidth: isAligned ? "1.5px" : "1px",
        borderColor: isAligned ? "var(--accent-cyan)" : "var(--border-color)"
      }}
    >
      {/* top indicator bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
          {"FILE//" + project.id.toUpperCase()}
        </span>
        <div style={{ 
          width: "6px", 
          height: "6px", 
          borderRadius: "50%", 
          background: isAligned ? "var(--accent-cyan)" : "var(--border-color)" 
        }} />
      </div>

      {/* Slices Canvas Container */}
      <div 
        style={{
          flex: 1,
          margin: "1.5rem 0",
          background: "#050507",
          border: "1px solid rgba(255,255,255,0.03)",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative"
        }}
      >
        {/* Render horizontal slices stacking */}
        {sliceHeights.map((slice) => {
          const offsetMax = project.sliceOffsets[slice.index];
          // Calculate dynamic horizontal translation
          const translateVal = reducedMotion ? 0 : offsetMax * fractureRatio;
          
          // Chromatic aberration shadow offset based on displacement
          const caOffset = reducedMotion ? 0 : 2 * fractureRatio;

          return (
            <div
              key={slice.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                clipPath: slice.inset,
                transform: `translate3d(${translateVal}px, 0, 0)`,
                transition: reducedMotion ? "none" : "transform 0.08s ease-out",
                willChange: "transform",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {/* Common backdrop mockup */}
              <div 
                style={{
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.95)), ${project.gradient}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3rem",
                  fontWeight: "950",
                  color: "rgba(255, 255, 255, 0.05)",
                  textShadow: caOffset > 0 ? `${caOffset}px 0 rgba(0, 243, 255, 0.6), ${-caOffset}px 0 rgba(255, 0, 127, 0.6)` : "none"
                }}
              >
                {project.title.substring(0, 2)}
              </div>
            </div>
          );
        })}

        {/* Faint overlay grid */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "100% 8px", pointerEvents: "none" }} />
      </div>

      {/* Snap lock title & info */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h3 
            style={{ 
              fontSize: "1.2rem", 
              fontWeight: "900", 
              color: "#fff", 
              fontFamily: "var(--font-sans)",
              letterSpacing: "-0.01em"
            }}
          >
            {project.title}
          </h3>
          <span 
            style={{ 
              display: "block",
              marginTop: "0.2rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: isAligned ? "var(--accent-cyan)" : "var(--text-secondary)",
              transition: "color 0.2s ease"
            }}
          >
            {isAligned ? `[${project.category}_LOCK_OK]` : `[FRACTURED_STATE]`}
          </span>
        </div>

        {/* Tactical Lock Indicator thunk bounce */}
        <AnimatePresence>
          {isAligned && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                padding: "0.4rem 0.8rem",
                background: "var(--accent-cyan)",
                color: "#000",
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: "bold",
                borderRadius: "4px"
              }}
            >
              ALIGN
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function WorkMasonry() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedId, setSelectedId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
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

  // Track global viewport mouse coordinates
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const activeProject = projectsData.find((p) => p.id === selectedId);

  // Filter positions coordinates (floating angly labels)
  const filters = [
    { label: "ALL", top: "10%", left: "5%", angle: "-6deg" },
    { label: "WEB", top: "18%", left: "80%", angle: "8deg" },
    { label: "APP", top: "45%", left: "2%", angle: "-4deg" },
    { label: "DESIGN", top: "60%", left: "88%", angle: "12deg" },
    { label: "MARKETING", top: "85%", left: "4%", angle: "-8deg" }
  ];

  return (
    <section 
      className="section-padding"
      style={{
        background: "transparent",
        borderBottom: "1px solid var(--border-color)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Decorative scattered coordinates background grid */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        
        {/* Kinetic Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-pink)", fontSize: "0.85rem", letterSpacing: "0.2em" }}>
            {"// FRACTURED ARCHIVE DATA"}
          </span>
          <h2 
            style={{
              fontSize: "4.5rem",
              fontWeight: "950",
              textTransform: "uppercase",
              letterSpacing: "-0.04em",
              margin: "1rem 0 0",
              animation: "duplicate-ghost 4s infinite",
              color: "#fff"
            }}
          >
            BROKEN ON PURPOSE.
          </h2>
        </div>

        {/* Canvas Area containing Scattered projects and floating labels */}
        <div 
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "3rem",
            width: "100%",
            minHeight: "850px",
            padding: "2rem 0"
          }}
        >
          {/* Floating control labels (Filters) scattered at angles */}
          {filters.map((f) => {
            const isActive = activeFilter === f.label;
            return (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.label)}
                style={{
                  position: "absolute",
                  top: f.top,
                  left: f.left,
                  transform: `rotate(${f.angle})`,
                  background: isActive ? "var(--accent-pink)" : "rgba(18, 18, 23, 0.65)",
                  color: isActive ? "#000" : "var(--text-secondary)",
                  border: isActive ? "none" : "1px solid var(--border-color)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  padding: "0.4rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  zIndex: 10,
                  boxShadow: isActive ? "0 0 15px rgba(255, 0, 127, 0.35)" : "none",
                  transition: "all 0.3s cubic-bezier(0.19, 1, 0.22, 1)"
                }}
                className="glitch-hover"
              >
                [{f.label}]
              </button>
            );
          })}

          {/* Scattered layout cards */}
          {projectsData.map((project, idx) => {
            // Apply asymmetric margin offsets based on index to scatter them
            const offsets = [
              { alignSelf: "flex-start", marginTop: "2rem" },
              { alignSelf: "center", marginTop: "-3rem" },
              { alignSelf: "flex-end", marginTop: "4rem" },
              { alignSelf: "flex-start", marginTop: "-1rem" },
              { alignSelf: "center", marginTop: "3rem" }
            ];
            const offsetStyle = offsets[idx % offsets.length];

            return (
              <div 
                key={project.id} 
                style={{ 
                  ...offsetStyle,
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <FracturedCard
                  project={project}
                  mousePos={mousePos}
                  activeFilter={activeFilter}
                  onSelect={(p) => setSelectedId(p.id)}
                  reducedMotion={reducedMotion}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Detailed View */}
      <AnimatePresence>
        {selectedId && activeProject && (
          <div 
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.98)",
              backdropFilter: "blur(20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10000,
              padding: "2rem"
            }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`card-${selectedId}`}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "16px",
                width: "100%",
                maxWidth: "800px",
                maxHeight: "85vh",
                overflowY: "auto",
                padding: "3.5rem 2.5rem",
                position: "relative",
                boxShadow: "0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0, 243, 255, 0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Back to archive esc button */}
              <button 
                onClick={() => setSelectedId(null)}
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  background: "transparent",
                  border: "1px solid var(--border-color)",
                  color: "var(--accent-pink)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                className="glitch-hover"
              >
                [ESC] BACK_TO_ARCHIVE
              </button>

              <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-cyan)", letterSpacing: "0.1em" }}>
                    {"// COMPLETED_MODULE_" + activeProject.category}
                  </span>
                  <h3 style={{ fontSize: "2.5rem", fontWeight: "950", color: "#fff", marginTop: "0.5rem" }}>
                    {activeProject.title}
                  </h3>
                </div>

                {/* Hero image with scan reveal */}
                <div style={{ height: "180px", width: "100%", background: activeProject.gradient, borderRadius: "8px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.7))" }}></div>
                </div>

                {/* Case study metadata stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "2rem" }} className="modal-content-grid">
                  <div>
                    <h4 style={{ color: "#fff", marginBottom: "0.5rem", fontSize: "1.1rem" }}>System Spec Specs</h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", textAlign: "left" }}>
                      {activeProject.description}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "1.2rem", borderRadius: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Client</span>
                      <span style={{ fontSize: "0.8rem", color: "#fff", fontWeight: "bold" }}>{activeProject.client}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Scope</span>
                      <span style={{ fontSize: "0.8rem", color: "#fff", fontWeight: "bold", textAlign: "right" }}>{activeProject.scope}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Year</span>
                      <span style={{ fontSize: "0.8rem", color: "#fff", fontWeight: "bold" }}>{activeProject.year}</span>
                    </div>
                  </div>
                </div>

                {/* Offset bands structural image dividers inside case study details */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", margin: "1rem 0" }}>
                  <div style={{ height: "40px", background: activeProject.gradient, opacity: 0.15, width: "100%", transform: "translate3d(-15px, 0, 0)", borderRadius: "4px" }} />
                  <div style={{ height: "40px", background: activeProject.gradient, opacity: 0.25, width: "100%", transform: "translate3d(20px, 0, 0)", borderRadius: "4px" }} />
                  <div style={{ height: "40px", background: activeProject.gradient, opacity: 0.15, width: "100%", transform: "translate3d(-8px, 0, 0)", borderRadius: "4px" }} />
                </div>

                {/* Stat counter results block */}
                <div 
                  style={{
                    background: "#0a0a0d",
                    border: "1px solid var(--border-color)",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    textAlign: "left",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.95rem"
                  }}
                >
                  <span style={{ color: "var(--accent-pink)" }}>&gt; METRIC_DIAGNOSIS:</span>
                  <div style={{ color: "#fff", marginTop: "0.5rem", fontWeight: "bold" }}>
                    {activeProject.metrics}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                  <a href="#gateway" onClick={() => setSelectedId(null)} style={btnStyle("var(--accent-cyan)", "#000")}>
                    <ExternalLink size={16} />
                    <span>LAUNCH DEC DEPLOYMENT</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        /* Duplicate ghost shadow alignment loop */
        @keyframes duplicate-ghost {
          0%, 82%, 100% {
            text-shadow: none;
            transform: skew(0deg);
          }
          5%, 15% {
            text-shadow: 4px 0 var(--accent-cyan), -4px 0 var(--accent-pink);
            transform: skew(-2deg);
          }
          20%, 80% {
            text-shadow: 2px 0 var(--accent-cyan), -2px 0 var(--accent-pink);
            transform: skew(0deg);
          }
        }
        @media (max-width: 900px) {
          button[style*="position: absolute"] {
            position: static !important;
            transform: none !important;
            margin: 0.2rem !important;
          }
          div[style*="position: relative"] {
            min-height: auto !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          div[style*="align-self"] {
            align-self: center !important;
            margin-top: 0 !important;
          }
        }
        @media (max-width: 600px) {
          .modal-content-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

const btnStyle = (bg, color) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  background: bg,
  color: color,
  fontFamily: "var(--font-mono)",
  fontSize: "0.85rem",
  fontWeight: "bold",
  padding: "0.8rem 1.5rem",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  textDecoration: "none"
});
