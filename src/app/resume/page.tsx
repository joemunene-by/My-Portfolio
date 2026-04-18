"use client"

import { useState } from "react"
import { resumeData, projects } from "@/data"
import {
  Download,
  ArrowLeft,
  Mail,
  Github,
  MapPin,
  Terminal as TerminalIcon,
  Shield,
  Cpu,
  FileText,
  Briefcase,
  GraduationCap,
  Code2,
  Rocket,
  Sparkles,
  Languages as LanguagesIcon,
} from "lucide-react"
import Link from "next/link"
import ResumeTerminal from "@/components/ResumeTerminal"
import RevealText from "@/components/RevealText"
import MagneticLink from "@/components/MagneticLink"
import TiltCard from "@/components/TiltCard"
import AnimatedSection from "@/components/AnimatedSection"

const keyProjects = projects
  .filter((p) => p.featured)
  .slice(0, 4)
  .map((p) => ({ name: p.name, description: p.description }))

export default function ResumePage() {
  const [terminal, setTerminal] = useState(false)

  if (terminal) {
    return <ResumeTerminal onExit={() => setTerminal(false)} />
  }

  return (
    <div className="min-h-screen relative">
      {/* Action bar */}
      <div className="print:hidden sticky top-0 z-50 bg-bg-dark/80 backdrop-blur-xl border-b border-border-color">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <MagneticLink>
            <Link
              href="/"
              className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-mono text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Portfolio</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </MagneticLink>
          <div className="flex items-center gap-2">
            <MagneticLink>
              <button
                onClick={() => setTerminal(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-bg-card border border-border-color text-white font-mono text-xs sm:text-sm rounded-lg hover:border-primary/40 hover:text-primary transition-all"
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Terminal Mode</span>
                <span className="sm:hidden">TUI</span>
              </button>
            </MagneticLink>
            <MagneticLink>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 bg-primary text-bg-dark font-mono text-xs sm:text-sm font-semibold rounded-lg transition-all glow-box"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </button>
            </MagneticLink>
          </div>
        </div>
      </div>

      {/* Resume document — themed to match the portfolio */}
      <article className="resume-doc max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 print:py-0 print:px-0">
        {/* Hero header */}
        <AnimatedSection>
          <header className="relative rounded-3xl border border-border-color bg-bg-card/40 backdrop-blur-sm overflow-hidden mb-10 print:rounded-none print:border-0 print:bg-white print:text-black">
            <div className="absolute inset-0 grid-bg opacity-40 print:hidden" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-accent-warm" />
            <div className="relative p-8 sm:p-10">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse print:animate-none" />
                resume · {new Date().getFullYear()}
              </div>
              <RevealText
                as="h1"
                text={resumeData.name}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3 print:text-black"
              />
              <p className="text-lg sm:text-xl text-text-muted mb-5 print:text-gray-700">
                <span className="text-gradient print:text-black">{resumeData.title}</span>
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {resumeData.focusAreas.map((f) => (
                  <span
                    key={f}
                    className="px-2.5 py-1 font-mono text-[11px] rounded-full bg-primary/10 text-primary border border-primary/20 print:bg-white print:text-gray-700 print:border-gray-300"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] text-text-muted print:text-gray-700">
                <a
                  href={`mailto:${resumeData.email}`}
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {resumeData.email}
                </a>
                <a
                  href={`https://${resumeData.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  {resumeData.github}
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {resumeData.location}
                </span>
              </div>
            </div>
          </header>
        </AnimatedSection>

        {/* Summary */}
        <AnimatedSection delay={0.1}>
          <Section number="01" icon={<FileText className="w-4 h-4" />} title="Summary">
            <p className="text-text-muted leading-relaxed text-[15px] print:text-gray-700">
              {resumeData.summary}
            </p>
          </Section>
        </AnimatedSection>

        {/* Highlights */}
        <AnimatedSection delay={0.12}>
          <Section
            number="02"
            icon={<Sparkles className="w-4 h-4" />}
            title="Highlights"
          >
            <ul className="grid sm:grid-cols-3 gap-3">
              {resumeData.highlights.map((h, i) => (
                <li
                  key={i}
                  className="bg-bg-card/40 border border-border-color rounded-xl p-4 text-[13px] leading-relaxed text-text-muted print:bg-white print:border print:border-gray-200 print:text-gray-700"
                >
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-primary mb-1.5 print:text-black">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </Section>
        </AnimatedSection>

        {/* Experience */}
        <AnimatedSection delay={0.15}>
          <Section
            number="03"
            icon={<Briefcase className="w-4 h-4" />}
            title="Experience"
          >
            {resumeData.experience.map((exp, i) => (
              <TiltCard
                key={i}
                max={2}
                glare={false}
                className="bg-bg-card/40 border border-border-color rounded-xl p-5 print:border-0 print:bg-white print:p-0 print:rounded-none mb-4 last:mb-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="font-bold text-white text-lg print:text-black">
                      {exp.role}
                    </h3>
                    <p className="text-primary text-sm">{exp.company}</p>
                  </div>
                  <span className="font-mono text-xs text-text-muted whitespace-nowrap print:text-gray-600">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {exp.points.map((point, j) => (
                    <li
                      key={j}
                      className="text-text-muted text-[14px] leading-relaxed flex gap-2.5 print:text-gray-700"
                    >
                      <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </Section>
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection delay={0.2}>
          <Section
            number="04"
            icon={<GraduationCap className="w-4 h-4" />}
            title="Education"
          >
            {resumeData.education.map((edu, i) => (
              <div
                key={i}
                className="bg-bg-card/40 border border-border-color rounded-xl p-5 print:border-0 print:bg-white print:p-0 print:rounded-none"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div>
                    <h3 className="font-bold text-white text-lg print:text-black">
                      {edu.degree}
                    </h3>
                    <p className="text-primary text-sm">{edu.institution}</p>
                  </div>
                  <span className="font-mono text-xs text-text-muted whitespace-nowrap print:text-gray-600">
                    {edu.period}
                  </span>
                </div>
                <p className="text-text-muted text-sm mt-2 print:text-gray-700">
                  {edu.details}
                </p>
              </div>
            ))}
          </Section>
        </AnimatedSection>

        {/* Technical Skills */}
        <AnimatedSection delay={0.25}>
          <Section
            number="05"
            icon={<Code2 className="w-4 h-4" />}
            title="Technical Skills"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(resumeData.technicalSkills).map(([category, skills]) => (
                <div
                  key={category}
                  className="bg-bg-card/40 border border-border-color rounded-xl p-4 print:border print:border-gray-200 print:bg-white"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1.5 print:text-black">
                    {category}
                  </div>
                  <p className="text-text-muted text-[13px] leading-relaxed print:text-gray-700">
                    {skills}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        </AnimatedSection>

        {/* Key Projects */}
        <AnimatedSection delay={0.3}>
          <Section
            number="06"
            icon={<Rocket className="w-4 h-4" />}
            title="Key Projects"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              {keyProjects.map((p) => (
                <div
                  key={p.name}
                  className="bg-bg-card/40 border border-border-color rounded-xl p-4 group hover:border-primary/40 transition-colors print:border print:border-gray-200 print:bg-white"
                >
                  <div className="font-bold text-white mb-1 group-hover:text-primary transition-colors print:text-black">
                    {p.name}
                  </div>
                  <div className="text-text-muted text-[13px] leading-relaxed print:text-gray-700">
                    {p.description}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </AnimatedSection>

        {/* Study & Research */}
        <AnimatedSection delay={0.35}>
          <Section
            number="07"
            icon={<Shield className="w-4 h-4" />}
            title="Study & Research"
          >
            <ul className="space-y-2">
              {resumeData.certifications.map((c, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 text-text-muted text-[14px] leading-relaxed print:text-gray-700"
                >
                  <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
                  {c}
                </li>
              ))}
            </ul>
          </Section>
        </AnimatedSection>

        {/* Languages */}
        <AnimatedSection delay={0.4}>
          <Section
            number="08"
            icon={<LanguagesIcon className="w-4 h-4" />}
            title="Languages"
          >
            <div className="flex flex-wrap gap-2">
              {resumeData.spokenLanguages.map((l) => (
                <span
                  key={l}
                  className="px-3 py-1.5 bg-bg-card/40 border border-border-color rounded-lg font-mono text-[13px] text-text-muted print:bg-white print:text-gray-700 print:border-gray-200"
                >
                  {l}
                </span>
              ))}
            </div>
          </Section>
        </AnimatedSection>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border-color flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-text-muted/70 print:text-gray-500 print:border-gray-200">
          <div className="flex items-center gap-2">
            <Cpu className="w-3 h-3" />
            designed & built by joe · matches{" "}
            <a
              href="/"
              className="text-primary hover:underline"
            >
              my-portfolio-peach-eta-42.vercel.app
            </a>
          </div>
          <div>generated {new Date().toLocaleDateString()}</div>
        </div>
      </article>

      <style jsx global>{`
        @media print {
          html, body {
            background: white !important;
            color: #111 !important;
          }
          .resume-doc {
            max-width: 100% !important;
          }
          .print\\:hidden { display: none !important; }
          .print\\:border-0 { border-width: 0 !important; }
          .print\\:bg-white { background: white !important; }
          .print\\:text-black { color: #111 !important; }
          .print\\:text-gray-700 { color: #374151 !important; }
          .print\\:text-gray-600 { color: #4b5563 !important; }
          .print\\:text-gray-500 { color: #6b7280 !important; }
          .print\\:border-gray-200 { border-color: #e5e7eb !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          .print\\:py-0 { padding-top: 0 !important; padding-bottom: 0 !important; }
          .print\\:px-0 { padding-left: 0 !important; padding-right: 0 !important; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:animate-none { animation: none !important; }
          section { break-inside: avoid; }
        }
      `}</style>
    </div>
  )
}

function Section({
  number,
  icon,
  title,
  children,
}: {
  number: string
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-10 print:mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest">
          <span className="text-text-muted/60">{number}.</span>
          {icon}
          {title}
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-border-color via-border-color to-transparent" />
      </div>
      {children}
    </section>
  )
}
