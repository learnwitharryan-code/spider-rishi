"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "spiderman" | "me";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("me");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const saved = localStorage.getItem("spidermonn-theme") as Theme;
    if (saved) {
      setTheme(saved);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "spiderman" ? "me" : "spiderman";
      localStorage.setItem("spidermonn-theme", next);
      return next;
    });
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const FALLBACK: ThemeContextType = { theme: "me", toggleTheme: () => {} };

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  // Return safe fallback during SSR prerender when provider isn't mounted yet
  return context ?? FALLBACK;
}
