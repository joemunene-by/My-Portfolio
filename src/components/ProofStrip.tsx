"use client"

import { motion } from "framer-motion"
import {
  SiPypi,
  SiGoogleplay,
  SiPytorch,
  SiHuggingface,
} from "react-icons/si"
import { ShieldCheck, BrainCircuit } from "lucide-react"

// Proof strip. World-class engineer portfolios lead with verifiable
// trust signals, not adjectives — a recruiter scanning for ten seconds
// should see shipped, published, and merged work, each one a link to the
// evidence. These are the differentiators that otherwise sit buried in
// the project descriptions.

type Proof = {
  icon: React.ReactNode
  label: string
  detail: string
  href: string
}

const proofs: Proof[] = [
  {
    icon: <SiPypi className="w-4 h-4" />,
    label: "Published on PyPI",
    detail: "ghostloop · 14 releases · 359 tests",
    href: "https://pypi.org/project/ghostloop/",
  },
  {
    icon: <SiGoogleplay className="w-4 h-4" />,
    label: "Shipped to Google Play",
    detail: "EZCare Native · React Native + Expo",
    href: "https://github.com/joemunene-by/ezcare-web-app",
  },
  {
    icon: <SiPytorch className="w-4 h-4" />,
    label: "Upstream contributor",
    detail: "PyTorch Ignite #3741 merged",
    href: "https://github.com/pytorch/ignite/pull/3741",
  },
  {
    icon: <BrainCircuit className="w-4 h-4" />,
    label: "LLM from scratch",
    detail: "GhostLM · 81M params in pure PyTorch",
    href: "https://github.com/joemunene-by/GhostLM",
  },
  {
    icon: <SiHuggingface className="w-4 h-4" />,
    label: "Live demos",
    detail: "Models & agents on Hugging Face",
    href: "https://huggingface.co/Ghostgim",
  },
  {
    icon: <ShieldCheck className="w-4 h-4" />,
    label: "OWASP contributor",
    detail: "AI Supply Chain Security guide",
    href: "https://github.com/joemunene-by/writing/blob/main/ai-model-supply-chain-security.md",
  },
]

export default function ProofStrip() {
  return (
    <section
      aria-label="Verified work and contributions"
      className="relative border-y border-border-color bg-bg-card/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted/70 mb-6 text-center sm:text-left">
          Proof, not adjectives
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {proofs.map((p, i) => (
            <motion.a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.4, 0.25, 1] }}
              className="group flex items-center gap-3 rounded-xl border border-border-color bg-bg-card/60 px-4 py-3 transition-colors duration-300 hover:border-primary/40 hover:bg-bg-card"
            >
              <span className="shrink-0 text-primary transition-transform duration-300 group-hover:scale-110">
                {p.icon}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white truncate">
                  {p.label}
                </span>
                <span className="block font-mono text-[11px] text-text-muted truncate">
                  {p.detail}
                </span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
