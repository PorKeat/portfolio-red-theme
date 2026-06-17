"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const Word = ({ children, progress, range }: { children: React.ReactNode, progress: MotionValue<number>, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const filter = useTransform(progress, range, ["blur(8px)", "blur(0px)"]);
  
  return (
    <motion.span style={{ opacity, filter }} className="inline-block">
      {children}
    </motion.span>
  );
};

export default function ScrollRevealText({ text, className = "" }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "start 65%"]
  });

  const words = text.split(" ");
  
  return (
    <div ref={containerRef} className={`flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
}
