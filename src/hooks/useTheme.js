import { useEffect, useState, useCallback } from "react";

export const ACCENTS = [
  { id: "lime", name: "Electric Lime", color: "#c8f04a" },
  { id: "cyan", name: "Cyber Cyan", color: "#00f2fe" },
  { id: "violet", name: "Radiant Violet", color: "#a855f7" },
  { id: "coral", name: "Sunset Coral", color: "#ff6550" },
  { id: "emerald", name: "Emerald Mint", color: "#10b981" },
];

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("dr-theme") || "dark";
    } catch {
      return "dark";
    }
  });

  const [accent, setAccent] = useState(() => {
    try {
      return localStorage.getItem("dr-accent") || "lime";
    } catch {
      return "lime";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("dr-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
    try {
      localStorage.setItem("dr-accent", accent);
    } catch {
      /* ignore */
    }
  }, [accent]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const changeAccent = useCallback((newAccent) => {
    setAccent(newAccent);
  }, []);

  return { theme, toggle, accent, changeAccent, accents: ACCENTS };
}
