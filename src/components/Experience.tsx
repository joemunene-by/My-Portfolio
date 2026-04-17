"use client"

import { timeline } from "@/data"
import AnimatedSection from "./AnimatedSection"
import RevealText from "./RevealText"
import TiltCard from "./TiltCard"
import GiantLabel from "./GiantLabel"
import { Briefcase, GraduationCap, Rocket } from "lucide-react"

const typeConfig = {
  project: { icon: Rocket, color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  milestone: { icon: Briefcase, color: "text-accent", bg: "bg-accent/10", border: "border-accent/30" },
  education: { icon: GraduationCap, color: "text-accent-warm", bg: "bg-accent-warm/10", border: "border-accent-warm/30" },
}

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-32 relative overflow-hidden">
      <GiantLabel text="JOURNEY" align="left" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection>
          <p className="font-mono text-primary text-sm mb-2">02. Experience</p>
          <RevealText
            as="h2"
            text="My Journey"
            className="text-3xl sm:text-4xl font-bold mb-16 text-white"
          />
        </AnimatedSection>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/20 to-transparent" />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const config = typeConfig[item.type]
              const Icon = config.icon

              return (
                <AnimatedSection key={i} delay={i * 0.15} direction="left">
                  <div className="flex gap-6 sm:gap-8">
                    {/* Timeline dot */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center z-10 relative`}>
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${config.color}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <TiltCard max={3} glare={false} className="flex-1 pb-2 rounded-xl">
                      <span className={`font-mono text-xs ${config.color} mb-1 block`}>{item.year}</span>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-text-muted/70 font-medium mb-3">{item.subtitle}</p>
                      <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
                    </TiltCard>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
