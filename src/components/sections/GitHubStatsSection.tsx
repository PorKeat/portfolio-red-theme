"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import RevealText from "@/components/react-bits/RevealText";

export default function GitHubStatsSection() {
  const [stats, setStats] = useState({
    repos: 0,
    stars: 0,
    forks: 0,
  });

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        const username = "PorKeat";
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        
        // Fetch all repos to calculate total stars and forks
        let allRepos: { stargazers_count: number; forks_count: number }[] = [];
        let page = 1;
        let hasMore = true;
        
        while (hasMore) {
          const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`);
          const reposData = await reposRes.json();
          
          if (reposData.length > 0) {
            allRepos = [...allRepos, ...reposData];
            page++;
          } else {
            hasMore = false;
          }
        }
        
        const totalStars = allRepos.reduce((acc: number, repo: { stargazers_count: number }) => acc + repo.stargazers_count, 0);
        const totalForks = allRepos.reduce((acc: number, repo: { forks_count: number }) => acc + repo.forks_count, 0);

        setStats({
          repos: data.public_repos || 0,
          stars: totalStars || 0,
          forks: totalForks || 0,
        });
      } catch (error) {
        console.error("Failed to fetch GitHub stats", error);
      }
    }

    fetchGitHubStats();
  }, []);

  return (
    <section id="github-stats" className="min-h-screen relative flex items-center justify-center px-6 py-24 md:py-32 z-10 pointer-events-auto">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold flex flex-col">
            <RevealText delay={0.1}>
              <span className="text-red-primary font-mono text-xl tracking-widest block mb-2" style={{ color: "var(--theme-primary)" }}>SYS.04.5</span>
            </RevealText>
            <RevealText delay={0.3}>
              <span className="text-white uppercase tracking-tighter">Open Source</span>
            </RevealText>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <StatCard 
            icon={<BookOpen className="w-8 h-8" />} 
            label="Public Repos" 
            value={stats.repos} 
            delay={0.1} 
          />
          <StatCard 
            icon={<Star className="w-8 h-8" />} 
            label="Total Stars" 
            value={stats.stars} 
            delay={0.2} 
          />
          <StatCard 
            icon={<GitFork className="w-8 h-8" />} 
            label="Total Forks" 
            value={stats.forks} 
            delay={0.3} 
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/PorKeat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 hover:border-red-primary text-white rounded-full transition-all hover:shadow-[0_0_20px_var(--theme-primary)] group"
          >
            <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-mono tracking-widest text-sm">VIEW GITHUB PROFILE</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ icon, label, value, delay }: { icon: React.ReactNode, label: string, value: number, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-red-primary transition-colors"
      style={{
        boxShadow: "0 0 0 transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 30px color-mix(in srgb, var(--theme-primary) 20%, transparent)";
        e.currentTarget.style.borderColor = "var(--theme-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 transparent";
        e.currentTarget.style.borderColor = "rgb(30 41 59)"; // slate-800
      }}
    >
      <div className="text-slate-400 group-hover:text-red-primary transition-colors mb-4" style={{ color: "var(--theme-primary)" }}>
        {icon}
      </div>
      <Counter value={value} />
      <div className="text-slate-500 font-mono text-sm tracking-widest uppercase mt-2">{label}</div>
    </motion.div>
  );
}

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalDuration = 2000;
    const incrementTime = (totalDuration / end);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <div className="text-5xl md:text-7xl font-black text-white">{count}</div>;
}
