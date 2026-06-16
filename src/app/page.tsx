"use client";

import { useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import { SectionTitle, ExperienceCard } from "@/components/sections/ExperienceSection";
import portfolioData from "@/data/portfolio.json";
import ContactSection from "@/components/sections/ContactSection";
import OutroSection from "@/components/sections/OutroSection";
import MouseSpotlight from "@/components/ui/MouseSpotlight";
import FlyThroughParallax from "@/components/ui/FlyThroughParallax";
import TerminalBootLoader from "@/components/ui/TerminalBootLoader";

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);

  

  return (
    <main className={`w-full bg-slate-950 relative overflow-x-hidden ${isBooting ? "h-screen overflow-hidden" : ""}`}>
      {isBooting && <TerminalBootLoader onComplete={() => setIsBooting(false)} />}

      {/* Interactive Spotlight Background fixed behind everything */}
      <MouseSpotlight />

      <div className={`relative z-10 w-full transition-opacity duration-[1500ms] ease-in-out ${isBooting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* The Universal 3D Fly-Through Parallax Container */}
        <FlyThroughParallax>
          
          {/* Section 1: Hero */}
          <HeroSection />
          
          {/* Section 2: About */}
          <AboutSection />
          
          {/* Section 3: Tech Stack */}
          <SkillsSection />
          
          {/* Section 4: Work Experience Title */}
          <SectionTitle sysNum="SYS.03" title="Experience" />

          {/* Section 5: Work Experience Cards */}
          {(portfolioData as any).workExperience.map((item: any, index: number) => (
            <ExperienceCard key={`work-${index}`} item={item} index={index} />
          ))}

          {/* Section 6: Education Title */}
          <SectionTitle sysNum="SYS.04" title="Education" />

          {/* Section 7: Education Cards */}
          {portfolioData.education.map((item, index) => (
            <ExperienceCard key={`edu-${index}`} item={item} index={index} />
          ))}

          {/* Section 8: Projects Title */}
          <SectionTitle sysNum="SYS.05" title="Projects" />

          {/* Section 9: Project Cards flying Left and Right */}
          {portfolioData.projects.map((item, index) => (
            <ExperienceCard key={`proj-${index}`} item={item} index={index} />
          ))}

          {/* Section 10: Contact */}
          <ContactSection />

          {/* Section 11: Outro / Thank You */}
          <OutroSection />

        </FlyThroughParallax>
      </div>
    </main>
  );
}
