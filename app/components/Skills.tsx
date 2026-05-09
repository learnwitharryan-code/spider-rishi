"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SpiderWebBg from "./SpiderWebBg";

/* ─── Skills data — narrative order: Code → UI → Server → Data → Patterns → Ops → Tools ─── */
const skills: {
  id: string;
  category: string;
  items: string[];
  accent: boolean;
  featured: boolean;
}[] = [
  {
    id: "01",
    category: "Backend",
    items: ["Spring Boot", ".NET Core", "Hibernate", "JPA", "REST APIs", "SignalR"],
    accent: true,
    featured: true,
  },
  {
    id: "02",
    category: "Languages",
    items: ["Java", "C#", "JavaScript", "TypeScript", "PHP", "C++"],
    accent: false,
    featured: false,
  },
  {
    id: "03",
    category: "Database & Cloud",
    items: ["MySQL", "SQL Server", "MongoDB", "Firestore", "Firebase"],
    accent: false,
    featured: false,
  },
  {
    id: "04",
    category: "Frontend Frameworks",
    items: ["React.js", "Next.js", "Redux", "Zustand"],
    accent: true,
    featured: true,
  },
  {
    id: "05",
    category: "UI & Motion",
    items: ["Tailwind CSS", "Framer Motion", "HTML5", "CSS3"],
    accent: false,
    featured: false,
  },
  {
    id: "06",
    category: "Architecture",
    items: ["OOP", "SOLID", "MVC", "Repository Pattern", "Clean Architecture", "DSA"],
    accent: false,
    featured: false,
  },
  {
    id: "07",
    category: "DevOps",
    items: ["Docker", "Linux", "CI/CD", "Vercel", "Netlify"],
    accent: false,
    featured: false,
  },
  {
    id: "08",
    category: "Testing",
    items: ["Selenium WebDriver", "API Testing", "Postman", "JUnit"],
    accent: false,
    featured: false,
  },
  {
    id: "09",
    category: "Version Control",
    items: ["Git", "GitHub", "GitLab"],
    accent: false,
    featured: false,
  },
  {
    id: "10",
    category: "IDE & Tooling",
    items: ["VS Code", "Visual Studio", "IntelliJ IDEA"],
    accent: false,
    featured: false,
  },
  {
    id: "11",
    category: "Domains",
    items: ["Enterprise Apps", "SaaS Architecture", "RESTful Systems", "Full-Stack Integration"],
    accent: false,
    featured: false,
  },
  {
    id: "✦",
    category: "Currently Exploring",
    items: ["Kubernetes", "AWS", "GraphQL", "Redis", "Kafka", "Microservices"],
    accent: true,
    featured: true,
  },
];

/* ─── Skill Card ─── */
function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -20, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 14,
        mass: 0.8,
        delay: index * 0.06,
      }}
      aria-label="Skill Card"
      className={`group relative flex flex-col justify-between p-6 overflow-hidden bg-gradient-to-br from-zinc-900/40 to-transparent border rounded-xl transition-all duration-500 hover:-translate-y-2
        ${skill.featured ? "md:col-span-2 min-h-[200px]" : "min-h-[160px]"}
        ${skill.accent
          ? "border-[var(--theme-accent)]/20 hover:border-[var(--theme-accent)]/40 hover:bg-zinc-800/30 hover:shadow-[0_0_30px_rgba(232,0,28,0.15)]"
          : "border-zinc-800/80 hover:border-zinc-600 hover:bg-zinc-800/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.03)]"
        }`}
    >
      {/* Web thread dropping in on hover */}
      <span className="absolute top-0 left-6 w-px h-0 bg-gradient-to-b from-transparent to-[var(--theme-accent)] group-hover:h-16 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />

      {/* Accent glow overlay for featured cards */}
      {skill.accent && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_rgba(232,0,28,0.08)_0%,_transparent_60%)]" />
      )}

      <span
        aria-hidden="true"
        className={`absolute top-4 right-5 font-bold leading-none select-none pointer-events-none transition-colors duration-300 ${skill.featured ? "text-[5rem]" : "text-[3.5rem]"}`}
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: skill.accent ? "rgba(232,0,28,0.12)" : "rgba(255,255,255,0.03)",
        }}
      >
        {skill.id}
      </span>

      <div>
        <p
          className="text-[10px] tracking-[0.3em] uppercase mb-1"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: skill.accent ? "var(--theme-accent)" : "#52525b",
          }}
        >
          {skill.category}
        </p>
        {skill.featured && (
          <p
            className="text-zinc-500 text-xs leading-relaxed mt-1 max-w-md"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {skill.accent && skill.category === "Backend"
              ? "Core strength — building scalable APIs, microservices, and enterprise-grade server systems."
              : "Crafting responsive, animated, and pixel-perfect interfaces with modern frameworks."}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-auto pt-4">
        {skill.items.map((item) => (
          <span
            key={item}
            className={`text-xs tracking-wide px-3 py-1.5 rounded-full border transition-all duration-300
              ${skill.accent
                ? "bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border-[var(--theme-accent)]/20 group-hover:border-[var(--theme-accent)]/40 group-hover:bg-[var(--theme-accent)]/15"
                : "bg-zinc-800/50 text-zinc-300 border-zinc-700/50 group-hover:border-zinc-600 group-hover:bg-zinc-800/80 group-hover:text-white"
              }`}
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative bg-[var(--theme-bg)] border-t border-zinc-800/60 px-6 md:px-16 lg:px-24 py-24 overflow-hidden"
    >
      {/* Background Web */}
      <SpiderWebBg className="absolute inset-0 pointer-events-none z-0" opacity={0.06} />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-6 mb-6"
      >
        <span
          className="text-[11px] tracking-[0.3em] uppercase text-zinc-600"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          01 / Skills
        </span>
        <div className="flex-1 h-px bg-zinc-800" />
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white leading-none uppercase"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Technical
          <br />
          <span className="hover-glitch inline-block" style={{ color: "var(--theme-accent)" }}>
            Stack.
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xs text-zinc-500 text-sm leading-relaxed md:text-right"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Across the full stack — from pixels to packets, schema to server.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(160px,auto)] gap-4">
        {skills.map((skill, i) => (
          <SkillCard key={skill.id} skill={skill} index={i} />
        ))}
      </div>
    </section>
  );
}
