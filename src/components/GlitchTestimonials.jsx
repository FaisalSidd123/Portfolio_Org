import { ClientsSection } from "./ui/testimonial-card";

const statsData = [
  { value: "100+", label: "Happy clients" },
  { value: "$250M+", label: "Revenue added" },
  { value: "4.9★", label: "Average Rating" },
];

const testimonialsData = [
  {
    name: "Sarah Conner",
    title: "CTO, NEOMESH CORP",
    quote: "F&W GLLITCH completely overhauled our digital experience. Their horizontal layout design is stunning, and our load speed decreased by 60%. Absolutely flawless execution.",
    avatarSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=60",
    rating: 5.0,
  },
  {
    name: "Marcus Vance",
    title: "DESIGN DIRECTOR, KINETIC GRID",
    quote: "The circuit board visual mapping of our services section was incredible. Clients were blown away. The visual design matches their technical execution perfectly.",
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=60",
    rating: 4.9,
  },
  {
    name: "Elena Rostova",
    title: "FOUNDER, AETHER STUDIOS",
    quote: "Zero friction, hyper responsive communication, and state-of-the-art aesthetics. If you want a basic website, look elsewhere. If you want to stand out, hire F&W.",
    avatarSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=60",
    rating: 5.0,
  },
  {
    name: "Will Smith",
    title: "HARPER EDUCATION",
    quote: "Collaborating on this project was seamless. The vision was clearly understood, and the designs genuinely reflect my brand identity.",
    avatarSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=900&auto=format&fit=crop&q=60",
    rating: 4.8,
  }
];

export default function GlitchTestimonials() {
  return (
    <ClientsSection
      tagLabel="Client Testimonials"
      title="Clients Love Us"
      description="Trusted by 100+ happy clients, adding $250M+ in revenue with futuristic engineering and sleek aesthetic design."
      stats={statsData}
      testimonials={testimonialsData}
      primaryActionLabel="Contact Now"
      secondaryActionLabel="See All Projects"
    />
  );
}
