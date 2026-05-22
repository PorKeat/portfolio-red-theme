"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealText from "@/components/react-bits/RevealText";

export const EDUCATION = [
  {
    year: "Nov 2024",
    title: "IT Professional (DevOps)",
    institution: "ISTAD",
    description: "Specializing in DevOps practices, gaining practical experience through real projects, application deployment, CI/CD, and infrastructure management."
  },
  {
    year: "Oct 2024",
    title: "Full-stack Student",
    institution: "ISTAD",
    description: "Specializing in Next.js and Spring, gaining practical experience through real projects and team-based web application development."
  },
  {
    year: "Aug 2023",
    title: "Foundation Student",
    institution: "ISTAD",
    description: "Developed web development skills in React and Java, with hands-on experience on real projects and collaborative teamwork."
  }
];

export const PROJECTS = [
  {
    year: "2023 - Present",
    title: "Project Experience",
    institution: "SETEC Institute & ISTAD",
    description: "Completed numerous assignments and projects in Programming, Web Development, Graphic Design, Networking, UX/UI Design, and hands-on Windows Server projects at TGI."
  }
];

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

export function ExperienceCard({ item, index }: { item: any, index: number }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isLeft = index % 2 === 0;

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center relative px-4 pointer-events-auto">
      <div className="w-full max-w-7xl mx-auto flex justify-center">
        
        {/* The Card */}
        <div className={`w-full md:w-[900px] flex flex-col md:flex-row ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 bg-slate-900/80 backdrop-blur-xl border border-red-primary/30 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(239,68,68,0.15)] hover:border-red-primary hover:bg-slate-900/90 transition-all duration-300 relative group`}>
          
          {/* Decorative neon accent */}
          <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-1/2 bg-red-primary rounded-full opacity-50 group-hover:opacity-100 transition-opacity blur-[2px] ${isLeft ? '-right-1' : '-left-1'}`} />

          {/* Image Side */}
          <motion.div 
            layoutId={`image-container-${index}`}
            onClick={() => setSelectedIndex(index)}
            className="w-full md:w-2/5 h-48 md:h-auto min-h-[200px] rounded-xl overflow-hidden relative border border-slate-700/50 group-hover:border-red-primary/50 transition-colors duration-300 cursor-pointer"
          >
            <motion.img 
              layoutId={`image-${index}`}
              src="/placeholder-mountain.png" 
              alt="Experience Placeholder" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-110"
            />
            {/* Click to view overlay */}
            <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-mono text-sm tracking-widest border border-white/30 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">VIEW</span>
            </div>
          </motion.div>

          {/* Text Description Side */}
          <div className="w-full md:w-3/5 flex flex-col justify-center">
            <div className="self-start">
              <span className="inline-block px-3 py-1 font-mono text-sm rounded-full mb-4 border border-red-primary/30 bg-red-primary/20 text-red-accent">
                {item.year}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-red-primary transition-colors duration-300">{item.title}</h3>
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
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 lg:p-10 cursor-zoom-out"
          >
            <motion.div
              layoutId={`image-container-${index}`}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-6xl w-full h-auto max-h-[90vh] rounded-2xl overflow-hidden border border-slate-700 shadow-[0_0_80px_rgba(239,68,68,0.2)] bg-slate-900 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking image
            >
              <motion.img 
                layoutId={`image-${index}`}
                src="/placeholder-mountain.png" 
                alt="Enlarged Experience Preview" 
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              
              {/* Close Button */}
              <motion.button 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ delay: 0.2 }}
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-slate-950/50 hover:bg-red-primary border border-slate-700 hover:border-red-primary rounded-full flex items-center justify-center text-white transition-colors duration-300 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
