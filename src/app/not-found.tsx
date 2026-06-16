"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MouseSpotlight from "@/components/ui/MouseSpotlight";
import GlitchText from "@/components/react-bits/GlitchText";

export default function NotFound() {
  const [logs, setLogs] = useState<string[]>([]);
  
  const fullLogs = [
    "[system@devops] ~$ connect node --secure",
    "Establishing secure tunnel...",
    "[WARN] Anomalous traffic detected in routing tables.",
    "Bypassing internal firewall...",
    "Querying target sector...",
    "HTTP 404: Resource unreachable.",
    "[ERROR] Neural pathway severed. Container unlinked.",
    "FATAL: Connection forcefully terminated by peer."
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullLogs.length) {
        setLogs(prev => [...prev, fullLogs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full min-h-screen bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center text-slate-200">
      <MouseSpotlight />
      
      {/* Immersive 3D Geometric Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[200%] h-[200%] bg-slate-900/40 rotate-12 -top-[50%] -left-[50%] border-r border-red-primary/10" style={{ clipPath: 'polygon(0 0, 50% 0, 100% 100%, 0% 100%)' }} />
        <div className="absolute w-[150%] h-[150%] bg-slate-950/90 -rotate-6 top-[10%] left-[10%] shadow-2xl drop-shadow-2xl border-l border-white/5" style={{ clipPath: 'polygon(100% 0, 40% 0, 70% 100%, 100% 100%)' }} />
        <div className="absolute w-[600px] h-[600px] bg-red-primary/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-20 w-full max-w-7xl px-4 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
        
        {/* Left Side: DevOps Terminal */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-[400px] bg-slate-900/80 backdrop-blur-md border border-red-primary/30 rounded-md overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.1)] font-mono text-xs md:text-sm"
        >
          <div className="bg-slate-950 border-b border-red-primary/30 p-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            <span className="ml-2 text-slate-500 text-xs">root@cluster-01:~</span>
          </div>
          <div className="p-4 h-[250px] overflow-y-auto flex flex-col gap-2 text-slate-400">
            {logs.map((log, i) => (
              <div key={i} className={`${log.includes('ERROR') || log.includes('FATAL') || log.includes('404') ? 'text-red-primary font-bold' : log.includes('WARN') ? 'text-yellow-500' : ''}`}>
                <span className="text-green-500/80 mr-2">{'>'}</span> {log}
              </div>
            ))}
            {logs.length === fullLogs.length && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 1 }}
                className="w-2 h-4 bg-red-primary mt-1"
              />
            )}
          </div>
        </motion.div>

        {/* Right Side: Massive 404 & Glitch */}
        <div className="w-full md:w-auto flex flex-col items-center">
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
          
          {/* 3D Sliced & Glitched 404 Text */}
          <div className="relative w-full h-[200px] md:h-[350px] flex items-center justify-center group mb-2">
            
            <h1 className="absolute text-[150px] md:text-[280px] font-black leading-none tracking-tighter text-slate-100 select-none text-3d">
              404
            </h1>
            
            <h1 
              className="absolute text-[150px] md:text-[280px] font-black leading-none tracking-tighter text-red-500 mix-blend-screen animate-glitch-1 select-none opacity-80"
              style={{ transform: 'translate(-4px, 2px)' }}
            >
              404
            </h1>
            
            <h1 
              className="absolute text-[150px] md:text-[280px] font-black leading-none tracking-tighter text-cyan-500 mix-blend-screen animate-glitch-2 select-none opacity-80"
              style={{ transform: 'translate(4px, -2px)' }}
            >
              404
            </h1>
            
            <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center mix-blend-overlay">
               <div className="w-[150%] h-[8px] bg-slate-950 rotate-[15deg] absolute drop-shadow-[0_0_10px_black]"></div>
               <div className="w-[150%] h-[10px] bg-slate-950 -rotate-[30deg] absolute drop-shadow-[0_0_10px_black]"></div>
            </div>

            <div className="absolute bottom-[5%] md:bottom-[10%] right-[0%] md:right-[5%] rotate-[10deg] z-30">
              <GlitchText speed={1.2} className="font-mono text-2xl md:text-4xl font-bold tracking-widest text-red-500 uppercase drop-shadow-md border-2 border-red-500 p-2 bg-[#020617]/80 backdrop-blur-sm transform rotate-12">
                SYSTEM_FAULT
              </GlitchText>
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-400 text-xs md:text-sm mb-8 font-mono tracking-wide max-w-md text-center bg-slate-900/40 p-4 border border-slate-800 rounded-md backdrop-blur-sm"
          >
            Access Denied. The routing sector requested does not exist in the DevOps pipeline. Potential misconfiguration or corrupted deployment.
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
              RESTART_CLUSTER
              <span className="text-red-primary group-hover:text-white transition-colors duration-300 opacity-50 block w-2 h-4 bg-red-primary group-hover:bg-white animate-pulse"></span>
            </Link>
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .text-3d {
          text-shadow: 
            0px 2px 0px #cbd5e1,
            0px 4px 0px #94a3b8,
            0px 6px 0px #64748b,
            0px 8px 0px #475569,
            0px 10px 0px #334155,
            0px 12px 20px rgba(0,0,0,0.8),
            0px 20px 40px rgba(0,0,0,0.6);
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
