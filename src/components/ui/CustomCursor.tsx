"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  
  const [hoverTarget, setHoverTarget] = useState<{
    width: number;
    height: number;
    borderRadius: number;
  } | null>(null);

  const hoverTargetRef = useRef<HTMLElement | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringXTarget = useMotionValue(-100);
  const ringYTarget = useMotionValue(-100);

  const springConfigDot = { damping: 25, stiffness: 700, mass: 0.5 };
  const dotX = useSpring(mouseX, springConfigDot);
  const dotY = useSpring(mouseY, springConfigDot);

  const springConfigRing = { damping: 25, stiffness: 150, mass: 0.5 };
  const ringX = useSpring(ringXTarget, springConfigRing);
  const ringY = useSpring(ringYTarget, springConfigRing);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMobile(false);
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!hoverTargetRef.current) {
        ringXTarget.set(e.clientX);
        ringYTarget.set(e.clientY);
      } else {
        // When magnetic, dot still follows mouse, but ring is locked to target center
        const rect = hoverTargetRef.current.getBoundingClientRect();
        ringXTarget.set(rect.left + rect.width / 2);
        ringYTarget.set(rect.top + rect.height / 2);
      }

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, [role="button"]') || target;
      
      if (
        interactiveEl.tagName?.toLowerCase() === 'a' ||
        interactiveEl.tagName?.toLowerCase() === 'button' ||
        getComputedStyle(interactiveEl).cursor === 'pointer' ||
        interactiveEl.classList.contains('cursor-pointer')
      ) {
        hoverTargetRef.current = interactiveEl as HTMLElement;
        const rect = interactiveEl.getBoundingClientRect();
        const style = window.getComputedStyle(interactiveEl);
        let br = parseFloat(style.borderRadius);
        if (isNaN(br)) br = 8; // fallback
        
        setHoverTarget({
          width: rect.width + 16, // add padding
          height: rect.height + 16,
          borderRadius: br > 0 ? br + 4 : 8,
        });

        ringXTarget.set(rect.left + rect.width / 2);
        ringYTarget.set(rect.top + rect.height / 2);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, [role="button"]') || target;
      
      if (hoverTargetRef.current === interactiveEl) {
        hoverTargetRef.current = null;
        setHoverTarget(null);
        // Immediately return ring tracking to mouse
        ringXTarget.set(mouseX.get());
        ringYTarget.set(mouseY.get());
      }
    };

    // Use passive listeners for performance
    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mouseX, mouseY, ringXTarget, ringYTarget, isVisible]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Magnetic Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none border border-red-primary/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: hoverTarget ? '0 0 30px color-mix(in srgb, var(--theme-primary) 30%, transparent)' : '0 0 15px color-mix(in srgb, var(--theme-primary) 50%, transparent)',
        }}
        animate={{
          width: hoverTarget ? hoverTarget.width : 30,
          height: hoverTarget ? hoverTarget.height : 30,
          borderRadius: hoverTarget ? hoverTarget.borderRadius : 9999,
          opacity: isVisible ? 1 : 0,
          backgroundColor: hoverTarget ? "color-mix(in srgb, var(--theme-primary) 10%, transparent)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
      />
      
      {/* Inner Solid Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-red-primary"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          opacity: isVisible ? (hoverTarget ? 0 : 1) : 0, // hide dot when magnetically snapped
          boxShadow: '0 0 10px var(--theme-primary)',
        }}
      />
    </>
  );
}
