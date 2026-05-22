"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GateLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time (or wait for assets)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex pointer-events-none">
          {/* Left Gate */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="w-1/2 h-full bg-slate-950 border-r border-red-primary/30 flex items-center justify-end relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-red-primary shadow-[0_0_15px_rgba(239,68,68,1)] z-10" />
            <div className="mr-4 text-red-primary font-mono text-xl tracking-widest opacity-80">SYS</div>
          </motion.div>

          {/* Right Gate */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="w-1/2 h-full bg-slate-950 border-l border-red-primary/30 flex items-center justify-start relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-red-primary shadow-[0_0_15px_rgba(239,68,68,1)] z-10" />
            <div className="ml-4 text-red-primary font-mono text-xl tracking-widest opacity-80">INIT</div>
          </motion.div>

          {/* Center Lock / Icon */}
          <motion.div
            initial={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ duration: 0.8, ease: "backIn" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-slate-900 border-2 border-red-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.5)] z-20"
          >
            <div className="w-12 h-12 border-t-2 border-r-2 border-red-accent rounded-full animate-spin" />
            <div className="absolute text-white font-bold tracking-widest text-xs">SP</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
