"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, Terminal, User } from "lucide-react";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about-detail" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/resume", accent: true },
  { label: "Support", href: "/support", accent: true },
];

export default function Navbar() {
  const { scrollTo, scrollY } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  /* ── Derive scrolled state from virtual scroll (throttled section detection) ── */
  useEffect(() => {
    let sectionCheckTimer: ReturnType<typeof setTimeout> | null = null;

    const unsub = scrollY.on("change", (y) => {
      setScrolled(y > 40);

      // Throttle section detection to every 100ms
      if (sectionCheckTimer) return;
      sectionCheckTimer = setTimeout(() => {
        sectionCheckTimer = null;
        const sections = navLinks.filter((l) => l.href.startsWith("#")).map((l) => l.href.replace("#", ""));
        for (const id of [...sections].reverse()) {
          const el = document.getElementById(id);
          if (el) {
            const elTop = el.getBoundingClientRect().top + y;
            if (y >= elTop - 120) {
              setActive(id);
              break;
            }
          }
        }
      }, 100);
    });

    return () => {
      unsub();
      if (sectionCheckTimer) clearTimeout(sectionCheckTimer);
    };
  }, [scrollY]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);
      scrollTo(href);
    },
    [scrollTo],
  );

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
          scrolled ? "pt-6 px-4" : "pt-8 px-6"
        }`}
      >
        <nav
          className={`w-full max-w-6xl mx-auto flex items-center justify-between px-6 py-4 transition-all duration-500 rounded-full ${
            scrolled
              ? "backdrop-blur-xl bg-[#09090b]/70 border border-white/10 shadow-[0_4px_30px_rgba(232,0,28,0.15)]"
              : "bg-transparent border border-transparent shadow-none"
          }`}
        >
          {/* Logo Section */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="group flex items-center gap-3 relative focus:outline-none"
          >
            <div className="absolute left-0 w-8 h-8 rounded-full bg-[var(--theme-accent)] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="text-[var(--theme-accent)] relative z-10"
            >
              <Bug size={24} />
            </motion.div>
            
            <div
              className="relative text-xl tracking-[0.1em] text-white/90 hover:text-white transition-colors duration-300"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 700,
              }}
            >
              Rishi
              <span className="text-[var(--theme-accent)] absolute -bottom-1 -right-2 text-2xl font-black">.</span>
              <div className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[var(--theme-accent)] group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_10px_var(--theme-accent)]" />
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 pr-2">
            {navLinks.map(({ label, href, accent }) => {
              const id = href.replace("#", "");
              const isActive = href.startsWith("#") && active === id;
              return (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => {
                    if (href.startsWith("#")) handleNavClick(e, href);
                  }}
                  className="relative group text-sm tracking-widest uppercase transition-all duration-300 overflow-hidden px-2 py-1"
                  style={{
                    color: isActive ? "white" : (accent ? "var(--theme-accent)" : "#a1a1aa"),
                    fontFamily: "var(--font-space-grotesk)",
                    fontWeight: 600,
                  }}
                >
                  <div className="relative z-10 group-hover:-translate-y-full transition-transform duration-300">
                    {label}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 text-[var(--theme-accent)] px-2 py-1 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                    {label}
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute inset-0 bg-[var(--theme-accent)]/10 blur-md rounded-md z-0"
                    />
                  )}
                </a>
              );
            })}
            
            <div className="w-px h-4 bg-zinc-800 mx-2" />
            
            <button
              onClick={toggleTheme}
              className="relative group flex items-center gap-2 text-[10px] tracking-widest uppercase transition-all duration-300 px-3 py-1.5 border border-zinc-800 rounded-full hover:border-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 600,
                color: "var(--theme-accent)",
              }}
            >
              {theme === "spiderman" ? (
                <>
                  <User size={12} />
                  <span>BECOME ME</span>
                </>
              ) : (
                <>
                  <Bug size={12} />
                  <span>BECOME SPIDEY</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((s) => !s)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/80 focus:outline-none"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="7" y1="12" x2="17" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#09090b]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden px-6"
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh' }}
          >
            {navLinks.map(({ label, href, accent }, i) => (
              <motion.a
                key={label}
                href={href}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                onClick={(e) => {
                  if (href.startsWith("#")) handleNavClick(e, href);
                }}
                className={`w-full max-w-sm flex items-center justify-center py-4 rounded-2xl border border-white/5 active:border-[var(--theme-accent)]/30 active:bg-[var(--theme-accent)]/20 active:text-[var(--theme-accent)] transition-all min-h-[60px] ${accent ? "bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]" : "bg-white/5 text-white/90"}`}
              >
                <span 
                  className="text-2xl font-black tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {label}
                </span>
              </motion.a>
            ))}

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
              onClick={toggleTheme}
              className="w-full max-w-sm flex items-center justify-center py-4 rounded-2xl border border-zinc-800 active:bg-[var(--theme-accent)]/20 transition-all min-h-[60px]"
            >
              <span 
                className="text-xl font-black tracking-widest uppercase text-[var(--theme-accent)] flex items-center gap-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {theme === "spiderman" ? (
                  <><User size={20} /> BECOME ME</>
                ) : (
                  <><Bug size={20} /> BECOME SPIDEY</>
                )}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
