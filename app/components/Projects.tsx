"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { projects, type Project } from "../data/projects";

/* ── Stagger config ── */
const STAGGER = 0.1;
const CARD_EASE = [0.16, 1, 0.3, 1] as const;

/* ── Tilt hook for premium 3D feel ── */
function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 200, damping: 30 });
  const my = useSpring(y, { stiffness: 200, damping: 30 });
  const rotateX = useTransform(my, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mx, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return { rotateX, rotateY, mx, my, handleMove, handleLeave };
}

/* ── Arrow icon ── */
function ArrowIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ══════════════════════════════════════════════
   SPIDER-SENSE RADAR (Interactive Background)
   ══════════════════════════════════════════════ */
function SpiderSenseRadar({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const innerX = useTransform(mx, [-0.5, 0.5], [-15, 15]);
  const innerY = useTransform(my, [-0.5, 0.5], [-15, 15]);
  const outerX = useTransform(mx, [-0.5, 0.5], [-35, 35]);
  const outerY = useTransform(my, [-0.5, 0.5], [-35, 35]);

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none overflow-hidden mix-blend-screen">
      {/* Outer dashed ring */}
      <motion.div
        style={{ x: outerX, y: outerY }}
        className="absolute w-[180%] aspect-square max-w-[600px] border border-dashed border-[var(--theme-accent)] rounded-full opacity-40 animate-[spin_24s_linear_infinite]"
      />
      
      {/* Inner solid ring */}
      <motion.div
        style={{ x: innerX, y: innerY }}
        className="absolute w-[100%] aspect-square max-w-[300px] border border-[var(--theme-accent-alt)] rounded-full opacity-50 animate-[spin_16s_linear_infinite_reverse]"
      />
      
      {/* Center radar pulse */}
      <motion.div
        style={{ x: innerX, y: innerY }}
        className="absolute w-24 h-24 bg-[var(--theme-accent)]/20 rounded-full blur-xl"
      />
      
      {/* Crosshairs */}
      <motion.div style={{ x: outerX, y: innerY }} className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--theme-accent)]/40 to-transparent" />
      <motion.div style={{ x: innerX, y: outerY }} className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[var(--theme-accent-alt)]/40 to-transparent" />
    </div>
  );
}

