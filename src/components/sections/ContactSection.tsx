"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Send } from "lucide-react";
import RevealText from "@/components/react-bits/RevealText";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("https://formspree.io/f/xqeookpp", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };
  return (
    <section id="contact" className="px-4 md:px-8 w-full max-w-7xl mx-auto relative z-10 min-h-[80vh] flex flex-col justify-center py-20">
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl font-bold flex flex-col">
          <RevealText delay={0.1}>
            <span className="text-red-primary font-mono text-xl tracking-widest block mb-2">SYS.05</span>
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
          
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Let&apos;s build something<br/><span className="text-red-primary">exceptional.</span></h3>
          <p className="text-slate-400 text-lg mb-10 max-w-md">Currently looking for new opportunities. My inbox is always open.</p>
          
          {status === "success" ? (
            <div className="bg-green-500/10 border border-green-500/50 p-6 flex flex-col items-center justify-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h4 className="text-xl font-bold text-white">Message Transmitted</h4>
              <p className="text-green-400/80">I&apos;ve received your message and will respond shortly.</p>
              <button onClick={() => setStatus("idle")} className="mt-4 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white transition-colors text-sm font-bold tracking-widest">
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-mono text-slate-400 uppercase tracking-widest">Name_</label>
                  <input required type="text" id="name" name="name" className="bg-slate-900/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-red-primary/50 transition-colors" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-mono text-slate-400 uppercase tracking-widest">Email_</label>
                  <input required type="email" id="email" name="email" className="bg-slate-900/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-red-primary/50 transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono text-slate-400 uppercase tracking-widest">Message_</label>
                <textarea required id="message" name="message" rows={4} className="bg-slate-900/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-red-primary/50 transition-colors resize-none" placeholder="Initiating transmission..."></textarea>
              </div>
              
              {status === "error" && (
                <p className="text-red-500 text-sm mt-2">Transmission failed. Please try again or email me directly.</p>
              )}

              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="mt-4 inline-flex items-center justify-center gap-4 bg-red-primary text-white px-8 py-4 font-bold tracking-widest hover:bg-red-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    TRANSMITTING...
                  </span>
                ) : (
                  <>INITIATE CONTACT <Send size={18} /></>
                )}
              </button>
            </form>
          )}
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

          <motion.a 
            href="https://t.me/PorKeat"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message me on Telegram"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-center hover:border-[#229ED9]/50 transition-colors group"
          >
            <Send className="text-slate-500 group-hover:text-[#229ED9] w-8 h-8 mb-4 transition-colors" aria-hidden="true" />
            <h4 className="text-white font-bold text-lg">Telegram</h4>
            <p className="text-slate-400 text-sm font-mono mt-1">@PorKeat</p>
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
