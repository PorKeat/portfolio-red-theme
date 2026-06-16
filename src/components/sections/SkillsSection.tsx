"use client";
import { useState } from "react";

import { motion } from "framer-motion";
import RevealText from "@/components/react-bits/RevealText";
import { 
  SiJavascript, SiNextdotjs, SiExpress, SiSpring, SiPython,
  SiJenkins, SiGithubactions, SiDocker, SiKubernetes, SiArgo, SiAnsible, 
  SiPrometheus, SiLinux, SiPostgresql, SiMongodb, SiCplusplus, SiCsharp, 
  SiTerraform, SiGrafana
} from "react-icons/si";
import { FaJava, FaShieldAlt, FaHtml5, FaCss3Alt, FaWindows } from "react-icons/fa";

const SKILLS = [
  // Row 0 (Y=0)
  { name: "HTML5", icon: FaHtml5, color: "#E34F26", x: 0, y: 0 },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6", x: 104, y: 0 },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", x: 208, y: 0 },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", x: 312, y: 0 },
  
  // Row 1 (Y=90)
  { name: "Express", icon: SiExpress, color: "#FFFFFF", x: -52, y: 90 },
  { name: "Spring", icon: SiSpring, color: "#6DB33F", x: 52, y: 90 },
  { name: "Java", icon: FaJava, color: "#007396", x: 156, y: 90 },
  { name: "Python", icon: SiPython, color: "#3776AB", x: 260, y: 90 },
  { name: "Linux", icon: SiLinux, color: "#FCC624", x: 364, y: 90 },

  // Row 2 (Y=180)
  { name: "Windows", icon: FaWindows, color: "#0078D6", x: 0, y: 180 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", x: 104, y: 180 },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5", x: 208, y: 180 },
  { name: "Ansible", icon: SiAnsible, color: "#EE0000", x: 312, y: 180 },

  // Row 3 (Y=270)
  { name: "ArgoCD", icon: SiArgo, color: "#EF7B4D", x: -52, y: 270 },
  { name: "Prometheus", icon: SiPrometheus, color: "#E6522C", x: 52, y: 270 },
  { name: "Jenkins", icon: SiJenkins, color: "#D24939", x: 156, y: 270 },
  { name: "GH Actions", icon: SiGithubactions, color: "#2088FF", x: 260, y: 270 },
  { name: "Security", icon: FaShieldAlt, color: "#EF4444", x: 364, y: 270 },

  // Row 4 (Y=360)
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", x: 0, y: 360 },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", x: 104, y: 360 },
  { name: "C++", icon: SiCplusplus, color: "#00599C", x: 208, y: 360 },
  { name: "C#", icon: SiCsharp, color: "#239120", x: 312, y: 360 },

  // Row 5 (Y=450)
  { name: "Terraform", icon: SiTerraform, color: "#7B42BC", x: 52, y: 450 },
  { name: "Grafana", icon: SiGrafana, color: "#F46800", x: 156, y: 450 },
];

function Hexagon({ skill, index }: { skill: any, index: number }) {
  const Icon = skill.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05, type: "spring" }}
      className="absolute group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        left: `${skill.x + 52}px`,
        top: `${skill.y}px`,
        width: "100px",
        height: "115px",
      }}
    >
      {/* Background glow using the brand color */}
      <div 
        className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-full"
        style={{ backgroundColor: skill.color }}
      />
      
      {/* Hexagon Border Wrapper */}
      <div 
        className="w-full h-full clip-hex p-[2px] transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110 z-10 relative"
        style={{ 
          backgroundColor: isHovered ? skill.color : "rgba(30, 41, 59, 1)"
        }}
      >
        {/* Inner Hexagon */}
        <div 
          className="w-full h-full clip-hex flex flex-col items-center justify-center transition-colors duration-300 relative overflow-hidden"
          style={{ backgroundColor: "rgba(2, 6, 23, 1)" }}
        >
          {/* Subtle color tint background on hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
            style={{ backgroundColor: skill.color }} 
          />
          
          <Icon 
            size={36} 
            className="transition-colors duration-300 mb-1 relative z-20" 
            color={isHovered ? skill.color : "#64748b"}
            style={isHovered ? { filter: `drop-shadow(0 0 10px ${skill.color})` } : {}}
          />
          
          <span 
            className="text-[10px] font-mono font-bold transition-colors duration-300 text-center px-1 relative z-20"
            style={{ color: isHovered ? "#ffffff" : "#64748b" }}
          >
            {skill.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full relative z-10 flex flex-col justify-center min-h-screen py-20 overflow-hidden">
      <div className="px-4 md:px-8 max-w-7xl mx-auto w-full mb-10 relative z-20">
        <h2 className="text-4xl md:text-6xl font-bold flex flex-col items-end text-right">
          <RevealText delay={0.1}>
            <span className="text-red-primary font-mono text-xl tracking-widest block mb-2">SYS.02</span>
          </RevealText>
          <RevealText delay={0.3}>
            <span className="text-white uppercase tracking-tighter">Tech Stack</span>
          </RevealText>
        </h2>
      </div>

      <div className="w-full flex items-center justify-center relative z-20">
        {/* The mathematical container for the absolute grid. 
            Width: 464px + 52px (padding) = 516px. Height: 450px + 115px = 565px.
            We scale it to be responsive. */}
        <div className="relative w-[516px] h-[565px] scale-75 md:scale-100 lg:scale-[1.15] xl:scale-125 transform-origin-center">
          {SKILLS.map((skill, i) => (
            <Hexagon key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-primary/5 blur-[120px] pointer-events-none rounded-full z-0" />
    </section>
  );
}
