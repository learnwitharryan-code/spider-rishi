"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CamoWrapper({ children }: { children: React.ReactNode }) {
  const [isCamo, setIsCamo] = useState(false);

  useEffect(() => {
    const toggleCamo = () => setIsCamo((prev) => !prev);
    window.addEventListener("toggle-camo", toggleCamo);
    return () => window.removeEventListener("toggle-camo", toggleCamo);
  }, []);

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {isCamo && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[40] pointer-events-none mix-blend-color"
            style={{
              background:
                "linear-gradient(135deg, rgba(20,20,30,0.4) 0%, rgba(10,10,15,0.7) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          opacity: isCamo ? 0.15 : 1,
          scale: isCamo ? 0.98 : 1,
          filter: isCamo
            ? "blur(3px) grayscale(50%)"
            : "blur(0px) grayscale(0%)",
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
