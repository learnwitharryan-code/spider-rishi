/**
 * SpiderWebBg — centred 8-point radial spider web SVG.
 * Rendered at low opacity as a background texture.
 */
export default function SpiderWebBg({
  className = "",
  opacity = 0.12,
  color = "var(--theme-accent)",
}: {
  className?: string;
  opacity?: number;
  color?: string;
}) {
  return (
    <svg
      className={`pointer-events-none spider-web-bg-element transition-opacity duration-700 ${className}`}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* 8 radial threads from centre (600, 400) to viewport edges */}
      <line
        x1="600"
        y1="400"
        x2="1200"
        y2="400"
        stroke={color}
        strokeWidth="0.8"
      />
      <line
        x1="600"
        y1="400"
        x2="1000"
        y2="800"
        stroke={color}
        strokeWidth="0.8"
      />
      <line
        x1="600"
        y1="400"
        x2="600"
        y2="800"
        stroke={color}
        strokeWidth="0.8"
      />
      <line
        x1="600"
        y1="400"
        x2="200"
        y2="800"
        stroke={color}
        strokeWidth="0.8"
      />
      <line
        x1="600"
        y1="400"
        x2="0"
        y2="400"
        stroke={color}
        strokeWidth="0.8"
      />
      <line
        x1="600"
        y1="400"
        x2="200"
        y2="0"
        stroke={color}
        strokeWidth="0.8"
      />
      <line
        x1="600"
        y1="400"
        x2="600"
        y2="0"
        stroke={color}
        strokeWidth="0.8"
      />
      <line
        x1="600"
        y1="400"
        x2="1000"
        y2="0"
        stroke={color}
        strokeWidth="0.8"
      />

      {/* Concentric octagon rings at r = 110, 220, 340, 460 */}
      <polygon
        points="710,400 678,478 600,510 522,478 490,400 522,322 600,290 678,322"
        stroke={color}
        strokeWidth="0.8"
      />
      <polygon
        points="820,400 755,555 600,622 445,555 380,400 445,245 600,178 755,245"
        stroke={color}
        strokeWidth="0.8"
      />
      <polygon
        points="940,400 840,640 600,735 360,640 260,400 360,160 600,66 840,160"
        stroke={color}
        strokeWidth="0.8"
      />
      <polygon
        points="1060,400 924,723 600,845 276,723 140,400 276,77 600,-46 924,77"
        stroke={color}
        strokeWidth="0.8"
      />
    </svg>
  );
}
