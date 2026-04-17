"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Code2 } from "lucide-react"
import RevealText from "./RevealText"

type Sample = {
  id: string
  label: string
  language: string
  filename: string
  code: string
  comment?: string
}

const samples: Sample[] = [
  {
    id: "attention",
    label: "GhostLM · Attention",
    language: "python",
    filename: "ghostlm/attention.py",
    comment: "Multi-head causal self-attention, hand-written in PyTorch.",
    code: `class CausalSelfAttention(nn.Module):
    def __init__(self, cfg):
        super().__init__()
        self.h = cfg.n_head
        self.qkv = nn.Linear(cfg.d_model, 3 * cfg.d_model, bias=False)
        self.proj = nn.Linear(cfg.d_model, cfg.d_model, bias=False)
        self.register_buffer(
            "mask",
            torch.tril(torch.ones(cfg.ctx, cfg.ctx)).view(1, 1, cfg.ctx, cfg.ctx),
        )

    def forward(self, x):
        B, T, C = x.shape
        q, k, v = self.qkv(x).split(C, dim=2)
        q = q.view(B, T, self.h, C // self.h).transpose(1, 2)
        k = k.view(B, T, self.h, C // self.h).transpose(1, 2)
        v = v.view(B, T, self.h, C // self.h).transpose(1, 2)

        att = (q @ k.transpose(-2, -1)) * (1.0 / math.sqrt(k.size(-1)))
        att = att.masked_fill(self.mask[:, :, :T, :T] == 0, float("-inf"))
        att = F.softmax(att, dim=-1)

        out = att @ v
        out = out.transpose(1, 2).contiguous().view(B, T, C)
        return self.proj(out)`,
  },
  {
    id: "scanner",
    label: "Port Scanner",
    language: "typescript",
    filename: "scanner/tcp.ts",
    comment: "Concurrent TCP port scanner with timeout backoff.",
    code: `async function scanHost(host: string, ports: number[], opts: ScanOpts) {
  const queue = [...ports]
  const results: PortResult[] = []
  const workers = Array.from({ length: opts.concurrency }, async () => {
    while (queue.length) {
      const port = queue.shift()!
      const start = performance.now()
      const state = await probe(host, port, opts.timeoutMs)
      results.push({
        port,
        state,
        latencyMs: Math.round(performance.now() - start),
        banner: state === "open" ? await grabBanner(host, port) : undefined,
      })
    }
  })
  await Promise.all(workers)
  return results.sort((a, b) => a.port - b.port)
}`,
  },
  {
    id: "api",
    label: "Next.js · Route",
    language: "typescript",
    filename: "app/api/github/route.ts",
    comment: "Cached GitHub stats endpoint — 1h revalidate.",
    code: `export const revalidate = 3600

export async function GET() {
  const res = await fetch(
    "https://api.github.com/users/joemunene-by/repos?per_page=100",
    { next: { revalidate } },
  )
  if (!res.ok) return Response.json(fallback, { status: 200 })
  const repos = await res.json()
  return Response.json({
    totalRepos: repos.length,
    totalStars: repos.reduce((s: number, r: Repo) => s + r.stargazers_count, 0),
    languages: [...new Set(repos.map((r: Repo) => r.language).filter(Boolean))],
    linesOfCode: formatLoc(await estimateLines(repos)),
  })
}`,
  },
]

