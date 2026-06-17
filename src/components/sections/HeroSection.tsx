"use client";

import { motion } from "framer-motion";
import TypewriterEffect from "@/components/ui/TypewriterEffect";
import RevealText from "@/components/react-bits/RevealText";

const CyberpunkGrid = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40" style={{ perspective: "1000px" }}>
    <motion.div
      className="absolute bottom-[-20%] left-[-50%] right-[-50%] h-[150vh] origin-bottom"
      style={{
        backgroundImage: `
          linear-gradient(to right, color-mix(in srgb, var(--theme-primary) 30%, transparent) 1px, transparent 1px),
          linear-gradient(to top, color-mix(in srgb, var(--theme-primary) 30%, transparent) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        transform: 'rotateX(75deg) translateZ(0)',
      }}
      animate={{
        backgroundPosition: ['0px 0px', '0px 60px']
      }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: 1.5
      }}
    />
    {/* Fade out the grid towards the top */}
    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-slate-950/80 to-slate-950" />
  </div>
);

export default function HeroSection() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center relative px-4 pointer-events-none overflow-hidden">
      
      {/* Cyberpunk Grid Background */}
      <CyberpunkGrid />

      {/* Decorative background glow behind the text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="text-center w-full max-w-5xl px-4 flex flex-col items-center z-10 pointer-events-auto mt-[-10vh]">
        
        {/* Top small label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0 }} // Synced with terminal zoom
          className="mb-6 flex items-center gap-4"
        >
          <div className="w-12 h-[1px] bg-red-primary/50" />
          <span className="text-red-primary font-mono tracking-[0.3em] text-sm md:text-base">SYSTEM ONLINE</span>
          <div className="w-12 h-[1px] bg-red-primary/50" />
        </motion.div>

        {/* Premium Stacked Cinematic Typography */}
        <div className="relative flex flex-col items-center justify-center gap-0 md:gap-2 mt-10 md:mt-16 z-10 cursor-default select-none">
          
          {/* ALEX */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 2.8 }} // Exact moment terminal flies away
          >
            <span className="text-[4.5rem] md:text-[11rem] leading-[0.8] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-500 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] tracking-tighter hover:tracking-[0.05em] transition-[letter-spacing] duration-300 ease-out inline-block">
              ALEX
            </span>
          </motion.div>
          
          {/* KGM */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 2.9 }}
          >
            <span 
              className="text-[4.5rem] md:text-[11rem] leading-[0.8] font-black text-transparent bg-clip-text tracking-tighter hover:tracking-[0.05em] transition-[letter-spacing] duration-300 ease-out inline-block"
              style={{ 
                backgroundImage: `linear-gradient(to bottom, color-mix(in srgb, var(--theme-primary) 80%, white), var(--theme-primary), color-mix(in srgb, var(--theme-primary) 40%, black))`,
                filter: `drop-shadow(0 10px 20px color-mix(in srgb, var(--theme-primary) 40%, transparent))`
              }}
            >
              KGM
            </span>
          </motion.div>
          
        </div>
        
        {/* Subtitle */}
        <div className="mt-12 md:mt-24 relative z-20">
          <div className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-primary" />
          <RevealText delay={3.1}>
            <p className="text-slate-300 text-lg md:text-3xl max-w-2xl font-light tracking-wide pl-4 flex items-center gap-2 flex-wrap">
              <TypewriterEffect 
                phrases={[
                  "DevOps Engineer",
                  "Full Stack Developer",
                  "Cloud Architect",
                  "Problem Solver"
                ]} 
              />
            </p>
          </RevealText>
        </div>

      </div>

      {/* Scroll Indicator Replacing the Buttons */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 0.5 }}
        className="absolute bottom-12 flex flex-col items-center justify-center pointer-events-auto"
      >
        <span className="text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4">
          Scroll to Fly Through
        </span>
        <div className="w-[30px] h-[50px] border-2 border-slate-700/80 rounded-full flex justify-center p-2 relative bg-slate-950/50 backdrop-blur-md">
          <motion.div 
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-red-primary rounded-full"
            style={{ boxShadow: '0 0 10px color-mix(in srgb, var(--theme-primary) 80%, transparent)' }}
          />
        </div>
      </motion.div>

    </section>
  );
}
