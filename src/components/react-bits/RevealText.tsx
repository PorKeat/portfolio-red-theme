"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function RevealText({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  return (
    <div className="overflow-hidden relative inline-block">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} // smooth ease-out
      >
        {children}
      </motion.div>
    </div>
  );
}
