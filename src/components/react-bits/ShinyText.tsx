"use client";

import { motion } from "framer-motion";

export default function ShinyText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.span
      className={`inline-block text-transparent bg-clip-text bg-[linear-gradient(110deg,#ef4444,45%,#fca5a5,55%,#ef4444)] bg-[length:250%_100%] animate-shine ${className}`}
    >
      {text}
    </motion.span>
  );
}
