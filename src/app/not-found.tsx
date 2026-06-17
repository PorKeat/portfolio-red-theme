"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

let globalAudioCtx: AudioContext | null = null;

const playSmashSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

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

    // Clean up context to prevent hitting browser hardware limits
    setTimeout(() => {
      if (ctx.state !== 'closed') {
        ctx.close().catch(() => {});
      }
    }, 1000);

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
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
          <div className="w-3 h-3 rounded-full animate-pulse transition-colors duration-1000" style={{ backgroundColor: 'var(--theme-primary)', boxShadow: '0 0 15px var(--theme-primary)' }}></div>
          <p className="font-mono text-sm md:text-lg tracking-[0.2em] uppercase font-bold transition-colors duration-1000" style={{ color: 'var(--theme-primary)' }}>
            SECURITY ALERT: BREACH ATTEMPT FAILED
          </p>
        </motion.div>
        
        {/* Animated Drop & Shatter Container */}
        <motion.div 
          key={playCount}
          className="relative w-full h-62.5 md:h-100 flex items-center justify-center group mb-2"
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

        <div 
          className="relative z-30 mb-8 mt-8 md:mt-12 bg-slate-950/90 border-2 px-8 py-4 backdrop-blur-md transform -rotate-2" 
          style={{ 
            borderColor: 'var(--theme-primary)', 
            boxShadow: '0 0 20px color-mix(in srgb, var(--theme-primary) 50%, transparent)'
          }}
        >
          <h2 
            className="glitch-text relative font-mono text-3xl md:text-5xl font-black tracking-widest uppercase transition-colors duration-1000" 
            style={{ color: 'white' }}
            data-text="SYSTEM_FAULT"
          >
            SYSTEM_FAULT
          </h2>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm md:text-base mb-12 font-mono tracking-[0.2em] uppercase text-center transition-colors duration-1000"
          style={{ color: 'color-mix(in srgb, var(--theme-primary) 80%, transparent)' }}
        >
          {"// ROUTE_SEVERED"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-3 backdrop-blur-xl border-2 text-white px-8 py-4 font-mono font-bold tracking-widest transition-all duration-1000 group hover:scale-105"
            style={{ 
              clipPath: "polygon(5% 0, 100% 0, 100% 80%, 95% 100%, 0 100%, 0 20%)",
              backgroundColor: 'color-mix(in srgb, var(--theme-primary) 20%, transparent)',
              borderColor: 'color-mix(in srgb, var(--theme-primary) 50%, transparent)',
              boxShadow: '0 0 30px color-mix(in srgb, var(--theme-primary) 30%, transparent)'
            }}
          >
            <span className="transition-colors duration-1000" style={{ color: 'var(--theme-primary)' }}>{"$"}</span>
            RESTART_SYSTEM
            <span className="transition-colors duration-1000 opacity-50 block w-2 h-4 animate-pulse" style={{ backgroundColor: 'var(--theme-primary)' }}></span>
          </Link>
        </motion.div>

        {/* Replay Sequence Button */}
        <button
          onClick={() => setPlayCount(c => c + 1)}
          className="mt-8 text-xs font-mono text-slate-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-pulse" />
          [ Replay sequence ]
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .text-3d {
          text-shadow: 
            0px 2px 0px color-mix(in srgb, var(--theme-primary) 40%, black),
            0px 4px 0px color-mix(in srgb, var(--theme-primary) 40%, black),
            0px 6px 0px color-mix(in srgb, var(--theme-primary) 20%, black),
            0px 8px 0px color-mix(in srgb, var(--theme-primary) 20%, black),
            0px 10px 0px color-mix(in srgb, var(--theme-primary) 20%, black),
            0px 15px 30px color-mix(in srgb, var(--theme-primary) 50%, transparent),
            0px 30px 60px color-mix(in srgb, var(--theme-primary) 40%, transparent);
          transition: text-shadow 1s ease-in-out;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(2, 6, 23, 0.9); /* Match slate-950/90 to obscure original text slightly when shifting */
        }
        
        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 var(--theme-primary);
          animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
        }
        
        .glitch-text::after {
          left: -2px;
          text-shadow: 2px 0 cyan;
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          5% { clip-path: inset(10% 0 10% 0); transform: translate(2px, -1px); }
          10% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
          15% { clip-path: inset(50% 0 30% 0); transform: translate(2px, -2px); }
          20% { clip-path: inset(5% 0 80% 0); transform: translate(-2px, 1px); }
          25% { clip-path: inset(40% 0 40% 0); transform: translate(2px, -1px); }
          30% { clip-path: inset(90% 0 5% 0); transform: translate(-2px, 2px); }
          35% { clip-path: inset(15% 0 70% 0); transform: translate(2px, -2px); }
          40% { clip-path: inset(55% 0 25% 0); transform: translate(-2px, 1px); }
          45% { clip-path: inset(5% 0 90% 0); transform: translate(2px, -1px); }
          50% { clip-path: inset(75% 0 15% 0); transform: translate(-2px, 2px); }
          55% { clip-path: inset(25% 0 55% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(85% 0 5% 0); transform: translate(-2px, 1px); }
          65% { clip-path: inset(35% 0 45% 0); transform: translate(2px, -1px); }
          70% { clip-path: inset(5% 0 85% 0); transform: translate(-2px, 2px); }
          75% { clip-path: inset(65% 0 15% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(15% 0 65% 0); transform: translate(-2px, 1px); }
          85% { clip-path: inset(95% 0 2% 0); transform: translate(2px, -1px); }
          90% { clip-path: inset(45% 0 35% 0); transform: translate(-2px, 2px); }
          95% { clip-path: inset(5% 0 85% 0); transform: translate(2px, -2px); }
          100% { clip-path: inset(85% 0 5% 0); transform: translate(-2px, 1px); }
        }

        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          5% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 1px); }
          10% { clip-path: inset(70% 0 15% 0); transform: translate(2px, -2px); }
          15% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, 2px); }
          20% { clip-path: inset(90% 0 5% 0); transform: translate(2px, -1px); }
          25% { clip-path: inset(15% 0 75% 0); transform: translate(-2px, 1px); }
          30% { clip-path: inset(50% 0 30% 0); transform: translate(2px, -2px); }
          35% { clip-path: inset(5% 0 85% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(80% 0 10% 0); transform: translate(2px, -1px); }
          45% { clip-path: inset(25% 0 55% 0); transform: translate(-2px, 1px); }
          50% { clip-path: inset(65% 0 25% 0); transform: translate(2px, -2px); }
          55% { clip-path: inset(5% 0 90% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(45% 0 45% 0); transform: translate(2px, -1px); }
          65% { clip-path: inset(85% 0 5% 0); transform: translate(-2px, 1px); }
          70% { clip-path: inset(15% 0 65% 0); transform: translate(2px, -2px); }
          75% { clip-path: inset(55% 0 25% 0); transform: translate(-2px, 2px); }
          80% { clip-path: inset(5% 0 80% 0); transform: translate(2px, -1px); }
          85% { clip-path: inset(35% 0 45% 0); transform: translate(-2px, 1px); }
          90% { clip-path: inset(95% 0 2% 0); transform: translate(2px, -2px); }
          95% { clip-path: inset(25% 0 65% 0); transform: translate(-2px, 2px); }
          100% { clip-path: inset(75% 0 15% 0); transform: translate(2px, -1px); }
        }
      `}} />
    </main>
  );
}
