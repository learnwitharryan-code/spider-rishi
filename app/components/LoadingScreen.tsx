"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
  /** Number of lazy sections that have reported "ready" */
  sectionsReady?: number;
  /** Total lazy sections we are waiting for */
  totalSections?: number;
}

/* ─── Animated web canvas that radiates from center ─── */
function WebCanvas({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.scale(dpr, dpr);

    const cx = w / 2;
    const cy = h / 2;
    const maxRadius = Math.hypot(w, h) * 0.6;
    const numSpokes = 16;
    const numRings = 10;

    // How far the web has "grown" — mapped from progress
    const reveal = progress / 100;

    ctx.clearRect(0, 0, w, h);

    // Draw spokes
    for (let i = 0; i < numSpokes; i++) {
      const angle = (Math.PI * 2 * i) / numSpokes;
      const len = maxRadius * reveal;
      const alpha = 0.04 + reveal * 0.06;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
      ctx.strokeStyle = `rgba(232, 0, 28, ${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Draw concentric rings
    const ringsToShow = Math.floor(numRings * reveal);
    for (let r = 1; r <= ringsToShow; r++) {
      const radius = (maxRadius / numRings) * r;
      const ringAlpha = 0.03 + (r / numRings) * 0.05;

      ctx.beginPath();
      for (let i = 0; i <= numSpokes; i++) {
        const angle = (Math.PI * 2 * i) / numSpokes;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(232, 0, 28, ${ringAlpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

/* ─── Glitch text with chromatic aberration ─── */
function GlitchText({ text, delay }: { text: string; delay: number }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsGlitching(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!isGlitching) return;
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [isGlitching]);

  return (
    <span
      className="relative inline-block"
      style={{
        textShadow: isGlitching
          ? "2px 0 rgba(232,0,28,0.8), -2px 0 rgba(37,99,235,0.8)"
          : "none",
        transition: "text-shadow 0.1s",
      }}
    >
      {text}
    </span>
  );
}

/* ─── Spider dropping from thread ─── */
function SpiderDrop() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Thread */}
      <motion.div
        className="w-[1px] bg-gradient-to-b from-transparent via-zinc-600 to-[var(--theme-accent)] origin-top"
        initial={{ height: 0 }}
        animate={{ height: 48 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Spider body — animated SVG */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <motion.svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Abdomen */}
          <ellipse cx="18" cy="15" rx="5" ry="7" fill="var(--theme-accent)" />
          {/* Thorax */}
          <ellipse cx="18" cy="24" rx="3.5" ry="4" fill="var(--theme-accent)" />

          {/* Legs — animated pairs */}
          {[
            { x1: 18, y1: 11, x2: 6, y2: 5 },
            { x1: 18, y1: 14, x2: 4, y2: 14 },
            { x1: 18, y1: 17, x2: 5, y2: 24 },
            { x1: 18, y1: 20, x2: 7, y2: 30 },
            { x1: 18, y1: 11, x2: 30, y2: 5 },
            { x1: 18, y1: 14, x2: 32, y2: 14 },
            { x1: 18, y1: 17, x2: 31, y2: 24 },
            { x1: 18, y1: 20, x2: 29, y2: 30 },
          ].map((leg, i) => (
            <motion.line
              key={i}
              x1={leg.x1}
              y1={leg.y1}
              x2={leg.x2}
              y2={leg.y2}
              stroke="var(--theme-accent)"
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
            />
          ))}

          {/* Eyes — Spidey style (angular) */}
          <path
            d="M14.5 12.5 L16 11 L17 13 Z"
            fill="#09090b"
          />
          <path
            d="M21.5 12.5 L20 11 L19 13 Z"
            fill="#09090b"
          />

          {/* Subtle body glow */}
          <ellipse cx="18" cy="15" rx="5" ry="7" fill="none" stroke="rgba(232,0,28,0.3)" strokeWidth="2">
            <animate attributeName="stroke-opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
          </ellipse>
        </motion.svg>
      </motion.div>
    </div>
  );
}

/* ─── Status messages — comic-book style ─── */
const STATUS_MESSAGES = [
  { threshold: 0, text: "Spinning web..." },
  { threshold: 15, text: "Spider-sense tingling..." },
  { threshold: 35, text: "With great power..." },
  { threshold: 55, text: "Loading the multiverse..." },
  { threshold: 75, text: "Suiting up..." },
  { threshold: 90, text: "Thwip!" },
  { threshold: 99, text: "Ready." },
];

function getStatusText(progress: number): string {
  let msg = STATUS_MESSAGES[0].text;
  for (const s of STATUS_MESSAGES) {
    if (progress >= s.threshold) msg = s.text;
  }
  return msg;
}

/* ═══════════════════════════════════════════════════════
   Main Loading Screen — resource-aware progress
   
   Progress is split into 3 weighted phases:
   ┌──────────────┬──────────────┬──────────────┐
   │  0-30%       │  30-85%      │  85-100%     │
   │  Fonts/Base  │  Sections    │  Final ready │
   └──────────────┴──────────────┴──────────────┘
   ═══════════════════════════════════════════════════════ */
export default function LoadingScreen({
  onComplete,
  sectionsReady = 0,
  totalSections = 11,
}: Props) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [statusText, setStatusText] = useState("Spinning web...");
  const [fontsReady, setFontsReady] = useState(false);
  const targetProgressRef = useRef(0);
  const displayRef = useRef(0);
  const hasCompletedRef = useRef(false);
  const [mountTime] = useState(() => (typeof performance !== 'undefined' ? performance.now() : 0));
  const mountTimeRef = useRef(mountTime);

  const startExit = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    setExiting(true);
    setTimeout(onComplete, 900);
  }, [onComplete]);

  /* Phase 1: Wait for fonts */
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.fonts.ready.then(() => {
      setTimeout(() => setFontsReady(true), 0);
    });
  }, []);

  /* Calculate target progress from real signals */
  useEffect(() => {
    let target = 0;

    // Phase 1: Fonts (0-30%)
    if (fontsReady) {
      target = 30;
    } else {
      // Animate slowly to ~25% while fonts load
      target = 25;
    }

    // Phase 2: Lazy sections (30-85%)
    if (fontsReady && totalSections > 0) {
      const sectionProgress = sectionsReady / totalSections;
      target = 30 + sectionProgress * 55;
    }

    // Phase 3: All sections ready → 100%
    if (fontsReady && sectionsReady >= totalSections) {
      target = 100;
    }

    targetProgressRef.current = target;
  }, [fontsReady, sectionsReady, totalSections]);

  /* Smooth progress animation via rAF — lerps toward target
     with a time-based ceiling to ensure minimum display time */
  useEffect(() => {
    let frame: number;
    const MIN_DISPLAY_MS = 3000; // Reduced to 3 seconds for snappier mobile feel

    function tick() {
      /* Time-based ceiling: even if resources load instantly,
         the visual progress can't outrun this eased curve */
      const elapsed = performance.now() - mountTimeRef.current;
      const timeFraction = Math.min(1, elapsed / MIN_DISPLAY_MS);
      // Ease-out cubic for natural feel (fast start, slow finish)
      const easedCeiling = 1 - Math.pow(1 - timeFraction, 3);
      const ceilingPercent = easedCeiling * 100;

      const rawTarget = targetProgressRef.current;
      const target = Math.min(rawTarget, ceilingPercent);
      const current = displayRef.current;

      // Lerp speed: fast when far, slow when close
      const diff = target - current;
      const speed = Math.max(0.3, Math.abs(diff) * 0.08);
      const next = Math.min(100, current + Math.sign(diff) * speed);

      // Snap when close enough
      const snapped = Math.abs(target - next) < 0.5 ? target : next;
      const rounded = Math.round(snapped);

      if (rounded !== Math.round(displayRef.current)) {
        displayRef.current = snapped;
        setDisplayProgress(rounded);
        setStatusText(getStatusText(rounded));
      } else {
        displayRef.current = snapped;
      }

      // Exit when we hit 100
      if (rounded >= 100 && !hasCompletedRef.current) {
        startExit();
        return;
      }

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [startExit]);

  /* Safety net: if everything hangs for 8s, force-complete */
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!hasCompletedRef.current) {
        targetProgressRef.current = 100;
      }
    }, 8000);
    return () => clearTimeout(timeout);
  }, []);

  /* Portal target — render outside SmoothScrollProvider's overflow-hidden container */
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setTimeout(() => setPortalTarget(document.body), 0);
  }, []);

  const content = (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#09090b]"
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: "blur(8px)",
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated web growing from center */}
          <WebCanvas progress={displayProgress} />

          {/* Radial accent glow — pulses */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(232,0,28,0.08) 0%, transparent 50%)",
            }}
          />

          {/* Scan lines overlay — retro comic effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
            }}
          />

          {/* ── Center content ── */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Spider dropping from thread */}
            <SpiderDrop />

            {/* Spacer */}
            <div className="h-8" />

            {/* Name with glitch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center"
            >
              <h2
                className="text-3xl sm:text-4xl font-black tracking-tight text-white"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <GlitchText text="Rishi" delay={1200} />
                <span style={{ color: "var(--theme-accent)" }}>.</span>
              </h2>
            </motion.div>

            {/* Progress bar — web strand style */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              className="mt-8 relative w-56 sm:w-64"
            >
              {/* Track */}
              <div className="h-[2px] bg-zinc-800/80 rounded-full overflow-hidden relative">
                {/* Fill */}
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    width: `${displayProgress}%`,
                    background:
                      "linear-gradient(90deg, var(--theme-accent), #ff4d6a)",
                    boxShadow:
                      "0 0 12px rgba(232,0,28,0.6), 0 0 24px rgba(232,0,28,0.3)",
                    transition: "width 0.1s ease-out",
                  }}
                />
                {/* Glow dot at the end */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                  style={{
                    left: `calc(${displayProgress}% - 4px)`,
                    background: "var(--theme-accent)",
                    boxShadow: "0 0 8px var(--theme-accent), 0 0 16px rgba(232,0,28,0.4)",
                    opacity: displayProgress > 2 ? 1 : 0,
                    transition: "left 0.1s ease-out, opacity 0.3s",
                  }}
                />
              </div>

              {/* Percentage counter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex justify-between items-center mt-3"
              >
                <span
                  className="text-[10px] tracking-[0.3em] uppercase text-zinc-600"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Loading
                </span>
                <span
                  className="text-xs font-bold tabular-nums"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: "var(--theme-accent)",
                  }}
                >
                  {displayProgress}%
                </span>
              </motion.div>
            </motion.div>

            {/* Status text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.4, delay: 1.3 }}
              className="mt-6 text-[10px] tracking-[0.4em] uppercase text-zinc-500 h-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={statusText}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {statusText}
                </motion.span>
              </AnimatePresence>
            </motion.p>
          </div>

          {/* Bottom web strand — accent line with glow */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-[1px] bg-zinc-900/50 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full"
                style={{
                  width: `${displayProgress}%`,
                  background: "linear-gradient(90deg, transparent, var(--theme-accent))",
                  boxShadow: "0 0 10px var(--theme-accent)",
                  transition: "width 0.1s ease-out",
                }}
              />
            </div>
          </div>

          {/* Corner web accent — top left */}
          <motion.svg
            className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
            viewBox="0 0 100 100"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.06 }}
            transition={{ delay: 0.3 }}
          >
            <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="100" y2="50" stroke="white" strokeWidth="0.5" />
            <path d="M 15 60 Q 30 30 60 15" stroke="white" strokeWidth="0.5" fill="none" />
            <path d="M 8 35 Q 18 18 35 8" stroke="white" strokeWidth="0.5" fill="none" />
          </motion.svg>

          {/* Corner web accent — bottom right */}
          <motion.svg
            className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none rotate-180"
            viewBox="0 0 100 100"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.06 }}
            transition={{ delay: 0.5 }}
          >
            <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="100" y2="50" stroke="white" strokeWidth="0.5" />
            <path d="M 15 60 Q 30 30 60 15" stroke="white" strokeWidth="0.5" fill="none" />
            <path d="M 8 35 Q 18 18 35 8" stroke="white" strokeWidth="0.5" fill="none" />
          </motion.svg>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  /* Render via portal to escape SmoothScrollProvider's scroll container.
     Falls back to inline render if portal target isn't ready yet. */
  if (portalTarget) {
    return createPortal(content, portalTarget);
  }
  return content;
}
