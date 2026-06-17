"use client";

import { motion, Variants } from "framer-motion";

export default function ScrollRevealText({ text, className = "", delay = 0.1 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // faster stagger
        delayChildren: delay, // Wait for parent animation to start
      }
    }
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0.01, filter: "blur(8px)", y: 10 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className={`flex flex-wrap gap-x-[0.25em] ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
