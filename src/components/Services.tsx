"use client"

import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Sparkles,
  Brain,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react"
import AnimatedSection from "./AnimatedSection"
import RevealText from "./RevealText"
import TiltCard from "./TiltCard"
import MagneticLink from "./MagneticLink"
import GiantLabel from "./GiantLabel"

type Service = {
  title: string
  tagline: string
  icon: typeof LayoutDashboard
  iconColor: string
  iconBg: string
  iconBorder: string
  deliverables: string[]
  proofs: { label: string; url: string }[]
}

const services: Service[] = [
  {
    title: "Custom CRMs & Admin Dashboards",
    tagline:
      "Production-grade customer platforms — contacts, deals, tasks, and metrics — with auth, audit logs, and role-based access from day one.",
    icon: LayoutDashboard,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    iconBorder: "border-primary/30",
    deliverables: [
      "Next.js 15 / 16 App Router with route-group isolation",
      "Postgres + Prisma data layer, migrations from commit one",
      "NextAuth or JWT auth with role-based admin views",
      "Visual deals pipeline, task management, activity logging",
      "Vercel + Supabase deploy or self-hosted Postgres",
    ],
    proofs: [
      {
        label: "High-End CRM (Next.js 16, Prisma, NextAuth)",
        url: "https://github.com/joemunene-by/crm",
      },
      {
        label: "Complex Developers CRM",
        url: "https://github.com/complexdevelopers/Complex-Developers-Web",
      },
    ],
  },
  {
    title: "SaaS Web Apps & Production Platforms",
    tagline:
      "Full-stack product builds, paywall to dashboard. Stripe billing, transactional email, analytics, error reporting, all wired and shipped.",
    icon: Sparkles,
    iconColor: "text-accent",
    iconBg: "bg-accent/10",
    iconBorder: "border-accent/30",
    deliverables: [
      "Stripe subscriptions + usage-based billing",
      "PostHog analytics, Sentry error reporting",
      "Resend / Postmark transactional email",
      "Feature flags + staged rollout (Vercel / GrowthBook)",
      "Public marketing site + authed product, one codebase",
    ],
    proofs: [
      {
        label: "ChartSentinel — Trading intelligence SaaS",
        url: "https://chartsentinel.com",
      },
      {
        label: "ezCare — Healthcare SaaS",
        url: "https://ezcare-web-app.vercel.app",
      },
    ],
  },
  {
    title: "AI Integrations & Agent Safety",
    tagline:
      "LLM-backed features that don't melt down in production. Custom MCP servers, policy-gated tool use, audit-trail dashboards.",
    icon: Brain,
    iconColor: "text-accent-warm",
    iconBg: "bg-accent-warm/10",
    iconBorder: "border-accent-warm/30",
    deliverables: [
      "Claude / Groq / OpenAI integration with cost controls",
      "Custom MCP servers exposing safe tool subsets",
      "Policy-gated agent pipelines (allow / deny / rate-limit / review)",
      "Real-time audit trail + observability dashboards",
      "From-scratch transformer work where off-the-shelf isn't enough",
    ],
    proofs: [
      {
        label: "secure-mcp — fail-closed MCP server",
        url: "https://github.com/joemunene-by/secure-mcp",
      },
      {
        label: "ghostguard — AI agent security proxy",
        url: "https://github.com/joemunene-by/ghostguard",
      },
    ],
  },
  {
    title: "Cybersecurity Audits & Tooling",
    tagline:
      "K8s posture audits, memory forensics, SIEM rules, and pre-commit secret scanning — production CLIs, not slide decks.",
    icon: ShieldCheck,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    iconBorder: "border-primary/30",
    deliverables: [
      "23 CIS-based Kubernetes security checks (HTML / JSON for CI gates)",
      "Memory forensics with YARA scanning + STIX 2.1 IOC export",
      "SIGMA-rule-driven SIEM with detection-as-code",
      "Pre-commit secret + anti-pattern detection (hook / Action / CLI)",
      "Penetration testing engagements + remediation report",
    ],
    proofs: [
      {
        label: "ghostaudit — K8s security auditor",
        url: "https://github.com/joemunene-by/ghostaudit",
      },
      {
        label: "ghostforensics — memory forensics automation",
        url: "https://github.com/joemunene-by/ghostforensics",
      },
    ],
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-32 relative overflow-hidden">
      <GiantLabel text="BUILD" align="right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection>
          <p className="font-mono text-primary text-sm mb-2">/ Services</p>
          <RevealText
            as="h2"
            text="What I Build for Clients"
            className="text-3xl sm:text-4xl font-bold mb-4 text-white"
          />
          <p className="text-text-muted max-w-2xl mb-12 leading-relaxed">
            Four areas I take engagements in, each backed by shipped work you
            can poke at. I run scope, architecture, and delivery end-to-end;
            you get production code with auth, observability, and a
            handover package, not a prototype with TODOs.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <AnimatedSection key={service.title} delay={i * 0.1} direction="up">
                <TiltCard
                  max={5}
                  className="h-full bg-bg-card border border-border-color rounded-2xl p-6 sm:p-8 hover:border-primary/40 transition-all duration-300 group flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: 6, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className={`w-12 h-12 rounded-xl ${service.iconBg} border ${service.iconBorder} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`w-5 h-5 ${service.iconColor}`} />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-5 flex-1">
                    {service.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2.5 text-sm text-text-muted/90"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 ${service.iconColor} flex-shrink-0 mt-0.5`}
                        />
                        <span className="leading-snug">{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-border-color/60 pt-4">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted/60 mb-2">
                      Proof
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {service.proofs.map((p) => (
                        <a
                          key={p.url}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-accent transition-colors group/link"
                        >
                          <span>{p.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </AnimatedSection>
            )
          })}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="mt-12 bg-gradient-to-r from-primary/10 via-accent/8 to-accent-warm/10 border border-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                Have a CRM, SaaS, or security project on the table?
              </h3>
              <p className="text-text-muted text-sm sm:text-base">
                I take a small number of client engagements per quarter. Tell me what you're building.
              </p>
            </div>
            <MagneticLink>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm rounded-xl bg-primary/15 border border-primary/30 text-primary hover:bg-primary/25 hover:border-primary/50 transition-all whitespace-nowrap"
              >
                Start a conversation
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </MagneticLink>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
