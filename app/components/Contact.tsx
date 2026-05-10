"use client";

import { motion } from "framer-motion";
import SpiderParticleBg from "./SpiderParticleBg";
import SpiderWebBg from "./SpiderWebBg";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-[var(--theme-bg)] border-t border-zinc-800/60 py-32 overflow-hidden flex flex-col items-center justify-center text-center"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at center, rgba(232,0,28,0.1) 0%, transparent 60%)" }}
      />
      <SpiderWebBg className="absolute inset-0 z-0" opacity={0.15} />
      <SpiderParticleBg className="absolute inset-0 z-[1]" opacity={0.5} particleCount={30} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 mt-10">
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[2px] h-[150px] bg-gradient-to-b from-transparent via-white/50 to-white/90 shadow-[0_0_8px_white]" />

        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="relative bg-black/60 backdrop-blur-xl border border-zinc-700/50 p-6 md:p-16 rounded-3xl shadow-2xl overflow-hidden group"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none transition-opacity duration-700 group-hover:opacity-[0.06]">
            <svg width="300" height="300" viewBox="0 0 100 100" fill="white">
              <path d="M50 0 L55 20 L70 30 L60 50 L80 60 L60 70 L55 100 L50 80 L45 100 L40 70 L20 60 L40 50 L30 30 L45 20 Z" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--theme-accent)]/80 text-[var(--theme-accent)] text-xs md:text-sm font-bold tracking-widest uppercase bg-[var(--theme-accent)]/10">
              <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-ping" />
              Spider-Sense Tingling
            </span>
          </motion.div>

          <h2
            className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-[1.1]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Looking for a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--theme-accent)] to-[#ff4d4d]">
              Friendly Neighborhood Developer?
            </span>
          </h2>

          <p
            className="text-zinc-400 text-base md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-12"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Got a project that needs saving? Or a team that needs a web-slinger?
            I&apos;m currently swinging into new full-time roles, freelance gigs, and
            exciting collaborations. Send a signal!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 relative z-20">
            <a
              href="mailto:rishisingh700@gmail.com"
              aria-label="Send an email to Rishi Singh"
              className="spider-sense-pulse w-full sm:w-auto flex items-center justify-center gap-3 bg-[var(--theme-accent)] text-black font-black text-sm md:text-base tracking-[0.2em] uppercase px-10 py-5 rounded-full hover:scale-105 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-300"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              Shoot a Web
            </a>
            <a
              href="https://linkedin.com/in/rishisingh700"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Rishi Singh's LinkedIn profile"
              className="w-full sm:w-auto flex items-center justify-center gap-3 border-2 border-zinc-700 text-white font-bold text-sm tracking-[0.2em] uppercase px-10 py-5 rounded-full hover:border-white hover:bg-white/5 transition-all duration-300"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
