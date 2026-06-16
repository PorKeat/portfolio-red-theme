"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MouseSpotlight from "@/components/ui/MouseSpotlight";

export default function NotFound() {
  return (
    <main className="w-full h-screen bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center text-slate-200">
      <MouseSpotlight />
      
      {/* Immersive 3D Geometric Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[200%] h-[200%] bg-slate-900/40 rotate-12 -top-[50%] -left-[50%] border-r border-red-primary/10" style={{ clipPath: 'polygon(0 0, 50% 0, 100% 100%, 0% 100%)' }} />
        <div className="absolute w-[150%] h-[150%] bg-slate-950/90 -rotate-6 top-[10%] left-[10%] shadow-2xl drop-shadow-2xl border-l border-white/5" style={{ clipPath: 'polygon(100% 0, 40% 0, 70% 100%, 100% 100%)' }} />
        {/* Glowing orb in the center behind everything */}
        <div className="absolute w-[600px] h-[600px] bg-red-primary/20 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-20 text-center px-4 flex flex-col items-center w-full max-w-5xl">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-red-primary font-mono text-xl md:text-2xl tracking-[0.3em] uppercase mb-4 md:mb-8"
        >
          SYS.ERROR: Sector Not Found
        </motion.p>
        
        {/* 3D Sliced, Hollow & Glitched 404 Text */}
        <div className="relative w-full h-[250px] md:h-[400px] flex items-center justify-center group mb-6">
          
          {/* Base Hollow 3D Layer */}
          <h1 className="absolute text-[180px] md:text-[350px] font-black leading-none tracking-tighter select-none text-hollow text-3d animate-pulse-fast">
            404
          </h1>
          
          {/* Glitch Layer 1 - Red (Solid) */}
          <h1 
            className="absolute text-[180px] md:text-[350px] font-black leading-none tracking-tighter text-red-500 mix-blend-screen animate-glitch-1 select-none opacity-70"
            style={{ transform: 'translate(-8px, 4px)' }}
          >
            404
          </h1>
          
          {/* Glitch Layer 2 - Cyan (Solid) */}
          <h1 
            className="absolute text-[180px] md:text-[350px] font-black leading-none tracking-tighter text-cyan-500 mix-blend-screen animate-glitch-2 select-none opacity-70"
            style={{ transform: 'translate(8px, -4px)' }}
          >
            404
          </h1>
          
          {/* Sliced Gaps - perfectly matching website theme */}
          <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center mix-blend-overlay">
             <div className="w-[150%] h-[15px] bg-slate-950 rotate-[15deg] absolute drop-shadow-[0_0_10px_black]"></div>
             <div className="w-[150%] h-[20px] bg-slate-950 -rotate-[30deg] absolute drop-shadow-[0_0_10px_black]"></div>
             <div className="w-[150%] h-[5px] bg-red-primary/50 rotate-[45deg] absolute blur-[2px]"></div>
          </div>

          {/* Glitching Error Tag */}
          <div className="absolute bottom-[15%] md:bottom-[15%] left-[25%] md:left-[30%] -rotate-[15deg] relative">
            <span className="font-mono text-lg md:text-2xl font-bold tracking-widest text-slate-300 uppercase drop-shadow-md absolute inset-0">Error</span>
            <span className="font-mono text-lg md:text-2xl font-bold tracking-widest text-red-500 uppercase absolute inset-0 animate-glitch-1 mix-blend-screen" style={{ transform: 'translate(-2px, 1px)' }}>Error</span>
            <span className="font-mono text-lg md:text-2xl font-bold tracking-widest text-cyan-500 uppercase absolute inset-0 animate-glitch-2 mix-blend-screen" style={{ transform: 'translate(2px, -1px)' }}>Error</span>
            <span className="font-mono text-lg md:text-2xl font-bold tracking-widest text-transparent uppercase">Error</span> {/* Spacer */}
          </div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-400 text-sm md:text-base mb-12 font-mono tracking-wide max-w-lg"
        >
          The neural pathway you are attempting to access has been severed or does not exist in the current database.
        </motion.p>

        {/* The Old Reboot Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-3 bg-slate-900/60 backdrop-blur-xl border border-red-primary/50 text-white px-8 py-4 font-mono font-bold tracking-widest hover:bg-red-primary hover:text-white transition-all duration-300 group shadow-[0_0_30px_rgba(239,68,68,0.2)] hover:shadow-[0_0_50px_rgba(239,68,68,0.5)]"
            style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
          >
            <span className="text-red-primary group-hover:text-white transition-colors duration-300">{"<"}</span>
            INITIATE SYSTEM REBOOT
            <span className="text-red-primary group-hover:text-white transition-colors duration-300">{"/>"}</span>
          </Link>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .text-hollow {
          color: transparent;
          -webkit-text-stroke: 2px rgba(248, 250, 252, 0.8);
        }
        .text-3d {
          text-shadow: 
            0px 2px 0px rgba(203, 213, 225, 0.5),
            0px 4px 0px rgba(148, 163, 184, 0.5),
            0px 6px 0px rgba(100, 116, 139, 0.5),
            0px 8px 0px rgba(71, 85, 105, 0.5),
            0px 10px 0px rgba(51, 65, 85, 0.5),
            0px 12px 20px rgba(0,0,0,0.8),
            0px 20px 40px rgba(0,0,0,0.6);
        }
        @keyframes pulse-fast {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-fast {
          animation: pulse-fast 0.15s infinite;
        }
        @keyframes glitch-1 {
          0% { clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%); transform: translate(-2px, 2px); }
          20% { clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%); transform: translate(2px, -2px); }
          40% { clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); transform: translate(-2px, 2px); }
          60% { clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%); transform: translate(2px, -2px); }
          80% { clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%); transform: translate(-2px, 2px); }
          100% { clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%); transform: translate(2px, -2px); }
        }
        @keyframes glitch-2 {
          0% { clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%); transform: translate(2px, -2px); }
          20% { clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%); transform: translate(-2px, 2px); }
          40% { clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%); transform: translate(2px, -2px); }
          60% { clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%); transform: translate(-2px, 2px); }
          80% { clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%); transform: translate(2px, -2px); }
          100% { clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%); transform: translate(-2px, 2px); }
        }
        .animate-glitch-1 {
          animation: glitch-1 1s infinite linear alternate-reverse;
        }
        .animate-glitch-2 {
          animation: glitch-2 1.2s infinite linear alternate-reverse;
        }
      `}} />
    </main>
  );
}
