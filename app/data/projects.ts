export type Project = {
  slug: string;
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  tags: string[];
  highlights: string[];
  stack: string[];
  size: "featured" | "side";
  accent: boolean;
  href: string;
  previewLabel: string;
  currentlyBuilding?: string;
};

export const projects: Project[] = [
  {
    slug: "streetbite",
    id: "01",
    title: "StreetBite",
    category: "Food Tech",
    year: "2024",
    description:
      "Street food discovery platform with location-based vendor search, vendor dashboards, and real-time menu management using Google Maps geolocation services.",
    longDescription:
      "StreetBite is a full-stack street food discovery platform built with a Next.js frontend and Spring Boot REST API. It focuses on vendor discovery, role-based access, location-aware browsing, and production-ready API design.",
    tags: ["Spring Boot", "Next.js", "MySQL", "Maps API"],
    highlights: [
      "Built a role-based platform for customers, vendors, and admins.",
      "Implemented Spring Boot REST APIs with authentication and documented endpoints.",
      "Integrated location-aware discovery and vendor-facing management workflows.",
    ],
    stack: ["Next.js", "TypeScript", "Spring Boot", "Java", "MySQL", "Firebase", "Google Maps"],
    size: "featured",
    accent: true,
    href: "https://streetbitego.vercel.app/",
    previewLabel: "Live vendor discovery flow",
    currentlyBuilding: "Vendor analytics, richer map filters, and cleaner mobile onboarding.",
  },
  {
    slug: "focus-arena",
    id: "02",
    title: "Focus Arena",
    category: ".NET Full Stack",
    year: "2025",
    description:
      "Real-time gamified productivity platform with live chat, leaderboards, and task mechanics. Features a comprehensive admin dashboard and mobile-first responsive design.",
    longDescription:
      "Focus Arena is a gamified productivity app built around real-time collaboration, guild mechanics, task progress, and live social features. The backend follows a layered ASP.NET Core architecture with SignalR-powered updates.",
    tags: ["ASP.NET Core 8", "SignalR", "React", "TypeScript"],
    highlights: [
      "Built real-time chat, notifications, leaderboards, and friend workflows with SignalR.",
      "Used JWT access and refresh token authentication for protected app flows.",
      "Structured the backend around clean architecture boundaries and Entity Framework Core.",
    ],
    stack: ["ASP.NET Core 8", "C#", "React", "TypeScript", "SignalR", "MySQL", "Docker"],
    size: "side",
    accent: false,
    href: "https://focusarenaa.vercel.app/dashboard",
    previewLabel: "Live productivity dashboard",
    currentlyBuilding: "Guild activity history, notification polish, and ranked productivity seasons.",
  },
  {
    slug: "scam-sentry",
    id: "03",
    title: "ScamSentry",
    category: "Community Platform",
    year: "2025",
    description:
      "Anonymous scam reporting system with interactive Mapbox heatmaps for visualizing scam locations. Features admin moderation dashboard and verified company directory.",
    longDescription:
      "ScamSentry is a community reporting platform for surfacing scam activity through anonymous reports, moderation workflows, and location-based heatmap visualization.",
    tags: ["Next.js", "Firebase", "Mapbox", "Tailwind"],
    highlights: [
      "Designed anonymous reporting flows for public scam submissions.",
      "Added map-based visualizations to make scam hotspots easier to understand.",
      "Built admin moderation and verified company directory features.",
    ],
    stack: ["Next.js", "Firebase", "Mapbox", "Tailwind CSS"],
    size: "side",
    accent: false,
    href: "https://scam-sentry.vercel.app/",
    previewLabel: "Live reporting map",
    currentlyBuilding: "Report credibility scoring and faster moderation queues.",
  },
  {
    slug: "planthesia",
    id: "04",
    title: "Planthesia",
    category: "Digital Studio",
    year: "2025",
    description:
      "A digital product studio platform focused on building cutting-edge web applications and highly interactive digital experiences using modern web technologies.",
    longDescription:
      "Planthesia is a digital studio web experience focused on interactive presentation, product positioning, and modern frontend craft using Next.js, TypeScript, and motion-driven UI.",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    highlights: [
      "Built a polished studio-facing web presence with a modern frontend stack.",
      "Used motion and responsive layouts to create a sharper brand experience.",
      "Focused on fast iteration, deployment, and production presentation quality.",
    ],
    stack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    size: "featured",
    accent: true,
    href: "https://planthesia.in",
    previewLabel: "Live studio landing page",
    currentlyBuilding: "Case-study pages, inquiry routing, and more polished motion states.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
