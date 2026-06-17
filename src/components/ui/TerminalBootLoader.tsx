"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const playHackingSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    const ctx = new AudioContextClass();

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    // Low background hum
    const hum = ctx.createOscillator();
    hum.type = 'sine';
    hum.frequency.value = 50;
    const humGain = ctx.createGain();
    humGain.gain.value = 0.1;
    hum.connect(humGain);
    humGain.connect(ctx.destination);
    hum.start();

    // Rapid data processing beeps
    const beepInterval = setInterval(() => {
      if (ctx.state !== 'running') return;
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800 + Math.random() * 1000, ctx.currentTime);
      
      const beepGain = ctx.createGain();
      beepGain.gain.setValueAtTime(0.02, ctx.currentTime);
      beepGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      
      osc.connect(beepGain);
      beepGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    }, 50);

    return { ctx, hum, beepInterval };
  } catch {
    return null;
  }
};

const playSuccessSound = (audioState: { ctx: AudioContext, hum: OscillatorNode, beepInterval: NodeJS.Timeout } | null) => {
  if (!audioState || !audioState.ctx) return;
  const { ctx, hum, beepInterval } = audioState;
  
  clearInterval(beepInterval);
  try {
    hum.stop(ctx.currentTime + 0.5);
  } catch {}

  // Success chime
  try {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.1);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch {}

  setTimeout(() => {
    if (ctx.state !== 'closed') {
      ctx.close().catch(() => {});
    }
  }, 1000);
};

export default function TerminalBootLoader({ onComplete }: { onComplete?: () => void }) {
  const [isBooting, setIsBooting] = useState(true);
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Full screen canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters for the digital rain (Hex, Matrix style)
    const letters = "0123456789ABCDEF@#$%^&*()アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const charArray = letters.split("");

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    
    // Array to track the Y coordinate of each column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      // Randomize initial starting heights so they don't all fall in a straight horizontal line
      drops[i] = Math.random() * -100;
    }

    let animationFrame: number;
    let isActive = true;
    let lastTime = 0;
    const fps = 30; // Throttle to 30fps for a classic, smooth Matrix look
    const intervalTime = 1000 / fps;

    const audioState = playHackingSound();

    const draw = (time: number) => {
      if (!isActive) return;
      animationFrame = requestAnimationFrame(draw);

      const deltaTime = time - lastTime;
      if (deltaTime < intervalTime) return;
      lastTime = time - (deltaTime % intervalTime);
      
      // Semi-transparent black to create the fading trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Red Hacker Rain color
      ctx.fillStyle = "#ef4444"; 
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Randomly make the leading character white
        if (Math.random() > 0.95) {
            ctx.fillStyle = "#FFF";
        } else {
            ctx.fillStyle = "#ef4444";
        }

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Randomly reset drops to the top after they fall off screen to create continuous rain
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // Start rain
    animationFrame = requestAnimationFrame(draw);

    // Stop rain much sooner so it doesn't take too long
    const timer1 = setTimeout(() => {
      isActive = false;
      setShowAccessGranted(true);
      if (audioState) playSuccessSound(audioState);
    }, 1500); // Reduced from 2500ms to 1500ms

    // Hide the loader quickly after Access Granted
    const timer2 = setTimeout(() => {
      setIsBooting(false);
      if (onComplete) onComplete();
    }, 2800); // Reduced from 4000ms to 2800ms

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (audioState) {
        clearInterval(audioState.beepInterval);
        try {
          if (audioState.ctx.state !== 'closed') audioState.ctx.close();
        } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          key="terminal-loader"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 15, filter: "blur(20px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // smooth cinematic ease
          className="fixed inset-0 z-[99999] bg-black pointer-events-auto overflow-hidden flex items-center justify-center origin-center"
        >
          {/* CRT Scanline effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-30 z-20" />
          
          {/* The Digital Rain Canvas */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-10 opacity-70"
          />

          {/* Centered Access Granted Text */}
          <AnimatePresence>
            {showAccessGranted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-30 flex flex-col items-center text-center bg-black/80 p-8 border border-red-primary/50 backdrop-blur-md rounded-lg"
                style={{ boxShadow: '0 0 50px color-mix(in srgb, var(--theme-primary) 40%, transparent)' }}
              >
                <div className="text-red-primary font-mono text-sm md:text-base mb-2">SYSTEM OVERRIDE COMPLETE.</div>
                <div className="text-green-500 font-black font-mono text-3xl md:text-5xl tracking-widest mb-2">ACCESS GRANTED</div>
                <div className="text-red-500 font-mono text-xs md:text-sm tracking-[0.3em]">WELCOME TO THE MAINFRAME</div>
                
                {/* Blinking cursor */}
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-16 h-1 bg-red-primary mt-4"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
