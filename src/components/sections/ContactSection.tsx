"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import RevealText from "@/components/react-bits/RevealText";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function ContactSection() {
  return (
    <section id="contact" className="px-4 md:px-8 w-full max-w-7xl mx-auto relative z-10 min-h-[80vh] flex flex-col justify-center py-20">
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl font-bold flex flex-col">
          <RevealText delay={0.1}>
            <span className="text-red-primary font-mono text-xl tracking-widest block mb-2">SYS.04</span>
          </RevealText>
          <RevealText delay={0.3}>
            <span className="text-white uppercase tracking-tighter">Connection</span>
          </RevealText>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Main Contact Block */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-red-primary/30 p-8 md:p-12 relative overflow-hidden group"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-primary/20 blur-[50px] group-hover:bg-red-primary/40 transition-colors duration-500" />
          
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Let's build something<br/><span className="text-red-primary">exceptional.</span></h3>
          <p className="text-slate-400 text-lg mb-10 max-w-md">Currently looking for new opportunities. My inbox is always open.</p>
          
          <a href="mailto:alexkgm2412@gmail.com" className="inline-flex items-center gap-4 bg-red-primary text-white px-8 py-4 font-bold tracking-widest hover:bg-red-600 transition-colors">
            INITIATE CONTACT <ExternalLink size={18} />
          </a>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.a 
            href="https://github.com/PorKeat"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub Profile"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-center hover:border-red-accent/50 transition-colors group"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 80%)" }}
          >
            <GithubIcon className="text-slate-500 group-hover:text-red-accent w-8 h-8 mb-4 transition-colors" aria-hidden="true" />
            <h4 className="text-white font-bold text-lg">GitHub</h4>
            <p className="text-slate-400 text-sm font-mono mt-1">github.com/PorKeat</p>
          </motion.a>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-center hover:border-red-primary/50 transition-colors group"
            style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 20%)" }}
          >
            <MapPin className="text-slate-500 group-hover:text-red-primary w-8 h-8 mb-4 transition-colors" />
            <h4 className="text-white font-bold text-lg">Location</h4>
            <p className="text-slate-400 text-sm font-mono mt-1">Phnom Penh, KH</p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 md:left-8 flex gap-8 font-mono text-xs text-slate-600">
        <span>&copy; {new Date().getFullYear()} SENG PORKEAT</span>
        <span>SYS.STATUS: <span className="text-red-primary animate-pulse">ONLINE</span></span>
      </div>
    </section>
  );
}