const HL_RULES: Record<string, { pattern: RegExp; cls: string }[]> = {
  python: [
    { pattern: /"[^"]*"|'[^']*'/g, cls: "text-accent-warm" },
    { pattern: /\b(class|def|return|import|from|for|while|if|else|self|None|True|False)\b/g, cls: "text-accent" },
    { pattern: /\b(\d+(\.\d+)?)\b/g, cls: "text-yellow-300" },
    { pattern: /#[^\n]*/g, cls: "text-text-muted/60 italic" },
  ],
  typescript: [
    { pattern: /"[^"]*"|'[^']*'|`[^`]*`/g, cls: "text-accent-warm" },
    { pattern: /\b(const|let|async|await|return|function|export|import|from|new|class|interface|type)\b/g, cls: "text-accent" },
    { pattern: /\b(number|string|boolean|void|Promise)\b/g, cls: "text-primary" },
    { pattern: /\b(\d+(\.\d+)?)\b/g, cls: "text-yellow-300" },
    { pattern: /\/\/[^\n]*/g, cls: "text-text-muted/60 italic" },
  ],
}

function highlight(code: string, lang: string): string {
  const rules = HL_RULES[lang]
  if (!rules) return escape(code)
  let tokens: { start: number; end: number; cls: string }[] = []
  for (const rule of rules) {
    for (const m of code.matchAll(rule.pattern)) {
      const start = m.index ?? 0
      tokens.push({ start, end: start + m[0].length, cls: rule.cls })
    }
  }
  tokens.sort((a, b) => a.start - b.start)
  // Drop overlapping tokens (keep earliest)
  const merged: typeof tokens = []
  let last = 0
  for (const t of tokens) {
    if (t.start < last) continue
    merged.push(t)
    last = t.end
  }
  let out = ""
  let i = 0
  for (const t of merged) {
    out += escape(code.slice(i, t.start))
    out += `<span class="${t.cls}">${escape(code.slice(t.start, t.end))}</span>`
    i = t.end
  }
  out += escape(code.slice(i))
  return out
}

function escape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

export default function CodeShowcase() {
  const [activeId, setActiveId] = useState(samples[0].id)
  const [typed, setTyped] = useState("")
  const rafRef = useRef<number>(0)
  const sample = samples.find((s) => s.id === activeId)!
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    )
    io.observe(containerRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    cancelAnimationFrame(rafRef.current)
    setTyped("")
    const total = sample.code.length
    const charsPerTick = Math.max(2, Math.floor(total / 400))
    let i = 0
    const tick = () => {
      i = Math.min(total, i + charsPerTick)
      setTyped(sample.code.slice(0, i))
      if (i < total) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [activeId, sample.code, inView])

  // Auto-cycle tabs every ~14s once the sample finished typing
  useEffect(() => {
    if (!inView) return
    if (typed.length < sample.code.length) return
    const t = setTimeout(() => {
      const idx = samples.findIndex((s) => s.id === activeId)
      setActiveId(samples[(idx + 1) % samples.length].id)
    }, 6000)
    return () => clearTimeout(t)
  }, [typed, activeId, sample.code.length, inView])

  const highlighted = highlight(typed, sample.language)

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="font-mono text-primary text-sm mb-2 flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5" />
            / Code — live
          </p>
          <RevealText
            as="h2"
            text="Straight from the repos"
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          />
          <p className="text-text-muted max-w-2xl">
            Not a demo, not a gist — actual excerpts from shipped projects.
            Pick a sample or let it cycle.
          </p>
        </div>

        <div className="rounded-2xl border border-border-color bg-bg-dark/80 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Tabs */}
          <div className="flex items-center border-b border-border-color bg-bg-card/60 overflow-x-auto">
            <div className="flex items-center gap-1.5 px-4 py-3 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            {samples.map((s) => {
              const active = s.id === activeId
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  data-cursor="hover"
                  className={`px-4 py-3 border-l border-border-color font-mono text-xs transition-colors whitespace-nowrap ${
                    active
                      ? "text-primary bg-bg-dark"
                      : "text-text-muted hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              )
            })}
            <div className="flex-1 border-l border-border-color px-4 py-3 font-mono text-xs text-text-muted/80 truncate">
              {sample.filename}
            </div>
          </div>

          {/* Code */}
          <div className="relative">
            {sample.comment && (
              <div className="px-6 pt-5 font-mono text-xs text-text-muted/70 italic">
                # {sample.comment}
              </div>
            )}
            <pre className="p-6 pt-3 font-mono text-[13px] leading-relaxed text-white overflow-x-auto">
              <code
                className="block whitespace-pre"
                dangerouslySetInnerHTML={{
                  __html:
                    highlighted +
                    (typed.length < sample.code.length
                      ? '<span class="text-primary animate-pulse">▋</span>'
                      : ""),
                }}
              />
            </pre>

            <motion.div
              key={activeId}
              className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          </div>

          <div className="flex items-center justify-between px-4 py-2.5 border-t border-border-color bg-bg-card/40 font-mono text-[11px] text-text-muted/80">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              typing • {sample.language}
            </span>
            <span>
              {typed.length}/{sample.code.length} chars
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
