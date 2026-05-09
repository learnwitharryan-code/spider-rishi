"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "./SmoothScrollProvider";

export function WebPullToTop() {
  const { scrollTo, scrollY } = useSmoothScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isShooting, setIsShooting] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => {
      setIsVisible(y > 500);
    });
    return unsub;
  }, [scrollY]);

  const handleScrollToTop = () => {
    if (isShooting) return;
    setIsShooting(true);

    // Wait for web to shoot up before pulling
    setTimeout(() => {
      scrollTo(0);

      // Allow animation to finish
      setTimeout(() => {
        setIsShooting(false);
      }, 800);
    }, 300);
  };

  return (
    <>
      {/* The web line that shoots up */}
      <AnimatePresence>
        {isShooting && (
          <motion.div
            initial={{ height: 0, opacity: 1 }}
            animate={{ height: "100vh", opacity: [1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              height: { duration: 0.2, ease: "easeOut" },
              opacity: { duration: 0.8, delay: 0.3 },
            }}
            className="fixed bottom-10 right-10 w-[2px] bg-white origin-bottom z-[90] pointer-events-none"
            style={{ filter: "drop-shadow(0 0 8px var(--theme-accent))" }}
          />
        )}
      </AnimatePresence>

      {/* The trigger button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={handleScrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center z-[100] group shadow-2xl backdrop-blur-md overflow-hidden"
            aria-label="Scroll to top"
          >
            {/* Inner spider styling */}
            <div className="relative w-full h-full flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              {/* Spider-themed active glow */}
              <div className="absolute inset-0 bg-[var(--theme-accent)] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
