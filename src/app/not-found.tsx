"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MouseSpotlight from "@/components/ui/MouseSpotlight";

export default function NotFound() {
  return (
    <main className="w-full h-screen bg-[#0f111a] relative overflow-hidden flex flex-col items-center justify-center text-slate-200">
      <MouseSpotlight />
      
      {/* Geometric Background Shards */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[#16192b]" style={{ clipPath: 'polygon(0 0, 50% 0, 100% 100%, 0% 100%)' }} />
        <div className="absolute w-full h-full bg-[#0a0c13] shadow-2xl drop-shadow-2xl" style={{ clipPath: 'polygon(100% 0, 40% 0, 70% 100%, 100% 100%)' }} />
        <div className="absolute w-full h-full bg-[#12141e] shadow-2xl" style={{ clipPath: 'polygon(0 0, 100% 0, 0 60%)' }} />
      </div>

      {/* Diagonal slice lines cutting across the whole screen */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center opacity-80">
        <div className="w-[200%] h-[6px] bg-[#0a0c13] rotate-[15deg] absolute shadow-[0_0_30px_rgba(0,0,0,0.8)]"></div>
        <div className="w-[200%] h-[8px] bg-[#0a0c13] -rotate-[30deg] absolute shadow-[0_0_30px_rgba(0,0,0,0.8)]"></div>
      </div>

      <div className="relative z-20 text-center px-4 flex flex-col items-center w-full max-w-5xl">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-blue-500/80 font-sans text-2xl md:text-3xl font-light tracking-wide mb-2 md:mb-6"
        >
          Page not found
        </motion.p>
        
        {/* Sliced & Glitched 404 Text */}
        <div className="relative w-full h-[250px] md:h-[400px] flex items-center justify-center group mb-6">
          
          {/* Base Layer */}
          <h1 className="absolute text-[180px] md:text-[350px] font-black leading-none tracking-tighter text-white select-none">
            404
          </h1>
          
          {/* Glitch Layer 1 - Red */}
          <h1 
            className="absolute text-[180px] md:text-[350px] font-black leading-none tracking-tighter text-red-500 mix-blend-screen animate-glitch-1 select-none"
            style={{ transform: 'translate(-4px, 2px)' }}
          >
            404
          </h1>
          
          {/* Glitch Layer 2 - Cyan */}
          <h1 
            className="absolute text-[180px] md:text-[350px] font-black leading-none tracking-tighter text-cyan-500 mix-blend-screen animate-glitch-2 select-none"
            style={{ transform: 'translate(4px, -2px)' }}
          >
            404
          </h1>
          
          {/* Sliced Gaps exactly matching the background lines to "cut" the text */}
          <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
             <div className="w-[150%] h-[12px] bg-[#0f111a] rotate-[15deg] absolute"></div>
             <div className="w-[150%] h-[15px] bg-[#0f111a] -rotate-[30deg] absolute"></div>
          </div>

          <div className="absolute bottom-[20%] left-[25%] md:left-[30%] -rotate-[15deg]">
            <span className="font-sans text-xl md:text-3xl font-bold tracking-wide text-white drop-shadow-md">Error</span>
          </div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-300 text-sm md:text-base mb-6 font-sans font-light tracking-wide"
        >
          Please, check url address or use the links below
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 text-sm font-sans tracking-wide text-blue-500/80"
        >
          <Link href="/" className="hover:text-blue-400 transition-colors duration-300 relative group">
            Main
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-400 transition-all group-hover:w-full"></span>
          </Link>
          <span className="text-slate-700">/</span>
          <Link href="/#about" className="hover:text-blue-400 transition-colors duration-300 relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-400 transition-all group-hover:w-full"></span>
          </Link>
          <span className="text-slate-700">/</span>
          <Link href="/#contact" className="hover:text-blue-400 transition-colors duration-300 relative group">
            Contacts
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-400 transition-all group-hover:w-full"></span>
          </Link>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
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
