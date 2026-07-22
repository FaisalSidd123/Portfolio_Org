import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FlippingCard } from "./ui/flipping-card";

// ============================================================
// Project Database
// ============================================================
const projectsData = [
  {
    id: 1,
    title: "QuranVision",
    subtitle: "Islamic Knowledge Platform",
    image: "/QuranVision.PNG",
    description: "A comprehensive digital platform bringing Islamic knowledge to users worldwide with modern technology and intuitive design.",
    detailedDescription: [
      "QuranVision is a feature-rich web application providing seamless access to Quranic verses with multiple translations, tafsir (exegesis), and audio recitations. The platform includes an extensive Hadith library with detailed explanations and scholarly commentary.",
      "The application implements role-based authentication with Google Sign-In, allowing users to save their favorite verses and hadiths to personalized collections. Registered users gain access to premium features including an integrated e-commerce system for purchasing Islamic books and subscription plans.",
      "The admin dashboard provides comprehensive analytics on user activity, purchases, and content engagement, enabling administrators to manage content, plans, and user accounts efficiently."
    ],
    features: [
      "Complete Quran with 10+ translations and tafsir sources",
      "Hadith collection from Sahih Bukhari, Muslim and other authentic books",
      "Audio recitations by multiple Qaris with synchronized highlighting",
      "User collections with tagging and categorization",
      "E-commerce system for books and subscription plans",
      "Google authentication with role-based access control",
      "Admin dashboard with user analytics and content management",
      "Responsive design with mobile-first approach"
    ],
    tags: ["React", "Next.js", "Firebase", "E-commerce"],
    liveLink: "#",
    githubUrl: "https://github.com",
    category: "APP",
    color: "#5227ff",
    gradient: "linear-gradient(135deg, #5227ff 0%, #bd00ff 100%)",
    sliceOffsets: [8, -6, 7, -5, 4],
    client: "QuranVision Team",
    year: "2026",
    scope: "Full-Stack Web App Development",
    metrics: "> active_users: 5k+ // collections_created: 12k+"
  },
  {
    id: 2,
    title: "DreamFragrance",
    subtitle: "E-commerce Perfume Store",
    image: "/DreamFragrance.jpg",
    description: "An elegant e-commerce platform for perfumes with smooth animations, modern design, admin portal, and all essential online shopping features.",
    detailedDescription: [
      "DreamFragrance is a visually captivating perfume e-commerce website designed with a focus on luxury aesthetics and a delightful user experience. The homepage features engaging animations, smooth transitions, and an intuitive navigation flow to immerse visitors in the shopping experience.",
      "The platform provides a full-fledged e-commerce system with product listings, detailed product pages, user profiles, shopping cart, and order history. Customers can securely sign up, log in via Firebase authentication, and manage their accounts effortlessly.",
      "An admin portal is integrated for managing products and orders. Admins can oversee available perfumes, track inventory, and process customer orders efficiently, ensuring smooth store operations.",
      "PostgreSQL is used for structured product, order, and user data management, while Firebase ensures seamless and secure authentication."
    ],
    features: [
      "Visually stunning homepage with exciting animations and smooth transitions",
      "Store component showcasing perfumes with filtering and sorting options",
      "Detailed product pages with descriptions, images, and reviews",
      "Shopping cart, secure checkout, and order management",
      "Firebase authentication with secure sign-in and sign-up",
      "PostgreSQL database for products, users, and orders",
      "Deal page highlighting promotions and exclusive offers",
      "Admin portal for managing products and orders",
      "Fully responsive, optimized for mobile devices"
    ],
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Firebase", "E-commerce", "Animations", "Admin Portal"],
    liveLink: "#",
    githubUrl: "https://github.com",
    category: "WEB",
    color: "#00ff9d",
    gradient: "linear-gradient(135deg, #00ff9d 0%, #00f3ff 100%)",
    sliceOffsets: [-6, 8, -4, 6, -5],
    client: "DreamFragrance Ltd",
    year: "2025",
    scope: "E-Commerce & DB Administration",
    metrics: "> online_sales: +140% // cart_conversion: 4.8%"
  },
  {
    id: 3,
    title: "SoleHub",
    subtitle: "E-commerce Shoes Store",
    image: "/SoleHub.jpg",
    description: "A stylish e-commerce platform for shoes with a modern interface, smooth shopping experience, and essential online store features.",
    detailedDescription: [
      "SoleHub is a sleek and modern e-commerce website dedicated to footwear, built with a focus on performance, responsiveness, and an engaging user experience. The homepage highlights trending shoes and collections with visually appealing layouts and smooth transitions.",
      "The platform includes all core e-commerce features: product listings, detailed product pages with images and specifications, a shopping cart, secure checkout, and order tracking. Customers can create accounts, manage their profiles, and access order history easily.",
      "PostgreSQL is used as the database for managing products, user accounts, and orders, ensuring reliability and scalability."
    ],
    features: [
      "Modern and responsive homepage highlighting trending shoe collections",
      "Store component showcasing shoes with filtering and sorting options",
      "Detailed product pages with specifications, multiple images, and reviews",
      "Shopping cart, secure checkout, and order tracking",
      "User profile with order history and account details",
      "PostgreSQL database for structured product, user, and order data"
    ],
    tags: ["React", "Node.js", "Express", "PostgreSQL", "E-commerce"],
    liveLink: "#",
    githubUrl: "https://github.com",
    category: "WEB",
    color: "#00f3ff",
    gradient: "linear-gradient(135deg, #00f3ff 0%, #5227ff 100%)",
    sliceOffsets: [-8, 7, -6, 8, -5],
    client: "SoleHub Retail",
    year: "2025",
    scope: "Frontend & REST APIs development",
    metrics: "> response_time: 45ms // cart_abandonment: -15%"
  },
  {
    id: 4,
    title: "Anonymous",
    subtitle: "Anonymous Messaging Platform",
    image: "/Anonymous.png",
    description: "A full-stack anonymous messaging platform where users receive messages through a unique shareable link with AI-powered message suggestions.",
    detailedDescription: [
      "AnonMsg is a full-stack anonymous messaging web application built with Next.js and MongoDB, where users can receive anonymous messages through a unique personalized shareable link. The platform focuses on privacy, security, and an engaging user experience.",
      "The authentication system is built using NextAuth.js with JWT-based signup and login, ensuring secure access to user accounts. Zod is used for robust input validation throughout the application, while Resend handles email services for account verification.",
      "The user dashboard allows users to view all received anonymous messages, toggle whether they want to accept new messages, and easily share their unique message link. AI-powered message suggestions are integrated using NVIDIA NIM (LLaMA 3.1), providing dynamic question prompts."
    ],
    features: [
      "Unique shareable link for each user to receive anonymous messages",
      "AI-powered message suggestions using NVIDIA NIM (LLaMA 3.1)",
      "JWT-based secure authentication using NextAuth.js",
      "Input validation with Zod for reliable data handling",
      "Email verification and notifications via Resend",
      "User dashboard to manage and view anonymous messages",
      "Toggle to enable or disable incoming message acceptance"
    ],
    tags: ["Next.js", "MongoDB", "NextAuth.js", "Zod", "Resend", "NVIDIA NIM", "Tailwind CSS"],
    liveLink: "#",
    githubUrl: "https://github.com/FaisalSidd123/Anonymous",
    category: "APP",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #6366f1 0%, #5227ff 100%)",
    sliceOffsets: [8, -7, 6, -6, 5],
    client: "Anon Network Group",
    year: "2026",
    scope: "NextJS 14 App Router & JWT Security",
    metrics: "> anonymous_messages: 50k+ // nim_ai_latency: 90ms"
  },
  {
    id: 5,
    title: "Opti-Manage",
    subtitle: "Brand Management Platform",
    image: "/OptiManage.PNG",
    description: "A professional brand website showcasing digital marketing and influencer management services.",
    detailedDescription: [
      "Opti-Manage is a sleek, modern brand website designed to showcase the company's expertise in influencer management, sports marketing, and digital brand strategy. The platform highlights the company's services, values, and success stories through an engaging user interface.",
      "The website features a clean, performance-optimized design with smooth animations and responsive layouts. Key sections include service offerings, client testimonials, case studies, and a contact management system for lead generation."
    ],
    features: [
      "Service showcase with interactive elements",
      "Company values and mission presentation",
      "Responsive design with mobile optimization",
      "Contact form with automated responses",
      "Performance-optimized assets and loading",
      "SEO-optimized content structure"
    ],
    tags: ["React", "UI/UX", "Responsive Design"],
    liveLink: "#",
    githubUrl: "https://github.com",
    category: "DESIGN",
    color: "#7cff67",
    gradient: "linear-gradient(135deg, #7cff67 0%, #10b981 100%)",
    sliceOffsets: [-8, 6, -5, 8, -4],
    client: "OptiManage Corp",
    year: "2025",
    scope: "Design System & Frontend Development",
    metrics: "> brand_presence: 100% // load_speed: 0.6s"
  },
  {
    id: 6,
    title: "MYP (Manage Your Priorities)",
    subtitle: "Contact & Client Management System",
    image: "/MYP.png",
    description: "A full-stack contact & client management system featuring an AI-based contact parser using LLaMA 3.1.",
    detailedDescription: [
      "MYP is a full-stack contact & client management system built using Next.js, Supabase, and Tailwind CSS. The application implements secure JWT-based authentication and role-based access for robust operations.",
      "It incorporates an advanced AI-based contact parser using LLaMA 3.1 (meta/llama-3.1-8b-instruct) to translate unstructured text records into cleanly formatted database values.",
      "Developed with a feature-rich workspace dashboard containing contact tracking, visual Kanban task management, appointment scheduling, and real-time WebSocket notifications."
    ],
    features: [
      "AI-based contact parsing using LLaMA 3.1 models",
      "Full-stack client management dashboard with task logs",
      "Visual Kanban workflow board for tracking projects",
      "Secure JWT-based authentication and role-based access",
      "Real-time notifications and task scheduling"
    ],
    tags: ["Next.js", "Supabase", "LLaMA 3.1", "CRM", "Kanban"],
    liveLink: "#",
    githubUrl: "https://github.com",
    category: "APP",
    color: "#ff007f",
    gradient: "linear-gradient(135deg, #ff007f 0%, #bd00ff 100%)",
    sliceOffsets: [-5, 8, -6, 7, -4],
    client: "Priority Labs",
    year: "2026",
    scope: "AI Integrations & Full-Stack Development",
    metrics: "> ai_parser_accuracy: 98% // db_latency: 8ms"
  },
  {
    id: 7,
    title: "UrbanEdge",
    subtitle: "Editorial Real Estate Showcase",
    image: "/Urban Edge.png",
    description: "A premium real estate showcase website highlighting luxury property galleries, agency services, team profiles, and smooth motion layouts.",
    detailedDescription: [
      "UrbanEdge is an editorial real estate web portal designed to showcase high-end architecture and luxury properties with high-contrast visual design and smooth motion.",
      "The platform features core agency showcase sections including curated property image galleries, company services, dedicated team profiles, client testimonials, and interactive contact channels."
    ],
    features: [
      "Elite property listings showcase with high-res galleries",
      "Corporate services & architectural offerings overview",
      "Dedicated agency team & leadership profiles",
      "Interactive contact inquiry forms & company info",
      "Smooth scroll integration with Lenis scrolling & GSAP animations"
    ],
    tags: ["React", "Tailwind CSS", "Lenis", "GSAP", "Framer Motion"],
    liveLink: "#",
    githubUrl: "https://github.com/FaisalSidd123/Real_State",
    category: "WEB",
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #ec4899 0%, #ff007f 100%)",
    sliceOffsets: [-7, 8, -5, 6, -4],
    client: "UrbanEdge Properties",
    year: "2026",
    scope: "Lenis Smooth Motion & Tailwind Layouts",
    metrics: "> property_views: +310% // scroll_smoothness: 60fps"
  },
  {
    id: 8,
    title: "AutoVault – Car Inventory System",
    subtitle: "Dealership Operations & Public Portal",
    image: "/CMS.png",
    description: "A comprehensive car inventory management system featuring a public vehicle showroom and customer portal alongside a full-featured Dealership Operations Dashboard.",
    detailedDescription: [
      "AutoVault combines a customer-facing public showcase website with a powerful Dealership Operations Admin Dashboard. The public site enables clients to browse available vehicle stock, inspect detailed specs, read customer reviews, and submit inquiries.",
      "The admin portal provides dealership administrators with comprehensive operational tools: adding and managing car inventory, tracking purchases and reservations, handling payment allocations & escrow settlements, managing client records, assigning dedicated sales agents to clients, generating invoices for reservations, and storing car-related legal & registration documentation.",
      "Features a real-time Dealership Operations Dashboard with key business metrics including total sales value, dealer net profit, active holds, agent performance leaderboards, and a unified platform activity feed."
    ],
    features: [
      "Public Showroom: Browse vehicle inventory, view specs & customer reviews, submit inquiries",
      "Inventory Management: Add, update, and manage vehicle stock listings with photos & specs",
      "Purchases & Reservations: Track vehicle holds, purchase requests, and booking statuses",
      "Payment Allocations: Handle, record, and store payment allocations & escrow settlements",
      "Client & Agent Management: Manage client profiles and assign sales agents to clients",
      "Invoice Generator: Automated invoice generation for vehicle holds & completed reservations",
      "Document Management: Upload, store, and manage car-related documents & titles",
      "Operations Dashboard: Net profit figures, active holds counter, agent leaderboards, and activity feeds"
    ],
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Dashboard", "Admin Portal", "Financial Tracking"],
    liveLink: "#",
    githubUrl: "https://github.com",
    category: "APP",
    color: "#38bdf8",
    gradient: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
    sliceOffsets: [7, -4, 6, -7, 5],
    client: "Automotive Dealership Network",
    year: "2026",
    scope: "Full-Stack Dealership CMS & Showroom",
    metrics: "> inventory_managed: 500+ // deal_throughput: +185%"
  },

  {
    id: 9,
    title: "Simon Game",
    subtitle: "Classic Memory Challenge",
    image: "/Simon Game.png",
    description: "An interactive browser-based version of the classic Simon memory game. Players must repeat increasingly complex sequences of colors and sounds.",
    detailedDescription: [
      "Simon Game is a sleek, browser-native memory challenge utilizing semantic HTML elements, custom CSS variables, and raw JavaScript DOM event loops.",
      "Features interactive keypress listeners, synthesised retro sound effects, score tracking, and automated failure checking."
    ],
    features: [
      "Automated pattern sequence generation",
      "Synchronized color flashing and synthesized sound plays",
      "Best score local persistence tracking",
      "Strict pattern repetition validator"
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "DOM Manipulation"],
    liveLink: "https://github.com/FaisalSidd123/Simon-Game",
    githubUrl: "https://github.com/FaisalSidd123/Simon-Game",
    category: "DESIGN",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ff007f 100%)",
    sliceOffsets: [-6, 7, -5, 6, -4],
    client: "Simon Memory Games",
    year: "2024",
    scope: "Audio Synthesis & Memory Game Mechanics",
    metrics: "> user_engagement: 15m avg // audio_sync: 100%"
  }
];

