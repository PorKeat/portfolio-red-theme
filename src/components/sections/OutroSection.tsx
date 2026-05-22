"use client";

import RevealText from "@/components/react-bits/RevealText";

export default function OutroSection() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center relative px-4 pointer-events-none">
      <div className="text-center w-full max-w-4xl px-4 flex flex-col items-center">
        
        {/* Glowing Ending Symbol */}
        <div className="w-24 h-24 mb-8 clip-hex bg-slate-900 border border-red-primary/50 flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.3)] p-[2px]">
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
              <span className="text-red-primary">Let's build something amazing together.</span>
            </p>
          </RevealText>
        </div>

      </div>
    </section>
  );
}
