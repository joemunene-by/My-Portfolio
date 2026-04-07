"use client"

import { skills } from "@/data"
import { useGitHubStats } from "@/hooks/useGitHubStats"
import AnimatedSection from "./AnimatedSection"
import CountUp from "./CountUp"
import { Github, Code, CheckCircle, FileCode, BookOpen, Shield, Star } from "lucide-react"

export default function About() {
  const { stats } = useGitHubStats()

  const statCards = [
    { icon: <Github className="w-6 h-6" />, value: stats.totalRepos, label: "Public Repos", suffix: "" },
    { icon: <Code className="w-6 h-6" />, value: stats.totalCommits, label: "Total Commits", suffix: "+" },
    { icon: <FileCode className="w-6 h-6" />, value: stats.linesOfCode, label: "Lines of Code", suffix: "" },
    { icon: <CheckCircle className="w-6 h-6" />, value: stats.healthyRepos, label: "Active Repos", suffix: "" },
  ]

  const skillCategories = [
    {
      title: "Languages",
      icon: <Code className="w-5 h-5 text-primary" />,
      items: skills.languages,
    },
    {
      title: "Frameworks",
      icon: <BookOpen className="w-5 h-5 text-primary" />,
      items: skills.frameworks,
    },
    {
      title: "Cybersecurity",
      icon: <Shield className="w-5 h-5 text-primary" />,
      items: skills.cybersecurity,
    },
    {
      title: "Tools",
      icon: <Star className="w-5 h-5 text-primary" />,
      items: skills.tools,
    },
    {
      title: "AI & ML",
      icon: <FileCode className="w-5 h-5 text-primary" />,
      items: skills.ai,
    },
  ]

  return (
    <section id="about" className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <p className="font-mono text-primary text-sm mb-2">01. About Me</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="text-white">Who am I?</span>
            <span className="text-border-color ml-2">/</span>
          </h2>
        </AnimatedSection>

        {/* Bio */}
        <div className="max-w-3xl mb-16">
          <AnimatedSection delay={0.1}>
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
          </AnimatedSection>
        </div>

        {/* Animated stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {statCards.map((stat, i) => (
            <AnimatedSection key={i} delay={i * 0.1} direction="up">
              <div className="bg-bg-card border border-border-color rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group glow-box-hover h-full">
                <div className="text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
                  {typeof stat.value === "number" ? (
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-text-muted text-sm mt-1">{stat.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Skills */}
        <AnimatedSection>
          <div id="skills">
            <p className="font-mono text-primary text-sm mb-2">02. Skills & Expertise</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-10">
              Technical Arsenal
              <span className="text-border-color ml-2">/</span>
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((cat, i) => (
                <AnimatedSection key={cat.title} delay={i * 0.08} direction="up">
                  <div className="bg-bg-card border border-border-color rounded-xl p-6 hover:border-primary/50 transition-all duration-300 h-full group">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      {cat.icon} {cat.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-primary/10 text-primary font-mono text-xs rounded-full border border-primary/10 group-hover:border-primary/30 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
