import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Send, User, Mail, FileText, Phone, MapPin, Terminal, ShieldAlert, CheckCircle } from "lucide-react";

export default function Contact() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    message: ""
  });
  const [focusedField, setFocusedField] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: "" });

    // Initialize globally as fallback
    emailjs.init("8zUnTp7KfKeEQns-b");

    emailjs
      .sendForm(
        "service_gqnlnei", 
        "template_56m4uuc", 
        form.current, 
        { publicKey: "8zUnTp7KfKeEQns-b" }
      )
      .then(
        (response) => {
          console.log("EMAILJS SUCCESS:", response.status, response.text);
          setSubmitStatus({ 
            success: true, 
            message: "TRANSMISSION SUCCESSFUL // Connection established. We will get back to you shortly." 
          });
          form.current.reset();
        },
        (error) => {
          console.error("EMAILJS ERROR DETAILED:", error);
          setSubmitStatus({ 
            success: false, 
            message: `TRANSMISSION ERROR // Connection failed: ${error?.text || error?.message || "Unknown error"}. Please retry later.` 
          });
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section 
      id="contact" 
      className="section-padding" 
      style={{
        background: "transparent",
        borderBottom: "1px solid var(--border-color)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Decorative Elements */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.5
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-pink)", fontSize: "0.85rem", letterSpacing: "0.2em" }}>
            {"// ESTABLISH_COMMUNICATION_LINK"}
          </span>
          <h2
            style={{
              fontSize: "3.2rem",
              fontWeight: "950",
              textTransform: "uppercase",
              letterSpacing: "-0.04em",
              margin: "0.8rem 0 0",
              color: "#fff"
            }}
            className="contact-main-title"
          >
            INITIATE GLITCHES.
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginTop: "0.75rem", maxWidth: "600px", margin: "0.75rem auto 0", lineHeight: 1.6 }}>
            Ready to deploy your next digital breakthrough? Fire a message directly into our main control grid.
          </p>
        </div>

        {/* Content Columns */}
        <div 
          className="contact-layout-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "4rem",
            alignItems: "start"
          }}
        >
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <form 
              ref={form} 
              onSubmit={sendEmail}
              style={{
                background: "rgba(18, 18, 24, 0.65)",
                border: "1px solid var(--border-color)",
                borderRadius: "16px",
                padding: "2.5rem",
                backdropFilter: "blur(12px)",
                position: "relative"
              }}
            >
              {/* Subtle top indicator bar */}
              <div 
                style={{
                  position: "absolute",
                  top: 0,
                  left: "1.5rem",
                  right: "1.5rem",
                  height: "2px",
                  background: isSubmitting 
                    ? "linear-gradient(90deg, var(--accent-cyan), var(--accent-pink))" 
                    : focusedField 
                    ? "var(--accent-cyan)" 
                    : "rgba(255, 255, 255, 0.1)"
                }}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
                
                {/* Field: Name */}
                <div style={{ position: "relative" }}>
                  <div 
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: focusedField === "name" ? "var(--accent-cyan)" : "var(--text-secondary)",
                      transition: "color 0.25s ease",
                      pointerEvents: "none",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="from_name"
                    id="name"
                    required
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="YOUR_IDENTITY_NAME"
                    style={inputStyle(focusedField === "name")}
                  />
                  <div style={inputFocusBar(focusedField === "name")} />
                </div>

                {/* Field: Email */}
                <div style={{ position: "relative" }}>
                  <div 
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: focusedField === "email" ? "var(--accent-cyan)" : "var(--text-secondary)",
                      transition: "color 0.25s ease",
                      pointerEvents: "none",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="from_email"
                    id="email"
                    required
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="EMAIL_COMMUNICATION_ADDRESS"
                    style={inputStyle(focusedField === "email")}
                  />
                  <div style={inputFocusBar(focusedField === "email")} />
                </div>

                {/* Field: Message */}
                <div style={{ position: "relative" }}>
                  <div 
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "1.2rem",
                      color: focusedField === "message" ? "var(--accent-cyan)" : "var(--text-secondary)",
                      transition: "color 0.25s ease",
                      pointerEvents: "none",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <FileText size={18} />
                  </div>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    required
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="DESCRIBE_YOUR_PROJECT_PARAMETERS..."
                    style={{
                      ...inputStyle(focusedField === "message"),
                      paddingTop: "1rem",
                      minHeight: "130px",
                      resize: "vertical"
                    }}
                  />
                  <div style={inputFocusBar(focusedField === "message")} />
                </div>

                {/* Status Message Dialog */}
                <AnimatePresence mode="wait">
                  {submitStatus.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{
                        padding: "1rem",
                        borderRadius: "8px",
                        background: submitStatus.success ? "rgba(0, 243, 255, 0.08)" : "rgba(255, 0, 127, 0.08)",
                        border: submitStatus.success ? "1px solid rgba(0, 243, 255, 0.3)" : "1px solid rgba(255, 0, 127, 0.3)",
                        color: submitStatus.success ? "var(--accent-cyan)" : "var(--accent-pink)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.85rem",
                        display: "flex",
                        alignItems: "start",
                        gap: "0.75rem"
                      }}
                    >
                      <div style={{ marginTop: "2px" }}>
                        {submitStatus.success ? <CheckCircle size={16} /> : <ShieldAlert size={16} />}
                      </div>
                      <span>{submitStatus.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    padding: "1.1rem",
                    borderRadius: "8px",
                    background: "transparent",
                    border: "1px solid var(--accent-cyan)",
                    color: "var(--accent-cyan)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.25s ease"
                  }}
                  className="contact-submit-btn"
                >
                  {isSubmitting ? "TRANSMITTING..." : "FIRE_MESSAGE_PACKET"}
                  <motion.div
                    animate={isSubmitting ? { x: [0, 6, 0] } : {}}
                    transition={isSubmitting ? { repeat: Infinity, duration: 1.2 } : {}}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Send size={16} />
                  </motion.div>
                </motion.button>

              </div>
            </form>
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem"
            }}
          >
            {/* Terminal status box */}
            <div 
              style={{
                background: "rgba(12, 12, 16, 0.8)",
                border: "1px solid var(--border-color)",
                borderRadius: "16px",
                padding: "2rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                textAlign: "left",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.8rem", marginBottom: "1rem" }}>
                <Terminal size={16} color="var(--accent-cyan)" />
                <span style={{ color: "#fff", fontWeight: "bold" }}>SYSTEM_DIAGNOSIS_OUTPUT</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>MAIN CORE STATUS:</span>
                  <span style={{ color: "var(--accent-cyan)", fontWeight: "bold" }}>ACTIVE // 100%</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>CONNECTION QUALITY:</span>
                  <span style={{ color: "var(--accent-pink)", fontWeight: "bold" }}>ENCRYPTED</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>SERVER LOCATION:</span>
                  <span style={{ color: "#fff" }}>US_EAST_EDGE</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>PING LATENCY:</span>
                  <span style={{ color: "var(--accent-cyan)" }}>12ms (STABLE)</span>
                </div>
              </div>
            </div>

            {/* Info details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              {/* Info: Email */}
              <div style={infoItemStyle}>
                <div style={infoIconStyle("var(--accent-cyan)")}>
                  <Mail size={18} />
                </div>
                <div style={{ textAlign: "left" }}>
                  <h4 style={{ fontSize: "0.95rem", color: "#fff", fontWeight: "bold", margin: 0 }}>DIRECT EMAIL</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "2px" }}>hello@digitalinnovation.com</p>
                </div>
              </div>

              {/* Info: Phone */}
              <div style={infoItemStyle}>
                <div style={infoIconStyle("var(--accent-pink)")}>
                  <Phone size={18} />
                </div>
                <div style={{ textAlign: "left" }}>
                  <h4 style={{ fontSize: "0.95rem", color: "#fff", fontWeight: "bold", margin: 0 }}>PHONE HOTLINE</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "2px" }}>+1 (555) 123-4567</p>
                </div>
              </div>

              {/* Info: Location */}
              <div style={infoItemStyle}>
                <div style={infoIconStyle("var(--accent-purple)")}>
                  <MapPin size={18} />
                </div>
                <div style={{ textAlign: "left" }}>
                  <h4 style={{ fontSize: "0.95rem", color: "#fff", fontWeight: "bold", margin: 0 }}>MAIN BASE HQ</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "2px" }}>123 Innovation Blvd, Tech City</p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>

      <style>{`
        .contact-submit-btn:hover {
          background: rgba(0, 243, 255, 0.08) !important;
          box-shadow: 0 0 20px rgba(0, 243, 255, 0.25);
        }
        @media (max-width: 800px) {
          .contact-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .contact-main-title {
            font-size: 2.2rem !important;
          }
        }
      `}</style>
    </section>
  );
}

