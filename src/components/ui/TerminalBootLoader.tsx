"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TerminalBootLoader() {
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
    }, 1500); // Reduced from 2500ms to 1500ms

    // Hide the loader quickly after Access Granted
    const timer2 = setTimeout(() => {
      setIsBooting(false);
    }, 2800); // Reduced from 4000ms to 2800ms

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
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
                className="relative z-30 flex flex-col items-center text-center bg-black/80 p-8 border border-red-primary/50 shadow-[0_0_50px_rgba(239,68,68,0.4)] backdrop-blur-md rounded-lg"
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
