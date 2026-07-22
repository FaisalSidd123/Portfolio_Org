import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BarChart2, CheckCircle, Code, Layers, Smartphone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const fullCode = `const project = new GllitchProject({
  client: "F&W",
  scope: "Full-Stack Web",
  stack: ["React", "GSAP", "Lenis"],
  performance: 100,
  seo: "optimized"
});

await project.deploy();
// Success!`;

export default function ServicesPortals() {
  const containerRef = useRef(null);
  const panelsRef = useRef(null);
  const chartPathRef = useRef(null);
  
  // Design swatches shuffling state
  const [swatches, setSwatches] = useState([
    { id: 1, color: "var(--accent-cyan)", label: "Branding", size: "w-24 h-24" },
    { id: 2, color: "var(--accent-pink)", label: "Editorial", size: "w-32 h-20" },
    { id: 3, color: "var(--accent-purple)", label: "3D Motion", size: "w-20 h-28" },
    { id: 4, color: "#ffffff", label: "Identity", size: "w-28 h-24" },
    { id: 5, color: "#333344", label: "Curation", size: "w-20 h-20" },
  ]);

  // Web Dev panel typing & finished UI state
  const [webDevState, setWebDevState] = useState("typing"); // typing, rendering, finished
  const [typedCode, setTypedCode] = useState("");

  // App Dev screen translation
  const [appScreenIndex, setAppScreenIndex] = useState(0);

  useEffect(() => {
    // Shuffle design swatches automatically on interval
    const shuffleInterval = setInterval(() => {
      setSwatches((prev) => [...prev].sort(() => Math.random() - 0.5));
    }, 2500);

    return () => clearInterval(shuffleInterval);
  }, []);

  // Animate typewriter code
  useEffect(() => {
    if (webDevState !== "typing") return;
    let i = 0;
    const typingInterval = setInterval(() => {
      setTypedCode(fullCode.slice(0, i));
      i++;
      if (i > fullCode.length) {
        clearInterval(typingInterval);
        setTimeout(() => setWebDevState("rendering"), 1000);
        setTimeout(() => setWebDevState("finished"), 2500);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, [webDevState]);

  useEffect(() => {
    const container = containerRef.current;
    const panels = panelsRef.current;
    if (!container || !panels) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", () => {
      const totalScrollWidth = panels.scrollWidth - window.innerWidth;

      // Horizontal scroll-jacking timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${panels.scrollWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Determine active panel based on progress
            const progress = self.progress;
            
            // Sync App mock screen swipe based on scroll progress in the 4th section (approx. 0.75 - 1.0)
            if (progress >= 0.75) {
              const appProgress = (progress - 0.75) / 0.25;
              if (appProgress < 0.33) setAppScreenIndex(0);
              else if (appProgress < 0.66) setAppScreenIndex(1);
              else setAppScreenIndex(2);
            }
          }
        }
      });

      // Slide panels horizontally
      tl.to(panels, {
        x: -totalScrollWidth,
        ease: "none"
      });

      // Animate SVG Line Chart in Marketing Portal
      if (chartPathRef.current) {
        const pathLength = chartPathRef.current.getTotalLength();
        gsap.set(chartPathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength
        });

        tl.to(chartPathRef.current, {
          strokeDashoffset: 0,
          duration: 0.25,
          ease: "power2.out"
        }, 0.05); // Start early in the scroll
      }
    });

    return () => mm.revert();
  }, []);

  const resetWebDev = () => {
    setWebDevState("typing");
    setTypedCode("");
  };

  return (
    <div 
      ref={containerRef} 
      className="services-portals-wrapper"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100vh",
        background: "transparent",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div 
        ref={panelsRef}
        className="services-panels-strip"
        style={{
          display: "flex",
          width: "400vw",
          height: "100%",
          willChange: "transform",
        }}
      >
        {/* PANEL 1: MARKETING */}
        <section className="panel" style={panelStyle}>
          <div className="panel-grid" style={panelGridStyle}>
            <div style={panelTextStyle}>
              <div style={badgeStyle("var(--accent-cyan)")}>
                <BarChart2 size={14} />
                <span>PORTAL 01 // MARKETING</span>
              </div>
              <h2 className="portal-heading" style={portalHeadingStyle}>
                PERFORMANCE <span style={{ color: "var(--accent-cyan)" }}>DRIVEN</span> CONVERSIONS.
              </h2>
              <p style={portalDescStyle}>
                We combine analytical insights and data-fueled aesthetics to build campaigns that convert. Our tracking pipelines make every lead measurable.
              </p>
              <ul style={listStyle}>
                <li>📈 Interactive Growth Dashboards</li>
                <li>🎯 Custom Pixels & Conversion Funnels</li>
                <li>⚡ Speed-Optimized SEO Architectures</li>
              </ul>
            </div>
            
            <div className="panel-visual-container" style={panelVisualContainerStyle}>
              {/* Marketing Visual: SVG line chart drawing itself */}
              <div style={cardMockStyle}>
                <div style={cardHeaderStyle}>
                  <div style={dotsStyle}></div>
                  <span style={mockTitleStyle}>conversion_funnel.io</span>
                </div>
                <div style={{ padding: "2rem", height: "calc(100% - 40px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>ROAS Metrics</span>
                      <h4 style={{ fontSize: "2rem", color: "#fff", margin: 0 }}>4.82x</h4>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "var(--accent-cyan)" }}>
                      <ArrowUpRight size={20} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>+24.3%</span>
                    </div>
                  </div>

                  <div style={{ height: "150px", position: "relative", width: "100%" }}>
                    <svg viewBox="0 0 400 150" style={{ width: "100%", height: "100%" }}>
                      {/* Grid Lines */}
                      <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.05)" />
                      <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.05)" />
                      <line x1="0" y1="130" x2="400" y2="130" stroke="rgba(255,255,255,0.05)" />
                      
                      {/* Animated Line */}
                      <path
                        ref={chartPathRef}
                        d="M 10 130 Q 80 110 120 70 T 240 60 T 320 20 T 390 10"
                        fill="none"
                        stroke="var(--accent-cyan)"
                        strokeWidth="4"
                      />
                      
                      {/* Glow effect path */}
                      <path
                        d="M 10 130 Q 80 110 120 70 T 240 60 T 320 20 T 390 10"
                        fill="none"
                        stroke="var(--accent-cyan)"
                        strokeWidth="8"
                        opacity="0.3"
                        style={{ filter: "blur(4px)" }}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PANEL 2: GRAPHIC DESIGN */}
        <section className="panel" style={panelStyle}>
          <div className="panel-grid" style={panelGridStyle}>
            <div style={panelTextStyle}>
              <div style={badgeStyle("var(--accent-pink)")}>
                <Layers size={14} />
                <span>PORTAL 02 // VISUAL IDENTITY</span>
              </div>
              <h2 className="portal-heading" style={portalHeadingStyle}>
                ASSET Stack & <span style={{ color: "var(--accent-pink)" }}>Curation</span>.
              </h2>
              <p style={portalDescStyle}>
                We engineer bold, digital brand systems. Our swatches, layout tokens, and typographic layouts move harmoniously to define digital presence.
              </p>
              <ul style={listStyle}>
                <li>🎨 Modular Visual Design Systems</li>
                <li>📐 Typography Scalability Matrices</li>
                <li>🖤 Ultra-modern Minimal Art Direction</li>
              </ul>
            </div>

            <div className="panel-visual-container" style={panelVisualContainerStyle}>
              {/* Graphic Design Visual: Rearranging color swatches */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "420px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                  {"// framer_motion.moodboard.layout"}
                </span>
                
                <div style={moodboardGridStyle}>
                  <AnimatePresence mode="popLayout">
                    {swatches.map((swatch) => (
                      <motion.div
                        key={swatch.id}
                        layout
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 18
                        }}
                        style={{
                          background: swatch.color,
                          borderRadius: "8px",
                          padding: "1rem",
                          minHeight: "90px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          border: swatch.color === "#ffffff" ? "none" : "1px solid var(--border-color)",
                          color: swatch.color === "#ffffff" ? "#000" : "#fff",
                          boxShadow: swatch.color === "var(--accent-cyan)" ? "0 0 20px rgba(0, 243, 255, 0.2)" : swatch.color === "var(--accent-pink)" ? "0 0 20px rgba(255, 0, 127, 0.2)" : "none"
                        }}
                      >
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: "bold" }}>
                          {"0" + swatch.id}
                        </span>
                        <span style={{ fontWeight: "700", fontSize: "1.1rem" }}>
                          {swatch.label}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PANEL 3: WEB DEVELOPMENT */}
        <section className="panel" style={panelStyle}>
          <div className="panel-grid" style={panelGridStyle}>
            <div style={panelTextStyle}>
              <div style={badgeStyle("var(--accent-purple)")}>
                <Code size={14} />
                <span>PORTAL 03 // WEB ENGINEERING</span>
              </div>
              <h2 className="portal-heading" style={portalHeadingStyle}>
                CLEAN CODE. <span style={{ color: "var(--accent-purple)" }}>ZERO</span> FRICTION.
              </h2>
              <p style={portalDescStyle}>
                We build blistering-fast, semantic React applications. Clean setups synced to GSAP ScrollTrigger render responsive layouts instantly.
              </p>
              <ul style={listStyle}>
                <li>⚙️ Built with React 19 & Vite</li>
                <li>⚡ 100/100 Lighthouse Performance</li>
                <li>🔗 Sync-ready Lenis Scroll Controller</li>
              </ul>
              {webDevState === "finished" && (
                <button onClick={resetWebDev} style={resetBtnStyle}>
                  Re-type Code
                </button>
              )}
            </div>

            <div className="panel-visual-container" style={panelVisualContainerStyle}>
              {/* Web Dev Visual: Browser Typing code that morphs into a website preview */}
              <div style={cardMockStyle}>
                <div style={cardHeaderStyle}>
                  <div style={dotsStyle}></div>
                  <span style={mockTitleStyle}>
                    {webDevState === "typing" ? "compiler.sh" : "gllitch_preview.app"}
                  </span>
                </div>
                
                <div style={{ height: "calc(100% - 40px)", overflow: "hidden", position: "relative" }}>
                  {webDevState === "typing" && (
                    <div style={{ padding: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-cyan)", whiteSpace: "pre-wrap", textAlign: "left" }}>
                      {typedCode}
                      <span className="blinking-cursor">|</span>
                    </div>
                  )}

                  {webDevState === "rendering" && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "1rem" }}>
                      <div className="glow-pulse" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid var(--accent-purple)", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }}></div>
                      <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-purple)" }}>Compiling assets...</span>
                    </div>
                  )}

                  {webDevState === "finished" && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{ height: "100%", background: "#0e0e12", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                        <span style={{ fontWeight: "800", color: "var(--accent-cyan)", fontSize: "0.9rem" }}>GLLITCH.</span>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <div style={{ width: "15px", height: "5px", background: "#fff", opacity: 0.3 }}></div>
                          <div style={{ width: "15px", height: "5px", background: "#fff", opacity: 0.3 }}></div>
                        </div>
                      </div>
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #161622 0%, #08080c 100%)", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.05)", padding: "1rem", textAlign: "center" }}>
                        <h5 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "0.25rem" }}>We craft web experiences.</h5>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", maxWidth: "200px" }}>Aesthetic, highly interactive interfaces constructed with pixel-perfection.</p>
                        <div style={{ marginTop: "1rem", padding: "0.4rem 1rem", background: "var(--accent-cyan)", color: "#000", fontSize: "0.7rem", fontWeight: "bold", borderRadius: "4px" }}>
                          EXPLORE
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PANEL 4: APP DEVELOPMENT */}
        <section className="panel" style={panelStyle}>
          <div style={panelGridStyle}>
            <div style={panelTextStyle}>
              <div style={badgeStyle("var(--accent-cyan)")}>
                <Smartphone size={14} />
                <span>PORTAL 04 // APP ARCHITECTURE</span>
              </div>
              <h2 style={portalHeadingStyle}>
                NATIVE FEEL. <span style={{ color: "var(--accent-cyan)" }}>FLUID</span> SWIPE.
              </h2>
              <p style={portalDescStyle}>
                We develop immersive iOS and Android applications. Native micro-interactions and sleek mockups sync to build high-performance mobile products.
              </p>
              <ul style={listStyle}>
                <li>📱 Cross-Platform React Native Codebases</li>
                <li>🚀 60 FPS Fluid Rendering Mechanics</li>
                <li>🔔 Contextual Push Signal Gateways</li>
              </ul>
            </div>

            <div style={panelVisualContainerStyle}>
              {/* App Dev Visual: Smartphone mockup scrolling screen sync */}
              <div style={phoneMockStyle}>
                {/* Notch */}
                <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", width: "110px", height: "18px", background: "#000", borderRadius: "9px", zIndex: 10 }}></div>
                
                {/* Scrollable screen container */}
                <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
                  <div 
                    style={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      height: "300%", 
                      transform: `translateY(-${appScreenIndex * 33.33}%)`,
                      transition: "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
                      willChange: "transform"
                    }}
                  >
                    {/* Screen 1: Splash */}
                    <div style={phoneScreenStyle("#0a0a0c")}>
                      <div className="glow-pulse" style={{ width: "60px", height: "60px", borderRadius: "50%", background: "linear-gradient(45deg, var(--accent-cyan), var(--accent-pink))", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}>
                        G
                      </div>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "1rem" }}>
                        INITIALIZING_
                      </span>
                    </div>

                    {/* Screen 2: Dashboard */}
                    <div style={phoneScreenStyle("#121217")}>
                      <span style={{ fontSize: "0.7rem", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", alignSelf: "flex-start", marginBottom: "0.25rem" }}>
                        metrics_console
                      </span>
                      <h5 style={{ color: "#fff", alignSelf: "flex-start", marginBottom: "1rem" }}>User Analytics</h5>
                      
                      <div style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", padding: "0.8rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Active Sessions</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", fontWeight: "bold" }}>9,842</span>
                        </div>
                        <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
                          <div style={{ width: "80%", height: "100%", background: "var(--accent-cyan)" }}></div>
                        </div>
                      </div>

                      <div style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", padding: "0.8rem", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Conversion Rate</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--accent-pink)", fontWeight: "bold" }}>3.45%</span>
                        </div>
                        <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
                          <div style={{ width: "65%", height: "100%", background: "var(--accent-pink)" }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Screen 3: Details */}
                    <div style={phoneScreenStyle("#16161e")}>
                      <CheckCircle size={36} color="var(--accent-cyan)" />
                      <h5 style={{ color: "#fff", marginTop: "1rem", marginBottom: "0.25rem" }}>Deployment Clear</h5>
                      <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)", maxWidth: "160px", textAlign: "center" }}>
                        All services running healthy on edges.
                      </p>
                      <div style={{ marginTop: "1.5rem", width: "100%", padding: "0.6rem", background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-pink))", color: "#000", fontWeight: "bold", fontSize: "0.75rem", textAlign: "center", borderRadius: "6px" }}>
                        DISMISS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Scroll indicator overlay */}
      <div 
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "4rem",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          zIndex: 10,
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          color: "var(--text-secondary)"
        }}
      >
        <span style={{ color: "#fff" }}>SCROLL TO INITIATE SLIDE</span>
        <div style={{ width: "40px", height: "1px", background: "var(--border-color)" }}></div>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {[0, 1, 2, 3].map((idx) => (
            <div 
              key={idx} 
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: idx === appScreenIndex ? "var(--accent-cyan)" : "var(--border-color)",
                transition: "background 0.3s ease"
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Keyframe css block in JSX */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .blinking-cursor {
          animation: blink-anim 0.8s steps(2, start) infinite;
        }
        @keyframes blink-anim {
          to { opacity: 0; }
        }
        @media (max-width: 900px) {
          .services-portals-wrapper {
            height: auto !important;
            overflow: visible !important;
          }
          .services-panels-strip {
            flex-direction: column !important;
            width: 100% !important;
            height: auto !important;
            transform: none !important;
          }
          .panel {
            width: 100% !important;
            height: auto !important;
            min-height: auto !important;
            padding: 3.5rem 1.5rem !important;
            border-right: none !important;
            border-bottom: 1px solid var(--border-color) !important;
            box-sizing: border-box !important;
          }
          .panel-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            width: 100% !important;
          }
          .portal-heading {
            font-size: 2.2rem !important;
            margin: 0.8rem 0 !important;
          }
          .panel-visual-container {
            display: flex !important;
            width: 100% !important;
            justify-content: center !important;
            margin-top: 1rem !important;
          }
        }
        @media (max-width: 480px) {
          .portal-heading {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </div>
  );
}

// Styling Object variables (inline styles)
const panelStyle = {
  flexShrink: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 4rem",
  position: "relative",
  borderRight: "1px solid var(--border-color)"
};

const panelGridStyle = {
  display: "grid",
  gridTemplateColumns: "1.1fr 0.9fr",
  gap: "4rem",
  width: "100%",
  maxWidth: "1200px",
  alignItems: "center"
};

const panelTextStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  textAlign: "left"
};

const portalHeadingStyle = {
  fontSize: "3rem",
  fontWeight: "800",
  lineHeight: "1.1",
  letterSpacing: "-0.02em",
  margin: "1.5rem 0",
  textTransform: "uppercase"
};

const portalDescStyle = {
  fontSize: "1.05rem",
  color: "var(--text-secondary)",
  lineHeight: "1.6",
  marginBottom: "2rem"
};

const listStyle = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  fontFamily: "var(--font-mono)",
  fontSize: "0.9rem",
  color: "var(--text-primary)"
};

const panelVisualContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%"
};

const badgeStyle = (color) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.4rem 0.8rem",
  borderRadius: "4px",
  border: `1px solid ${color}`,
  color: color,
  fontFamily: "var(--font-mono)",
  fontSize: "0.75rem",
  letterSpacing: "0.1em",
  background: "rgba(0,0,0,0.3)"
});

const cardMockStyle = {
  width: "100%",
  maxWidth: "400px",
  height: "320px",
  background: "var(--bg-card)",
  border: "1px solid var(--border-color)",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
  position: "relative"
};

const cardHeaderStyle = {
  height: "40px",
  background: "#0c0c10",
  borderBottom: "1px solid var(--border-color)",
  display: "flex",
  alignItems: "center",
  padding: "0 1rem",
  position: "relative"
};

const dotsStyle = {
  display: "flex",
  gap: "6px",
  position: "absolute",
  left: "1rem",
  width: "40px",
  height: "8px",
  zIndex: 2,
  alignItems: "center",
  content: "",
  boxShadow: "inset 0 0 0 transparent",
  background: "transparent",
  // Simple representation
  "&::before": {
    content: "''"
  },
  borderLeft: "2px solid #ff5f56",
  borderRight: "2px solid #27c93f",
  paddingLeft: "4px"
};

const mockTitleStyle = {
  width: "100%",
  textAlign: "center",
  fontFamily: "var(--font-mono)",
  fontSize: "0.75rem",
  color: "var(--text-secondary)"
};

const moodboardGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
  width: "100%",
  background: "rgba(0,0,0,0.2)",
  padding: "1.5rem",
  border: "1px solid var(--border-color)",
  borderRadius: "12px"
};

const resetBtnStyle = {
  marginTop: "2rem",
  background: "transparent",
  border: "1px solid var(--accent-purple)",
  color: "var(--accent-purple)",
  fontFamily: "var(--font-mono)",
  fontSize: "0.8rem",
  padding: "0.5rem 1rem",
  cursor: "pointer",
  borderRadius: "4px"
};

const phoneMockStyle = {
  width: "240px",
  height: "480px",
  border: "12px solid #1a1a24",
  borderRadius: "36px",
  overflow: "hidden",
  background: "#000",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  position: "relative",
  outline: "1px solid rgba(255, 255, 255, 0.05)"
};

const phoneScreenStyle = (bgColor) => ({
  height: "33.33%",
  width: "100%",
  background: bgColor,
  padding: "2rem 1.2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});
