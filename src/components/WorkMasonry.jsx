import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ExternalLink } from "lucide-react";

export default function WorkMasonry() {
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [frameIndex, setFrameIndex] = useState(0);

  const projects = [
    {
      id: "proj-1",
      title: "METAVERSE CONSOLE",
      category: "WEB DEVELOPMENT",
      size: "large",
      rotation: "-1.5deg",
      gradient: "linear-gradient(135deg, #00f3ff 0%, #bd00ff 100%)",
      frames: [
        "🌐 [CONSOLE INIT] --PORT_3000",
        "🔮 LOADED GL_MESH_GRID // V_1.0",
        "👾 RENDER MATRIX: 2,400 OBJECTS",
        "🔋 SYSTEM POWER STABLE: 100%"
      ],
      description: "A virtual, browser-based administrative console for rendering real-time mesh coordinates on decentralized networks. Built with Three.js, React 19, and optimized shaders.",
      client: "Aether Grid Labs",
      year: "2026",
      scope: "Frontend Architecture & WebGL"
    },
    {
      id: "proj-2",
      title: "KINETIC INDEX",
      category: "GRAPHIC DESIGN",
      size: "medium",
      rotation: "2deg",
      gradient: "linear-gradient(135deg, #ff007f 0%, #00f3ff 100%)",
      frames: [
        "📐 GRID UNIT: 8px / modular_scale",
        "🎨 CMYK CHANNEL SPLIT // EXPORTED",
        "📦 ASSETS RENDERED TO BUFFER_01",
        "🎚️ GRAPHICS: PASSING INTEGRITY"
      ],
      description: "An experimental typographic design book utilizing kinetic letterform arrangements. Designed digitally, then split-color silkscreen printed using custom UV inks.",
      client: "Vektor Press",
      year: "2025",
      scope: "Identity & Silkscreen Curation"
    },
    {
      id: "proj-3",
      title: "SIGNAL ARCHIVE",
      category: "MARKETING",
      size: "small",
      rotation: "-1deg",
      gradient: "linear-gradient(135deg, #bd00ff 0%, #ff007f 100%)",
      frames: [
        "📡 SCANNING TRACES --FREQUENCY 98.4",
        "📣 LEADS PIPELINE COMPILING",
        "👥 CONVERSION SPEED RUNNING",
        "🎯 ROAS INDEX: 5.4x CAPTURED"
      ],
      description: "A data aggregation platform that crawls Web3 marketing channels to predict conversion vectors. Features real-time SVG charting and automated Telegram alerts.",
      client: "Signal Group",
      year: "2026",
      scope: "Conversion Funnels & Backend API"
    },
    {
      id: "proj-4",
      title: "NEON HUB",
      category: "APP DEVELOPMENT",
      size: "medium",
      rotation: "-2deg",
      gradient: "linear-gradient(135deg, #00f3ff 0%, #ffffff 100%)",
      frames: [
        "📱 STAGE_SPLASH // CONNECTED",
        "🛡️ SECURITY SHIELD: ACTIVATE",
        "🔑 SESSION TOKEN WRITTEN",
        "⚡ APP BOOT COMPLETE (0ms)"
      ],
      description: "A companion smartphone application for locking and tracking hardware smart keys. Built in React Native with a full-duplex Bluetooth Low Energy stack.",
      client: "Neon Security Corp",
      year: "2026",
      scope: "iOS/Android App & BLE Integration"
    },
    {
      id: "proj-5",
      title: "PULSE ENGINE",
      category: "WEB DEVELOPMENT",
      size: "large",
      rotation: "1.5deg",
      gradient: "linear-gradient(135deg, #ff007f 0%, #bd00ff 100%)",
      frames: [
        "💖 PULSE STATE: DETECTED",
        "📊 HEARTBEAT PACKETS: ok",
        "🛡️ NODE_NODE NODE ALIVE",
        "📈 SPEED: 99.8% STABILITY"
      ],
      description: "A customized WebAudio synthesizer that translates CPU load patterns into real-time ambient sonic textures. Crafted entirely in pure React 19.",
      client: "BitSynth Interactive",
      year: "2025",
      scope: "Web Audio API & Sound Design"
    }
  ];

  // Cycling the glitch preview frame
  useEffect(() => {
    if (hoveredId === null) return;
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % 4);
    }, 80);
    return () => clearInterval(interval);
  }, [hoveredId]);

  const activeProject = projects.find((p) => p.id === selectedId);

  return (
    <section 
      className="section-padding" 
      style={{
        background: "transparent",
        borderBottom: "1px solid var(--border-color)",
        position: "relative"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "left", marginBottom: "4rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-pink)", fontSize: "0.9rem", letterSpacing: "0.15em" }}>
              {"// ARCHIVE OF INTERFACE EXPERIMENTS"}
            </span>
            <h2 style={{ fontSize: "3rem", fontWeight: "800", marginTop: "1rem", textTransform: "uppercase" }}>
              SELECTED WORKS
            </h2>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            {"[CLICK TO EXPAND DETAILS]"}
          </span>
        </div>

        {/* Asymmetric Masonry Grid */}
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
            alignItems: "start"
          }}
        >
          {projects.map((project) => {
            const isHovered = hoveredId === project.id;
            const isLarge = project.size === "large";

            return (
              <motion.div
                key={project.id}
                layoutId={`card-${project.id}`}
                onClick={() => setSelectedId(project.id)}
                onMouseEnter={() => {
                  setHoveredId(project.id);
                  setFrameIndex(0);
                }}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "12px",
                  padding: "1.2rem",
                  cursor: "pointer",
                  transform: isHovered ? "rotate(0deg) scale(1.02)" : `rotate(${project.rotation})`,
                  height: isLarge ? "460px" : "360px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.3s ease",
                  boxShadow: isHovered ? `0 15px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 243, 255, 0.1)` : "none",
                  zIndex: isHovered ? 10 : 1,
                  position: "relative"
                }}
              >
                {/* Top header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                    {project.category}
                  </span>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: isHovered ? "var(--accent-cyan)" : "var(--border-color)" }}></div>
                </div>

                {/* Glitch Frame Visual */}
                <div 
                  style={{
                    flex: 1,
                    margin: "1.5rem 0",
                    background: "#08080a",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {isHovered ? (
                    /* Fast cycling Glitch Frame */
                    <div 
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: project.gradient,
                        padding: "1rem",
                        textAlign: "center",
                      }}
                    >
                      <div 
                        style={{
                          background: "#08080a",
                          padding: "1.5rem 1rem",
                          borderRadius: "4px",
                          width: "90%",
                          boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.85rem",
                          color: "var(--accent-cyan)",
                          wordBreak: "break-all",
                          animation: "glitch-hover-anim 0.1s steps(2, start) infinite"
                        }}
                      >
                        {project.frames[frameIndex]}
                      </div>
                    </div>
                  ) : (
                    /* Default static visualization state */
                    <div 
                      style={{
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.95)), ${project.gradient}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2.5rem",
                        fontWeight: "900",
                        color: "rgba(255, 255, 255, 0.05)"
                      }}
                    >
                      {project.title.substring(0, 2)}
                    </div>
                  )}
                </div>

                {/* Bottom title info */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#fff", fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}>
                      {project.title}
                    </h3>
                  </div>
                  <div style={{ padding: "0.4rem", borderRadius: "50%", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-color)", color: "#fff" }}>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full-Screen Shared Layout Modal Overlay */}
        <AnimatePresence>
          {selectedId && activeProject && (
            <div 
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(10, 10, 12, 0.95)",
                backdropFilter: "blur(15px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
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
                  maxWidth: "780px",
                  maxHeight: "85vh",
                  overflowY: "auto",
                  padding: "3rem 2.5rem",
                  position: "relative",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0, 243, 255, 0.2)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedId(null)}
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border-color)",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer"
                  }}
                >
                  <X size={18} />
                </button>

                {/* Modal Content */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-cyan)", letterSpacing: "0.1em" }}>
                      {activeProject.category}
                    </span>
                    <h3 style={{ fontSize: "2.5rem", fontWeight: "900", color: "#fff", marginTop: "0.5rem" }}>
                      {activeProject.title}
                    </h3>
                  </div>

                  {/* Aesthetic gradient header banner */}
                  <div style={{ height: "160px", width: "100%", background: activeProject.gradient, borderRadius: "8px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6))" }}></div>
                    <div style={{ position: "absolute", bottom: "1rem", left: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#fff", background: "rgba(0,0,0,0.4)", padding: "0.3rem 0.6rem", borderRadius: "4px" }}>
                      {"status: operational"}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "2rem" }} className="modal-content-grid">
                    <div>
                      <h4 style={{ color: "#fff", marginBottom: "0.5rem", fontSize: "1.1rem" }}>Project Overview</h4>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                        {activeProject.description}
                      </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "1.2rem", borderRadius: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Client</span>
                        <span style={{ fontSize: "0.8rem", color: "#fff", fontWeight: "bold" }}>{activeProject.client}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Year</span>
                        <span style={{ fontSize: "0.8rem", color: "#fff", fontWeight: "bold" }}>{activeProject.year}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Scope</span>
                        <span style={{ fontSize: "0.8rem", color: "#fff", fontWeight: "bold", textAlign: "right" }}>{activeProject.scope}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                    <a href="#build" onClick={() => setSelectedId(null)} style={btnStyle("var(--accent-cyan)", "#000")}>
                      <ExternalLink size={16} />
                      <span>LAUNCH DEMO</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes glitch-hover-anim {
          0% { transform: translate(1px, 0.5px) rotate(0.5deg); }
          50% { transform: translate(-1px, -0.5px) rotate(-0.5deg); }
          100% { transform: translate(0, 0) rotate(0); }
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
