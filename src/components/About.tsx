"use client"

import { skills } from "@/data"
import { useGitHubStats } from "@/hooks/useGitHubStats"
import { Github, Code, CheckCircle, FileCode, BookOpen, Shield } from "lucide-react"

export default function About() {
  const { stats, loading } = useGitHubStats()

  const statCards = [
    { icon: <Github className="w-6 h-6" />, value: stats.totalRepos, label: "Total Repos" },
    { icon: <Code className="w-6 h-6" />, value: stats.totalCommits, label: "Total Commits" },
    { icon: <FileCode className="w-6 h-6" />, value: stats.linesOfCode, label: "Lines of Code" },
    { icon: <CheckCircle className="w-6 h-6" />, value: stats.healthyRepos, label: "Healthy Repos" },
  ]

  return (
    <section id="about" className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-primary text-sm mb-2">01. About Me</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="text-white">Who am I?</span>
            <span className="text-border-color ml-2">/</span>
          </h2>

          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>
              I&apos;m <span className="text-white font-medium">Joe Munene</span>, a software engineer and cybersecurity researcher
              based in Nairobi, Kenya. Currently pursuing Computer Science at <span className="text-primary">Moi University</span>,
              I specialize in building secure systems and developing tools that push the boundaries of what&apos;s possible.
            </p>
            <p>
              My work spans across <span className="text-white">full-stack development</span>,{" "}
              <span className="text-white">applied cybersecurity</span>, and{" "}
              <span className="text-white">AI integration</span>. I&apos;ve built everything from penetration testing tools
              and vulnerability scanners to AI-powered coding assistants and SaaS dashboards.
            </p>
            <p>
              When I&apos;m not writing code, I&apos;m researching emerging threats, contributing to open-source
              security tools, or exploring the intersection of machine learning and cybersecurity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {statCards.map((stat, i) => (
            <div
              key={i}
              className="bg-bg-card border border-border-color rounded-lg p-6 hover:border-primary/50 transition-all duration-300 group glow-box-hover"
            >
              <div className="text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className={`text-2xl sm:text-3xl font-bold text-white font-mono ${loading ? "animate-pulse" : ""}`}>
                {stat.value}
              </div>
              <div className="text-text-muted text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div id="skills" className="mb-16">
          <p className="font-mono text-primary text-sm mb-2">02. Skills & Expertise</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Technical Arsenal
            <span className="text-border-color ml-2">/</span>
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-bg-card border border-border-color rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" /> Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary font-mono text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-bg-card border border-border-color rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> Frameworks
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary font-mono text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-bg-card border border-border-color rounded-lg p-6 hover:border-primary/50 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" /> Cybersecurity
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.cybersecurity.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary font-mono text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
