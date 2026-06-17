"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";
import MatrixRain from "@/components/ui/matrix-rain";
import { useSoundEffects } from "@/hooks/use-sound-effects";

type Log = {
  text: string;
  isCommand?: boolean;
  isError?: boolean;
};

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  whoami       - Display identity info",
    "  skills       - List core competencies",
    "  experience   - View work history",
    "  contact      - Get contact details",
    "  download     - Download my Resume (CV)",
    "  sudo         - Execute command as superuser",
    "  clear        - Clear the terminal output"
  ],
  whoami: [
    "ALEX KGM (Seng PorKeat)",
    "Role: DevOps Engineer & Fullstack Developer",
    "Location: Phnom Penh, Cambodia",
    "Status: ONLINE"
  ],
  skills: [
    "[CORE] React, Next.js, TypeScript, TailwindCSS",
    "[BACKEND] Node.js, Python, Java, C++",
    "[DEVOPS] Docker, Kubernetes, AWS, Terraform, CI/CD",
    "[DB] PostgreSQL, MongoDB, Redis"
  ],
  experience: [
    "Fetching data from encrypted storage...",
    "> DevOps Intern @ SabaiCode",
    "> Hackathon Finalist @ Multiple Events",
    "For full details, scroll up to the visual experience section."
  ],
  contact: [
    "Establishing secure connection...",
    "Email: alexkgm2412@gmail.com",
    "GitHub: github.com/PorKeat",
    "Telegram: t.me/PorKeat"
  ]
};

export default function TerminalSection() {
  const [logs, setLogs] = useState<Log[]>([
    { text: "AlexKGM OS v2.4.1 (tty1)" },
    { text: "Type 'help' to see available commands." },
    { text: "Hint: Try typing 'download' to get my resume!" }
  ]);
  const [input, setInput] = useState("");
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { playKeystroke, playEnterKey } = useSoundEffects();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newLogs: Log[] = [...logs, { text: `user@alexkgm:~$ ${cmd}`, isCommand: true }];
    
    if (cmd === "clear") {
      setLogs([]);
      setInput("");
      return;
    }
    
    if (cmd === "download" || cmd === "cv") {
      newLogs.push({ text: "Downloading CV..." });
      // Create a fake link and click it
      const link = document.createElement("a");
      link.href = "/Seng_PorKeat_Resume.pdf";
      link.download = "Seng_PorKeat_Resume.pdf";
      link.click();
    } else if (cmd === "matrix") {
      setIsMatrixMode(true);
      newLogs.push({ text: "Initializing visual payload..." });
      newLogs.push({ text: "Wake up, Neo." });
    } else if (cmd === "sudo rm -rf /" || cmd === "rm -rf /") {
      newLogs.push({ text: "CRITICAL ALERT: Attempting filesystem wipe...", isError: true });
      newLogs.push({ text: "Bypassing security protocols...", isError: true });
      setTimeout(() => {
        window.location.href = "/fatal-system-error-initiated";
      }, 1500);
    } else if (cmd.startsWith("sudo ")) {
      newLogs.push({ text: `alexkgm is not in the sudoers file. This incident will be reported.`, isError: true });
    } else if (COMMANDS[cmd]) {
      COMMANDS[cmd].forEach(line => newLogs.push({ text: line }));
    } else {
      newLogs.push({ text: `command not found: ${cmd}`, isError: true });
    }

    setLogs(newLogs);
    setInput("");
  };

  return (
    <section id="terminal" className="w-full max-w-4xl mx-auto px-4 py-24 relative z-10 font-mono">
      <div className="flex items-center gap-4 mb-8">
        <TerminalIcon className="w-8 h-8 text-red-primary" style={{ color: `var(--theme-primary)` }} />
        <h2 className="text-3xl font-bold text-white tracking-widest uppercase">System Console</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-slate-950/80 backdrop-blur-xl border border-red-primary/30 rounded-lg overflow-hidden group"
        style={{ boxShadow: `0 0 40px color-mix(in srgb, var(--theme-primary) 15%, transparent)` }}
      >
        {/* macOS style header */}
        <div className="w-full h-8 bg-slate-900 border-b border-red-primary/30 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-auto text-[10px] text-slate-500 select-none">alexkgm — bash — 80x24</span>
        </div>

        {/* Terminal Body */}
        <div 
          ref={containerRef}
          data-lenis-prevent
          className="p-6 h-[400px] overflow-y-auto cursor-text text-sm md:text-base flex flex-col custom-scrollbar relative"
          style={{ overscrollBehavior: "contain" }}
          onClick={() => inputRef.current?.focus()}
        >
          {isMatrixMode && <MatrixRain />}
          
          <div className="relative z-10 flex flex-col w-full">
            {logs.map((log, i) => (
              <div 
                key={i} 
              className={`mb-1 transition-colors duration-1000 ${log.isCommand ? 'text-slate-300 mt-2' : log.isError ? '' : 'text-slate-400'}`}
              style={log.isError ? { color: 'var(--theme-primary)' } : {}}
            >
              {log.text}
            </div>
          ))}
          
            <form onSubmit={handleCommand} className="mt-2 flex items-center text-slate-300">
              <span className="text-red-primary font-bold mr-2" style={{ color: `var(--theme-primary)` }}>user@alexkgm:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  playKeystroke();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    playEnterKey();
                    handleCommand();
                  }
                }}
                className="flex-1 bg-transparent outline-none text-white caret-red-primary"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
