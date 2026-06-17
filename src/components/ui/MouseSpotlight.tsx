"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
  }
  return "239, 68, 68"; // fallback red
}

export default function MouseSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [rgb, setRgb] = useState("239, 68, 68");
  
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const readThemeColor = useCallback(() => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--theme-primary").trim();
    if (raw) setRgb(hexToRgb(raw));
  }, []);

  useEffect(() => {
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Read initial theme color
    readThemeColor();

    // Watch for data-theme attribute changes on <html>
    const observer = new MutationObserver(() => readThemeColor());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [mouseX, mouseY, readThemeColor]);

  const maskImage = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      
      {/* The tech-grid layer that is ONLY visible where the mouse is (via mask) */}
      <motion.div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(${rgb}, 0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(${rgb}, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      />
      
      {/* Ambient glow that follows the mouse */}
      <motion.div
        className="absolute inset-0 opacity-80"
        style={{
          background: useMotionTemplate`radial-gradient(500px circle at ${smoothX}px ${smoothY}px, rgba(${rgb}, 0.4), transparent 100%)`
        }}
      />
    </div>
  );
}
