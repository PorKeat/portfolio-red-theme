import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import { SectionTitle, ExperienceCard } from "@/components/sections/ExperienceSection";

const EDUCATION = [
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

const PROJECTS = [
  {
    year: "2023 - Present",
    title: "Project Experience",
    institution: "SETEC Institute & ISTAD",
    description: "Completed numerous assignments and projects in Programming, Web Development, Graphic Design, Networking, UX/UI Design, and hands-on Windows Server projects at TGI."
  }
];
import ContactSection from "@/components/sections/ContactSection";
import OutroSection from "@/components/sections/OutroSection";
import MouseSpotlight from "@/components/ui/MouseSpotlight";
import FlyThroughParallax from "@/components/ui/FlyThroughParallax";
import TerminalBootLoader from "@/components/ui/TerminalBootLoader";

export default function Home() {
  return (
    <main className="w-full bg-slate-950 relative overflow-x-hidden">
      <TerminalBootLoader />

      {/* Interactive Spotlight Background fixed behind everything */}
      <MouseSpotlight />

      <div className="relative z-10 w-full">
        {/* The Universal 3D Fly-Through Parallax Container */}
        <FlyThroughParallax>
          
          {/* Section 1: Hero */}
          <HeroSection />
          
          {/* Section 2: About */}
          <AboutSection />
          
          {/* Section 3: Tech Stack */}
          <SkillsSection />
          
          {/* Section 4: Education Title */}
          <SectionTitle sysNum="SYS.03" title="Education" />

          {/* Section 5, 6, 7: Education Cards flying Left and Right */}
          {EDUCATION.map((item, index) => (
            <ExperienceCard key={`edu-${index}`} item={item} index={index} />
          ))}

          {/* Section 8: Projects Title */}
          <SectionTitle sysNum="SYS.04" title="Projects" />

          {/* Section 9: Project Cards flying Left and Right */}
          {PROJECTS.map((item, index) => (
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
