"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Terminal, Shield, Code2, Cpu, Download } from "lucide-react"
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
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
    },
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-dark/50 to-bg-dark pointer-events-none" />

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-72 h-72 bg-primary/8 rounded-full blur-[100px]"
        animate={{ y: [-20, 20, -20], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]"
        animate={{ y: [20, -20, 20], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left content */}
          <motion.div
            className="lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={itemVariants}
              className="font-mono text-primary text-sm sm:text-base mb-4"
            >
              Hi, my name is
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4"
            >
              <span className="text-white">Joe Munene.</span>
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-5xl font-bold text-text-muted mb-6"
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
              <a
                href="#projects"
                className="group px-6 py-3 bg-primary text-bg-dark font-mono text-sm font-semibold rounded-lg hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all duration-300 flex items-center gap-2"
              >
                <Code2 className="w-4 h-4" />
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-primary text-primary font-mono text-sm rounded-lg hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.15)] transition-all duration-300 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Get In Touch
              </a>
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

          {/* Right - Photo */}
          <motion.div
            className="lg:col-span-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="relative group">
              {/* Glow ring */}
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/40 via-emerald-400/20 to-primary/40 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Border frame */}
              <div className="relative rounded-2xl border-2 border-primary/30 overflow-hidden bg-bg-card">
                <Image
                  src="/joe-munene.jpg"
                  alt="Joe Munene"
                  width={360}
                  height={450}
                  className="object-cover w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] lg:w-[360px] lg:h-[450px] grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                  priority
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent" />

                {/* Status badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-bg-dark/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/30">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-primary">Available for work</span>
                </div>
              </div>

              {/* Decorative corner brackets */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/50 rounded-tl" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary/50 rounded-tr" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary/50 rounded-bl" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary/50 rounded-br" />
            </div>
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
