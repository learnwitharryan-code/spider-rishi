"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { motionValue, type MotionValue } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   Context API
   ═══════════════════════════════════════════════════════════ */
interface SmoothScrollContextType {
  /** Programmatic scroll: pass a pixel value or CSS selector string */
  scrollTo: (target: number | string) => void;
  /** Current scroll position (imperative getter, O(1)) */
  getPosition: () => number;
  /** Reactive MotionValue — absolute scroll position in pixels */
  scrollY: MotionValue<number>;
  /** Reactive MotionValue — normalized 0‥1 scroll progress */
  scrollYProgress: MotionValue<number>;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | null>(null);

export const useSmoothScroll = () => {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error("useSmoothScroll must be used within SmoothScrollProvider");
  return ctx;
};

/* ═══════════════════════════════════════════════════════════
   Provider — two‑layer virtual scroll with Lerp engine
   ═══════════════════════════════════════════════════════════ */
export function SmoothScrollProvider({ children, overlays }: { children: React.ReactNode; overlays?: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  /* ── MotionValues (created once, never re-created) ────── */
  const scrollYRef = useRef(motionValue(0));
  const scrollYProgressRef = useRef(motionValue(0));

  /* ── Mutable state kept outside React for perf ────────── */
  const state = useRef({
    currentY: 0,
    targetY: 0,
    maxScroll: 0,
    velocity: 0,
    isDragging: false,
    lastTouchY: 0,
    lastTouchTime: 0,
  });

  const rafId = useRef(0);

  /* ── Tuning constants ─────────────────────────────────── */
  const SMOOTH_FACTOR = 0.08;
  const INERTIA_MULTIPLIER = 5;
  const INERTIA_DECAY = 0.95;

  /* ── Recalculate scroll bounds (debounced for resize perf) ── */
  const recalcBoundsRaw = useCallback(() => {
    if (!innerRef.current || !outerRef.current) return;
    const max = Math.max(0, innerRef.current.scrollHeight - outerRef.current.clientHeight);
    state.current.maxScroll = max;
    state.current.targetY = Math.max(0, Math.min(state.current.targetY, max));
  }, []);

  const resizeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recalcBounds = useCallback(() => {
    if (resizeTimer.current) clearTimeout(resizeTimer.current);
    resizeTimer.current = setTimeout(recalcBoundsRaw, 100);
  }, [recalcBoundsRaw]);

  /* ── RAF render loop ──────────────────────────────────── */
  const loop = useCallback(function loopFn() {
    const s = state.current;

    // Momentum on touch release
    if (!s.isDragging && Math.abs(s.velocity) > 0.5) {
      s.targetY += s.velocity * INERTIA_MULTIPLIER;
      s.velocity *= INERTIA_DECAY;
    } else if (!s.isDragging) {
      s.velocity = 0;
    }

    // Clamp
    s.targetY = Math.max(0, Math.min(s.targetY, s.maxScroll));

    // Lerp
    const prev = s.currentY;
    s.currentY += (s.targetY - s.currentY) * SMOOTH_FACTOR;

    // Snap
    if (Math.abs(s.targetY - s.currentY) < 0.05) s.currentY = s.targetY;

    // Only write to DOM when position actually changed
    if (Math.abs(s.currentY - prev) > 0.01) {
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(0, -${s.currentY}px, 0)`;
      }

      // Update MotionValues for Framer Motion consumers
      scrollYRef.current.set(s.currentY);
      scrollYProgressRef.current.set(s.maxScroll > 0 ? s.currentY / s.maxScroll : 0);
    }

    rafId.current = requestAnimationFrame(loopFn);
  }, []);

  /* ── Set up RAF + ResizeObserver ───────────────────────── */
  useEffect(() => {
    recalcBounds();

    const ro = new ResizeObserver(recalcBounds);
    if (innerRef.current) ro.observe(innerRef.current);
    window.addEventListener("resize", recalcBounds);

    rafId.current = requestAnimationFrame(loop);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalcBounds);
      cancelAnimationFrame(rafId.current);
    };
  }, [recalcBounds, loop]);

  /* ── Input handlers (wheel + touch) ───────────────────── */
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      state.current.targetY += e.deltaY;
      state.current.velocity = 0;
    };

    const onTouchStart = (e: TouchEvent) => {
      state.current.isDragging = true;
      state.current.lastTouchY = e.touches[0].clientY;
      state.current.lastTouchTime = performance.now();
      state.current.velocity = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!state.current.isDragging) return;
      const y = e.touches[0].clientY;
      const dy = state.current.lastTouchY - y;
      const now = performance.now();
      const dt = now - state.current.lastTouchTime;

      state.current.targetY += dy;
      if (dt > 0) state.current.velocity = dy / dt;

      state.current.lastTouchY = y;
      state.current.lastTouchTime = now;
    };

    const onTouchEnd = () => {
      state.current.isDragging = false;
    };

    outer.addEventListener("wheel", onWheel, { passive: false });
    outer.addEventListener("touchstart", onTouchStart, { passive: true });
    outer.addEventListener("touchmove", onTouchMove, { passive: false });
    outer.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      outer.removeEventListener("wheel", onWheel);
      outer.removeEventListener("touchstart", onTouchStart);
      outer.removeEventListener("touchmove", onTouchMove);
      outer.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  /* ── Public API ────────────────────────────────────────── */
  const scrollTo = useCallback((target: number | string) => {
    if (typeof target === "number") {
      state.current.targetY = Math.max(0, Math.min(target, state.current.maxScroll));
    } else {
      const el = document.querySelector(target);
      if (el) {
        // getBoundingClientRect gives position relative to viewport,
        // add currentY to get position in the virtual document
        const rect = el.getBoundingClientRect();
        state.current.targetY = state.current.currentY + rect.top;
      }
    }
  }, []);

  const getPosition = useCallback(() => state.current.currentY, []);

  const api = useRef<SmoothScrollContextType>({
    scrollTo,
    getPosition,
    scrollY: scrollYRef.current,
    scrollYProgress: scrollYProgressRef.current,
  });

  return (
    <SmoothScrollContext.Provider value={api.current}>
      {overlays}
      <div
        ref={outerRef}
        className="fixed inset-0 w-full h-[100dvh] overflow-hidden overscroll-none z-0 bg-[var(--theme-bg)]"
      >
        <div ref={innerRef} className="w-full will-change-transform">
          {children}
        </div>
      </div>
    </SmoothScrollContext.Provider>
  );
}
