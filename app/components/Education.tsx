"use client";

import { motion } from "framer-motion";

const educationData = [
  {
    degree: "Post Graduate Diploma (PG-DAC)",
    institution: "MET Institute of Information Technology",
    location: "Nashik, Maharashtra",
    date: "Aug 2025 — Feb 2026",
    tag: "Advanced Computing",
    accent: true,
  },
  {
    degree: "Bachelor of Engineering in IT",
    institution: "Laxmi Institute of Technology",
    location: "Bhilad, Gujarat",
    date: "Sep 2021 — May 2025",
    tag: "Information Technology",
    accent: false,
  },
];

export default function Education() {
  return (
    <section id="education" className="bg-[var(--theme-bg)] border-t border-zinc-800/60 px-6 md:px-16 lg:px-24 py-24">
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="flex items-center gap-6 mb-6"
      >
        <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          04 / Education
        </span>
        <div className="flex-1 h-px bg-zinc-800" />
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white leading-none uppercase"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Academic<br />
          <span className="hover-glitch inline-block" style={{ color: "var(--theme-accent)" }}>Foundation.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xs text-zinc-500 text-sm leading-relaxed md:text-right"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Formal education in engineering and advanced computing.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {educationData.map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`group relative flex flex-col justify-between p-8 border rounded-2xl min-h-[220px] transition-all duration-300 overflow-hidden hover:-translate-y-1
              ${edu.accent
                ? "border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/[0.05] hover:bg-[var(--theme-accent)]/[0.09]"
                : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700"
              }`}>
              {/* Web-thread overlay glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(232,0,28,0.08)_0%,_transparent_50%)]" />
              
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-4 text-[6rem] font-black leading-none select-none pointer-events-none transition-colors duration-500"
                style={{ fontFamily: "var(--font-space-grotesk)", color: edu.accent ? "rgba(232,0,28,0.05)" : "rgba(255,255,255,0.02)" }}
              >
                {edu.date.slice(-4)}
              </span>

              <div className="relative z-10">
                <span
                  className={`inline-block text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6 transition-colors duration-300
                    ${edu.accent ? "bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border border-[var(--theme-accent)]/20 group-hover:border-[var(--theme-accent)]/50" : "bg-zinc-800 text-zinc-400 border border-zinc-700 group-hover:border-zinc-500"}`}
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {edu.tag}
                </span>
                <h3 className="text-white text-2xl font-bold leading-tight mb-2 group-hover:text-[var(--theme-accent)] transition-colors duration-300" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {edu.degree}
                </h3>
                <p className="text-zinc-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                  {edu.institution}
                </p>
                <p className="text-zinc-500 text-xs mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                  {edu.location}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-8 relative z-10">
                <div className={`w-1.5 h-1.5 rounded-full flex items-center justify-center flex-shrink-0 ${edu.accent ? "bg-[var(--theme-accent)]" : "bg-zinc-500"}`} />
                <span className="text-[10px] text-zinc-500 tracking-widest uppercase font-medium" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {edu.date}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
