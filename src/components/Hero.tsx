"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronDown, Terminal, Shield, Code2, Cpu, FileText } from "lucide-react"
import { useGitHubStats } from "@/hooks/useGitHubStats"
import MagneticLink from "./MagneticLink"
import RevealText from "./RevealText"
import HeroSpotlight from "./HeroSpotlight"
import ScrambleText from "./ScrambleText"
import HeroAvatar from "./HeroAvatar"

export default function Hero() {
  const { stats } = useGitHubStats()
  const [textIndex, setTextIndex] = useState(0)
  const roles = [
    "Full-Stack Developer",
    "Cybersecurity Researcher",
    "AI Engineer",
    "CS Student @ Moi University",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg" />
      <HeroSpotlight />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-dark/50 to-bg-dark pointer-events-none" />

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-72 h-72 bg-primary/8 rounded-full blur-[120px]"
        animate={{ y: [-20, 20, -20], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[140px]"
        animate={{ y: [20, -20, 20], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-mono text-xs text-white/70">Available for work</span>
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="font-mono text-primary text-sm sm:text-base mb-4"
            >
              Hi, my name is
            </motion.p>

            <motion.div variants={itemVariants}>
              <ScrambleText
                as="h1"
                text="Joe Munene."
                className="block text-5xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tight text-white cursor-pointer"
              />
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-muted mb-6"
            >
              I build things that{" "}
              <span className="text-gradient">hack, think, and automate</span>.
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="h-8 mb-8"
            >
              <div className="flex items-center gap-3 font-mono text-base sm:text-lg text-primary">
                <Terminal className="w-5 h-5 flex-shrink-0" />
                <motion.span
                  key={textIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="border-r-2 border-primary pr-1"
                >
                  {roles[textIndex]}
                </motion.span>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-text-muted text-base sm:text-lg max-w-xl mb-10 leading-relaxed"
            >
              Software engineer focused on secure systems, full-stack development, and applied cybersecurity.
              Building tools that bridge the gap between offensive security and modern web development.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <MagneticLink>
                <a
                  href="#projects"
                  className="group relative px-8 py-4 font-mono text-base font-semibold rounded-xl flex items-center gap-2.5 transition-all duration-300 bg-gradient-to-b from-primary/90 to-primary border border-primary/50 text-white shadow-[0_4px_15px_rgba(108,156,255,0.3),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_25px_rgba(108,156,255,0.45),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(0,0,0,0.2)] active:translate-y-[1px]"
                >
                  <Code2 className="w-5 h-5" />
                  View My Work
                </a>
              </MagneticLink>
              <MagneticLink>
                <a
                  href="#contact"
                  className="group relative px-8 py-4 font-mono text-base rounded-xl flex items-center gap-2.5 transition-all duration-300 bg-white/5 backdrop-blur-md border border-white/15 text-white shadow-[0_4px_15px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(255,255,255,0.05)] hover:bg-white/10 hover:border-white/25 hover:shadow-[0_6px_25px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(255,255,255,0.08)]"
                >
                  <Shield className="w-5 h-5" />
                  Get In Touch
                </a>
              </MagneticLink>
              <MagneticLink>
                <Link
                  href="/resume"
                  className="group relative px-8 py-4 font-mono text-base rounded-xl flex items-center gap-2.5 transition-all duration-300 bg-accent/5 backdrop-blur-md border border-accent/20 text-accent shadow-[0_4px_15px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(168,148,255,0.1),inset_0_-1px_0_rgba(168,148,255,0.05)] hover:bg-accent/10 hover:border-accent/35 hover:shadow-[0_6px_25px_rgba(168,148,255,0.15),inset_0_1px_0_rgba(168,148,255,0.15),inset_0_-1px_0_rgba(168,148,255,0.08)]"
                >
                  <FileText className="w-5 h-5" />
                  Resume
                </Link>
              </MagneticLink>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center gap-6 text-text-muted"
            >
              {[
                { icon: <Cpu className="w-4 h-4 text-primary" />, text: `${stats.totalRepos} Repos` },
                { icon: <Terminal className="w-4 h-4 text-primary" />, text: `${stats.totalCommits} Commits` },
                { icon: <Shield className="w-4 h-4 text-primary" />, text: `${stats.linesOfCode} LOC` },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  {stat.icon}
                  <span className="font-mono text-xs">{stat.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - 3D parallax avatar */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.85, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <HeroAvatar />
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted hover:text-primary transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.a>
    </section>
  )
}
