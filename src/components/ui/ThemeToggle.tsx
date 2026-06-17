"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Palette } from "lucide-react";

type Theme = "red" | "blue" | "green" | "purple" | "orange" | "pink" | "cyan" | "custom";

const THEMES: { id: Theme; name: string; hex: string }[] = [
  { id: "red", name: "Cyber Red", hex: "#ef4444" },
  { id: "blue", name: "Neon Blue", hex: "#0ea5e9" },
  { id: "green", name: "Matrix Green", hex: "#22c55e" },
  { id: "purple", name: "Phantom Purple", hex: "#a855f7" },
  { id: "orange", name: "Solar Orange", hex: "#f97316" },
  { id: "pink", name: "Neon Pink", hex: "#ec4899" },
  { id: "cyan", name: "Arctic Cyan", hex: "#06b6d4" },
];

function darkenHex(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
  const b = Math.max(0, (num & 0x0000ff) - amount);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
}

function applyCustomColor(hex: string) {
  const root = document.documentElement;
  root.style.setProperty("--theme-primary", hex);
  root.style.setProperty("--theme-accent", darkenHex(hex, 30));
  root.style.setProperty("--theme-glow", darkenHex(hex, 60));
}

function clearCustomColor() {
  const root = document.documentElement;
  root.style.removeProperty("--theme-primary");
  root.style.removeProperty("--theme-accent");
  root.style.removeProperty("--theme-glow");
}

export default function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>("red");
  const [customHex, setCustomHex] = useState("#ef4444");
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") as Theme;
    const savedCustom = localStorage.getItem("app-theme-custom");

    if (savedTheme === "custom" && savedCustom) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentTheme("custom");
      setCustomHex(savedCustom);
      document.documentElement.setAttribute("data-theme", "custom");
      applyCustomColor(savedCustom);
    } else if (savedTheme && THEMES.some(t => t.id === savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "red");
    }
  }, []);

  const changeTheme = (theme: Theme) => {
    clearCustomColor();
    setCurrentTheme(theme);
    localStorage.setItem("app-theme", theme);
    localStorage.removeItem("app-theme-custom");
    document.documentElement.setAttribute("data-theme", theme);
  };

  const applyCustom = (hex: string) => {
    setCustomHex(hex);
    setCurrentTheme("custom");
    localStorage.setItem("app-theme", "custom");
    localStorage.setItem("app-theme-custom", hex);
    document.documentElement.setAttribute("data-theme", "custom");
    applyCustomColor(hex);
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
        className="flex flex-col gap-1 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-2 rounded-2xl shadow-xl max-h-[70vh] overflow-y-auto custom-scrollbar"
      >
        {/* Preset Themes */}
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => changeTheme(theme.id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors hover:bg-slate-800 ${currentTheme === theme.id ? 'bg-slate-800/50' : ''}`}
            aria-label={`Switch to ${theme.name} theme`}
          >
            <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: theme.hex, boxShadow: `0 0 10px ${theme.hex}` }} />
            <span className="text-xs font-mono text-slate-300 whitespace-nowrap">{theme.name}</span>
          </button>
        ))}

        {/* Divider */}
        <div className="w-full h-px bg-slate-700 my-1" />

        {/* Custom Color Picker */}
        <div className="px-3 py-3">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 block">Custom Color</span>
          
          {/* Color preview strip */}
          <div 
            className="w-full h-10 rounded-xl mb-3 relative overflow-hidden cursor-pointer group"
            style={{ 
              backgroundColor: customHex,
              boxShadow: `0 0 25px ${customHex}40, inset 0 0 20px ${customHex}30`
            }}
            onClick={() => colorInputRef.current?.click()}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/20 group-hover:from-white/20 transition-all" />
            <input
              ref={colorInputRef}
              type="color"
              value={customHex}
              onChange={(e) => applyCustom(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </div>

          {/* Hex code input */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: customHex, boxShadow: `0 0 8px ${customHex}` }} />
            <input
              type="text"
              value={customHex}
              onChange={(e) => {
                const val = e.target.value;
                setCustomHex(val);
                if (/^#[0-9a-fA-F]{6}$/.test(val)) {
                  applyCustom(val);
                }
              }}
              placeholder="#ff00ff"
              maxLength={7}
              className="flex-1 bg-slate-800/80 border border-slate-600 rounded-lg px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-slate-400 transition-colors text-center"
            />
          </div>
        </div>
      </motion.div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-slate-900/90 backdrop-blur-md border border-red-primary/30 flex items-center justify-center text-red-primary hover:scale-110 transition-all duration-300 group"
        style={{ 
          borderColor: `color-mix(in srgb, var(--theme-primary) 30%, transparent)`,
          color: `var(--theme-primary)`,
          boxShadow: `0 0 20px color-mix(in srgb, var(--theme-primary) 20%, transparent)`
        }}
        aria-label="Toggle Theme Options"
      >
        <Palette className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
}
