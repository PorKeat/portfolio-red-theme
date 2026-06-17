"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to parent size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}|:<>?~";
    const charArray = chars.split("");

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    // Array of drops, one per column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      // Start drops at random heights
      drops[i] = Math.random() * -100;
    }

    let animationFrame: number;
    let isActive = true;
    let lastTime = 0;
    const fps = 30; // Throttle to 30fps
    const intervalTime = 1000 / fps;

    const draw = (time: number) => {
      if (!isActive) return;
      animationFrame = requestAnimationFrame(draw);

      const deltaTime = time - lastTime;
      if (deltaTime < intervalTime) return;
      lastTime = time - (deltaTime % intervalTime);
      
      // Semi-transparent black to create fading trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-primary').trim() || '#22c55e';
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Leading character is sometimes white
        if (Math.random() > 0.95) {
            ctx.fillStyle = "#FFF";
        } else {
            ctx.fillStyle = themeColor;
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationFrame = requestAnimationFrame(draw);

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
    />
  );
}
