"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useTransform, useMotionValue, type MotionValue } from "framer-motion";
import SpiderWebBg from "./SpiderWebBg";
import { useSmoothScroll } from "./SmoothScrollProvider";

/* ─── Glitch accent span ────────────────────────────────── */
function GlitchWord({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [glitched, setGlitched] = useState(false);

  useEffect(() => {
    if (isInView && !glitched) {
      const t = setTimeout(() => setGlitched(true), 200);
      return () => clearTimeout(t);
    }
  }, [isInView, glitched]);

  return (
    <span
      ref={ref}
      className={glitched ? "spidey-glitch" : ""}
      style={{ color: "var(--theme-accent)", display: "inline-block" }}
    >
      {text}
    </span>
  );
}

/* ─── Parallax line ────────────────────────────────────── */
function ParallaxLine({
  segments,
  index,
  scrollYProgress,
}: {
  segments: { text: string; accent?: boolean }[];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  // Alternate lines move at slightly different speeds for depth
  const speed = index % 2 === 0 ? 0.04 : -0.04;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className="overflow-hidden -mx-[10vw] px-[10vw]">
      <motion.div
        initial={{ y: "110%", rotateX: -40, rotateY: 5, opacity: 0, transformOrigin: "bottom center" }}
        animate={isInView ? { y: "0%", rotateX: 0, rotateY: 0, opacity: 1 } : {}}
        transition={{
          duration: 1.2,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1], // Premium Expo Out
        }}
        style={{ x }}
        className="flex flex-wrap will-change-transform"
      >
        {segments.map((seg, i) =>
          seg.accent ? (
            <GlitchWord key={i} text={seg.text} />
          ) : (
            <span key={i} style={{ color: "#f0f0f0" }}>
              {seg.text}
            </span>
          ),
        )}
      </motion.div>
    </div>
  );
}

/* ─── Lines data ────────────────────────────────────────── */
const lines: { text: string; accent?: boolean }[][] = [
  [{ text: "CRAFTING DIGITAL" }],
  [{ text: "EXPERIENCES," }],
  [{ text: "PUSHING THE WEB" }],
  [{ text: "TO ITS\u00a0" }, { text: "LIMITS,", accent: true }],
  [{ text: "SHIPPING CODE" }],
  [{ text: "THAT\u00a0" }, { text: "SPEAKS.", accent: true }],
];

/* ─── Main section ─────────────────────────────────────── */
export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useSmoothScroll();

  /* ── Compute section-relative scroll progress ─────── */
  // Note: framer-motion useMotionValue automatically uses requestAnimationFrame under the hood
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let sectionTop = 0;
    let sectionEnd = 1000;
    let viewH = 800;

    const updateBounds = () => {
      const currentY = scrollY.get();
      const rect = section.getBoundingClientRect();
      sectionTop = currentY + rect.top;
      sectionEnd = sectionTop + section.offsetHeight;
      viewH = window.innerHeight;
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    const unsub = scrollY.on("change", (y) => {
      // Progress: 0 when section enters viewport bottom, 1 when section top exits viewport top
      const progress = Math.max(
        0,
        Math.min(1, (y + viewH - sectionTop) / (sectionEnd - sectionTop + viewH)),
      );
      scrollYProgress.set(progress);
    });

    return () => {
      unsub();
      window.removeEventListener("resize", updateBounds);
    };
  }, [scrollY, scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[var(--theme-bg)] px-6 md:px-16 lg:px-24 pt-32 pb-24 overflow-hidden"
    >
      {/* Spider web — stronger now */}
      <SpiderWebBg className="absolute inset-0" opacity={0.11} />

      {/* Pulsing "Spider-Sense" radial red glow behind the text */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse 70% 50% at 30% 60%, rgba(232,0,28,0.04) 0%, transparent 70%)",
            "radial-gradient(ellipse 70% 50% at 30% 60%, rgba(232,0,28,0.12) 0%, transparent 70%)",
            "radial-gradient(ellipse 70% 50% at 30% 60%, rgba(232,0,28,0.04) 0%, transparent 70%)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vertical web thread dropping down */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-6 md:left-16 lg:left-24 top-0 w-px h-[120%] bg-gradient-to-b from-transparent via-zinc-700 to-transparent origin-top z-0"
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center">
          <span
            className="text-[10px] font-bold tracking-widest text-zinc-400"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            CP
          </span>
        </div>
        <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">
          Portfolio — Est. 2026
        </span>
      </motion.div>

      {/* Main headline — each line has parallax drift + glitch on accent */}
      <h2
        className="font-bold leading-[0.92] tracking-tight uppercase"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "clamp(2.8rem, 8vw, 9rem)",
        }}
      >
        {lines.map((segments, i) => (
          <ParallaxLine
            key={i}
            segments={segments}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </h2>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
      >
        <p
          className="max-w-xs text-zinc-500 text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Developer based in India — building products that live at the edge of
          design and engineering.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-start md:items-end">
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="spider-sense-pulse hover-glitch group flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[var(--theme-accent)] transition-colors"
          >
            <span className="w-12 h-px bg-[var(--theme-accent)]/50 group-hover:w-16 group-hover:bg-[var(--theme-accent)] transition-all duration-500 ease-out" />
            Resume
          </a>
          <a
            href="#work"
            className="hover-glitch group flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-zinc-400 hover:text-[var(--theme-accent)] transition-colors"
          >
            <span className="w-8 h-px bg-zinc-700 group-hover:w-16 group-hover:bg-[var(--theme-accent)] transition-all duration-500 ease-out" />
            View Work
          </a>
        </div>
      </motion.div>
    </section>
  );
}
