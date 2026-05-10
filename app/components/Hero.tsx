"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import Image from "next/image";
import {
  motion,
  HTMLMotionProps,
  useTransform,
  MotionValue,
  useSpring,
  useTime,
  useVelocity,
  useMotionValue,
} from "framer-motion";
import SpiderWebBg from "./SpiderWebBg";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { useTheme } from "./ThemeProvider";

/**
 * Background Title
 */
function BackgroundTitle({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.3, 0.7], [0, 1]);
  const velocity = useVelocity(progress);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });

  const textShadow = useTransform(smoothVelocity, (v) => {
    const intensity = Math.min(Math.abs(v * 30), 50);
    if (intensity < 0.5) return "none";
    const dir = v > 0 ? 1 : -1;
    return `${dir * intensity}px ${dir * intensity * 0.2}px 0 rgba(37,99,235,0.6), ${-dir * intensity}px ${-dir * intensity * 0.1}px 0 rgba(232,0,28,0.6)`;
  });

  const copiesA = Array(8).fill("RISHI");
  const copiesB = Array(8).fill("SINGH");
  const doubledA = [...copiesA, ...copiesA];
  const doubledB = [...copiesB, ...copiesB];

  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden pointer-events-none gap-2"
      style={{ opacity }}
    >
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        >
          {doubledA.map((name, i) => (
            <motion.span
              key={i}
              className="text-[13vw] font-bold leading-none tracking-tighter text-[#e8e8e8] select-none"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                paddingRight: "6vw",
                textShadow,
              }}
            >
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <div className="w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap will-change-transform"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 14, ease: "linear", repeat: Infinity }}
        >
          {doubledB.map((name, i) => (
            <motion.span
              key={i}
              className="text-[13vw] font-bold leading-none tracking-tighter select-none"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                paddingRight: "6vw",
                color: "var(--theme-accent)",
                opacity: 0.18,
                textShadow,
              }}
            >
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/**
 * Advanced Liquid Blob Generation
 */
function useLiquidBlob(
  cursorX: MotionValue<number>,
  cursorY: MotionValue<number>,
  size: MotionValue<number>,
) {
  const time = useTime();

  const blobPath = useTransform(
    [cursorX, cursorY, size, time],
    ([x, y, s, t]: number[]) => {
      if (s === 0) return "M0 0";

      const points: { x: number; y: number }[] = [];
      const numPoints = 12;
      const angleStep = (Math.PI * 2) / numPoints;
      const baseRadius = s;

      for (let i = 0; i < numPoints; i++) {
        const angle = i * angleStep;
        const noise1 = Math.sin(t * 0.002 + i * 2) * 0.1;
        const noise2 = Math.cos(t * 0.005 + i * 3) * 0.15;
        const noise3 = Math.sin(t * 0.008 + i * 1.5) * 0.05;
        const variation = 1 + noise1 + noise2 + noise3;
        const r = baseRadius * variation;
        const rotationOffset = t * 0.0005;
        const finalAngle = angle + rotationOffset;

        points.push({
          x: x + Math.cos(finalAngle) * r,
          y: y + Math.sin(finalAngle) * r,
        });
      }

      const getPt = (i: number) => points[(i + points.length) % points.length];
      let d = `M ${points[0].x} ${points[0].y}`;

      for (let i = 0; i < points.length; i++) {
        const p0 = getPt(i - 1);
        const p1 = getPt(i);
        const p2 = getPt(i + 1);
        const p3 = getPt(i + 2);
        const tension = 0.2;
        const cp1x = p1.x + (p2.x - p0.x) * tension;
        const cp1y = p1.y + (p2.y - p0.y) * tension;
        const cp2x = p2.x - (p3.x - p1.x) * tension;
        const cp2y = p2.y - (p3.y - p1.y) * tension;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
      }

      return d + " Z";
    },
  );

  return blobPath;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMasked, setIsMasked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const { scrollY } = useSmoothScroll();
  const { theme } = useTheme();

  const baseImage = theme === "spiderman" ? "/Rishi_spiderman.webp" : "/rishi_hero.webp";
  const revealImage = theme === "spiderman" ? "/rishi_hero.webp" : "/Rishi_spiderman.webp";

  useEffect(() => {
    const t = setTimeout(() => {
      setIsTouchDevice(
        typeof window !== "undefined" &&
        !!window.matchMedia &&
        window.matchMedia("(pointer: coarse)").matches
      );
    }, 0);
    return () => clearTimeout(t);
  }, []);

  /* ── Compute scroll progress relative to this section ── */
  // Note: framer-motion useMotionValue automatically uses requestAnimationFrame under the hood
  /* ── Compute scroll progress relative to this section ── */
  // Note: framer-motion useMotionValue automatically uses requestAnimationFrame under the hood
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let sectionTop = 0;
    let sectionHeight = 1;

    const updateBounds = () => {
      // Get current virtual scroll position
      const currentY = scrollY.get();
      // Calculate true absolute top by undoing the current scroll transform
      const rect = container.getBoundingClientRect();
      sectionTop = currentY + rect.top;
      sectionHeight = container.offsetHeight - window.innerHeight;
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    const unsub = scrollY.on("change", (y) => {
      if (sectionHeight <= 0) return;
      const progress = Math.max(0, Math.min(1, (y - sectionTop) / sectionHeight));
      scrollYProgress.set(progress);
    });

    return () => {
      unsub();
      window.removeEventListener("resize", updateBounds);
    };
  }, [scrollY, scrollYProgress]);

  /* Immediate, clean zoom-out effect (no downward translation) */
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const cardOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]); // Fade out only at the very end
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const selectedWorksOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  const cursorX = useSpring(0, { stiffness: 120, damping: 25 });
  const cursorY = useSpring(0, { stiffness: 120, damping: 25 });
  const blobSize = useSpring(0, { stiffness: 150, damping: 20 });
  const blobPath = useLiquidBlob(cursorX, cursorY, blobSize);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const scaleFactorX = cardRef.current.offsetWidth / rect.width;
    const scaleFactorY = cardRef.current.offsetHeight / rect.height;
    cursorX.set(rawX * scaleFactorX);
    cursorY.set(rawY * scaleFactorY);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    blobSize.set(160);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    blobSize.set(0);
  };

  const handleTap = () => {
    setIsMasked((prev) => !prev);
  };

  const mouseHandlers: HTMLMotionProps<"div"> = !isTouchDevice
    ? { onMouseMove: handleMouseMove, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
    : {};

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] w-full bg-[var(--theme-bg)]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {!isTouchDevice && <BackgroundTitle progress={scrollYProgress} />}
        {!isTouchDevice && <SpiderWebBg className="absolute inset-0 z-[5]" opacity={0.18} />}

        <motion.div
          aria-label="Hero Card"
          ref={cardRef}
          className={`relative z-20 h-full w-full overflow-hidden bg-zinc-800 shadow-2xl ${!isTouchDevice ? "cursor-none" : ""} transition-all duration-300`}
          style={{ scale, opacity: cardOpacity, borderRadius, transformOrigin: "center" }}
          {...mouseHandlers}
          onTouchStart={handleTap}
        >
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: "100%", height: "100%" }}
          >
            <defs>
              <clipPath id="blobMask">
                <motion.path d={blobPath} />
              </clipPath>
            </defs>
          </svg>

          <div className="absolute inset-0">
            <Image
              src={baseImage}
              alt="Portrait Base"
              fill
              className="object-cover object-center"
              priority
              quality={isTouchDevice ? 60 : 100}
            />
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: isHovering || isMasked ? "url(#blobMask)" : "inset(100%)",
              WebkitClipPath: isHovering || isMasked ? "url(#blobMask)" : "inset(100%)",
            }}
          >
            <Image
              src={revealImage}
              alt="Portrait Reveal"
              fill
              className="object-cover object-center"
              quality={isTouchDevice ? 60 : 100}
            />
          </div>

          <SpiderWebBg className="absolute inset-0 z-[3] pointer-events-none" opacity={0.14} />
          <div className="absolute inset-0 z-[4] bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

          <motion.div
            className="absolute bottom-10 left-6 md:left-10 pointer-events-none"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[9px] tracking-[0.4em] uppercase mb-1" style={{ fontFamily: "var(--font-space-grotesk)", color: "#a1a1aa" }}>
              Your Friendly Neighborhood
            </p>
            <p className="text-[11px] tracking-[0.4em] uppercase mb-2" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--theme-accent)" }}>
              Full-Stack Developer
            </p>
            <h1
              className="leading-none uppercase"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                color: "#f8fafc",
                textShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              Rishi
              <br />
              <span style={{ color: "var(--theme-accent)", textShadow: "0 0 20px rgba(232,0,28,0.5)" }}>Singh.</span>
            </h1>

            <motion.a
              href="/RishiSingh.pdf"
              download
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="spider-sense-pulse mt-5 inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase px-5 py-3.5 transition-all duration-300 pointer-events-auto border border-zinc-700 bg-black/40 text-zinc-300 hover:border-[var(--theme-accent)] hover:text-white hover:shadow-[0_0_15px_rgba(232,0,28,0.3)] rounded-full"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v7M6 8l-3-3M6 8l3-3M1 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download CV
            </motion.a>
          </motion.div>

          <motion.div
            className="absolute bottom-10 right-6 md:right-10 flex flex-col items-center gap-2 pointer-events-none transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-500 mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Scroll
              </span>
              <motion.div
                className="w-px h-12 bg-zinc-700 origin-top"
                animate={{ scaleY: [0, 1, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-8 text-white pointer-events-none"
            style={{ opacity: selectedWorksOpacity }}
          >
            <p className="font-mono text-xs tracking-widest uppercase text-zinc-400">Selected Works</p>
            <p className="text-xl font-bold">2024 — 2025</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
