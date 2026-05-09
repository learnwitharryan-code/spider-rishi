"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SpiderSenseTransition() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleTrigger = () => {
      if (isAnimating) return;
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 700);
    };
    window.addEventListener("trigger-spider-sense", handleTrigger);
    return () =>
      window.removeEventListener("trigger-spider-sense", handleTrigger);
  }, [isAnimating]);

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="absolute inset-0 bg-[var(--theme-accent)]/10"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.4, times: [0, 0.2, 1] }}
          />

          <motion.svg
            className="absolute left-4 md:left-24 h-[60vh] w-auto drop-shadow-2xl"
            viewBox="0 0 100 200"
            preserveAspectRatio="xMidYMid meet"
            initial={{ scale: 0.5, x: -50, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], x: 0, opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <path
              d="M 50 10 L 80 50 L 30 100 L 90 150 L 40 190"
              fill="none"
              stroke="var(--theme-accent)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 12px var(--theme-accent))" }}
            />
          </motion.svg>

          <motion.svg
            className="absolute right-4 md:right-24 h-[60vh] w-auto drop-shadow-2xl"
            viewBox="0 0 100 200"
            preserveAspectRatio="xMidYMid meet"
            initial={{ scale: 0.5, x: 50, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], x: 0, opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          >
            <path
              d="M 50 10 L 20 50 L 70 100 L 10 150 L 60 190"
              fill="none"
              stroke="var(--theme-accent-alt, var(--theme-accent))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 12px var(--theme-accent-alt, var(--theme-accent)))" }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
