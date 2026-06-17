"use client";

import { useEffect, useRef, ReactNode, Children, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FlyThroughParallaxProps {
  children: ReactNode;
  sectionNames?: string[];
}

export default function FlyThroughParallax({ children, sectionNames }: FlyThroughParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = sectionsRef.current.filter(Boolean);
    const totalSections = sections.length;
    
    // We want the scroll space to be much longer now because we added "resting" phases
    const totalScrollHeight = totalSections * 250;

    // We pin the container and create a long scroll area
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalScrollHeight}%`,
        pin: true,
        scrub: 1.5, // Even smoother scrubbing
        onUpdate: (self) => {
          // Progress is 0 to 1.
          // The timeline has roughly 2 units of time per section (1 for resting, 1 for flying away).
          const current = Math.floor(self.progress * totalSections);
          setActiveIndex(Math.min(current, totalSections - 1));
        }
      },
    });

    // Initialize states
    sections.forEach((section, index) => {
      gsap.set(section, {
        scale: index === 0 ? 1 : 0.05,
        autoAlpha: index === 0 ? 1 : 0, 
        zIndex: totalSections - index, // Frontmost on top
      });
    });

    // Animate each section with a Resting Phase
    sections.forEach((section, index) => {
      const startTime = index * 2;

      // 1. Emerge from distance (only for sections after the first)
      if (index > 0) {
        tl.to(
          section,
          {
            scale: 1,
            autoAlpha: 1,
            ease: "power2.out", // Decelerate as it arrives
            duration: 1,
          },
          startTime - 1 // Starts when the previous section starts flying away
        );
      }

      // 2. Resting Phase (Stay at scale 1 so user can comfortably read)
      tl.to({}, { duration: 1 }, startTime);

      // 3. Fly Past Camera (Zoom away)
      // We do NOT do this for the very last section, so it stays on screen when the scroll ends.
      if (index < totalSections - 1) {
        tl.to(
          section,
          {
            scale: 4, 
            autoAlpha: 0,
            ease: "power2.in", // Accelerate as it flies past
            duration: 1,
          },
          startTime + 1 // Starts after the resting phase
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-transparent">
      {Children.toArray(children).map((child, index) => (
        <div
          key={index}
          ref={(el) => {
            sectionsRef.current[index] = el as HTMLDivElement | null;
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none will-change-transform"
        >
          {/* Apply backdrop blur ONLY when the section is near scale: 1 to save performance */}
          <div className={`w-full h-full overflow-y-auto custom-scrollbar flex flex-col justify-center transition-all duration-300 ${activeIndex === index ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            {child}
          </div>
        </div>
      ))}

      {/* Navigation Bars */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end gap-3 pointer-events-auto pr-6">
        {Children.toArray(children).map((_, index) => {
          const isActive = activeIndex === index;
          const name = sectionNames?.[index] || `Section ${index + 1}`;
          
          return (
            <button
              key={`nav-bar-${index}`}
              onClick={() => {
                if (!containerRef.current) return;
                
                const sectionsCount = sectionsRef.current.filter(Boolean).length;
                if (sectionsCount === 0) return;

                const timelineDuration = (sectionsCount * 2) - 1;
                const targetTime = (index * 2) + 0.5;
                const progress = targetTime / timelineDuration;
                
                const totalScrollDistance = sectionsCount * 2.5 * window.innerHeight;
                const targetY = containerRef.current.offsetTop + (progress * totalScrollDistance);
                
                window.scrollTo({
                  top: targetY,
                  behavior: 'smooth'
                });
              }}
              className="group relative flex items-center justify-end h-6 outline-none"
              aria-label={`Go to ${name}`}
            >
              <span 
                className={`mr-4 font-mono text-[10px] uppercase tracking-widest whitespace-nowrap overflow-hidden transition-all duration-500 ease-out flex justify-end ${
                  isActive 
                    ? "max-w-[200px] opacity-100" 
                    : "max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-70"
                }`}
                style={isActive ? { color: 'var(--theme-primary)', textShadow: '0 0 10px var(--theme-primary)' } : { color: 'rgb(148 163 184)' }}
              >
                {name}
              </span>
              <div 
                className={`h-[2px] transition-all duration-500 ease-out ${
                  isActive 
                    ? "w-8 bg-red-primary" 
                    : "w-3 bg-slate-600 group-hover:bg-slate-400 group-hover:w-5"
                }`}
                style={isActive ? { 
                  backgroundColor: 'var(--theme-primary)',
                  boxShadow: '0 0 10px var(--theme-primary)'
                } : {}}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
