"use client";

import dynamic from "next/dynamic";

/* Heavy client-only overlays — lazy loaded, no SSR */
const HalftoneOverlay = dynamic(
  () => import("./HalftoneOverlay").then((m) => ({ default: m.HalftoneOverlay })),
  { ssr: false }
);
const SpiderSenseTransition = dynamic(
  () => import("./SpiderSenseTransition").then((m) => ({ default: m.SpiderSenseTransition })),
  { ssr: false }
);
const WebScrollbar = dynamic(
  () => import("./WebScrollbar").then((m) => ({ default: m.WebScrollbar })),
  { ssr: false }
);
const WebCursor = dynamic(
  () => import("./WebCursor").then((m) => ({ default: m.WebCursor })),
  { ssr: false }
);
const WebPullToTop = dynamic(
  () => import("./WebPullToTop").then((m) => ({ default: m.WebPullToTop })),
  { ssr: false }
);
const EasterEggs = dynamic(
  () => import("./EasterEggs").then((m) => ({ default: m.EasterEggs })),
  { ssr: false }
);

export function LayoutOverlays() {
  return (
    <>
      <HalftoneOverlay />
      <SpiderSenseTransition />
      <WebScrollbar />
      <WebCursor />
      <WebPullToTop />
      <EasterEggs />
    </>
  );
}
