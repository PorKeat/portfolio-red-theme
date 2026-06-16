"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MouseSpotlight from "@/components/ui/MouseSpotlight";
import RevealText from "@/components/react-bits/RevealText";

export default function NotFound() {
  return (
    <main className="w-full h-screen bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center text-slate-200">
      <MouseSpotlight />
      
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        <h1 className="text-5xl md:text-8xl font-bold flex flex-col items-center mb-6">
          <RevealText delay={0.1}>
            <span className="text-red-primary font-mono text-2xl md:text-3xl tracking-widest block mb-4">SYS.ERROR: 404</span>
          </RevealText>
          <RevealText delay={0.4}>
            <span className="text-white uppercase tracking-tighter">Sector Not Found</span>
          </RevealText>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-slate-400 text-lg md:text-xl max-w-lg mb-12 font-mono"
        >
          The neural pathway you are attempting to access has been severed or does not exist in the current database.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-3 bg-slate-900/60 backdrop-blur-xl border border-red-primary/50 text-white px-8 py-4 font-mono font-bold tracking-widest hover:bg-red-primary hover:text-white transition-all duration-300 group"
            style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
          >
            <span className="text-red-primary group-hover:text-white transition-colors duration-300">{"<"}</span>
            INITIATE SYSTEM REBOOT
            <span className="text-red-primary group-hover:text-white transition-colors duration-300">{"/>"}</span>
          </Link>
        </motion.div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-20">
        <div className="w-[800px] h-[800px] border border-red-primary/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite] border-dashed"></div>
        <div className="w-[600px] h-[600px] border border-slate-700 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_40s_linear_infinite_reverse] border-dashed"></div>
      </div>
    </main>
  );
}
