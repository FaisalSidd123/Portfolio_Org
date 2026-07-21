import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Layers,
  Cpu,
  Briefcase,
  MessageSquare,
  DollarSign,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { ExpandableTabs } from "./ui/ExpandableTabs";

// Navigation items — maps to section IDs in App.jsx
const NAV_TABS = [
  { title: "Home",       icon: Home,          href: "#hero" },
  { title: "Services",   icon: Layers,        href: "#portals" },
  { title: "Method",     icon: Cpu,           href: "#method" },
  { title: "Work",       icon: Briefcase,     href: "#work" },
  { type: "separator" },
  { title: "Reviews",    icon: MessageSquare, href: "#testimonials" },
  { title: "Pricing",    icon: DollarSign,    href: "#pricing" },
  { title: "Contact",    icon: Mail,          href: "#cta" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect scroll depth to trigger background fill
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth-scroll to section when a tab is selected
  const handleTabChange = (index) => {
    if (index === null) return;

    // Count separators to map tab index to NAV_TABS slot
    const realTabs = NAV_TABS.filter((t) => t.type !== "separator");
    const item = realTabs[index];
    if (!item?.href) return;

    const target = document.querySelector(item.href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  // For mobile: click nav link directly
  const handleMobileNav = (href) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 5000,
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          background: scrolled
            ? "rgba(0, 0, 0, 0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border-color)"
            : "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        {/* ── Left: Brand wordmark ── */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexShrink: 0,
          }}
        >
          {/* Glitching brand name */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 900,
              fontSize: "1.15rem",
              letterSpacing: "-0.03em",
              color: "#fff",
              userSelect: "none",
            }}
            className="brand-glitch"
          >
            F<span style={{ color: "var(--accent-cyan)" }}>&</span>W
            <span style={{ color: "var(--accent-pink)", marginLeft: "4px" }}>
              GLLITCH
            </span>
          </span>
        </a>

        {/* ── Center: Expandable Tabs (desktop only) ── */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border-color)",
            borderRadius: "12px",
            padding: "6px 10px",
          }}
          className="navbar-desktop-tabs"
        >
          <ExpandableTabs
            tabs={NAV_TABS}
            activeColor="var(--accent-cyan)"
            onChange={handleTabChange}
          />
        </div>

        {/* ── Right: CTA + Mobile Toggle ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <a
            href="#cta"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#cta")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="navbar-cta"
          >
            GET IN TOUCH
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="navbar-mobile-toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              zIndex: 4999,
              background: "rgba(0,0,0,0.97)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid var(--border-color)",
              padding: "1.5rem 2rem 2rem",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {NAV_TABS.filter((t) => t.type !== "separator").map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.title}
                    onClick={() => handleMobileNav(tab.href)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.85rem 1rem",
                      background: "transparent",
                      border: "none",
                      borderRadius: "8px",
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.2s ease, color 0.2s ease",
                      letterSpacing: "0.06em",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.color = "var(--accent-cyan)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    <Icon size={18} />
                    <span>{tab.title.toUpperCase()}</span>
                  </button>
                );
              })}

              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNav("#cta");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "1rem",
                  padding: "0.85rem 1.5rem",
                  background: "var(--accent-cyan)",
                  color: "#000",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  borderRadius: "8px",
                  textDecoration: "none",
                  letterSpacing: "0.08em",
                }}
              >
                GET IN TOUCH
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Desktop: show tabs, hide toggle */
        .navbar-desktop-tabs { display: flex; }
        .navbar-mobile-toggle { display: none; }
        .navbar-cta {
          display: inline-flex;
          align-items: center;
          padding: 0.45rem 1.1rem;
          background: transparent;
          border: 1px solid var(--accent-cyan);
          color: var(--accent-cyan);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          border-radius: 6px;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease;
          white-space: nowrap;
        }
        .navbar-cta:hover {
          background: var(--accent-cyan);
          color: #000;
        }

        /* Brand ambient glitch on hover */
        .brand-glitch {
          position: relative;
          display: inline-block;
        }
        .brand-glitch:hover {
          animation: brand-glitch-anim 0.4s steps(2, start) infinite;
        }
        @keyframes brand-glitch-anim {
          0%   { text-shadow: 2px 0 var(--accent-cyan), -2px 0 var(--accent-pink); }
          50%  { text-shadow: -2px 0 var(--accent-cyan),  2px 0 var(--accent-pink); transform: skewX(-2deg); }
          100% { text-shadow: none; transform: skewX(0); }
        }

        /* Mobile breakpoint */
        @media (max-width: 800px) {
          .navbar-desktop-tabs { display: none !important; }
          .navbar-mobile-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            border-radius: 8px;
            padding: 0.4rem;
            cursor: pointer;
          }
          .navbar-cta { display: none; }
        }
      `}</style>
    </>
  );
}
