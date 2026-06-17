"use client";

import { BookOpen, Shield, Terminal } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import RevealText from "@/components/react-bits/RevealText";
import { motion } from "framer-motion";
import { ImageSlider, ImageLayer, Divider } from "@/components/ui/image-comparison";

export default function AboutSection() {
  return (
    <section id="about" className="px-4 md:px-8 w-full max-w-7xl mx-auto relative z-10 flex flex-col md:items-center md:justify-center min-h-screen py-20">
      <div className="md:absolute top-10 left-10 md:left-20 z-20 mb-10 md:mb-0">
        <h2 className="text-4xl md:text-6xl font-bold flex flex-col">
          <RevealText delay={0.1}>
            <span className="text-red-primary font-mono text-xl tracking-widest block mb-2">SYS.01</span>
          </RevealText>
          <RevealText delay={0.3}>
            <span className="text-white uppercase tracking-tighter">About Me</span>
          </RevealText>
        </h2>
      </div>

      <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0 mt-10 md:mt-0">
        {/* Center Target: The Image */}
        <div className="relative z-30 w-48 h-48 md:w-64 md:h-64 mx-auto md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <TiltCard className="w-full h-full rounded-full relative group" style={{ boxShadow: '0 0 50px color-mix(in srgb, var(--theme-primary) 40%, transparent)' }}>
            <div className="absolute inset-0 rounded-full overflow-hidden z-40">
              <ImageSlider className="w-full h-full" hoverControl={true}>
                <ImageLayer
                  src="/alexkgm.jpg"
                  alt="Alex KGM Realistic"
                  layer="first"
                />
                <ImageLayer 
                  src="/alexkgm2d-transparent.png" 
                  bgSrc="/bg-devops.jpg"
                  alt="Alex KGM 2D Transparent" 
                  layer="second" 
                  dynamicBackground={true}
                />
                <Divider />
              </ImageSlider>
            </div>
            {/* Inner Glowing Ring to replace the painted background ring */}
            <div 
              className="absolute inset-0 rounded-full border-4 border-red-primary z-50 pointer-events-none transition-colors duration-500" 
              style={{ boxShadow: 'inset 0 0 25px var(--theme-primary), 0 0 25px color-mix(in srgb, var(--theme-primary) 50%, transparent)' }} 
            />
            {/* HUD Ring */}
            <div className="absolute -inset-6 border border-red-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute -inset-10 border border-dashed border-red-accent/40 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          </TiltCard>
        </div>

        {/* HUD Panels floating around */}
        <div className="w-full flex flex-col md:block gap-6 z-20 relative md:h-[600px]">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="md:absolute top-0 md:top-20 left-0 md:left-10 w-full md:w-64 bg-slate-900/60 backdrop-blur-xl border-l-4 border-red-primary p-4"
            style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 0 100%)" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Terminal className="text-red-primary w-5 h-5" />
              <h3 className="text-white font-mono text-sm tracking-wider">ROLE</h3>
            </div>
            <ScrollRevealText 
              text="DevOps Engineer & Software Engineering student blending code with secure cloud-native infrastructure." 
              className="text-slate-300 text-sm" 
              delay={0.7}
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="md:absolute bottom-10 md:bottom-20 right-0 md:right-10 w-full md:w-72 bg-slate-900/60 backdrop-blur-xl border-r-4 border-red-accent p-4"
            style={{ clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            <div className="flex items-center justify-start md:justify-end gap-3 mb-2">
              <h3 className="text-white font-mono text-sm tracking-wider md:order-1 order-2">ACADEMICS</h3>
              <BookOpen className="text-red-accent w-5 h-5 md:order-2 order-1" />
            </div>
            <ScrollRevealText 
              text="MIS at SETEC Institute & Software Expert Training at ISTAD." 
              className="text-slate-300 text-sm md:justify-end md:text-right" 
              delay={0.9}
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="md:absolute bottom-0 md:-bottom-10 left-0 md:left-1/3 w-full md:w-64 bg-slate-900/60 backdrop-blur-xl border-b-4 border-white/50 p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <Shield className="text-white w-5 h-5" />
              <h3 className="text-white font-mono text-sm tracking-wider">FOCUS</h3>
            </div>
            <ScrollRevealText 
              text="DevOps, CI/CD, Docker, Kubernetes, and ethical hacking fundamentals." 
              className="text-slate-300 text-sm" 
              delay={1.1}
            />
          </motion.div>
        </div>

        {/* Decorative Grid Lines - hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
          <div className="w-full h-[1px] bg-red-primary absolute top-1/2 -translate-y-1/2" />
          <div className="h-full w-[1px] bg-red-primary absolute left-1/2 -translate-x-1/2" />
        </div>
      </div>
    </section>
  );
}
