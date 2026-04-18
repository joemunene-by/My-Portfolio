"use client"

import { useState } from "react"
import { resumeData } from "@/data"
import { Download, ArrowLeft, Mail, Github, MapPin, Globe, Terminal } from "lucide-react"
import Link from "next/link"
import ResumeTerminal from "@/components/ResumeTerminal"

export default function ResumePage() {
  const [terminal, setTerminal] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  if (terminal) {
    return <ResumeTerminal onExit={() => setTerminal(false)} />
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Action bar — hidden when printing */}
      <div className="print:hidden sticky top-0 z-50 bg-bg-dark/90 backdrop-blur-xl border-b border-border-color">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTerminal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-bg-card border border-border-color text-white font-mono text-sm rounded-lg hover:border-primary/40 hover:text-primary transition-all"
              title="View as terminal"
            >
              <Terminal className="w-4 h-4" />
              Terminal Mode
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-mono text-sm font-semibold rounded-lg hover:bg-primary-dark transition-all"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Resume document */}
      <div className="max-w-4xl mx-auto px-6 py-12 print:px-0 print:py-0">
        <div className="bg-white text-gray-900 rounded-xl print:rounded-none shadow-2xl print:shadow-none overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0C0E14] to-[#1a1d28] text-white px-8 sm:px-12 py-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {resumeData.name}
            </h1>
            <p className="text-[#6C9CFF] text-lg font-medium mt-1">
              {resumeData.title}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm text-gray-300">
              <a href={`mailto:${resumeData.email}`} className="flex items-center gap-1.5 hover:text-[#6C9CFF] transition-colors">
                <Mail className="w-3.5 h-3.5" />
                {resumeData.email}
              </a>
              <a href={`https://${resumeData.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#6C9CFF] transition-colors">
                <Github className="w-3.5 h-3.5" />
                {resumeData.github}
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {resumeData.location}
              </span>
            </div>
          </div>

          <div className="px-8 sm:px-12 py-8 space-y-8">
            {/* Summary */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#6C9CFF] mb-3 flex items-center gap-2">
                <div className="w-8 h-px bg-[#6C9CFF]" />
                Professional Summary
              </h2>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                {resumeData.summary}
              </p>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#6C9CFF] mb-4 flex items-center gap-2">
                <div className="w-8 h-px bg-[#6C9CFF]" />
                Experience
              </h2>
              {resumeData.experience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.role}</h3>
                      <p className="text-gray-500 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-400 font-mono whitespace-nowrap">{exp.period}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {exp.points.map((point, j) => (
                      <li key={j} className="text-gray-600 text-[14px] leading-relaxed flex gap-2">
                        <span className="text-[#6C9CFF] mt-1.5 flex-shrink-0">&#x2022;</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#6C9CFF] mb-4 flex items-center gap-2">
                <div className="w-8 h-px bg-[#6C9CFF]" />
                Education
              </h2>
              {resumeData.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-500 text-sm">{edu.institution}</p>
                    </div>
                    <span className="text-sm text-gray-400 font-mono whitespace-nowrap">{edu.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{edu.details}</p>
                </div>
              ))}
            </section>

            {/* Technical Skills */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#6C9CFF] mb-4 flex items-center gap-2">
                <div className="w-8 h-px bg-[#6C9CFF]" />
                Technical Skills
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {Object.entries(resumeData.technicalSkills).map(([category, skills]) => (
                  <div key={category}>
                    <span className="text-xs font-bold uppercase text-gray-400">{category}</span>
                    <p className="text-gray-600 text-sm mt-0.5">{skills}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Projects */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#6C9CFF] mb-4 flex items-center gap-2">
                <div className="w-8 h-px bg-[#6C9CFF]" />
                Key Projects
              </h2>
              <div className="space-y-2 text-[14px]">
                <div>
                  <span className="font-bold text-gray-900">GhostLM</span>
                  <span className="text-gray-400 mx-2">|</span>
                  <span className="text-gray-600">Cybersecurity-focused LLM built from scratch in PyTorch, trained on CVEs and CTF data</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900">SentinelPulse</span>
                  <span className="text-gray-400 mx-2">|</span>
                  <span className="text-gray-600">Real-time threat intelligence dashboard for monitoring cybersecurity threats</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900">AI Coding Assistant</span>
                  <span className="text-gray-400 mx-2">|</span>
                  <span className="text-gray-600">Full-stack AI assistant capable of generating complete web applications</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900">Network Security Suite</span>
                  <span className="text-gray-400 mx-2">|</span>
                  <span className="text-gray-600">Port scanners, traffic analyzers, and vulnerability scanners for enterprise SOC use</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:px-0 { padding-left: 0 !important; padding-right: 0 !important; }
          .print\\:py-0 { padding-top: 0 !important; padding-bottom: 0 !important; }
        }
      `}</style>
    </div>
  )
}
