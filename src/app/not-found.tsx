"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MouseSpotlight from "@/components/ui/MouseSpotlight";
import GlitchText from "@/components/react-bits/GlitchText";

const ShatteredPiece = ({ clipPath, translate, rotate }: { clipPath: string, translate: string, rotate: string }) => {
  const depth = 25; // Massive 3D thickness
  return (
    <div className="absolute inset-0 w-full h-full" style={{ transform: `${translate} ${rotate}` }}>
      {/* Deep Shadow */}
      <h1 
        className="absolute inset-0 flex items-center justify-center text-[150px] md:text-[350px] font-sans font-black leading-none tracking-tighter select-none"
        style={{ 
          clipPath,
          transform: `translate(${depth * 1.2 + 20}px, ${depth * 1.2 + 20}px)`,
          filter: 'blur(15px)',
          color: 'rgba(239, 68, 68, 0.4)',
          zIndex: 0
        }}
      >
        404
      </h1>
      {/* 3D Extrusion Walls */}
      {Array.from({ length: depth }).map((_, i) => (
        <h1 
          key={i}
          className="absolute inset-0 flex items-center justify-center text-[150px] md:text-[350px] font-sans font-black leading-none tracking-tighter select-none"
          style={{ 
            clipPath,
            transform: `translate(${i * 1.5}px, ${i * 1.5}px)`,
            zIndex: depth - i,
            color: `rgb(${40 - i}, ${45 - i}, ${55 - i})` // Slate-800 getting darker
          }}
        >
          404
        </h1>
      ))}
      {/* Top Face */}
      <h1 
        className="absolute inset-0 flex items-center justify-center text-[150px] md:text-[350px] font-sans font-black leading-none tracking-tighter text-slate-100 select-none"
        style={{ 
          clipPath,
          zIndex: depth + 1,
          filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))'
        }}
      >
        404
      </h1>
      {/* Highlight Edge for realism */}
      <h1 
        className="absolute inset-0 flex items-center justify-center text-[150px] md:text-[350px] font-sans font-black leading-none tracking-tighter text-transparent select-none pointer-events-none"
        style={{ 
          clipPath,
          zIndex: depth + 2,
          WebkitTextStroke: '2px rgba(255,255,255,0.2)'
        }}
      >
        404
      </h1>
    </div>
  );
};

