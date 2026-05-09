"use client";

import { useEffect, useState } from "react";
import { useSpring, motion, useTransform } from "framer-motion";
import { useSmoothScroll } from "./SmoothScrollProvider";

export function WebScrollbar() {
  const { scrollYProgress } = useSmoothScroll();
  const [mounted, setMounted] = useState(false);

  // Note: framer-motion useSpring and useTransform use requestAnimationFrame internally
  // Smooth out the scroll progress for natural trailing physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  // Translate progress to viewport height percentage (avoiding off-screen clipping)
  const yOffsets = useTransform(
    smoothProgress,
    [0, 1],
    ["0px", "calc(100vh - 12px)"],
  );

  // Scale the web-line vertically tracking the thumb
  const webScaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 right-0 w-8 h-screen z-[100] pointer-events-none mix-blend-difference overflow-hidden">
      {/* The Web Line */}
      <motion.div
        className="absolute top-0 right-3 w-[1px] bg-white origin-top"
        style={{ height: "100vh", scaleY: webScaleY }}
      />
      {/* The Spider (Thumb) */}
      <motion.div
        className="absolute top-0 right-[9px] w-[9px] h-[9px] rounded-full bg-white flex items-center justify-center -translate-y-full"
        style={{ top: yOffsets }}
      >
        {/* Visual spider detail */}
        <div className="w-[3px] h-[3px] rounded-full bg-black" />
      </motion.div>
    </div>
  );
}
