"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MouseSpotlight from "@/components/ui/MouseSpotlight";

export default function NotFound() {
  return (
    <main className="w-full min-h-screen bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center text-slate-200">
      <MouseSpotlight />
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef44440a_1px,transparent_1px),linear-gradient(to_bottom,#ef44440a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Massive Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-600/20 rounded-full blur-[80px] pointer-events-none animate-pulse" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center text-center"
      >
        {/* The 404 Text */}
        <div className="relative mb-8 flex justify-center items-center">
          <motion.h1 
            initial={{ scale: 0.8, filter: "blur(10px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-[12rem] md:text-[20rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-800 select-none opacity-20 absolute"
          >
            404
          </motion.h1>
          <div className="z-10 flex flex-col items-center mt-12 md:mt-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="px-4 py-1.5 rounded-full border border-red-primary/30 bg-red-primary/10 text-red-primary font-mono text-sm tracking-widest mb-6 backdrop-blur-md"
            >
              SYS.ERROR_CODE: 404
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6"
            >
              Signal <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-primary to-orange-500">Lost</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-slate-400 text-lg md:text-xl max-w-lg font-mono leading-relaxed"
            >
              The node you are trying to reach has been removed, renamed, or is temporarily unavailable in the mainframe.
            </motion.p>
          </div>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12"
        >
          <Link 
            href="/"
            className="relative group inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900/80 backdrop-blur-xl border border-slate-700 hover:border-red-primary/80 transition-all duration-500 rounded-2xl overflow-hidden shadow-[0_0_40px_-15px_rgba(239,68,68,0)] hover:shadow-[0_0_40px_-15px_rgba(239,68,68,0.5)] hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-primary/0 via-red-primary/10 to-red-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-primary group-hover:text-white transition-colors"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            <span className="font-mono font-bold tracking-widest text-slate-200 group-hover:text-white transition-colors">
              REROUTE TO ORIGIN
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
