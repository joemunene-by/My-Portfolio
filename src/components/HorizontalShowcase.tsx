"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { ArrowUpRight, ExternalLink, Github, Sparkles } from "lucide-react"
import RevealText from "./RevealText"

function ProgressDot({
  progress,
  from,
  to,
}: {
  progress: MotionValue<number>
  from: number
  to: number
}) {
  const opacity = useTransform(progress, (v) => (v >= from && v < to ? 1 : 0.25))
  return <motion.span style={{ opacity }} className="block h-1 w-8 rounded-full bg-primary" />
}

type Item = {
  name: string
  description: string
  language?: string
  topics: string[]
  url: string
  homepage?: string
  accent: string
  index: string
}

interface Props {
  items: Item[]
}

const langColors: Record<string, string> = {
  Python: "text-blue-400",
  TypeScript: "text-blue-300",
  JavaScript: "text-yellow-300",
  HTML: "text-orange-400",
}

export default function HorizontalShowcase({ items }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const width = items.length * 100
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${width - 100}%`])

  return (
    <section
      id="highlights"
      ref={ref}
      className="relative"
      style={{ height: `${items.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 sm:pt-28 pb-6 shrink-0">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-primary text-sm mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Highlights — Horizontal Scroll
              </p>
              <RevealText
                as="h2"
                text="Signature Work"
                className="text-3xl sm:text-5xl font-bold text-white"
              />
            </div>
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-text-muted/70">
              <span>SCROLL</span>
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </div>
          </div>
        </div>

        <div className="relative flex-1 flex items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-6 sm:gap-8 pl-4 sm:pl-6 lg:pl-8 will-change-transform"
          >
            {items.map((item, i) => (
              <article
                key={item.name}
                className="relative h-[60vh] sm:h-[65vh] w-[85vw] sm:w-[70vw] lg:w-[60vw] shrink-0 rounded-3xl overflow-hidden border border-border-color bg-bg-card group"
                data-project-preview={item.name}
                data-project-lang={item.language ?? ""}
              >
                <div
                  className={`absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60 ${item.accent}`}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-bg-dark/40 via-bg-dark/60 to-bg-dark/90" />
                <div className="absolute inset-0 grid-bg opacity-30" />

                <div className="relative h-full flex flex-col justify-between p-8 sm:p-12">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-white/60 uppercase tracking-widest">
                      {item.index} / {String(items.length).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-2">
                      {item.homepage && (
                        <a
                          href={item.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/5 backdrop-blur-md border border-white/15 rounded-lg text-white hover:bg-white/10 transition-all"
                          title="Live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/5 backdrop-blur-md border border-white/15 rounded-lg text-white hover:bg-white/10 transition-all"
                        title="Source"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-white/75 max-w-xl text-sm sm:text-base leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.topics.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 font-mono text-[11px] rounded-full bg-white/5 border border-white/10 text-white/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      {item.language && (
                        <span
                          className={`font-mono text-xs ${
                            langColors[item.language] || "text-white/60"
                          }`}
                        >
                          {item.language}
                        </span>
                      )}
                      <a
                        href={item.homepage || item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-white hover:text-primary transition-colors"
                      >
                        Explore
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="w-[10vw] shrink-0" aria-hidden />
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {items.map((_, i) => (
            <ProgressDot
              key={i}
              progress={scrollYProgress}
              from={i / items.length}
              to={(i + 1) / items.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
