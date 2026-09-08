import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Terminal, Code2, ShieldCheck } from "lucide-react";

// Inline SVGs for brand fidelity
function GithubIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const founders = [
  {
    id: "wasique-rizvi",
    code: "NODE_01 // SMR",
    legalName: "Syed Muhammad Wasique Rizvi",
    shortName: "Wasique Rizvi",
    role: "Co-Founder & Full Stack Developer",
    bio: "Systems architect specializing in scalable full-stack web engines, high-performance React/Next.js frontend systems, and resilient cloud backend architectures.",
    tags: ["Systems Architecture", "Next.js & React 19", "Cloud APIs", "Database Design"],
    color: "var(--accent-cyan)",
    glowColor: "rgba(0, 243, 255, 0.25)",
    github: "https://github.com/syedwasique",
    githubUser: "syedwasique",
    linkedin: "https://linkedin.com/in/wasique-rizvi-00ba86182/",
    status: "SYSTEM_ONLINE // ARCHITECT"
  },
  {
    id: "faisal-siddique",
    code: "NODE_02 // MFS",
    legalName: "Muhammad Faisal Siddique",
    shortName: "Faisal Siddique",
    role: "Co-Founder & Full Stack Developer",
    bio: "Full-stack engineer and digital product architect focused on high-conversion UI/UX design systems, mobile applications, and interactive web experiences.",
    tags: ["Full Stack Engineering", "UI/UX Design Systems", "Mobile & Web Apps", "Motion Dynamics"],
    color: "var(--accent-pink)",
    glowColor: "rgba(255, 0, 127, 0.25)",
    github: "https://github.com/FaisalSidd123",
    githubUser: "FaisalSidd123",
    linkedin: "https://www.linkedin.com/in/muhammad-faisal-74baa5297/",
    status: "SYSTEM_ONLINE // LEAD_DEV"
  }
];

const featuredRepos = [
  {
    name: "Portfolio_Org",
    owner: "FaisalSidd123",
    url: "https://github.com/FaisalSidd123/Portfolio_Org",
    desc: "F&W GLLITCH Official Web Platform Engine (React 19 + Three.js + GSAP)"
  },
  {
    name: "Anonymous",
    owner: "FaisalSidd123",
    url: "https://github.com/FaisalSidd123/Anonymous",
    desc: "Full-Stack Anonymous Messaging Platform with NVIDIA NIM AI"
  },
  {
    name: "Real_State",
    owner: "FaisalSidd123",
    url: "https://github.com/FaisalSidd123/Real_State",
    desc: "UrbanEdge Editorial Real Estate Showcase Architecture"
  },
  {
    name: "syedwasique",
    owner: "syedwasique",
    url: "https://github.com/syedwasique",
    desc: "Wasique Rizvi Engineering Gateway & Repositories"
  }
];