// Helper Styles
const inputStyle = (isFocused) => ({
  width: "100%",
  padding: "1rem 1rem 1rem 3rem",
  background: isFocused ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.2)",
  border: isFocused ? "1px solid var(--accent-cyan)" : "1px solid var(--border-color)",
  borderRadius: "8px",
  color: "#fff",
  fontFamily: "var(--font-sans)",
  fontSize: "0.92rem",
  outline: "none",
  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
  boxSizing: "border-box"
});

const inputFocusBar = (isFocused) => ({
  position: "absolute",
  bottom: 0,
  left: "8px",
  right: "8px",
  height: "1px",
  background: "linear-gradient(90deg, transparent, var(--accent-cyan), transparent)",
  opacity: isFocused ? 1 : 0,
  transition: "opacity 0.25s ease",
  pointerEvents: "none"
});

const infoItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1.2rem",
  background: "rgba(18, 18, 24, 0.35)",
  border: "1px solid var(--border-color)",
  borderRadius: "12px",
  padding: "1rem 1.5rem",
  transition: "transform 0.2s ease, border-color 0.2s ease",
  cursor: "pointer"
};

const infoIconStyle = (color) => ({
  width: "42px",
  height: "42px",
  borderRadius: "8px",
  background: `${color}11`,
  border: `1px solid ${color}44`,
  color: color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0
});