export default function NotFound() {
  return (
    <main className="w-full min-h-screen bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center text-slate-200">
      <MouseSpotlight />
      
      {/* Immersive 3D Geometric Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[200%] h-[200%] bg-slate-900/40 rotate-12 -top-[50%] -left-[50%] border-r border-red-primary/10" style={{ clipPath: 'polygon(0 0, 50% 0, 100% 100%, 0% 100%)' }} />
        <div className="absolute w-[150%] h-[150%] bg-slate-950/90 -rotate-6 top-[10%] left-[10%] shadow-2xl drop-shadow-2xl border-l border-white/5" style={{ clipPath: 'polygon(100% 0, 40% 0, 70% 100%, 100% 100%)' }} />
        <div className="absolute w-[600px] h-[600px] bg-red-primary/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-20 text-center px-4 flex flex-col items-center w-full max-w-5xl">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-2"
        >
          <div className="w-3 h-3 bg-red-primary animate-pulse rounded-full shadow-[0_0_10px_red]"></div>
          <p className="text-red-primary font-mono text-sm md:text-lg tracking-[0.2em] uppercase font-bold">
            SECURITY ALERT: BREACH ATTEMPT FAILED
          </p>
        </motion.div>
        
        {/* True 3D Jagged Shattered 404 */}
        <div className="relative w-full h-[250px] md:h-[400px] flex items-center justify-center group mb-2">
          
          {/* Ambient Glitch Glows */}
          <h1 
            className="absolute inset-0 flex items-center justify-center text-[150px] md:text-[350px] font-sans font-black leading-none tracking-tighter text-red-500 mix-blend-screen animate-glitch-1 select-none opacity-40 blur-[4px]"
            style={{ transform: 'translate(-10px, 5px)' }}
          >
            404
          </h1>
          <h1 
            className="absolute inset-0 flex items-center justify-center text-[150px] md:text-[350px] font-sans font-black leading-none tracking-tighter text-cyan-500 mix-blend-screen animate-glitch-2 select-none opacity-40 blur-[4px]"
            style={{ transform: 'translate(10px, -5px)' }}
          >
            404
          </h1>

          {/* Top Left Jagged Shard */}
          <ShatteredPiece 
            clipPath="polygon(0% 0%, 40% 0%, 30% 10%, 45% 25%, 35% 40%, 20% 55%, 0% 45%)"
            translate="translate(-15px, -20px)"
            rotate="rotate(-4deg)"
          />

          {/* Top Right Jagged Shard */}
          <ShatteredPiece 
            clipPath="polygon(40% 0%, 100% 0%, 100% 45%, 85% 55%, 70% 45%, 50% 60%, 35% 40%, 45% 25%, 30% 10%)"
            translate="translate(10px, -15px)"
            rotate="rotate(3deg)"
          />

          {/* Bottom Left Jagged Shard */}
          <ShatteredPiece 
            clipPath="polygon(0% 45%, 20% 55%, 35% 40%, 50% 60%, 45% 75%, 60% 85%, 50% 100%, 0% 100%)"
            translate="translate(-20px, 15px)"
            rotate="rotate(-2deg)"
          />

          {/* Bottom Right Jagged Shard */}
          <ShatteredPiece 
            clipPath="polygon(50% 60%, 70% 45%, 85% 55%, 100% 45%, 100% 100%, 50% 100%, 60% 85%, 45% 75%)"
            translate="translate(15px, 25px)"
            rotate="rotate(5deg)"
          />
        </div>

        <div className="relative z-30 mb-8 mt-8 md:mt-12">
          <GlitchText speed={1.2} className="font-mono text-2xl md:text-3xl font-bold tracking-widest text-red-500 uppercase drop-shadow-[0_0_15px_rgba(239,68,68,1)] border-2 border-red-500 px-6 py-2 bg-[#020617]/90 backdrop-blur-md transform -rotate-2">
            SYSTEM_FAULT
          </GlitchText>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-red-primary/80 text-sm md:text-base mb-12 font-mono tracking-[0.2em] uppercase text-center"
        >
          // ROUTE_SEVERED
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-3 bg-red-950/20 backdrop-blur-xl border border-red-primary/50 text-white px-8 py-4 font-mono font-bold tracking-widest hover:bg-red-primary hover:text-white transition-all duration-300 group shadow-[0_0_30px_rgba(239,68,68,0.2)] hover:shadow-[0_0_50px_rgba(239,68,68,0.5)]"
            style={{ clipPath: "polygon(5% 0, 100% 0, 100% 80%, 95% 100%, 0 100%, 0 20%)" }}
          >
            <span className="text-red-primary group-hover:text-white transition-colors duration-300">{"$"}</span>
            RESTART_SYSTEM
            <span className="text-red-primary group-hover:text-white transition-colors duration-300 opacity-50 block w-2 h-4 bg-red-primary group-hover:bg-white animate-pulse"></span>
          </Link>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .text-3d {
          text-shadow: 
            0px 2px 0px #7f1d1d,
            0px 4px 0px #7f1d1d,
            0px 6px 0px #450a0a,
            0px 8px 0px #450a0a,
            0px 10px 0px #450a0a,
            0px 15px 30px rgba(239, 68, 68, 0.5),
            0px 30px 60px rgba(239, 68, 68, 0.4);
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
          animation: glitch-1 2.5s infinite linear alternate-reverse;
        }
        .animate-glitch-2 {
          animation: glitch-2 3s infinite linear alternate-reverse;
        }
      `}} />
    </main>
  );
}
