import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const targets = {
  projects: 86,
  satisfaction: 99,
  lines: 120, // Will display as 120k+
  caffeine: 14 // Will display as 14.5k
};

export default function TerminalStats() {
  const triggerRef = useRef(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [stats, setStats] = useState({
    projects: 0,
    satisfaction: 0,
    lines: 0,
    caffeine: 0
  });

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    ScrollTrigger.create({
      trigger: trigger,
      start: "top 75%",
      once: true,
      onEnter: () => {
        animateTerminal();
      }
    });

    const animateTerminal = () => {
      // 1. Line sequence timings
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      
      const run = async () => {
        setVisibleLines(1);
        await countUp("projects", targets.projects, 1000);
        
        await delay(300);
        setVisibleLines(2);
        await countUp("satisfaction", targets.satisfaction, 800);

        await delay(300);
        setVisibleLines(3);
        await countUp("lines", targets.lines, 1200);

        await delay(300);
        setVisibleLines(4);
        await countUp("caffeine", targets.caffeine, 900);

        await delay(300);
        setVisibleLines(5); // Show bottom command prompt
      };

      run();
    };

    const countUp = (key, target, duration) => {
      return new Promise((resolve) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: duration / 1000,
          ease: "power1.out",
          onUpdate: () => {
            setStats((prev) => ({
              ...prev,
              [key]: Math.floor(obj.val)
            }));
          },
          onComplete: () => {
            setStats((prev) => ({
              ...prev,
              [key]: target
            }));
            resolve();
          }
        });
      });
    };
  }, []);

  return (
    <section 
      ref={triggerRef}
      className="section-padding" 
      style={{
        background: "transparent",
        borderBottom: "1px solid var(--border-color)",
        position: "relative"
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", fontSize: "0.9rem", letterSpacing: "0.15em" }}>
            {"// PERFORMANCE DIAGNOSTIC"}
          </span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginTop: "1rem", textTransform: "uppercase" }}>
            COMPANY METRICS
          </h2>
        </div>

        {/* Terminal Shell Window */}
        <div 
          style={{
            background: "#0c0c10",
            border: "1px solid var(--border-color)",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(0, 243, 255, 0.03)",
            textAlign: "left"
          }}
        >
          {/* Header Bar */}
          <div 
            style={{
              background: "#07070a",
              borderBottom: "1px solid var(--border-color)",
              padding: "0.8rem 1.2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", gap: "6px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }}></div>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }}></div>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }}></div>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              bash - stats_console.sh
            </span>
            <div style={{ width: "40px" }}></div>
          </div>

          {/* Console Body */}
          <div 
            style={{
              padding: "2rem",
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              lineHeight: "1.8",
              color: "var(--text-primary)",
              minHeight: "260px"
            }}
          >
            <div style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
              {"Last login: " + new Date().toDateString() + " on ttys001"}
            </div>
            
            {/* Line 1 */}
            {visibleLines >= 1 && (
              <div>
                <span style={{ color: "var(--accent-pink)" }}>&gt; </span>
                <span style={{ color: "#fff" }}>projects_shipped: </span>
                <span style={{ color: "var(--accent-cyan)", fontWeight: "bold" }}>
                  {stats.projects}+
                </span>
              </div>
            )}

            {/* Line 2 */}
            {visibleLines >= 2 && (
              <div>
                <span style={{ color: "var(--accent-pink)" }}>&gt; </span>
                <span style={{ color: "#fff" }}>client_satisfaction_rate: </span>
                <span style={{ color: "var(--accent-cyan)", fontWeight: "bold" }}>
                  {stats.satisfaction}%
                </span>
              </div>
            )}

            {/* Line 3 */}
            {visibleLines >= 3 && (
              <div>
                <span style={{ color: "var(--accent-pink)" }}>&gt; </span>
                <span style={{ color: "#fff" }}>production_lines_deployed: </span>
                <span style={{ color: "var(--accent-cyan)", fontWeight: "bold" }}>
                  {stats.lines}k+
                </span>
              </div>
            )}

            {/* Line 4 */}
            {visibleLines >= 4 && (
              <div>
                <span style={{ color: "var(--accent-pink)" }}>&gt; </span>
                <span style={{ color: "#fff" }}>caffeine_units_ingested: </span>
                <span style={{ color: "var(--accent-cyan)", fontWeight: "bold" }}>
                  {stats.caffeine}k+
                </span>
              </div>
            )}

            {/* Bottom active prompt */}
            {visibleLines >= 5 ? (
              <div style={{ marginTop: "1rem", color: "var(--accent-pink)" }}>
                gllitch@engine:~$ <span className="blinking-cursor">_</span>
              </div>
            ) : visibleLines > 0 ? (
              <div style={{ color: "var(--accent-cyan)" }}>
                ⚡ compiling_diagnostics...
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
