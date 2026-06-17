"use client";

import { motion, Variants } from "framer-motion";

export default function ScrollRevealText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04, // 40ms between each word
        delayChildren: 0.2, // Wait for parent animation to start
      }
    }
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0.1, filter: "blur(8px)", y: 10 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className={`flex flex-wrap gap-x-[0.25em] ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
