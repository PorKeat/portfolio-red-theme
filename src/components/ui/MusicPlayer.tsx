"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // YouTube Video ID (HOME - Resonance)
  // Change this string to any YouTube video ID to update the background music!
  const youtubeId = "8GW6sLrK40k";

  const togglePlay = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      if (isPlaying) {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } else {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-4 bg-slate-900/80 backdrop-blur-md border border-red-primary/30 p-3 rounded-full hover:border-red-primary/80 transition-colors pointer-events-auto group" style={{ boxShadow: '0 0 20px color-mix(in srgb, var(--theme-primary) 15%, transparent)' }}>
      
      {/* Hidden YouTube Iframe Player */}
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=0&loop=1&playlist=${youtubeId}`}
        allow="autoplay"
        className="absolute w-0 h-0 opacity-0 pointer-events-none"
      />

      {/* Song Info (Hover to reveal) */}
      <div className="w-0 overflow-hidden group-hover:w-32 transition-all duration-300 whitespace-nowrap">
        <span className="text-xs text-red-primary font-mono ml-3">HOME - Resonance</span>
      </div>

      {/* Visualizer Bars */}
      <div className="flex items-end gap-[3px] h-6 ml-2">
        {[1, 2, 3, 4].map((bar) => (
          <motion.div
            key={bar}
            className="w-1.5 bg-red-primary rounded-t-sm"
            animate={{
              height: isPlaying ? ["20%", "100%", "40%", "80%", "30%"] : "20%",
            }}
            transition={{
              repeat: Infinity,
              duration: 0.6 + bar * 0.15,
              ease: "easeInOut",
              repeatType: "mirror"
            }}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button 
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center bg-red-primary text-slate-950 rounded-full hover:bg-red-accent hover:scale-105 transition-all cursor-pointer"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          // Pause Icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          // Play Icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 translate-x-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </div>
  );
}
