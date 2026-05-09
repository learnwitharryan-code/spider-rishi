"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SpiderSVG = ({ size = 28 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M 50 25 C 45 25 40 30 40 40 C 40 50 45 55 50 55 C 55 55 60 50 60 40 C 60 30 55 25 50 25 Z" />
    <path d="M 50 50 C 40 50 35 60 35 75 C 35 85 45 90 50 90 C 55 90 65 85 65 75 C 65 60 60 50 50 50 Z" />
    <path d="M 45 35 L 20 20 L 10 30" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 55 35 L 80 20 L 90 30" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 42 45 L 15 40 L 5 50" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 58 45 L 85 40 L 95 50" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 42 60 L 15 70 L 5 60" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 58 60 L 85 70 L 95 60" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 45 75 L 25 95 L 30 100" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 55 75 L 75 95 L 70 100" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Helper function to generate a classic, recognizable spider web SVG path
function generateClassicWebSplat(
  radius: number,
  numSpokes: number,
  numRings: number,
) {
  let path = "";

  const angleStep = (Math.PI * 2) / numSpokes;

  // Store the actual randomized spoke endpoints and radii to connect the rings perfectly
  const spokes: { angle: number; r: number; x: number; y: number }[] = [];

  // Generate Spoke data
  for (let i = 0; i < numSpokes; i++) {
    const angle = i * angleStep + (Math.random() * 0.3 - 0.15); // Add jitter to angles
    const spokeRadius = radius * (0.8 + Math.random() * 0.5); // Jagged outer edges
    const x = Math.cos(angle) * spokeRadius;
    const y = Math.sin(angle) * spokeRadius;
    spokes.push({ angle, r: spokeRadius, x, y });

    // Draw the spoke line from center
    path += `M 0 0 L ${x} ${y} `;
  }

  // Generate Sagging Concentric Rings
  for (let r = 1; r <= numRings; r++) {
    // We go from 0 to numSpokes (closing the loop)
    for (let i = 0; i < numSpokes; i++) {
      const spoke1 = spokes[i];
      const spoke2 = spokes[(i + 1) % numSpokes];

      const distancePercentage = r / (numRings + 1); // e.g., 25%, 50%, 75% along the spoke

      // Nodes on the two adjacent spokes where the ring attaches
      const x1 = Math.cos(spoke1.angle) * (spoke1.r * distancePercentage);
      const y1 = Math.sin(spoke1.angle) * (spoke1.r * distancePercentage);

      const x2 = Math.cos(spoke2.angle) * (spoke2.r * distancePercentage);
      const y2 = Math.sin(spoke2.angle) * (spoke2.r * distancePercentage);

      // Create "sag" by pulling the control point closer to origin
      let midAngle = (spoke1.angle + spoke2.angle) / 2;
      // Handle the wrapping angle case (e.g. 350 deg to 10 deg)
      if (Math.abs(spoke1.angle - spoke2.angle) > Math.PI) {
        midAngle += Math.PI;
      }

      const avgRadius = (spoke1.r + spoke2.r) / 2;
      const sagRadius = avgRadius * distancePercentage * 0.7; // The 0.7 creates the inward droop

      const cx = Math.cos(midAngle) * sagRadius;
      const cy = Math.sin(midAngle) * sagRadius;

      if (i === 0) {
        path += `M ${x1} ${y1} `;
      }

      // Draw quadratic bezier curve from spoke1 to spoke2
      path += `Q ${cx} ${cy} ${x2} ${y2} `;
    }
  }

  // Splatter dots around the web for more realism
  for (let i = 0; i < 6; i++) {
    const splatAngle = Math.random() * Math.PI * 2;
    const splatDist = radius * (1 + Math.random() * 0.5);
    const sx = Math.cos(splatAngle) * splatDist;
    const sy = Math.sin(splatAngle) * splatDist;
    path += `M ${sx} ${sy} A 1.5 1.5 0 1 0 ${sx + 0.1} ${sy} `;
  }

  return path;
}

type WebShot = {
  id: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  splatPath: string;
  rotation: number;
  scale: number;
};

export function WebCursor() {
  const [shots, setShots] = useState<WebShot[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Disable on touch / coarse-pointer devices to preserve battery/performance
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
      // Do not enable cursor or handlers on touch devices
      const t = setTimeout(() => setIsReady(false), 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIsReady(true), 0);
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e: MouseEvent) => {
      const targetX = e.clientX;
      const targetY = e.clientY;

      // Shoot from either bottom-left or bottom-right wrist
      const originX =
        Math.random() > 0.5 ? window.innerWidth * 0.1 : window.innerWidth * 0.9;
      const originY = window.innerHeight;

      // Generate a classic spider-web splat
      const radius = 35 + Math.random() * 25; // 35px - 60px radius
      const numSpokes = 6 + Math.floor(Math.random() * 3); // 6 - 8 spokes
      const numRings = 3 + Math.floor(Math.random() * 2); // 3 - 4 rings

      const splatPath = generateClassicWebSplat(radius, numSpokes, numRings);

      const newShot: WebShot = {
        id: Date.now(),
        originX,
        originY,
        targetX,
        targetY,
        splatPath,
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4,
      };

      setShots((prev) => [...prev, newShot]);

      // Temporary Trace: Stay for 5 seconds total before fully unmounting
      setTimeout(() => {
        setShots((prev) => prev.filter((s) => s.id !== newShot.id));
      }, 5000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      clearTimeout(t);
    };
  }, []);

  if (!isReady) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center"
        style={{
          width: 28,
          height: 28,
          transform: `translate(${cursorPos.x - 14}px, ${cursorPos.y - 14}px)`,
          color: "white",
          filter: "drop-shadow(0 0 6px rgba(255,255,255,0.8))",
        }}
      >
        <SpiderSVG size={28} />
      </div>

      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[99]">
        <AnimatePresence>
          {shots.map((shot) => (
            <motion.g
              key={shot.id}
              // Fade out the entire web cluster smoothly at the end of its 5s lifespan
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }} // Smooth death animation
            >
              {/* 1. The projectile web strand shooting from the "wrist" (bottom corners) */}
              <motion.line
                x1={shot.originX}
                y1={shot.originY}
                x2={shot.targetX}
                y2={shot.targetY}
                stroke="rgba(255, 255, 255, 0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.4))" }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.15, ease: "easeOut" }} // Zips to target in 150ms
              />

              {/* 2. The distinct, realistic Spider-Web "Splat" that bursts open on impact */}
              <motion.g
                // FIX: Pass x and y to Framer Motion's geometry pipeline explicitly
                // so it doesn't get detached from the transform prop
                initial={{
                  x: shot.targetX,
                  y: shot.targetY,
                  scale: 0,
                  rotate: shot.rotation,
                  opacity: 0,
                }}
                animate={{
                  x: shot.targetX,
                  y: shot.targetY,
                  scale: shot.scale,
                  rotate: shot.rotation,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
              >
                <path
                  d={shot.splatPath}
                  fill="none"
                  stroke="rgba(255,255,255, 0.9)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: "drop-shadow(0px 1px 3px rgba(0,0,0,0.5))" }}
                />
                {/* Small central glob holding it together */}
                <circle cx="0" cy="0" r="3" fill="white" />
              </motion.g>
            </motion.g>
          ))}
        </AnimatePresence>
      </svg>
    </>
  );
}
