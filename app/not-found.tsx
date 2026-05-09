"use client";

import Link from "next/link";
import Image from "next/image";
import SpiderWebBg from "./components/SpiderWebBg";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[var(--theme-bg)] flex flex-col items-center justify-center overflow-hidden">
      <SpiderWebBg className="absolute inset-0" opacity={0.18} />

      {/* Red glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(232,0,28,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative text-center px-6">
        {/* Big 404 */}
        <p
          className="text-[22vw] font-black leading-none select-none"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: "rgba(232,0,28,0.12)",
          }}
        >
          404
        </p>

        <div className="-mt-8 mb-8">
          <div className="relative mx-auto mb-5 h-36 w-36 overflow-hidden rounded-full border-4 border-black bg-white shadow-[0_22px_48px_rgba(0,0,0,0.42)] sm:h-44 sm:w-44">
            <Image
              src="/easter-eggs/upsidedown.jpg"
              alt="Upside-down Spider-Man"
              fill
              sizes="176px"
              className="object-cover"
            />
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-[clamp(2.5rem,5vw,4rem)] font-black uppercase text-white tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.03em" }}
          >
            Lost in the{" "}
            <span style={{ color: "var(--theme-accent)" }}>Web.</span>
          </h1>
          <p
            className="mt-4 text-zinc-500 text-sm md:text-base tracking-wide max-w-[50ch] mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.01em" }}
          >
            This page swung away. Even your friendly neighbourhood developer
            couldn&apos;t find it.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-[var(--theme-accent)] text-white font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Swing Back Home
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path
              d="M1 11L11 1M11 1H4M11 1V8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </main>
  );
}
