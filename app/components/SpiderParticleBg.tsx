"use client";

import { useEffect, useRef, useState } from "react";

interface SpiderParticleBgProps {
  className?: string;
  color?: string;
  opacity?: number;
  particleCount?: number;
}

export default function SpiderParticleBg({
  className = "",
  color = "var(--theme-accent)",
  opacity = 1,
  particleCount = 50,
}: SpiderParticleBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
    const t = setTimeout(() => setEnabled(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let originX = 0;
    let originY = 0;

    let currentHex = color;
    if (color.startsWith("var(")) {
      const varName = color.slice(4, -1).trim();
      currentHex = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
    }
    const rgbColor = hexToRgb(currentHex) || { r: 232, g: 0, b: 28 };

    const numSpokes = 12;
    const numRings = Math.max(5, Math.floor(particleCount / numSpokes));

    // Use a 2D lookup instead of Array.find() — O(1) instead of O(n)
    const nodeGrid: { x: number; y: number; baseX: number; baseY: number; vx: number; vy: number }[][] = [];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      originX = width / 2;
      originY = height;

      // Clear and rebuild grid
      nodeGrid.length = 0;
      const maxRadius = Math.max(width, height) * 1.2;
      const ringSpacing = maxRadius / numRings;

      for (let r = 0; r <= numRings; r++) {
        nodeGrid[r] = [];
        if (r === 0) continue; // ring 0 is origin
        const radius = r * ringSpacing;
        for (let s = 0; s < numSpokes; s++) {
          const angle = Math.PI + Math.PI * (s / (numSpokes - 1));
          const jitter = (Math.random() - 0.5) * (ringSpacing * 0.2);
          const nx = originX + Math.cos(angle) * (radius + jitter);
          const ny = originY + Math.sin(angle) * (radius + jitter);
          nodeGrid[r][s] = { x: nx, y: ny, baseX: nx, baseY: ny, vx: 0, vy: 0 };
        }
      }
    };

    const pullRadius = 300;
    const pullRadiusSq = pullRadius * pullRadius;
    const springForce = 0.05;
    const damping = 0.85;
    const TWO_PI = Math.PI * 2;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const now = Date.now() * 0.001;

      // Update physics + draw spokes in one pass
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${opacity * 0.6})`;

      for (let s = 0; s < numSpokes; s++) {
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        for (let r = 1; r <= numRings; r++) {
          const node = nodeGrid[r]?.[s];
          if (!node) continue;

          // Physics update inline (avoids function call overhead per node)
          const dxMouse = mouseX - node.x;
          const dyMouse = mouseY - node.y;
          const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;
          const distMouse = distMouseSq < pullRadiusSq ? Math.sqrt(distMouseSq) : pullRadius + 1;

          let targetX = node.baseX;
          let targetY = node.baseY;
          if (distMouse < pullRadius && mouseX > 0) {
            const force = (pullRadius - distMouse) / pullRadius;
            targetX += dxMouse * force * 0.15;
            targetY += dyMouse * force * 0.15;
          }

          node.vx = (node.vx + (targetX - node.x) * springForce) * damping;
          node.vy = (node.vy + (targetY - node.y) * springForce) * damping;
          node.x += node.vx + Math.sin(now + r) * 0.2;
          node.y += node.vy + Math.cos(now + s) * 0.2;

          ctx.lineTo(node.x, node.y);
        }
        ctx.stroke();
      }

      // Draw rings
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${opacity * 0.4})`;
      const dotStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${opacity * 0.8})`;

      for (let r = 1; r <= numRings; r++) {
        ctx.beginPath();
        let first = true;
        for (let s = 0; s < numSpokes; s++) {
          const node = nodeGrid[r]?.[s];
          if (!node) continue;
          if (first) { ctx.moveTo(node.x, node.y); first = false; }
          else ctx.lineTo(node.x, node.y);
        }
        ctx.stroke();

        // Dew drops
        ctx.fillStyle = dotStyle;
        for (let s = 0; s < numSpokes; s++) {
          const node = nodeGrid[r]?.[s];
          if (!node) continue;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 1.5, 0, TWO_PI);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 150);
    };

    let moveRaf = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (moveRaf) return;
      moveRaf = requestAnimationFrame(() => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        moveRaf = 0;
      });
    };
    const handleMouseLeave = () => { mouseX = -1000; mouseY = -1000; };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (moveRaf) cancelAnimationFrame(moveRaf);
    };
  }, [enabled, color, opacity, particleCount]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none block ${className}`}
      aria-hidden="true"
    />
  );
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}
