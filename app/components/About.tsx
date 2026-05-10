"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const tags = [
  "Next.js", "React", "Spring Boot", "ASP.NET Core",
  "TypeScript", "Java", "MySQL", "MongoDB", "Docker",
];

const stats = [
  { target: 2, suffix: "", label: "Internships" },
  { target: 12, suffix: "+", label: "Projects Shipped" },
  { target: 8, suffix: "+", label: "Certificates" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const stepTime = Math.floor(1400 / target);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <div ref={ref}>{count}{suffix}</div>;
}

export default function About() {
  return (
    <section
      id="about-detail"
      className="bg-[var(--theme-bg)] border-t border-zinc-800/60 px-5 md:px-16 lg:px-24 py-24 overflow-hidden"
    >
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-6 mb-16">
        <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          04 / About
        </span>
        <div className="flex-1 h-px bg-zinc-800" />
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[20vw] lg:text-[14vw] font-bold leading-none text-zinc-900 select-none pointer-events-none"
            style={{ fontFamily: "var(--font-space-grotesk)" }} aria-hidden="true"
          >04</motion.span>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-zinc-400 text-sm leading-relaxed max-w-sm" style={{ fontFamily: "var(--font-inter)" }}>
            &ldquo;Comfortable working across frontend and backend layers — with a strong focus on performance optimization, clean architecture, and RESTful API development.&rdquo;
          </motion.p>
        </div>
        <div className="flex flex-col justify-between gap-12">
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-zinc-300 text-base leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            Hi, I&apos;m <span className="text-white font-semibold">Rishi Singh</span> — a full‑stack developer based in India. I&apos;ve shipped production apps at <span className="text-white font-medium">Softweb IT Services</span> and <span className="text-white font-medium">InfoLabz IT Services</span>, working across Java, Spring Boot, .NET, React, and Next.js.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag}
                className="text-[11px] tracking-widest uppercase border border-zinc-700 text-zinc-400 px-3 py-1.5 rounded-full hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] transition-colors duration-200 cursor-default"
                style={{ fontFamily: "var(--font-space-grotesk)" }}>{tag}</span>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.25 }}
            className="flex gap-12 border-t border-zinc-800 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--theme-accent)" }}>
                  <AnimatedCounter target={s.target} suffix={s.suffix} />
                </div>
                <p className="text-[11px] tracking-widest uppercase text-zinc-600 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
