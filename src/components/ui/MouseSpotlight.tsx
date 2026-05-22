"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";

export default function MouseSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    // Set initial position to center of screen
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const maskImage = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      
      {/* The tech-grid layer that is ONLY visible where the mouse is (via mask) */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(239, 68, 68, 0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(239, 68, 68, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      />
      
      {/* A deep red ambient glow that follows the mouse to illuminate the dark void */}
      <motion.div
        className="absolute inset-0 opacity-80"
        style={{
          background: useMotionTemplate`radial-gradient(500px circle at ${smoothX}px ${smoothY}px, rgba(239, 68, 68, 0.4), transparent 100%)`
        }}
      />
    </div>
  );
}
