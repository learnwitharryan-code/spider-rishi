"use client";

import { motion } from "framer-motion";
import { useSmoothScroll } from "./SmoothScrollProvider";

const links = [
  { label: "GitHub", href: "https://github.com/Rishihoon" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rishisingh700" },
  { label: "Email", href: "mailto:rishisingh700@gmail.com" },
];
export default function Footer() {
  const year = new Date().getFullYear();
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="bg-[var(--theme-bg)] border-t border-zinc-800/60 px-6 md:px-16 lg:px-24 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xl font-bold tracking-tight text-white flex items-center gap-2 comic-title pb-2"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Rishi<span style={{ color: "var(--theme-accent)" }}>.</span>
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 20"
              fill="var(--theme-accent)"
              style={{ opacity: 0.7 }}
              aria-hidden="true"
            >
              <ellipse cx="12" cy="10" rx="4" ry="5" />
              <ellipse cx="12" cy="16" rx="3" ry="4" />
              <line
                x1="12"
                y1="5"
                x2="4"
                y2="1"
                stroke="var(--theme-accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="7"
                x2="2"
                y2="6"
                stroke="var(--theme-accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="5"
                x2="20"
                y2="1"
                stroke="var(--theme-accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="7"
                x2="22"
                y2="6"
                stroke="var(--theme-accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </p>
          <p
            className="text-[11px] tracking-widest uppercase text-zinc-600 mt-1"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Full-Stack Developer
          </p>
        </motion.div>

        {/* Nav links */}
        <motion.nav
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-6"
          aria-label="Footer navigation"
        >
          {[
            { label: "Work", href: "#work" },
            { label: "Skills", href: "#skills" },
            { label: "About", href: "#about-detail" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (item.href.startsWith("#")) {
                  e.preventDefault();
                  scrollTo(item.href);
                }
              }}
              className="text-[11px] tracking-widest uppercase text-zinc-500 hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {item.label}
            </a>
          ))}
        </motion.nav>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-6"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="text-[11px] tracking-widest uppercase text-zinc-500 hover:text-[var(--theme-accent)] transition-colors"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p
          className="text-[11px] text-zinc-700 tracking-widest uppercase"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          © {year} Rishi Singh. All rights reserved.
        </p>
        <p
          className="text-[11px] text-zinc-700 tracking-widest uppercase"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Built with{" "}
          <span style={{ color: "var(--theme-accent)" }}>Next.js</span> &amp;
          Framer Motion
        </p>
      </div>
    </footer>
  );
}