export default function Team() {
  const [hoveredFounder, setHoveredFounder] = useState(null);

  return (
    <section
      id="team"
      className="section-padding"
      style={{
        background: "transparent",
        borderBottom: "1px solid var(--border-color)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--accent-cyan)",
              fontSize: "0.85rem",
              letterSpacing: "0.2em",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <Terminal size={14} />
            {"// LEADERSHIP & ARCHITECTS"}
          </span>
          <h2
            style={{
              fontSize: "3.2rem",
              fontWeight: "950",
              textTransform: "uppercase",
              letterSpacing: "-0.04em",
              margin: "0.8rem 0 0.5rem",
              color: "#fff"
            }}
          >
            FOUNDING TEAM.
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              maxWidth: "620px",
              margin: "0 auto",
              lineHeight: 1.6
            }}
          >
            The software engineers, system designers, and founders driving digital transformation and high-performance product execution at F&W GLLITCH.
          </p>
        </div>

        {/* Founders Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3.5rem"
          }}
        >
          {founders.map((person) => {
            const isHovered = hoveredFounder === person.id;
            return (
              <motion.div
                key={person.id}
                onMouseEnter={() => setHoveredFounder(person.id)}
                onMouseLeave={() => setHoveredFounder(null)}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${isHovered ? person.color : "var(--border-color)"}`,
                  borderRadius: "14px",
                  padding: "2.5rem",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: isHovered
                    ? `0 20px 40px rgba(0,0,0,0.7), 0 0 25px ${person.glowColor}`
                    : "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "border-color 0.35s ease, box-shadow 0.35s ease",
                  overflow: "hidden"
                }}
              >
                {/* Cyber corner accents */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "40px",
                    height: "40px",
                    borderTop: `2px solid ${person.color}`,
                    borderRight: `2px solid ${person.color}`,
                    opacity: isHovered ? 1 : 0.4,
                    transition: "opacity 0.3s ease"
                  }}
                />

                {/* Top Meta Bar */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1.5rem"
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: person.color,
                        letterSpacing: "0.08em"
                      }}
                    >
                      {person.code}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "#a0a0b5",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid var(--border-color)",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px"
                      }}
                    >
                      {person.status}
                    </span>
                  </div>

                  {/* Legal Name & Known-As Title */}
                  <h3
                    style={{
                      fontSize: "1.65rem",
                      fontWeight: "900",
                      color: "#ffffff",
                      marginBottom: "0.35rem",
                      letterSpacing: "-0.02em"
                    }}
                  >
                    {person.legalName}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "1rem"
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)"
                      }}
                    >
                      Known as:
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.85rem",
                        color: "#fff",
                        fontWeight: "700",
                        background: "rgba(255,255,255,0.06)",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "4px"
                      }}
                    >
                      {person.shortName}
                    </span>
                  </div>

                  {/* Role */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      color: person.color,
                      marginBottom: "1.2rem",
                      fontWeight: 600
                    }}
                  >
                    <ShieldCheck size={16} />
                    <span>{person.role}</span>
                  </div>

                  {/* Bio */}
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.95rem",
                      lineHeight: "1.65",
                      marginBottom: "1.5rem"
                    }}
                  >
                    {person.bio}
                  </p>

                  {/* Tech stack badges */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.45rem",
                      marginBottom: "2rem"
                    }}
                  >
                    {person.tags.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid var(--border-color)",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "4px",
                          color: "var(--text-primary)"
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Founder Outbound Verified Channels */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                    paddingTop: "1.5rem"
                  }}
                >
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "0.65rem 1rem",
                      background: "rgba(10, 102, 194, 0.12)",
                      border: "1px solid rgba(10, 102, 194, 0.4)",
                      borderRadius: "6px",
                      color: "#60a5fa",
                      textDecoration: "none",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      letterSpacing: "0.02em",
                      transition: "all 0.25s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(10, 102, 194, 0.25)";
                      e.currentTarget.style.borderColor = "#60a5fa";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(10, 102, 194, 0.12)";
                      e.currentTarget.style.borderColor = "rgba(10, 102, 194, 0.4)";
                    }}
                  >
                    <LinkedinIcon size={16} />
                    <span>LINKEDIN</span>
                    <ExternalLink size={13} />
                  </a>

                  <a
                    href={person.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "0.65rem 1rem",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "6px",
                      color: "#fff",
                      textDecoration: "none",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      letterSpacing: "0.02em",
                      transition: "all 0.25s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.borderColor = person.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                      e.currentTarget.style.borderColor = "var(--border-color)";
                    }}
                  >
                    <GithubIcon size={16} />
                    <span>GITHUB</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cross-linking Entity Banner: Project Repositories */}
        <div
          style={{
            background: "rgba(18, 18, 23, 0.8)",
            border: "1px solid var(--border-color)",
            borderRadius: "12px",
            padding: "1.8rem 2rem",
            position: "relative"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "1.2rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <GitBranch size={18} color="var(--accent-cyan)" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  color: "#fff",
                  fontWeight: "bold",
                  letterSpacing: "0.04em"
                }}
              >
                PUBLIC LABS &amp; VERIFIED REPOSITORIES
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--text-secondary)"
              }}
            >
              CRAWLABLE REPO HUBS // SYED WASIQUE RIZVI &amp; FAISAL SIDDIQUE
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1rem"
            }}
          >
            {featuredRepos.map((repo, idx) => (
              <a
                key={idx}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  background: "rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "8px",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "border-color 0.25s ease, transform 0.25s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-cyan)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Code2 size={15} color="var(--accent-cyan)" />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "#fff", fontWeight: "700" }}>
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink size={13} color="var(--text-secondary)" />
                </div>
                <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: "1.4", margin: 0 }}>
                  {repo.desc}
                </p>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent-pink)", marginTop: "0.6rem" }}>
                  @{repo.owner}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
