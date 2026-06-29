import { useEffect, useState } from "react";
import { glitchTextString } from "../utils/glitchUtils";

export default function GlitchText({ 
  text, 
  className = "", 
  glitchOnLoad = true, 
  hoverGlitch = true,
  as: Component = "h1" 
}) {
  const [displayText, setDisplayText] = useState(text);
  const [jitterStyle, setJitterStyle] = useState({});

  useEffect(() => {
    // Check prefers-reduced-motion to avoid trigger on load
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !glitchOnLoad) return;

    let frameCount = 0;
    const maxFrames = 25; // Duration of initial glitch

    const interval = setInterval(() => {
      frameCount++;
      
      // Randomly glitch text
      if (Math.random() > 0.3) {
        setDisplayText(glitchTextString(text, 0.25));
      } else {
        setDisplayText(text);
      }

      // Random jitter coordinates
      const rx = (Math.random() - 0.5) * 8;
      const ry = (Math.random() - 0.5) * 4;
      setJitterStyle({
        transform: `translate(${rx}px, ${ry}px)`,
        textShadow: `${-rx}px 0 rgba(0, 243, 255, 0.7), ${rx}px 0 rgba(255, 0, 127, 0.7)`
      });

      if (frameCount >= maxFrames) {
        clearInterval(interval);
        setDisplayText(text);
        setJitterStyle({});
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, glitchOnLoad]);

  const handleMouseEnter = () => {
    if (!hoverGlitch) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let count = 0;
    const hoverInterval = setInterval(() => {
      count++;
      setDisplayText(glitchTextString(text, 0.15));
      if (count > 5) {
        clearInterval(hoverInterval);
        setDisplayText(text);
      }
    }, 60);
  };

  const handleMouseLeave = () => {
    setDisplayText(text);
  };

  return (
    <Component 
      className={`glitch-wrapper ${hoverGlitch ? "glitch-hover" : ""} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={jitterStyle}
    >
      <span className="glitch-text" data-text={text}>
        {displayText}
      </span>
    </Component>
  );
}
