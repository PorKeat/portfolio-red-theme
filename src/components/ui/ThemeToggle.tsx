"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Palette } from "lucide-react";

type Theme = "red" | "blue" | "green";

const THEMES: { id: Theme; name: string; color: string }[] = [
  { id: "red", name: "Cyber Red", color: "bg-red-500" },
  { id: "blue", name: "Neon Blue", color: "bg-sky-500" },
  { id: "green", name: "Matrix Green", color: "bg-green-500" },
];

export default function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>("red");

  useEffect(() => {
    // Load theme from localStorage if available
    const savedTheme = localStorage.getItem("app-theme") as Theme;
    if (savedTheme && ["red", "blue", "green"].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "red");
    }
  }, []);

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("app-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3 pointer-events-auto">
      {/* Theme Options */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          y: isOpen ? 0 : 20,
          pointerEvents: isOpen ? "auto" : "none"
        }}
        className="flex flex-col gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-2 rounded-2xl shadow-xl"
      >
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => changeTheme(theme.id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors hover:bg-slate-800 ${currentTheme === theme.id ? 'bg-slate-800/50' : ''}`}
            aria-label={`Switch to ${theme.name} theme`}
          >
            <div className={`w-4 h-4 rounded-full ${theme.color} shadow-[0_0_10px_currentColor]`} style={{ color: `var(--theme-primary)` }} />
            <span className="text-xs font-mono text-slate-300">{theme.name}</span>
          </button>
        ))}
      </motion.div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-slate-900/90 backdrop-blur-md border border-red-primary/30 flex items-center justify-center text-red-primary shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:scale-110 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all duration-300 group"
        aria-label="Toggle Theme Options"
      >
        <Palette className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
}
