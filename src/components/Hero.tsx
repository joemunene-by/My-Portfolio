"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Terminal, Shield, Code2, Cpu } from "lucide-react"

export default function Hero() {
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

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative grid-bg overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-dark/50 to-bg-dark pointer-events-none" />

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <p className="font-mono text-primary text-sm sm:text-base mb-4 animate-fade-in">
            Hi, my name is
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-white">Joe Munene.</span>
          </h1>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-text-muted mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            I build things that{" "}
            <span className="text-gradient">hack, think, and automate</span>.
          </h2>

          <div className="h-8 mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3 font-mono text-base sm:text-lg text-primary">
              <Terminal className="w-5 h-5 flex-shrink-0" />
              <span className="overflow-hidden whitespace-nowrap border-r-2 border-primary pr-1" style={{ animation: "typing 2s steps(30) forwards, blink 0.75s step-end infinite" }}>
                {roles[textIndex]}
              </span>
            </div>
          </div>

          <p className="text-text-muted text-base sm:text-lg max-w-xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "0.4s" }}>
            Software engineer focused on secure systems, full-stack development, and applied cybersecurity.
            Building tools that bridge the gap between offensive security and modern web development.
          </p>

          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <a
              href="#projects"
              className="group px-6 py-3 bg-primary text-bg-dark font-mono text-sm font-semibold rounded hover:bg-primary-dark transition-all duration-200 flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-primary text-primary font-mono text-sm rounded hover:bg-primary/10 transition-all duration-200 flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Get In Touch
            </a>
          </div>

          <div className="mt-16 flex items-center gap-6 text-text-muted animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs">26 Repos</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs">217 Commits</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs">90K+ LOC</span>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted hover:text-primary transition-colors animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  )
}
