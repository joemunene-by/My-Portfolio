"use client"

import { skills } from "@/data"
import AnimatedSection from "./AnimatedSection"
import RevealText from "./RevealText"
import TiltCard from "./TiltCard"
import GiantLabel from "./GiantLabel"
import { Code, FileCode, BookOpen, Shield, Star, Smartphone, Activity, Bot, Eye, Sigma, Brain } from "lucide-react"

export default function About() {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Code className="w-5 h-5 text-primary" />,
      items: skills.languages,
    },
    {
      title: "Web & Backend",
      icon: <BookOpen className="w-5 h-5 text-primary" />,
      items: skills.frameworks,
    },
    {
      title: "Mobile",
      icon: <Smartphone className="w-5 h-5 text-primary" />,
      items: skills.mobile,
    },
    {
      title: "AI & ML",
      icon: <FileCode className="w-5 h-5 text-primary" />,
      items: skills.ai,
    },
    {
      title: "Reinforcement Learning",
      icon: <Brain className="w-5 h-5 text-primary" />,
      items: skills.rl,
    },
    {
      title: "Robotics & Embodied AI",
      icon: <Bot className="w-5 h-5 text-primary" />,
      items: skills.robotics,
    },
    {
      title: "Computer Vision",
      icon: <Eye className="w-5 h-5 text-primary" />,
      items: skills.vision,
    },
    {
      title: "Formal Methods & Verification",
      icon: <Sigma className="w-5 h-5 text-primary" />,
      items: skills.formal,
    },
    {
      title: "Cybersecurity",
      icon: <Shield className="w-5 h-5 text-primary" />,
      items: skills.cybersecurity,
    },
    {
      title: "DevOps & Infra",
      icon: <Star className="w-5 h-5 text-primary" />,
      items: skills.tools,
    },
    {
      title: "Observability & Quality",
      icon: <Activity className="w-5 h-5 text-primary" />,
      items: skills.observability,
    },
  ]

  return (
    <section id="about" className="py-20 sm:py-32 relative overflow-hidden">
      <GiantLabel text="ABOUT" align="right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <AnimatedSection>
          <p className="font-mono text-primary text-sm mb-2">01. About Me</p>
          <RevealText
            as="h2"
            text="Who am I?"
            className="text-3xl sm:text-4xl font-bold mb-6 text-white"
          />
        </AnimatedSection>

        {/* Bio */}
        <div className="max-w-3xl mb-16">
          <AnimatedSection delay={0.1}>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                I&apos;m <span className="text-white font-medium">Joe Munene</span>, founder of{" "}
                <span className="text-primary">Complex Developers</span>. I build{" "}
                <span className="text-white">security-focused AI systems from the model up</span>: language models
                trained from scratch, the agent runtimes that make them safe to deploy, and production security
                tooling around them.
              </p>
              <p>
                <span className="text-white">GhostLM</span> is an 81M-parameter language model I trained from
                scratch in PyTorch, no transformers library, on a 422M-token security corpus.{" "}
                <span className="text-white">ghostloop</span> is a fail-closed safety runtime for embodied agents,
                published on PyPI, with a verification surface most agent stacks lack: STL temporal properties,
                counterfactual replay, and causal failure attribution. Around them sits a suite of production
                security tooling spanning recon, intrusion detection, malware triage, and cloud posture.
              </p>
              <p>
                I study Computer Science at <span className="text-primary">Moi University</span> in Nairobi. The
                work is the argument: trained from scratch, shipped to PyPI and the Google Play Store, and merged
                upstream into projects like AutoGPT.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Skills */}
        <AnimatedSection>
          <div id="skills">
            <p className="font-mono text-primary text-sm mb-2">/ Skills & Expertise</p>
            <RevealText
              as="h3"
              text="Technical Skills"
              className="text-2xl sm:text-3xl font-bold text-white mb-10"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((cat, i) => (
                <AnimatedSection key={cat.title} delay={i * 0.08} direction="up">
                  <TiltCard max={6} className="bg-bg-card border border-border-color rounded-xl p-6 hover:border-primary/50 transition-all duration-300 h-full group">
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
                  </TiltCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
