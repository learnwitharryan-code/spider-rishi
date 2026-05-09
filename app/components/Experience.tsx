"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SpiderWebBg from "./SpiderWebBg";

const experiences = [
  {
    period: "Jan 2025 – May 2025",
    role: "Full Stack Developer",
    company: "Softweb IT Services",
    location: "Vapi, Gujarat",
    description: "Built and maintained client-facing web pages using HTML, CSS, JavaScript, PHP, and MySQL. Implemented secure authentication and responsive UI layouts across multiple Agile client projects.",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    accent: true,
  },
  {
    period: "Jun 2024 – Jul 2024",
    role: "React Developer",
    company: "InfoLabz IT Services",
    location: "Ahmedabad, Gujarat",
    description: "Developed modular UI components using React.js to improve reusability. Implemented SPA navigation with React Router and ensured responsive user interfaces across all devices.",
    tags: ["React.js", "React Router", "CSS"],
    accent: false,
  },
];

function RoleCard({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="relative pl-12"
    >
      <div
        className="absolute left-0 top-3 w-4 h-4 rounded-full border-2 flex items-center justify-center"
        style={{
          borderColor: exp.accent ? "var(--theme-accent)" : "#52525b",
          background: exp.accent ? "var(--theme-accent)" : "var(--theme-bg)",
        }}
      >
        {exp.accent && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
      </div>

      <div
        aria-label="Experience Card"
        className="rounded-2xl border p-6 md:p-8 transition-colors duration-300 hover:border-zinc-600"
        style={{
          background: exp.accent ? "rgba(232,0,28,0.05)" : "rgba(255,255,255,0.02)",
          borderColor: exp.accent ? "rgba(232,0,28,0.3)" : "#27272a",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <p
              className="text-[10px] tracking-[0.25em] uppercase mb-1 font-bold"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: exp.accent ? "var(--theme-accent)" : "#71717a",
              }}
            >
              {exp.period} · {exp.location}
            </p>
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {exp.role}
            </h3>
            <p className="text-sm mt-0.5" style={{ fontFamily: "var(--font-space-grotesk)", color: "#a1a1aa" }}>
              {exp.company}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-5" style={{ fontFamily: "var(--font-inter)", color: "#a1a1aa" }}>
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: exp.accent ? "var(--theme-accent)" : "#71717a",
                borderColor: exp.accent ? "rgba(232,0,28,0.4)" : "#3f3f46",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      id="experience"
      className="relative bg-[var(--theme-bg)] border-t border-zinc-800/60 overflow-hidden"
    >
      <SpiderWebBg className="absolute inset-0" opacity={0.05} />

      <div className="relative px-6 md:px-16 lg:px-24 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-20"
        >
          <span
            className="text-[11px] tracking-[0.3em] uppercase text-zinc-600"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            03 / Experience
          </span>
          <div className="flex-1 h-px bg-zinc-800" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-black uppercase leading-none text-white"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(3rem, 7vw, 6rem)",
              }}
            >
              WHERE
              <br />
              I&apos;VE
              <br />
              <span style={{ color: "var(--theme-accent)" }}>WORKED.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 text-zinc-500 text-sm leading-relaxed max-w-xs"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Building scalable web applications and intuitive interfaces at Softweb IT Services & InfoLabz IT Services.
            </motion.p>
          </div>

          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1.5 top-0 bottom-0 w-px origin-top"
              style={{
                background: "linear-gradient(to bottom, var(--theme-accent), #7f0010, transparent)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center gap-3 mb-10 pl-12"
            >
              <div className="absolute left-0 w-4 h-4 rounded-full bg-[var(--theme-accent)] animate-pulse" />
              <span
                className="text-[10px] tracking-[0.4em] uppercase"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--theme-accent)" }}
              >
                May 2025
              </span>
            </motion.div>

            <div className="flex flex-col gap-8">
              {experiences.map((exp, i) => (
                <RoleCard key={exp.company} exp={exp} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative flex items-center gap-3 mt-8 pl-12"
            >
              <div className="absolute left-0 w-4 h-4 rounded-full border-2 border-zinc-700 bg-[var(--theme-bg)]" />
              <span
                className="text-[10px] tracking-[0.4em] uppercase text-zinc-600"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                2024 — Started
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
