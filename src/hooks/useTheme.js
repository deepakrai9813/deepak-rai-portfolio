import { useEffect, useState, useCallback } from "react";

export const ACCENTS = [
  { id: "indigo", name: "Electric Indigo", color: "#4f46e5", light: "#ede9fe", hover: "#6366f1" },
  { id: "coral", name: "Sunset Coral", color: "#ea580c", light: "#ffedd5", hover: "#f97316" },
  { id: "emerald", name: "Mint Emerald", color: "#059669", light: "#dcfce7", hover: "#10b981" },
  { id: "cyan", name: "Cyber Cyan", color: "#0284c7", light: "#e0f2fe", hover: "#06b6d4" },
  { id: "magenta", name: "Vibrant Magenta", color: "#db2777", light: "#fce7f3", hover: "#f43f5e" },
];

export function useTheme() {
  const [accent, setAccent] = useState(() => {
    try {
      return localStorage.getItem("dr-accent") || "indigo";
    } catch {
      return "indigo";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
    try {
      localStorage.setItem("dr-accent", accent);
    } catch {
      /* ignore */
    }
  }, [accent]);

  const changeAccent = useCallback((newAccent) => {
    setAccent(newAccent);
  }, []);

  return { accent, changeAccent, accents: ACCENTS };
}
