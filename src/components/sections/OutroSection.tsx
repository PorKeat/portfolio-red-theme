"use client";

import RevealText from "@/components/react-bits/RevealText";
import { motion } from "framer-motion";

export default function OutroSection() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center relative px-4 pointer-events-none">
      <div className="text-center w-full max-w-4xl px-4 flex flex-col items-center">
        
        {/* Glowing Ending Symbol */}
        <div className="w-24 h-24 mb-8 clip-hex bg-slate-900 border border-red-primary/50 flex items-center justify-center p-[2px]" style={{ boxShadow: '0 0 50px color-mix(in srgb, var(--theme-primary) 30%, transparent)' }}>
          <div className="w-full h-full clip-hex bg-red-primary/20 flex items-center justify-center animate-pulse">
            <span className="text-red-primary font-mono font-bold text-lg tracking-widest">END</span>
          </div>
        </div>

        <h2 className="text-5xl md:text-8xl font-bold flex flex-col items-center">
          <RevealText delay={0.1}>
            <span className="text-white uppercase tracking-tighter text-center">Thank You</span>
          </RevealText>
        </h2>
        
        <div className="mt-8">
          <RevealText delay={0.4}>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-mono leading-relaxed">
              for taking the time to explore my portfolio. <br />
              <span className="text-red-primary" style={{ color: `var(--theme-primary)` }}>Let&apos;s build something amazing together.</span>
            </p>
          </RevealText>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center mt-12 md:mt-16 pointer-events-auto"
        >
          <a 
            href="/Seng_PorKeat_Resume.pdf" 
            download="Seng_PorKeat_Resume.pdf"
            aria-label="Download Seng PorKeat's Resume PDF"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-red-primary/10 border border-red-primary/50 text-red-primary font-mono tracking-widest hover:bg-red-primary hover:text-white transition-all duration-300"
            style={{ 
              backgroundColor: `color-mix(in srgb, var(--theme-primary) 10%, transparent)`,
              borderColor: `color-mix(in srgb, var(--theme-primary) 50%, transparent)`,
              color: `var(--theme-primary)`
            }}
          >
            <span className="absolute inset-0 bg-red-primary/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: `color-mix(in srgb, var(--theme-primary) 40%, transparent)` }} />
            <svg className="w-5 h-5 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span className="z-10 group-hover:text-white transition-colors">DOWNLOAD CV</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
