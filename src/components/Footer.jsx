export default function Footer() {
  const links = [
    {
      title: "CORE_NODES",
      items: [
        { label: "01 // SERVICES", href: "#portals" },
        { label: "02 // PROCESS", href: "#method" },
        { label: "03 // SELECTED_WORKS", href: "#work" },
        { label: "04 // LEADERSHIP_TEAM", href: "#team" },
        { label: "05 // INITIATE_CONTACT", href: "#contact" }
      ]
    },
    {
      title: "CONNECTION_LINKS",
      items: [
        { label: "GITHUB_REPOS", href: "https://github.com/FaisalSidd123/Portfolio_Org" },
        { label: "WASIQUE_GITHUB", href: "https://github.com/syedwasique" },
        { label: "FAISAL_GITHUB", href: "https://github.com/FaisalSidd123" },
        { label: "WASIQUE_LINKEDIN", href: "https://linkedin.com/in/wasique-rizvi-00ba86182/" },
        { label: "FAISAL_LINKEDIN", href: "https://www.linkedin.com/in/muhammad-faisal-74baa5297/" }
      ]
    },
    {
      title: "SYSTEM_RESOURCES",
      items: [
        { label: "STATUS_PAGE", href: "#hero" },
        { label: "CORE_TECH_STACK", href: "#tech" },
        { label: "SITEMAP_XML", href: "/sitemap.xml" },
        { label: "ROBOTS_TXT", href: "/robots.txt" }
      ]
    }
  ];

  return (
    <footer 
      style={{
        background: "transparent",
        borderTop: "1px solid var(--border-color)",
        position: "relative",
        overflow: "hidden"
      }}
      className="scanlines"
    >
      <div 
        style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          padding: "6rem 4rem 3rem" 
        }}
        className="footer-container"
      >
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr repeat(3, 1fr)",
            gap: "4rem",
            marginBottom: "5rem",
            textAlign: "left"
          }}
          className="footer-grid"
        >
          {/* Brand block */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 0 10px rgba(0, 243, 255, 0.3)",
                  background: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/New logo 2.png"
                  alt="GLLITCH Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <span style={{ fontSize: "1.4rem", fontWeight: "900", color: "#ffffff", letterSpacing: "0.02em" }}>
                GLLITCH.
              </span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.8rem", lineHeight: "1.6", maxWidth: "260px" }}>
              Aesthetic digital design systems, performant Web engines, and immersive native mobile software architectures.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", gap: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent-pink)", border: "1px solid var(--accent-pink)", padding: "0.3rem 0.6rem", borderRadius: "4px" }}>
                PING: 12ms // ACTIVE
              </span>
            </div>
          </div>

          {/* Links columns */}
          {links.map((col, idx) => (
            <div key={idx}>
              <h5 style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#fff", fontWeight: "bold", marginBottom: "1.5rem", letterSpacing: "0.05em" }}>
                {col.title}
              </h5>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {col.items.map((item, itemIdx) => {
                  const isExternal = item.href.startsWith("http");
                  return (
                    <li key={itemIdx}>
                      <a 
                        href={item.href} 
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        style={{ 
                          fontSize: "0.85rem", 
                          color: "var(--text-secondary)", 
                          textDecoration: "none", 
                          transition: "color 0.2s ease" 
                        }}
                        className="footer-link"
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Closing Tagline */}
        <div style={{ borderTop: "1px dashed var(--border-color)", paddingTop: "3rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>
            <span>© {new Date().getFullYear()} GLLITCH. SYSTEM OPERATIONAL.</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>
            <span>DEPLOYED VIA EDGE</span>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-cyan)", animation: "pulse-node 1.5s infinite" }}></div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--accent-cyan) !important;
          text-shadow: 0 0 5px var(--accent-cyan);
        }
        @keyframes pulse-node {
          0% { box-shadow: 0 0 0 0 rgba(0, 243, 255, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(0, 243, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 243, 255, 0); }
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .footer-container {
            padding: 4rem 1.5rem 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