// ============================================================
// GlitchText — scrambles from noise into the real string
// ============================================================
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#01ΔΞΨЖ01アイウエオ";

function GlitchText({ text, active, duration = 500, style, as: Tag = "span" }) {
  const [display, setDisplay] = useState(active ? "" : text);

  useEffect(() => {
    if (!active) {
      const t = setTimeout(() => setDisplay(text), 0);
      return () => clearTimeout(t);
    }
    let frame = 0;
    const totalFrames = Math.max(6, Math.floor(duration / 28));
    const id = setInterval(() => {
      frame++;
      const revealCount = Math.floor((frame / totalFrames) * text.length);
      setDisplay(
        text
          .split("")
          .map((c, i) => {
            if (c === " ") return " ";
            if (i < revealCount) return c;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(id);
      }
    }, 28);
    return () => clearInterval(id);
  }, [active, text, duration]);

  return <Tag style={style}>{display}</Tag>;
}

// ============================================================
// DecryptSequence — full-screen "breach" transition played
// between clicking a fractured card and the case study opening
// ============================================================
function DecryptSequence({ project, onComplete, mode = "open" }) {
  const [progress, setProgress] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const turbRef = useRef(null);
  const duration = mode === "open" ? 900 : 380;

  const openLines = [
    `> locating FILE//${String(project.id).padStart(3, "0")}...`,
    `> target: ${project.title.toUpperCase()}`,
    `> bypassing fracture lock...`,
    `> reassembling slices...`,
    `> access granted_`
  ];
  const closeLines = [`> re-fracturing FILE//${String(project.id).padStart(3, "0")}...`];
  const lines = mode === "open" ? openLines : closeLines;

  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      setLineCount(Math.min(lines.length, Math.floor((elapsed / duration) * lines.length) + 1));
      if (turbRef.current) {
        turbRef.current.setAttribute("seed", String(Math.floor(Math.random() * 100)));
      }
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        onComplete();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10001,
        background: "#000",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* SVG static/noise filter, seed re-rolled every frame */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="decrypt-static">
          <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0" />
        </filter>
      </svg>
      <div
        className="glitch-shake"
        style={{
          position: "absolute",
          inset: 0,
          filter: "url(#decrypt-static)",
          mixBlendMode: "screen",
          opacity: 0.55,
          pointerEvents: "none"
        }}
      />

      {/* scanline sweep */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "120px",
          background: `linear-gradient(180deg, transparent 0%, ${project.color}22 45%, ${project.color}66 50%, ${project.color}22 55%, transparent 100%)`,
          animation: `scan-sweep ${duration}ms linear`,
          pointerEvents: "none"
        }}
      />

      {/* color-split project glyph */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 950,
            fontSize: "5rem",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "#fff",
            position: "relative",
            textShadow: `2.5px 0 ${project.color}, -2.5px 0 var(--accent-cyan)`,
            animation: "rgb-jitter 90ms infinite"
          }}
        >
          {project.title.substring(0, 2).toUpperCase()}
        </div>

        <div
          style={{
            marginTop: "1.5rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: project.color,
            minHeight: mode === "open" ? "6.5em" : "1.5em",
            textAlign: "left",
            width: "min(90vw, 380px)"
          }}
        >
          {lines.slice(0, lineCount).map((l, i) => (
            <div key={i} style={{ marginBottom: "0.35em", opacity: i === lineCount - 1 ? 1 : 0.5 }}>
              {l}
              {i === lineCount - 1 ? <span className="cursor-blink">▌</span> : null}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "1rem",
            width: "min(90vw, 380px)",
            height: "3px",
            background: "rgba(255,255,255,0.08)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${progress}%`,
              background: project.color,
              boxShadow: `0 0 8px ${project.color}`
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// Flipping Card Front & Back Sub-components
// ============================================================
function ProjectCardFront({ project }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "1.2rem",
        justifyContent: "space-between",
        textAlign: "left",
        background: "var(--bg-card)",
        borderRadius: "inherit",
        boxSizing: "border-box"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: project.color, fontWeight: "bold" }}>
          // {project.category}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-secondary)" }}>
          FILE//{String(project.id).padStart(3, "0")}
        </span>
      </div>

      <div
        style={{
          height: "145px",
          width: "100%",
          borderRadius: "8px",
          backgroundImage: `url("${encodeURI(project.image)}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          margin: "0.8rem 0",
          border: "1px solid rgba(255,255,255,0.1)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 100%)" }} />
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "8px",
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(4px)",
            padding: "2px 8px",
            borderRadius: "4px",
            border: `1px solid ${project.color}55`,
            color: project.color,
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            fontWeight: "bold"
          }}
        >
          {project.subtitle}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: "1.15rem", fontWeight: "900", color: "#fff", marginBottom: "0.4rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.45", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {project.description}
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.6rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.6rem" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-secondary)" }}>
          HOVER CARD TO ROTATE 🔄
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: project.color, fontWeight: "bold" }}>
          [ REVEAL ]
        </span>
      </div>
    </div>
  );
}

function ProjectCardBack({ project, onOpenModal }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "1.3rem",
        justifyContent: "space-between",
        textAlign: "left",
        background: "#0a0a10",
        borderRadius: "inherit",
        boxSizing: "border-box"
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: project.color, fontWeight: "bold" }}>
            PROJECT_OVERVIEW
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-secondary)" }}>
            {project.year}
          </span>
        </div>

        <p style={{ fontSize: "0.82rem", color: "#d1d5db", lineHeight: "1.45", marginBottom: "0.8rem" }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.8rem" }}>
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                padding: "2px 8px",
                borderRadius: "4px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--text-secondary)"
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)", padding: "0.5rem 0.8rem", borderRadius: "6px", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: project.color, marginBottom: "0.8rem" }}>
          {project.metrics}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(project);
          }}
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            background: project.color,
            color: "#000",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            fontWeight: "900",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            letterSpacing: "0.05em",
            boxShadow: `0 0 15px ${project.color}44`,
            transition: "transform 0.2s ease, filter 0.2s ease"
          }}
        >
          <span>VIEW PORTFOLIO CASE STUDY</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Main
// ============================================================
export default function WorkMasonry() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedId, setSelectedId] = useState(null);
  const [decryptId, setDecryptId] = useState(null); // playing the open sequence
  const [encryptId, setEncryptId] = useState(null); // playing the close sequence
  const [modalRevealed, setModalRevealed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (e) => setReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const decryptProject = projectsData.find((p) => p.id === decryptId);
  const encryptProject = projectsData.find((p) => p.id === encryptId);
  const activeProject = projectsData.find((p) => p.id === selectedId);

  const handleSelect = useCallback((project) => {
    if (reducedMotion) {
      setSelectedId(project.id);
      setModalRevealed(true);
      return;
    }
    setDecryptId(project.id);
  }, [reducedMotion]);

  const handleDecryptComplete = useCallback(() => {
    setSelectedId(decryptId);
    setDecryptId(null);
    setModalRevealed(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setModalRevealed(true)));
  }, [decryptId]);

  const handleClose = useCallback(() => {
    if (reducedMotion) {
      setSelectedId(null);
      return;
    }
    setEncryptId(selectedId);
    setModalRevealed(false);
    setSelectedId(null);
  }, [selectedId, reducedMotion]);

  const handleEncryptComplete = useCallback(() => {
    setEncryptId(null);
  }, []);

  return (
    <section
      className="section-padding"
      style={{ background: "transparent", borderBottom: "1px solid var(--border-color)", position: "relative", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-pink)", fontSize: "0.85rem", letterSpacing: "0.2em" }}>
            {"// PORTFOLIO ARCHIVE"}
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
          >
            SELECTED WORKS.
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid var(--border-color)",
            padding: "0.4rem",
            borderRadius: "8px",
            width: "max-content",
            margin: "0 auto 3.5rem",
            gap: "0.5rem"
          }}
        >
          {["ALL", "WEB", "APP", "DESIGN"].map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  background: isActive ? "var(--accent-pink)" : "transparent",
                  color: isActive ? "#000" : "var(--text-secondary)",
                  border: "none",
                  padding: "0.5rem 1.5rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  borderRadius: "6px",
                  transition: "all 0.25s ease-out"
                }}
              >
                [{cat}]
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
            gap: "2.5rem",
            width: "100%",
            justifyItems: "center"
          }}
        >
          <AnimatePresence mode="popLayout">
            {projectsData
              .filter((p) => activeFilter === "ALL" || p.category === activeFilter)
              .map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  style={{ width: "100%", display: "flex", justifyContent: "center" }}
                >
                  <FlippingCard
                    width="100%"
                    height={380}
                    frontContent={<ProjectCardFront project={project} />}
                    backContent={<ProjectCardBack project={project} onOpenModal={handleSelect} />}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Decrypt-in breach sequence */}
      <AnimatePresence>
        {decryptProject && <DecryptSequence key="open" project={decryptProject} mode="open" onComplete={handleDecryptComplete} />}
      </AnimatePresence>

      {/* Decrypt-out (re-fracture) breach sequence */}
      <AnimatePresence>
        {encryptProject && <DecryptSequence key="close" project={encryptProject} mode="close" onComplete={handleEncryptComplete} />}
      </AnimatePresence>

      {/* Case Study Detailed View */}
      <AnimatePresence>
        {selectedId && activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            data-lenis-prevent="true"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.98)",
              backdropFilter: "blur(20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10000,
              padding: "2rem"
            }}
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
              animate={
                modalRevealed
                  ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, scale: 0.94, filter: "blur(6px)" }
              }
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              data-lenis-prevent="true"
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${activeProject.color}55`,
                borderRadius: "16px",
                width: "100%",
                maxWidth: "820px",
                maxHeight: "85vh",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                padding: "3.5rem 2.5rem",
                position: "relative",
                boxShadow: `0 30px 60px rgba(0,0,0,0.8), 0 0 40px ${activeProject.color}33`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  background: "transparent",
                  border: "1px solid var(--border-color)",
                  color: "var(--accent-pink)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                className="glitch-hover"
              >
                [ESC] BACK_TO_ARCHIVE
              </button>

              <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                <div style={{ textAlign: "left" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: activeProject.color, letterSpacing: "0.1em" }}>
                    {"// COMPLETED_MODULE_" + activeProject.category}
                  </span>
                  <h3 style={{ fontSize: "2rem", fontWeight: "950", color: "#fff", marginTop: "0.5rem" }}>
                    <GlitchText text={activeProject.title} active={modalRevealed} duration={550} />
                  </h3>
                </div>

                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: modalRevealed ? 1 : 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  style={{
                    height: "220px",
                    width: "100%",
                    backgroundImage: `url("${encodeURI(activeProject.image)}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "8px",
                    position: "relative",
                    overflow: "hidden",
                    transformOrigin: "top"
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.85))" }} />
                </motion.div>

                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "2rem" }} className="modal-content-grid">
                  <div style={{ textAlign: "left" }}>
                    <h4 style={{ color: "#fff", marginBottom: "0.5rem", fontSize: "1.1rem" }}>Project Overview</h4>
                    {activeProject.detailedDescription ? (
                      activeProject.detailedDescription.map((para, idx) => (
                        <p key={idx} style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1rem" }}>
                          {para}
                        </p>
                      ))
                    ) : (
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6" }}>{activeProject.description}</p>
                    )}

                    {activeProject.features && activeProject.features.length > 0 && (
                      <div style={{ marginTop: "1.5rem" }}>
                        <h5 style={{ color: "#fff", fontSize: "0.85rem", fontFamily: "var(--font-mono)", marginBottom: "0.5rem" }}>KEY_FEATURES:</h5>
                        <ul style={{ color: "var(--text-secondary)", fontSize: "0.9rem", paddingLeft: "1.2rem", margin: 0, listStyleType: "square" }}>
                          {activeProject.features.map((feat, idx) => (
                            <li key={idx} style={{ marginBottom: "0.4rem" }}>
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div style={{ marginTop: "1.5rem" }}>
                      <h5 style={{ color: "#fff", fontSize: "0.85rem", fontFamily: "var(--font-mono)", marginBottom: "0.5rem" }}>TECHNOLOGIES_USED:</h5>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {(activeProject.tags || activeProject.technologies || []).map((tech) => (
                          <span
                            key={tech}
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.75rem",
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid var(--border-color)",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "4px",
                              color: "var(--text-primary)"
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "1.2rem", borderRadius: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Client</span>
                      <span style={{ fontSize: "0.8rem", color: "#fff", fontWeight: "bold" }}>{activeProject.client}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Scope</span>
                      <span style={{ fontSize: "0.8rem", color: "#fff", fontWeight: "bold", textAlign: "right" }}>{activeProject.scope}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Year</span>
                      <span style={{ fontSize: "0.8rem", color: "#fff", fontWeight: "bold" }}>{activeProject.year}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", margin: "1rem 0" }}>
                  <div style={{ height: "16px", background: activeProject.gradient, opacity: 0.12, width: "100%", transform: "translate3d(-10px, 0, 0)", borderRadius: "4px" }} />
                  <div style={{ height: "16px", background: activeProject.gradient, opacity: 0.22, width: "100%", transform: "translate3d(15px, 0, 0)", borderRadius: "4px" }} />
                  <div style={{ height: "16px", background: activeProject.gradient, opacity: 0.12, width: "100%", transform: "translate3d(-5px, 0, 0)", borderRadius: "4px" }} />
                </div>

                <div
                  style={{
                    background: "#0a0a0d",
                    border: "1px solid var(--border-color)",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    textAlign: "left",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.95rem"
                  }}
                >
                  <span style={{ color: "var(--accent-pink)" }}>&gt; METRIC_DIAGNOSIS:</span>
                  <div style={{ color: "#fff", marginTop: "0.5rem", fontWeight: "bold" }}>{activeProject.metrics}</div>
                </div>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {activeProject.githubUrl && (
                    <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" style={btnStyle(activeProject.color, "#000")}>
                      <ExternalLink size={16} />
                      <span>LAUNCH REPO GATEWAY</span>
                    </a>
                  )}
                  {activeProject.liveLink && activeProject.liveLink !== "#" && (
                    <a href={activeProject.liveLink} target="_blank" rel="noopener noreferrer" style={btnStyle("var(--accent-cyan)", "#000")}>
                      <ExternalLink size={16} />
                      <span>LIVE APPLICATION</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes duplicate-ghost {
          0%, 85%, 100% { text-shadow: none; transform: skew(0deg); }
          5%, 15% { text-shadow: 3px 0 var(--accent-cyan), -3px 0 var(--accent-pink); transform: skew(-1deg); }
          20%, 80% { text-shadow: 1.5px 0 var(--accent-cyan), -1.5px 0 var(--accent-pink); transform: skew(0deg); }
        }
        @keyframes scan-sweep {
          0% { top: -10%; }
          100% { top: 100%; }
        }
        @keyframes rgb-jitter {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-1px, 0.5px); }
          50% { transform: translate(1px, -0.5px); }
          75% { transform: translate(-0.5px, -1px); }
        }
        .glitch-shake {
          animation: shake-noise 90ms steps(2) infinite;
        }
        @keyframes shake-noise {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-1px, 1px); }
        }
        .cursor-blink {
          animation: blink 0.8s steps(1) infinite;
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @media (max-width: 600px) {
          .modal-content-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .glitch-shake, .cursor-blink { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

const btnStyle = (bg, color) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  background: bg,
  color: color,
  fontFamily: "var(--font-mono)",
  fontSize: "0.85rem",
  fontWeight: "bold",
  padding: "0.8rem 1.5rem",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  textDecoration: "none"
});