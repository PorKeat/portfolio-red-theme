"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GlitchText from "@/components/react-bits/GlitchText";
import { useState, useEffect } from "react";

let globalAudioCtx: AudioContext | null = null;

const playSmashSound = () => {
  try {
    if (!globalAudioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        globalAudioCtx = new AudioContextClass();
      }
    }
    
    const ctx = globalAudioCtx;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {}); // catch autoplay rejection
    }

    const duration = 0.6;
    
    // 1. High-frequency shatter (glass noise)
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; 
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'highpass';
    bandpass.frequency.value = 2000;
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.8, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(ctx.destination);
    noise.start();

    // 2. Heavy low-frequency THUD (concrete impact)
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.3);
    
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(1, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch(e) {
    console.log("Audio play failed:", e);
  }
};

const ShatteredPiece = ({ clipPath, targetX, targetY, targetRotate }: { clipPath: string, targetX: number, targetY: number, targetRotate: number }) => {
  const depth = 25; // Massive 3D thickness
  return (
    <motion.div 
      className="absolute inset-0 w-full h-full" 
      initial={{ x: 0, y: 0, rotate: 0 }}
      animate={{ x: targetX, y: targetY, rotate: targetRotate }}
      transition={{ delay: 0.4, type: "spring", stiffness: 400, damping: 15 }}
    >
      {/* Deep Shadow */}
      <h1 
        className="absolute inset-0 flex items-center justify-center text-[150px] md:text-[350px] font-sans font-black leading-none tracking-tighter select-none text-transparent"
        style={{ 
          clipPath,
          transform: `translate(${depth * 1.2 + 20}px, ${depth * 1.2 + 20}px)`,
          filter: 'drop-shadow(0 0 15px rgba(239,68,68,0.5))',
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
    </motion.div>
  );
};

export default function NotFound() {
  const [playCount, setPlayCount] = useState(0);

  // Ensure AudioContext is ready if user interacts before drop happens
  useEffect(() => {
    const handleInteraction = () => {
      if (!globalAudioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) globalAudioCtx = new AudioContextClass();
      }
      if (globalAudioCtx?.state === 'suspended') {
        globalAudioCtx.resume();
      }
      document.removeEventListener('click', handleInteraction);
    };
    document.addEventListener('click', handleInteraction);
    return () => document.removeEventListener('click', handleInteraction);
  }, []);

  return (
    <main className="w-full min-h-screen bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center text-slate-200">
      
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
        
        {/* Animated Drop & Shatter Container */}
        <motion.div 
          key={playCount}
          className="relative w-full h-[250px] md:h-[400px] flex items-center justify-center group mb-2"
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }} 
          transition={{ duration: 0.4, ease: "easeIn" }}
          onAnimationComplete={() => {
            // Slight camera shake on the container exactly on impact
            const elem = document.getElementById('shatter-container');
            if (elem) {
              elem.animate([
                { transform: 'translate(0px, 0px)' },
                { transform: 'translate(-10px, 10px)' },
                { transform: 'translate(10px, -10px)' },
                { transform: 'translate(-5px, 5px)' },
                { transform: 'translate(0px, 0px)' }
              ], { duration: 300, easing: 'ease-out' });
            }
            playSmashSound();
          }}
          id="shatter-container"
        >
          
          {/* Ambient Glitch Glows (Delayed so they don't glow during the drop) */}
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.4, duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center text-[150px] md:text-[350px] font-sans font-black leading-none tracking-tighter text-red-500 mix-blend-screen animate-glitch-1 select-none blur-[4px]"
            style={{ transform: 'translate(-10px, 5px)' }}
          >
            404
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.4, duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center text-[150px] md:text-[350px] font-sans font-black leading-none tracking-tighter text-cyan-500 mix-blend-screen animate-glitch-2 select-none blur-[4px]"
            style={{ transform: 'translate(10px, -5px)' }}
          >
            404
          </motion.h1>

          {/* Top Left Jagged Shard */}
          <ShatteredPiece 
            clipPath="polygon(0% 0%, 40% 0%, 30% 10%, 45% 25%, 35% 40%, 20% 55%, 0% 45%)"
            targetX={-15}
            targetY={-20}
            targetRotate={-4}
          />

          {/* Top Right Jagged Shard */}
          <ShatteredPiece 
            clipPath="polygon(40% 0%, 100% 0%, 100% 45%, 85% 55%, 70% 45%, 50% 60%, 35% 40%, 45% 25%, 30% 10%)"
            targetX={10}
            targetY={-15}
            targetRotate={3}
          />

          {/* Bottom Left Jagged Shard */}
          <ShatteredPiece 
            clipPath="polygon(0% 45%, 20% 55%, 35% 40%, 50% 60%, 45% 75%, 60% 85%, 50% 100%, 0% 100%)"
            targetX={-20}
            targetY={15}
            targetRotate={-2}
          />

          {/* Bottom Right Jagged Shard */}
          <ShatteredPiece 
            clipPath="polygon(50% 60%, 70% 45%, 85% 55%, 100% 45%, 100% 100%, 50% 100%, 60% 85%, 45% 75%)"
            targetX={15}
            targetY={25}
            targetRotate={5}
          />
        </motion.div>

        <div className="relative z-30 mb-8 mt-8 md:mt-12 bg-[#020617]/90 border-2 border-red-500 px-6 py-2 backdrop-blur-md transform -rotate-2 drop-shadow-[0_0_15px_rgba(239,68,68,1)]">
          <GlitchText speed={1.2} className="font-mono text-2xl md:text-3xl font-bold tracking-widest text-red-500 uppercase">
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

        {/* Replay Sequence Button */}
        <button
          onClick={() => {
            if (!globalAudioCtx) {
              const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
              if (AudioContextClass) globalAudioCtx = new AudioContextClass();
            }
            if (globalAudioCtx?.state === 'suspended') {
              globalAudioCtx.resume();
            }
            setPlayCount(c => c + 1);
          }}
          className="mt-8 text-xs font-mono text-slate-500 hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-pulse" />
          [ Replay sequence ]
        </button>
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