/* ══════════════════════════════════════════════
   FEATURED PROJECT CARD — Big editorial layout
   ══════════════════════════════════════════════ */
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const { rotateX, rotateY, mx, my, handleMove, handleLeave } = useTilt();

  const isEven = index % 2 === 0;

  // Spider-Verse Chromatic Glitch tied to mouse movement
  const textShadow = useTransform(
    [mx, my],
    ([x, y]) => {
      const rx = (x as number) * 40;
      const ry = (y as number) * 40;
      const bx = -(x as number) * 40;
      const by = -(y as number) * 40;
      return `${rx}px ${ry}px 0 rgba(232,0,28,0.5), ${bx}px ${by}px 0 rgba(37,99,235,0.5)`;
    }
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * STAGGER, ease: CARD_EASE }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative"
    >
      <div className={`relative grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-sm border border-zinc-800/80 bg-zinc-950/60 transition-all duration-500 hover:border-zinc-600/80 hover:bg-zinc-900/60`}>
        {/* ── Left: Content ── */}
        <div className={`relative flex flex-col justify-center p-8 md:p-10 lg:p-12 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          {/* Background watermark */}
          <span
            aria-hidden="true"
            className="absolute select-none pointer-events-none font-black leading-none z-0"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "clamp(8rem, 16vw, 14rem)",
              color: "rgba(232,0,28,0.05)",
              right: isEven ? "-0.05em" : "auto",
              left: isEven ? "auto" : "-0.05em",
              bottom: "-0.1em",
            }}
          >
            {project.id}
          </span>

          {/* Content Head */}
          <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
            <p
              className="text-[10px] tracking-[0.35em] uppercase mb-4 font-bold"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--theme-accent)" }}
            >
              {project.category} — {project.year}
            </p>

            <h3
              className="font-black text-white leading-[0.95] uppercase mb-5 transition-colors duration-300 group-hover:text-[var(--theme-accent)]"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
              }}
            >
              {project.title}
            </h3>

            {/* Accent line */}
            <motion.div
              className="h-[3px] w-12 rounded-full mb-2"
              style={{ background: "var(--theme-accent)" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: CARD_EASE }}
            />
          </div>

          {/* Content Reveal Body (Web-Pull) */}
          <div className="relative z-10 grid grid-rows-[1fr] lg:grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="overflow-hidden">
              <div className="pt-6 lg:opacity-0 lg:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                
                <p
                  className="text-zinc-400 text-sm leading-relaxed max-w-md mb-8"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border border-zinc-800 text-zinc-400 transition-all duration-200 hover:border-[var(--theme-accent)]/40 hover:text-zinc-200 hover:bg-[var(--theme-accent)]/10"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4 pt-6 border-t border-zinc-800/80">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="spider-sense-pulse text-[10px] tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors duration-200"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Case Study
                  </Link>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-2.5 text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300 text-zinc-300 hover:text-white rounded-full"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      borderColor: "var(--theme-accent)",
                      background: "rgba(232,0,28,0.08)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(232,0,28,0.2)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(232,0,28,0.08)"; }}
                  >
                    View Live
                    <ArrowIcon size={11} />
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Visual panel ── */}
        <div className={`relative min-h-[280px] lg:min-h-0 overflow-hidden ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          {/* Gradient mesh */}
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{
              background: `
                radial-gradient(ellipse at ${isEven ? "80% 30%" : "20% 30%"}, rgba(232,0,28,0.15) 0%, transparent 60%),
                radial-gradient(ellipse at ${isEven ? "20% 80%" : "80% 80%"}, rgba(37,99,235,0.1) 0%, transparent 50%),
                linear-gradient(${isEven ? "135deg" : "225deg"}, #0a0a0f 0%, #111118 100%)
              `,
            }}
          />

          <SpiderSenseRadar mx={mx} my={my} />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Big project number with Interactive Chromatic Glitch */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="font-black select-none leading-none transition-transform duration-700 group-hover:scale-110"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(6rem, 14vw, 12rem)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(255,255,255,0.1)",
                textShadow,
              }}
            >
              {project.id}
            </motion.span>
          </div>

          {/* Corner web decoration */}
          <svg
            className="absolute pointer-events-none opacity-[0.1]"
            style={{ top: 0, [isEven ? "right" : "left"]: 0, width: 140, height: 140 }}
            viewBox="0 0 160 160"
            fill="none"
          >
            {[
              "M160 0 L0 0", "M160 0 L0 50", "M160 0 L0 110",
              "M160 0 L60 160", "M160 0 L120 160", "M160 0 L160 160",
            ].map((d, i) => <path key={i} d={d} stroke="var(--theme-accent)" strokeWidth="0.8" />)}
            {[
              "M120 0 A40 40 0 0 1 160 40", "M80 0 A80 80 0 0 1 160 80",
              "M40 0 A120 120 0 0 1 160 120",
            ].map((d, i) => <path key={`a${i}`} d={d} stroke="var(--theme-accent)" strokeWidth="0.6" />)}
          </svg>

          {/* Floating label */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <span
              className="text-[9px] tracking-[0.3em] uppercase text-zinc-500"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {project.previewLabel}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--theme-accent)] shadow-[0_0_12px_rgba(232,0,28,0.6)] animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   SIDE PROJECT CARD — Compact editorial card
   ══════════════════════════════════════════════ */
function SideCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const { rotateX, rotateY, mx, my, handleMove, handleLeave } = useTilt();

  // Subtle glitch for smaller cards
  const textShadow = useTransform(
    [mx, my],
    ([x, y]) => {
      const rx = (x as number) * 15;
      const ry = (y as number) * 15;
      const bx = -(x as number) * 15;
      const by = -(y as number) * 15;
      return `${rx}px ${ry}px 0 rgba(232,0,28,0.4), ${bx}px ${by}px 0 rgba(37,99,235,0.4)`;
    }
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * STAGGER, ease: CARD_EASE }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative"
    >
      <div className="relative flex flex-col h-full overflow-hidden rounded-sm border border-zinc-800/80 bg-zinc-950/40 transition-all duration-500 hover:border-zinc-600/80 hover:-translate-y-1">
        {/* Glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(232,0,28,0.06)_0%,_transparent_50%)]" />

        {/* Top accent line */}
        <div
          className="h-[2px] w-full transition-all duration-500 group-hover:opacity-100"
          style={{
            background: "linear-gradient(to right, var(--theme-accent), rgba(37,99,235,0.4), transparent)",
            opacity: 0.3,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-1 p-7 md:p-8" style={{ transform: "translateZ(20px)" }}>
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div>
              <p
                className="text-[9px] tracking-[0.3em] uppercase mb-2 text-zinc-500 group-hover:text-[var(--theme-accent)] transition-colors duration-300"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {project.category}
              </p>
              <h3
                className="text-2xl md:text-3xl font-bold text-white leading-tight transition-colors duration-300 group-hover:text-[var(--theme-accent)]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {project.title}
              </h3>
            </div>
            <motion.span
              className="text-[3rem] font-black leading-none select-none pointer-events-none shrink-0 transition-transform duration-500 group-hover:scale-110"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.06)",
                textShadow,
              }}
            >
              {project.id}
            </motion.span>
          </div>

          {/* Web-Pull Reveal for Body */}
          <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex-1">
            <div className="overflow-hidden flex flex-col">
              <div className="pt-2 pb-6 lg:opacity-0 lg:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex-1 flex flex-col">
                <p
                  className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] tracking-[0.15em] uppercase text-zinc-500 font-medium"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {tag}
                      <span className="text-zinc-700 ml-1.5 inline-block align-middle">&bull;</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="flex items-center justify-between mt-auto pt-5 border-t border-zinc-800/80">
            <Link
              href={`/projects/${project.slug}`}
              className="text-[10px] tracking-[0.18em] uppercase text-zinc-500 hover:text-white transition-colors duration-200"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Details
            </Link>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live project`}
            >
              <motion.div
                className="w-9 h-9 flex items-center justify-center border rounded-full transition-all duration-200"
                style={{ borderColor: "#3f3f46", background: "transparent" }}
                whileHover={{ scale: 1.15, backgroundColor: "rgba(232,0,28,0.15)", borderColor: "var(--theme-accent)" }}
              >
                <ArrowIcon />
              </motion.div>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   LIGHTHOUSE BADGES — Perf scores
   ══════════════════════════════════════════════ */
function LighthouseBadges() {
  const scores = [
    { label: "Performance", value: 93 },
    { label: "Accessibility", value: 100 },
    { label: "Best Practices", value: 100 },
    { label: "SEO", value: 100 },
  ];

  return (
    <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {scores.map((score) => (
        <div key={score.label} className="flex items-center justify-between border border-zinc-800/60 bg-black/20 px-4 py-3 rounded-sm transition-colors hover:border-zinc-700 hover:bg-zinc-900/50">
          <span
            className="text-[10px] uppercase tracking-[0.18em] text-zinc-500"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {score.label}
          </span>
          <strong className="text-lg text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            {score.value}
          </strong>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN SECTION
   ══════════════════════════════════════════════ */
export default function Projects() {
  const featured = projects.filter((p) => p.size === "featured");
  const side = projects.filter((p) => p.size === "side");

  return (
    <section
      id="work"
      className="bg-[var(--theme-bg)] border-t border-zinc-800/60 px-6 md:px-16 lg:px-24 py-24"
    >
      {/* Section overline */}
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
          02 / Work
        </span>
        <div className="flex-1 h-px bg-zinc-800" />
      </motion.div>

      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-none uppercase z-10"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Selected
          <br />
          <span className="hover-glitch inline-block" style={{ color: "var(--theme-accent)" }}>
            Projects.
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
          &ldquo;It doesn&apos;t matter where you start, it&apos;s{" "}
          <em className="text-zinc-300 not-italic font-medium">how</em> you build from there.&rdquo;
        </motion.p>
      </div>

      {/* Featured projects — full-width editorial */}
      <div className="flex flex-col gap-6 mb-8">
        {featured.map((project, i) => (
          <FeaturedCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Side projects — 2-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {side.map((project, i) => (
          <SideCard key={project.id} project={project} index={i + featured.length} />
        ))}
      </div>

      <LighthouseBadges />
    </section>
  );
}
