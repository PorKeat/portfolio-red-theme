"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent hydration mismatch

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // The small dot follows instantly
  const springConfigDot = { damping: 25, stiffness: 700, mass: 0.5 };
  const dotX = useSpring(cursorX, springConfigDot);
  const dotY = useSpring(cursorY, springConfigDot);

  // The larger ring trails slightly behind
  const springConfigRing = { damping: 25, stiffness: 150, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfigRing);
  const ringY = useSpring(cursorY, springConfigRing);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsMobile(false);
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Hover effect for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        getComputedStyle(target).cursor === 'pointer' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isMobile) {
    return null; // Don't show custom cursor on touch devices
  }

  return (
    <>
      {/* Outer Glowing Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border border-red-primary/50 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 50 : 30,
          height: isHovering ? 50 : 30,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? "rgba(239, 68, 68, 0.1)" : "rgba(239, 68, 68, 0)",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
      
      {/* Inner Solid Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full bg-red-primary shadow-[0_0_10px_rgba(239,68,68,1)]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
