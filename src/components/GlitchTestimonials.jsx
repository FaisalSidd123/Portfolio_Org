import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { glitchTextString } from "../utils/glitchUtils";

export default function GlitchTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [glitchText, setGlitchText] = useState(null);
  const [isGlitching, setIsGlitching] = useState(false);

  const reviews = [
    {
      text: "F&W GLLITCH completely overhauled our online terminal. Their horizontal layout design is stunning, and our load speed decreased by 60%. Absolutely flawless execution.",
      author: "SARAH CONNER",
      role: "CTO, NEOMESH CORP"
    },
    {
      text: "The circuit board visual mapping of our services section in the pitch was incredible. Clients were blown away. The visual design matches their technical execution perfectly.",
      author: "MARCUS VANCE",
      role: "DESIGN DIRECTOR, KINETIC GRID"
    },
    {
      text: "Zero friction, hyper responsive communication, and state-of-the-art aesthetics. If you want a basic website, look elsewhere. If you want to stand out, hire F&W.",
      author: "ELENA ROSTOVA",
      role: "FOUNDER, AETHER STUDIOS"
    }
  ];

  const handleNext = () => {
    triggerGlitchSwap((activeIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    triggerGlitchSwap((activeIndex - 1 + reviews.length) % reviews.length);
  };

  const triggerGlitchSwap = (nextIndex) => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    let count = 0;
    
    // Scramble effect
    const interval = setInterval(() => {
      count++;
      setGlitchText({
        text: glitchTextString(reviews[activeIndex].text, 0.4),
        author: glitchTextString(reviews[activeIndex].author, 0.5)
      });

      if (count > 3) {
        clearInterval(interval);
        setActiveIndex(nextIndex);
        setGlitchText(null);
        setIsGlitching(false);
      }
    }, 60);
  };

  const currentReview = reviews[activeIndex];
  const displayText = glitchText ? glitchText.text : currentReview.text;
  const displayAuthor = glitchText ? glitchText.author : currentReview.author;

  return (
    <section 
      className="section-padding" 
      style={{
        background: "transparent",
        borderBottom: "1px solid var(--border-color)",
        position: "relative"
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative" }}>
        
        {/* Decorative quotes background */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem", color: "var(--accent-pink)", opacity: 0.8 }}>
          <Quote size={48} style={{ transform: "rotate(180deg)" }} />
        </div>

        {/* Testimonial Quote Display */}
        <div 
          style={{
            minHeight: "180px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 1.5rem",
            transform: isGlitching ? "translate3d(3px, -2px, 0)" : "none",
            animation: isGlitching ? "glitch-hover-anim 0.2s steps(2, start) infinite" : "none"
          }}
        >
          <p 
            style={{
              fontSize: "1.4rem",
              lineHeight: "1.6",
              color: "#fff",
              fontWeight: "500",
              fontFamily: glitchText ? "var(--font-mono)" : "var(--font-sans)",
              textShadow: isGlitching ? "2px 0 var(--accent-cyan), -2px 0 var(--accent-pink)" : "none"
            }}
          >
            “{displayText}”
          </p>
          
          <div style={{ marginTop: "2rem" }}>
            <span 
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "0.95rem",
                color: "var(--accent-cyan)",
                fontWeight: "bold",
                letterSpacing: "0.1em"
              }}
            >
              {displayAuthor}
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.25rem", display: "block" }}>
              {currentReview.role}
            </span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "3rem" }}>
          <button 
            onClick={handlePrev} 
            disabled={isGlitching}
            style={navBtnStyle}
            className="glitch-hover"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNext} 
            disabled={isGlitching}
            style={navBtnStyle}
            className="glitch-hover"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

const navBtnStyle = {
  background: "transparent",
  border: "1px solid var(--border-color)",
  borderRadius: "50%",
  width: "45px",
  height: "45px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  cursor: "pointer",
  transition: "border-color 0.3s ease, color 0.3s ease",
  outline: "none"
};
