"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const StatCard = ({ value, label }) => (
  <div
    style={{
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid var(--border-color)",
      borderRadius: "12px",
      padding: "1rem",
      textAlign: "center"
    }}
  >
    <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#fff", fontFamily: "var(--font-mono)" }}>
      {value}
    </p>
    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
      {label}
    </p>
  </div>
);

const StickyTestimonialCard = ({ testimonial, index, total }) => {
  const colors = ["var(--accent-cyan)", "var(--accent-pink)", "#7cff67", "#bd00ff"];
  const accentColor = colors[index % colors.length];

  return (
    <motion.div
      style={{
        position: "sticky",
        top: `${100 + index * 26}px`,
        width: "100%",
        zIndex: index + 1,
        marginBottom: index === total - 1 ? 0 : "160px"
      }}
    >
      <div
        className={cn(
          "p-6 rounded-2xl shadow-2xl flex flex-col h-auto w-full",
          "bg-card border border-border"
        )}
        style={{
          background: "var(--bg-card)",
          border: `1px solid ${accentColor}44`,
          borderRadius: "16px",
          padding: "1.8rem",
          backdropFilter: "blur(16px)",
          boxShadow: `0 ${20 + index * 5}px 40px rgba(0, 0, 0, 0.8)`
        }}
      >
        {/* Top section: Avatar and Author */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              backgroundImage: `url(${testimonial.avatarSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              flexShrink: 0,
              border: `1px solid ${accentColor}66`
            }}
            aria-label={`Photo of ${testimonial.name}`}
          />
          <div style={{ flexGrow: 1, textAlign: "left" }}>
            <p style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#fff" }}>{testimonial.name}</p>
            <p style={{ fontSize: "0.85rem", color: accentColor, fontFamily: "var(--font-mono)" }}>{testimonial.title}</p>
          </div>
        </div>

        {/* Middle section: Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", margin: "1rem 0" }}>
          <span style={{ fontWeight: "bold", fontSize: "1rem", color: accentColor, fontFamily: "var(--font-mono)" }}>
            {testimonial.rating.toFixed(1)}
          </span>
          <div style={{ display: "flex", gap: "2px" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(testimonial.rating) ? accentColor : "transparent"}
                color={i < Math.floor(testimonial.rating) ? accentColor : "rgba(255,255,255,0.2)"}
              />
            ))}
          </div>
        </div>

        {/* Bottom section: Quote */}
        {testimonial.quote && (
          <p style={{ fontSize: "0.95rem", color: "#d1d5db", fontStyle: "italic", textAlign: "left", lineHeight: "1.55" }}>
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        )}
      </div>
    </motion.div>
  );
};

export const ClientsSection = ({
  tagLabel,
  title,
  description,
  stats = [],
  testimonials = [],
  primaryActionLabel,
  secondaryActionLabel,
  className,
  onPrimaryClick,
  onSecondaryClick
}) => {
  return (
    <section className={cn("w-full py-20 md:py-28", className)} style={{ background: "transparent" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "4rem",
          alignItems: "start",
          padding: "0 1.5rem"
        }}
      >
        {/* Left Column: Sticky Summary */}
        <div className="testimonials-left-column" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", textAlign: "left", position: "sticky", top: "100px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              alignSelf: "flex-start",
              borderRadius: "20px",
              border: "1px solid var(--border-color)",
              background: "rgba(255, 255, 255, 0.04)",
              padding: "0.3rem 0.8rem",
              fontSize: "0.85rem",
              fontFamily: "var(--font-mono)"
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-cyan)", boxShadow: "0 0 8px var(--accent-cyan)" }} />
            <span style={{ color: "var(--text-secondary)" }}>{tagLabel}</span>
          </div>

          <h2 className="testimonials-title" style={{ fontSize: "3rem", fontWeight: "950", color: "#fff", textTransform: "uppercase", letterSpacing: "-0.03em", margin: 0 }}>
            {title}
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
            {description}
          </p>

          <div className="testimonials-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1rem" }}>
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {secondaryActionLabel && (
              <a
                href="#work"
                onClick={onSecondaryClick}
                style={{
                  padding: "0.8rem 1.6rem",
                  borderRadius: "30px",
                  border: "1px solid var(--border-color)",
                  background: "transparent",
                  color: "#fff",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  cursor: "pointer"
                }}
              >
                {secondaryActionLabel}
              </a>
            )}
            {primaryActionLabel && (
              <a
                href="#cta"
                onClick={onPrimaryClick}
                style={{
                  padding: "0.8rem 1.6rem",
                  borderRadius: "30px",
                  background: "var(--accent-cyan)",
                  color: "#000",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(0, 243, 255, 0.4)"
                }}
              >
                {primaryActionLabel}
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Stacked Testimonial Cards */}
        <div className="testimonials-cards-column" style={{ position: "relative", display: "flex", flexDirection: "column" }}>
          {testimonials.map((testimonial, index) => (
            <StickyTestimonialCard
              key={testimonial.name}
              index={index}
              total={testimonials.length}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .testimonials-left-column {
            position: relative !important;
            top: 0 !important;
          }
          .testimonials-title {
            font-size: 2.2rem !important;
          }
        }
        @media (max-width: 480px) {
          .testimonials-stats-grid {
            grid-template-columns: repeat(1, 1fr) !important;
          }
          .testimonials-title {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </section>
  );
};
