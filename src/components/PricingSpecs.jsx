import { useState } from "react";

export default function PricingSpecs() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly or annual

  const plans = [
    {
      name: "CORE_PORTAL",
      desc: "For startups looking to establish visual foundation.",
      price: { monthly: 1500, annual: 1200 },
      features: {
        design: "Branding & Modular UI Sheets",
        web: "Static React Landing Pages",
        app: "Not Included",
        support: "Email Slack (9-5)",
        hosting: "Standard Edge CDN"
      },
      recommended: false
    },
    {
      name: "GLLITCH_SUITE",
      desc: "Full-scale custom portal build-out & integration.",
      price: { monthly: 3200, annual: 2560 },
      features: {
        design: "Full Art System & Custom Icons",
        web: "Interactive GSAP/Vite Web App",
        app: "React Native App Prototypes",
        support: "Dedicated Discord (24/7)",
        hosting: "High Performance Edge & Cache"
      },
      recommended: true
    },
    {
      name: "CUSTOM_NODE",
      desc: "Tailored enterprise solutions and WebGL grids.",
      price: { monthly: "Custom", annual: "Custom" },
      features: {
        design: "Continuous Brand Iterations",
        web: "Decentralized / WebGL Mesh UI",
        app: "Native BLE & IoT Integrations",
        support: "Dedicated Tech Director",
        hosting: "Enterprise Multi-Region Server"
      },
      recommended: false
    }
  ];

  return (
    <section 
      className="section-padding" 
      style={{
        background: "transparent",
        borderBottom: "1px solid var(--border-color)",
        position: "relative"
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-purple)", fontSize: "0.9rem", letterSpacing: "0.15em" }}>
            {"// SERVICE COMPILATION SPECS"}
          </span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginTop: "1rem", textTransform: "uppercase" }}>
            PACKAGES & SPECIFICATIONS
          </h2>

          {/* Toggle */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <div 
              style={{
                display: "inline-flex",
                background: "rgba(0,0,0,0.3)",
                border: "1px solid var(--border-color)",
                padding: "0.25rem",
                borderRadius: "6px"
              }}
            >
              <button
                onClick={() => setBillingCycle("monthly")}
                style={toggleBtnStyle(billingCycle === "monthly")}
              >
                MONTHLY
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                style={toggleBtnStyle(billingCycle === "annual")}
              >
                ANNUAL [-20%]
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Spec Grid */}
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "2rem",
            alignItems: "stretch"
          }}
        >
          {plans.map((plan, idx) => {
            const priceVal = billingCycle === "monthly" ? plan.price.monthly : plan.price.annual;
            const priceText = typeof priceVal === "number" ? `$${priceVal}/mo` : priceVal;

            return (
              <div
                key={idx}
                className={plan.recommended ? "glow-pulse glow-cyan" : ""}
                style={{
                  background: "var(--bg-card)",
                  border: plan.recommended ? "1.5px solid var(--accent-cyan)" : "1px solid var(--border-color)",
                  borderRadius: "12px",
                  padding: "2rem 1.8rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  boxShadow: plan.recommended ? "0 10px 30px rgba(0, 243, 255, 0.05)" : "none"
                }}
              >
                {/* Recommended Badge */}
                {plan.recommended && (
                  <span 
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--accent-cyan)",
                      color: "#000",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "4px",
                      letterSpacing: "0.05em"
                    }}
                  >
                    RECOMMENDED_SYSTEM
                  </span>
                )}

                {/* Card Header */}
                <div style={{ borderBottom: "1px dashed var(--border-color)", paddingBottom: "1.5rem" }}>
                  <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", fontWeight: "bold", color: plan.recommended ? "var(--accent-cyan)" : "#fff" }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem", minHeight: "36px" }}>
                    {plan.desc}
                  </p>
                  <div style={{ marginTop: "1.5rem" }}>
                    <span style={{ fontSize: "2rem", fontWeight: "900", color: "#fff", fontFamily: "var(--font-mono)" }}>
                      {priceText}
                    </span>
                    {typeof priceVal === "number" && (
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "block", marginTop: "0.2rem" }}>
                        {billingCycle === "annual" ? "Billed annually" : "Billed monthly"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Spec List */}
                <div style={{ flex: 1, margin: "2rem 0", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={specRowStyle}>
                    <span style={specLabelStyle}>DESIGN:</span>
                    <span style={specValStyle}>{plan.features.design}</span>
                  </div>
                  <div style={specRowStyle}>
                    <span style={specLabelStyle}>WEB DEV:</span>
                    <span style={specValStyle}>{plan.features.web}</span>
                  </div>
                  <div style={specRowStyle}>
                    <span style={specLabelStyle}>APP DEV:</span>
                    <span style={specValStyle}>{plan.features.app}</span>
                  </div>
                  <div style={specRowStyle}>
                    <span style={specLabelStyle}>SUPPORT:</span>
                    <span style={specValStyle}>{plan.features.support}</span>
                  </div>
                  <div style={specRowStyle}>
                    <span style={specLabelStyle}>HOSTING:</span>
                    <span style={specValStyle}>{plan.features.hosting}</span>
                  </div>
                </div>

                {/* Call To Action */}
                <button
                  style={{
                    width: "100%",
                    padding: "0.9rem",
                    background: plan.recommended ? "linear-gradient(90deg, var(--accent-cyan), var(--accent-pink))" : "transparent",
                    color: plan.recommended ? "#000" : "#fff",
                    border: plan.recommended ? "none" : "1px solid var(--border-color)",
                    borderRadius: "6px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  className="glitch-hover"
                >
                  INITIALIZE_PLAN
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const toggleBtnStyle = (isActive) => ({
  background: isActive ? "var(--border-color)" : "transparent",
  border: "none",
  color: isActive ? "#fff" : "var(--text-secondary)",
  fontFamily: "var(--font-mono)",
  fontSize: "0.8rem",
  fontWeight: "bold",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "all 0.2s ease"
});

const specRowStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.2rem",
  textAlign: "left"
};

const specLabelStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.75rem",
  color: "var(--text-secondary)",
  fontWeight: "bold"
};

const specValStyle = {
  fontSize: "0.85rem",
  color: "#fff"
};
