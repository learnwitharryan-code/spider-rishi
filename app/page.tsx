"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";

/* ═══════════════════════════════════════════════════════
   Section-ready tracking via module-level pub/sub
   
   Each dynamic import signals when its JS chunk finishes
   downloading. The LoadingScreen subscribes to this count
   and maps it to real progress (30-85% range).
   ═══════════════════════════════════════════════════════ */
let sectionReadyCount = 0;
const sectionListeners = new Set<(count: number) => void>();

function signalSectionReady() {
  sectionReadyCount++;
  sectionListeners.forEach((fn) => fn(sectionReadyCount));
}

function useSectionReadyCount() {
  const [count, setCount] = useState(sectionReadyCount);

  useEffect(() => {
    // Sync in case signals fired before this component mounted
    setTimeout(() => setCount(sectionReadyCount), 0);
    const handler = (c: number) => setTimeout(() => setCount(c), 0);
    sectionListeners.add(handler);
    return () => {
      sectionListeners.delete(handler);
    };
  }, []);

  return count;
}

/* ═══════════════════════════════════════════════════════
   Tracked dynamic imports — signal on chunk download
   
   Each .then() fires the moment the JS chunk is fetched
   and parsed, BEFORE the component mounts. This gives
   the preloader an accurate "download complete" signal.
   ═══════════════════════════════════════════════════════ */
const TOTAL_SECTIONS = 11;

/* Hero — client only, no SSR (heaviest component: canvas + framer-motion) */
const Hero = dynamic(
  () => import("./components/Hero").then((m) => { signalSectionReady(); return m; }),
  { ssr: false }
);

/* Below-fold sections — code-split + tracked */
const Introduction = dynamic(
  () => import("./components/Introduction").then((m) => { signalSectionReady(); return m; })
);
const Skills = dynamic(
  () => import("./components/Skills").then((m) => { signalSectionReady(); return m; })
);
const Expertise = dynamic(
  () => import("./components/Expertise").then((m) => { signalSectionReady(); return m; })
);
const Projects = dynamic(
  () => import("./components/Projects").then((m) => { signalSectionReady(); return m; })
);
const About = dynamic(
  () => import("./components/About").then((m) => { signalSectionReady(); return m; })
);
const Experience = dynamic(
  () => import("./components/Experience").then((m) => { signalSectionReady(); return m; })
);
const Education = dynamic(
  () => import("./components/Education").then((m) => { signalSectionReady(); return m; })
);
const Contact = dynamic(
  () => import("./components/Contact").then((m) => { signalSectionReady(); return m; })
);
const MarqueeTicker = dynamic(
  () => import("./components/MarqueeTicker").then((m) => { signalSectionReady(); return m; })
);
const Footer = dynamic(
  () => import("./components/Footer").then((m) => { signalSectionReady(); return m; })
);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionsReady = useSectionReadyCount();

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Loading screen — tracks real resource loading progress */}
      {!isLoaded && (
        <LoadingScreen
          onComplete={handleLoadComplete}
          sectionsReady={sectionsReady}
          totalSections={TOTAL_SECTIONS}
        />
      )}

      {/* Site content — renders in background while preloader is visible.
          opacity:0 keeps it invisible but allows chunks to download,
          parse, and hydrate behind the scenes. pointer-events:none
          prevents accidental interaction with hidden content. */}
      <main
        className="bg-[var(--theme-bg)] transition-opacity duration-500"
        style={{
          opacity: isLoaded ? 1 : 0,
          pointerEvents: isLoaded ? "auto" : "none",
        }}
      >
        <Navbar />
        <Hero />
        <Introduction />
        <Skills />
        <Expertise />
        <Projects />
        <Experience />
        <About />
        <Education />
        <Contact />
        <MarqueeTicker />
        <Footer />
      </main>
    </>
  );
}
