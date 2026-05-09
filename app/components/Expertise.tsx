"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useSmoothScroll } from "./SmoothScrollProvider";

/* ─── Spider hanging from thread ─────────────────────────── */
function SpiderDrop() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 pointer-events-none hidden md:flex">
      <motion.div
        className="w-px bg-gradient-to-b from-[var(--theme-accent)]/60 to-[var(--theme-accent)]/20"
        initial={{ height: 0 }}
        whileInView={{ height: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.4 }}
      >
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="var(--theme-accent)"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx="12" cy="10" rx="4" ry="5" />
          <ellipse cx="12" cy="17" rx="3" ry="3.5" />
          {[
            { x1: 12, y1: 8, x2: 3, y2: 4 },
            { x1: 12, y1: 10, x2: 2, y2: 10 },
            { x1: 12, y1: 12, x2: 3, y2: 16 },
            { x1: 12, y1: 8, x2: 21, y2: 4 },
            { x1: 12, y1: 10, x2: 22, y2: 10 },
            { x1: 12, y1: 12, x2: 21, y2: 16 },
          ].map((leg, i) => (
            <line
              key={i}
              {...leg}
              stroke="var(--theme-accent)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          ))}
          {/* Spidey eyes */}
          <path d="M10 8.5 L11.5 7.5 L12 9.5 Z" fill="#09090b" />
          <path d="M14 8.5 L12.5 7.5 L12 9.5 Z" fill="#09090b" />
          {/* Glow pulse */}
          <ellipse cx="12" cy="10" rx="4" ry="5" fill="none" stroke="rgba(232,0,28,0.3)" strokeWidth="1.5">
            <animate attributeName="stroke-opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
          </ellipse>
        </motion.svg>
      </motion.div>
    </div>
  );
}

/* ─── Skill tags with thread ────────────────────────────── */
function WebSkills({ tags, accent }: { tags: string[]; accent: string }) {
  return (
    <div className="mt-8">
      <div className="relative mb-4 flex items-center opacity-50">
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${accent})` }} />
        <div className="w-1.5 h-1.5 rounded-full mx-2" style={{ background: accent }} />
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, ${accent}, transparent)` }} />
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border cursor-default transition-all duration-200"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "#e4e4e7",
              borderColor: `color-mix(in srgb, ${accent} 25%, transparent)`,
              background: `color-mix(in srgb, ${accent} 8%, transparent)`,
            }}
            whileHover={{
              scale: 1.06,
              borderColor: accent,
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ─── One panel ──────────────────────────────────────────── */
function Panel({
  num, label, title, description, tags, accent, bg, cta, align,
}: {
  num: string; label: string; title: string; description: string;
  tags: string[]; accent: string; bg: string;
  cta: { label: string; href: string }; align: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const { scrollTo } = useSmoothScroll();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2deg", "2deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex-1 flex flex-col px-8 md:px-12 lg:px-16 py-16 overflow-hidden"
      style={{ rotateX, rotateY, background: bg, transformStyle: "preserve-3d" }}
    >
      {/* Corner web SVG */}
      <svg
        className="absolute pointer-events-none"
        style={{
          top: 0,
          [align === "left" ? "left" : "right"]: 0,
          width: 160, height: 160, opacity: 0.12,
          transform: align === "right" ? "scaleX(-1)" : undefined,
        }}
        viewBox="0 0 160 160" fill="none"
      >
        {[
          "M160 0 L0 0", "M160 0 L0 50", "M160 0 L0 110",
          "M160 0 L60 160", "M160 0 L120 160", "M160 0 L160 160",
        ].map((d, i) => <path key={i} d={d} stroke={accent} strokeWidth="0.8" />)}
        {["M120 0 A40 40 0 0 1 160 40", "M80 0 A80 80 0 0 1 160 80",
          "M40 0 A120 120 0 0 1 160 120", "M4 0 A156 156 0 0 1 160 156",
        ].map((d, i) => <path key={`a${i}`} d={d} stroke={accent} strokeWidth="0.8" />)}
      </svg>

      {/* Discipline badge */}
      <p
        className="text-[9px] tracking-[0.45em] uppercase mb-6 relative z-10"
        style={{ fontFamily: "var(--font-space-grotesk)", color: accent }}
      >
        {label} {num}
      </p>

      {/* Watermark number */}
      <span
        aria-hidden="true"
        className="absolute select-none pointer-events-none font-black leading-none z-0"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "clamp(10rem, 20vw, 22rem)",
          color: accent,
          opacity: 0.04,
          right: align === "left" ? "-0.05em" : "auto",
          left: align === "right" ? "-0.05em" : "auto",
          bottom: "-0.15em",
        }}
      >
        {num}
      </span>

      {/* Title */}
      <h3
        className="relative z-10 font-black uppercase leading-[0.88] whitespace-pre-line mb-4"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "clamp(3rem, 6vw, 6.5rem)",
          color: "#fff",
        }}
      >
        {title}
      </h3>

      {/* Accent underline */}
      <motion.div
        className="relative z-10 h-1 w-16 rounded-full mb-6"
        style={{ background: accent }}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      <p
        className="relative z-10 text-zinc-400 text-sm leading-relaxed max-w-sm"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {description}
      </p>

      {/* Web-hung skill tags */}
      <div className="relative z-10">
        <WebSkills tags={tags} accent={accent} />
      </div>

      {/* CTA */}
      <a
        href={cta.href}
        onClick={(e) => {
          if (cta.href.startsWith("#")) {
            e.preventDefault();
            scrollTo(cta.href);
          }
        }}
        className="relative z-10 group mt-10 inline-flex items-center gap-3 w-fit"
      >
        <div
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ borderColor: accent }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = accent; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 11L11 1M11 1H4M11 1V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span
          className="text-[10px] tracking-widest uppercase text-zinc-500 group-hover:text-white transition-colors duration-200"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {cta.label}
        </span>
      </a>
    </motion.div>
  );
}

