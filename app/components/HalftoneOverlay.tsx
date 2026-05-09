"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

export function HalftoneOverlay() {
  const [mounted, setMounted] = useState(false);

  // Track mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the mouse movement
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    setMounted(true);
    // Set initial position to center
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Use a motion template to dynamically update the mask
  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] mix-blend-overlay">
      {/* The actual halftone pattern */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          // Creates the dots
          backgroundImage: `radial-gradient(circle, var(--theme-accent) 2px, transparent 2.5px)`,
          backgroundSize: "10px 10px",
          // Masks the dots so they only appear in a radius around the mouse
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          opacity: 0.15, // Subtle texture
        }}
      />
    </div>
  );
}
