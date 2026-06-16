"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealText from "@/components/react-bits/RevealText";
import Image from "next/image";

const MotionImage = motion(Image);

export function SectionTitle({ sysNum, title }: { sysNum: string, title: string }) {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center pointer-events-none">
      <div className="text-center w-full max-w-4xl px-4">
        <h2 className="text-5xl md:text-8xl font-bold flex flex-col items-center">
          <RevealText delay={0.1}>
            <span className="text-red-primary font-mono text-2xl tracking-widest block mb-4">{sysNum}</span>
          </RevealText>
          <RevealText delay={0.3}>
            <span className="text-white uppercase tracking-tighter text-center">{title}</span>
          </RevealText>
        </h2>
      </div>
    </section>
  );
}

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export function ExperienceCard({ item, index }: { item: any, index: number }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isLeft = index % 2 === 0;
  
  // Detect Media Types
  const isVideo = item.image && /\.(mp4|webm|ogg|mov)$/i.test(item.image);
  const youtubeId = item.image ? getYoutubeId(item.image) : null;
  
  const thumbnailVideoRef = useRef<HTMLVideoElement>(null);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      // Try to sync time from thumbnail to modal when opening
      if (thumbnailVideoRef.current) {
        // Since modal video is now standard HTML video, we might need to find it
        const modalVideo = document.getElementById(`modal-video-${index}`) as HTMLVideoElement;
        if (modalVideo) {
          modalVideo.currentTime = thumbnailVideoRef.current.currentTime;
        }
      }
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedIndex, index]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleRedClick = () => {
    setSelectedIndex(null);
    // Red closes and fully stops the video
    if (thumbnailVideoRef.current) {
      thumbnailVideoRef.current.pause();
      thumbnailVideoRef.current.currentTime = 0;
    }
  };

  const handleYellowClick = () => {
    setSelectedIndex(null);
    // Yellow closes but background video continues playing
    if (thumbnailVideoRef.current) {
      const modalVideo = document.getElementById(`modal-video-${index}`) as HTMLVideoElement;
      if (modalVideo) {
        // Sync the time back so it continues seamlessly
        thumbnailVideoRef.current.currentTime = modalVideo.currentTime;
      }
      thumbnailVideoRef.current.play();
    }
  };

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center relative px-4 pointer-events-auto">
      <div className="w-full max-w-7xl mx-auto flex justify-center">
        
        {/* The Card */}
        <div className={`w-full md:w-[900px] md:h-[380px] flex flex-col md:flex-row ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 bg-slate-900/80 backdrop-blur-xl border border-red-primary/30 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(239,68,68,0.15)] hover:border-red-primary hover:bg-slate-900/90 transition-all duration-300 relative group`}>
          
          {/* Decorative neon accent */}
          <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-1/2 bg-red-primary rounded-full opacity-50 group-hover:opacity-100 transition-opacity blur-[2px] ${isLeft ? '-right-1' : '-left-1'}`} />

          {/* Image Side */}
          <motion.div 
            layoutId={`image-container-${index}`}
            onClick={() => {
              setSelectedIndex(index);
              setIsFullscreen(false); // Reset fullscreen state when opening
              // Ensure background video plays when opening modal
              if (thumbnailVideoRef.current) thumbnailVideoRef.current.play();
            }}
            className="w-full md:w-2/5 h-48 md:h-full min-h-[200px] rounded-xl overflow-hidden relative border border-slate-700/50 group-hover:border-red-primary/50 transition-colors duration-300 cursor-pointer bg-black"
          >
            {isVideo ? (
              <motion.video
                ref={thumbnailVideoRef}
                layoutId={`image-${index}`}
                src={item.image}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-110"
              />
            ) : youtubeId ? (
              <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-black rounded-xl">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1`}
                  allow="autoplay; encrypted-media"
                  className="absolute top-1/2 left-1/2 w-[175%] h-[175%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-105"
                  style={{ border: 'none' }}
                />
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center z-0">
                  <span className="text-slate-500 font-mono text-xs">LOADING...</span>
                </div>
                <MotionImage 
                  src={item.image || "/placeholder-mountain.png"} 
                  alt={item.title || "Experience Preview"} 
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority={index < 4}
                  className="object-cover transition-transform duration-700 scale-100 group-hover:scale-110 z-10"
                />
              </>
            )}
            {/* Click to view overlay */}
            <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
              <span className="text-white font-mono text-sm tracking-widest border border-red-primary/50 bg-black/60 px-6 py-3 rounded-full backdrop-blur-md flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.3)] group-hover:scale-110 transition-transform duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                PREVIEW
              </span>
            </div>
          </motion.div>

          {/* Text Description Side */}
          <div className="w-full md:w-3/5 flex flex-col justify-center h-full">
            <div className="self-start">
              <span className="inline-block px-3 py-1 font-mono text-sm rounded-full mb-4 border border-red-primary/30 bg-red-primary/20 text-red-accent">
                {item.year}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-red-primary transition-colors duration-300 flex items-center gap-3">
              {item.logo && (
                <img src={item.logo} alt={`${item.title} logo`} className="w-8 h-8 object-contain" />
              )}
              {item.title}
            </h3>
            <h4 className="text-xl text-slate-400 mb-6">{item.institution}</h4>
            <p className="text-slate-300 text-lg leading-relaxed">
              {item.description}
            </p>
          </div>

        </div>
      </div>

      {/* Seamless Floating Image Modal */}
      <AnimatePresence>
        {selectedIndex === index && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleYellowClick} // Clicking outside acts like minimize (yellow)
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md transition-all duration-500 cursor-zoom-out ${isFullscreen ? "p-0" : "p-4 lg:p-10"}`}
          >
            <motion.div
              layoutId={`image-container-${index}`}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`relative ${isFullscreen ? "w-full h-full rounded-none border-none" : "max-w-6xl w-full h-auto max-h-[90vh] rounded-xl border-slate-700/80"} overflow-hidden shadow-[0_0_80px_rgba(239,68,68,0.2)] bg-slate-950 flex flex-col border cursor-default`}
              onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking image
            >
              
              {/* macOS Style Top Bar */}
              <div className="w-full h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2 select-none shrink-0 relative transition-colors">
                {/* Traffic Lights */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRedClick();
                  }} 
                  title="Close and Stop Video"
                  className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center group/btn transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 opacity-0 group-hover/btn:opacity-100 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleYellowClick();
                  }}
                  title="Minimize (Keep Playing)"
                  className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 flex items-center justify-center group/btn transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 opacity-0 group-hover/btn:opacity-100 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/></svg>
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  }}
                  title="Fullscreen"
                  className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 flex items-center justify-center group/btn transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 opacity-0 group-hover/btn:opacity-100 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                </button>
                {/* Title */}
                <span className="absolute left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                  {item.title} — Preview
                </span>
              </div>

              {/* Media Content */}
              <div className="w-full flex-1 overflow-hidden bg-black flex items-center justify-center relative group/media">
                {isVideo ? (
                  <video
                    id={`modal-video-${index}`}
                    src={item.image}
                    autoPlay
                    loop
                    controls
                    playsInline
                    className={`w-full object-cover transition-all duration-500 ${isFullscreen ? "h-full min-h-screen" : "h-auto min-h-[500px] max-h-[calc(90vh-32px)]"}`}
                  />
                ) : youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={`w-full transition-all duration-500 ${isFullscreen ? "h-full min-h-screen" : "h-full min-h-[500px] max-h-[calc(90vh-32px)]"}`}
                  />
                ) : (
                  <img 
                    src={item.image || "/placeholder-mountain.png"} 
                    alt={item.title || "Enlarged Experience Preview"} 
                    className={`w-full object-contain transition-all duration-500 ${isFullscreen ? "h-full min-h-screen" : "h-auto min-h-[300px] max-h-[calc(90vh-32px)]"}`}
                  />
                )}
              </div>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