/* ─── Main section ───────────────────────────────────────── */
export default function Expertise() {
  return (
    <section id="expertise" className="relative overflow-hidden border-t border-zinc-800/60">
      {/* Section overline */}
      <div className="relative bg-[var(--theme-bg)] px-6 md:px-16 lg:px-24 py-8 flex items-center gap-6 z-10">
        <span
          className="text-[11px] tracking-[0.3em] uppercase text-zinc-600"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Skills / Discipline
        </span>
        <div className="flex-1 h-px bg-zinc-800" />
        <span
          className="text-[10px] tracking-widest uppercase text-zinc-700 italic"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          &ldquo;With great power...&rdquo;
        </span>
      </div>

      {/* Two-panel split */}
      <div className="relative flex flex-col md:flex-row min-h-[70vh]">
        <SpiderDrop />

        {/* FRONT END — Blue */}
        <Panel
          num="01"
          label="Discipline"
          title={"FRONT\nEND"}
          description="Pixel-perfect UIs and buttery animations. React component libraries, Next.js apps — optimised, accessible, and fast."
          tags={["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML / CSS"]}
          accent="var(--theme-accent-alt)"
          bg="linear-gradient(135deg, #050d1f 0%, var(--theme-bg) 60%)"
          cta={{ label: "See UI Work", href: "#work" }}
          align="left"
        />

        {/* Vertical divider */}
        <div className="hidden md:block w-px bg-gradient-to-b from-[var(--theme-accent)]/40 via-zinc-700/30 to-[var(--theme-accent-alt)]/40 self-stretch z-20" />

        {/* BACK END — Red */}
        <Panel
          num="02"
          label="Discipline"
          title={"BACK\nEND"}
          description="Scalable APIs, real-time systems, clean architecture. Java, Spring Boot, ASP.NET Core, Docker — built to last in production."
          tags={["Spring Boot", "ASP.NET Core", "Java", "MySQL / MongoDB", "Docker", "REST APIs"]}
          accent="var(--theme-accent)"
          bg="linear-gradient(225deg, #1a0004 0%, var(--theme-bg) 60%)"
          cta={{ label: "See Projects", href: "#work" }}
          align="right"
        />
      </div>
    </section>
  );
}
