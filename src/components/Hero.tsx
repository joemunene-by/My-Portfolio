"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronDown, Terminal, Shield, Code2, Cpu, FileText } from "lucide-react"
import { useGitHubStats } from "@/hooks/useGitHubStats"
import Image from "next/image"

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
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/joe-munene.jpg"
          alt="Joe Munene"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Heavy cinematic overlay */}
        <div className="absolute inset-0 bg-bg-dark/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark/60" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40" />

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
        <motion.div
          className="max-w-3xl"
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

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-8xl font-bold mb-4 tracking-tight"
          >
            <span className="text-white">Joe Munene.</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-white/50 mb-6"
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
            className="text-white/60 text-base sm:text-lg max-w-xl mb-10 leading-relaxed"
          >
            Software engineer focused on secure systems, full-stack development, and applied cybersecurity.
            Building tools that bridge the gap between offensive security and modern web development.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="group px-6 py-3 bg-primary text-white font-mono text-sm font-semibold rounded-lg hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(108,156,255,0.25)] transition-all duration-300 flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-white/20 text-white font-mono text-sm rounded-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
            >
              <Shield className="w-4 h-4" />
              Get In Touch
            </a>
            <Link
              href="/resume"
              className="px-6 py-3 border border-accent/30 text-accent font-mono text-sm rounded-lg hover:bg-accent/10 hover:border-accent/60 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
            >
              <FileText className="w-4 h-4" />
              Resume
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center gap-6 text-white/50"
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
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-primary transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.a>
    </section>
  )
}
