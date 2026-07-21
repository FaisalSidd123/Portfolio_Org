import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Components
import BackgroundSystem from "./components/BackgroundSystem";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesPortals from "./components/ServicesPortals";
import MethodSection from "./components/MethodSection";
import WorkMasonry from "./components/WorkMasonry";
import TechPhysics from "./components/TechPhysics";
import TerminalStats from "./components/TerminalStats";
import GlitchTestimonials from "./components/GlitchTestimonials";
import PricingSpecs from "./components/PricingSpecs";
import InteractiveCTA from "./components/InteractiveCTA";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [bgSection, setBgSection] = useState("hero");

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      infinite: false,
    });

    // 2. Synchronize ScrollTrigger with Lenis scroll callbacks
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Connect GSAP ticker to update Lenis time frames
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 4. Set lag smoothing for consistent frame rates
    gsap.ticker.lagSmoothing(0);

    // 5. Setup ScrollTriggers to update the background system active zone
    const ctx = gsap.context(() => {
      // Hero region
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: () => `+=${window.innerHeight * 0.7}`,
        onEnter: () => setBgSection("hero"),
        onLeave: () => setBgSection("mid"),
        onEnterBack: () => setBgSection("hero"),
        onLeaveBack: () => setBgSection("hero")
      });

      // CTA region
      ScrollTrigger.create({
        trigger: "#cta",
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => setBgSection("cta"),
        onLeave: () => setBgSection("footer"),
        onEnterBack: () => setBgSection("cta"),
        onLeaveBack: () => setBgSection("mid")
      });

      // Footer region
      ScrollTrigger.create({
        trigger: "footer",
        start: "top 80%",
        onEnter: () => setBgSection("footer"),
        onLeaveBack: () => setBgSection("cta")
      });
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ctx.revert();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", overflowX: "clip" }}>
      {/* Persistent Navigation Bar */}
      <Navbar />

      {/* Root Background Layer */}
      <BackgroundSystem activeSection={bgSection} />

      {/* Section 1: Hero Folder */}
      <div id="hero">
        <Hero />
      </div>

      {/* Section 2: Services Portals Carousel */}
      <div id="portals">
        <ServicesPortals />
      </div>

      {/* Section 3: The GLLITCH Method circuit */}
      <div id="method">
        <MethodSection />
      </div>

      {/* Section 4: Asymmetric masonry grid */}
      <div id="work">
        <WorkMasonry />
      </div>

      {/* Section 5: Repelling tech physics badges */}
      <div id="tech">
        <TechPhysics />
      </div>

      {/* Section 6: Diagnostic stats printer */}
      <div id="stats">
        <TerminalStats />
      </div>

      {/* Section 7: Testimonials glitch cut swap */}
      <div id="testimonials">
        <GlitchTestimonials />
      </div>

      {/* Section 8: Comparison Pricing Sheet */}
      <div id="pricing">
        <PricingSpecs />
      </div>

      {/* Section 9: Splitted grid warping CTA */}
      <div id="cta">
        <InteractiveCTA />
      </div>

      {/* Section 10: Digital scanline Footer */}
      <Footer />
    </div>
  );
}

export default App;
