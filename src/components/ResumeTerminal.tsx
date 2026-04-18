"use client"

import { useEffect, useRef, useState } from "react"
import { resumeData } from "@/data"
import { Terminal, X } from "lucide-react"

type Line = { cmd?: string; out: string[] }

const HELP = [
  "commands:",
  "  whoami      — short bio",
  "  summary     — narrative summary",
  "  education   — schools",
  "  experience  — roles",
  "  skills      — technical stack",
  "  certs       — certifications / study",
  "  contact     — reach me",
  "  all         — run everything",
  "  clear       — wipe screen",
  "  exit        — back to printable resume",
]

export default function ResumeTerminal({ onExit }: { onExit: () => void }) {
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [hIdx, setHIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const boot: Line[] = [
    {
      out: [
        "ghost@joe-munene ~ % cat resume.txt",
        "",
        `${resumeData.name}`,
        `${resumeData.title}`,
        `${resumeData.email} · ${resumeData.github} · ${resumeData.location}`,
        "",
        "type `help` for commands · `all` to read the whole thing",
      ],
    },
  ]

  useEffect(() => {
    setLines(boot)
    inputRef.current?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 1e9 })
  }, [lines])

  const append = (cmd: string | undefined, out: string[]) =>
    setLines((p) => [...p, { cmd, out }])

  const render = (key: string) => {
    switch (key) {
      case "help":
        append(key, HELP)
        break
      case "whoami":
        append(key, [
          `${resumeData.name} · ${resumeData.title}`,
          `${resumeData.location}`,
        ])
        break
      case "summary":
        append(key, wrap(resumeData.summary, 72))
        break
      case "education":
        append(
          key,
          resumeData.education.flatMap((e) => [
            `${e.institution} — ${e.period}`,
            `  ${e.degree}`,
            `  ${e.details}`,
            "",
          ]),
        )
        break
      case "experience":
        append(
          key,
          resumeData.experience.flatMap((x) => [
            `${x.role} @ ${x.company} — ${x.period}`,
            ...x.points.map((p) => `  • ${p}`),
            "",
          ]),
        )
        break
      case "skills":
        append(
          key,
          Object.entries(resumeData.technicalSkills).flatMap(([k, v]) => [
            `${k}:`,
            `  ${v}`,
          ]),
        )
        break
      case "certs":
      case "certifications":
        append(key, resumeData.certifications.map((c) => `• ${c}`))
        break
      case "contact":
        append(key, [
          `email  : ${resumeData.email}`,
          `github : ${resumeData.github}`,
          `where  : ${resumeData.location}`,
        ])
        break
      case "all":
        ;[
          "whoami",
          "summary",
          "education",
          "experience",
          "skills",
          "certs",
          "contact",
        ].forEach((c) => render(c))
        break
      case "clear":
        setLines([])
        break
      case "exit":
      case "q":
        onExit()
        break
      case "":
        break
      default:
        append(key, [`command not found: ${key}. try \`help\``])
    }
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const raw = input.trim()
    if (!raw) return
    setHistory((h) => [...h, raw])
    setHIdx(-1)
    render(raw.toLowerCase())
    setInput("")
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (!history.length) return
      const next = hIdx === -1 ? history.length - 1 : Math.max(0, hIdx - 1)
      setHIdx(next)
      setInput(history[next])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (hIdx === -1) return
      const next = hIdx + 1
      if (next >= history.length) {
        setHIdx(-1)
        setInput("")
      } else {
        setHIdx(next)
        setInput(history[next])
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      const all = [
        "help",
        "whoami",
        "summary",
        "education",
        "experience",
        "skills",
        "certs",
        "contact",
        "all",
        "clear",
        "exit",
      ]
      const m = all.find((c) => c.startsWith(input))
      if (m) setInput(m)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-bg-dark flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-color bg-bg-card/80">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-xs text-text-muted ml-2 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            resume ~ ghost@joe-munene
          </span>
        </div>
        <button
          onClick={onExit}
          className="p-1.5 rounded-lg text-text-muted hover:text-white transition-colors"
          aria-label="Exit terminal"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 font-mono text-[13px] leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((l, i) => (
          <div key={i} className="mb-1.5">
            {l.cmd && (
              <div className="flex items-center gap-2">
                <span className="text-primary">➜</span>
                <span className="text-white">{l.cmd}</span>
              </div>
            )}
            <div className="text-text-muted whitespace-pre-wrap">
              {l.out.map((line, j) => (
                <div key={j}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={submit}
        className="flex items-center gap-2 px-4 py-3 border-t border-border-color bg-bg-card/60"
      >
        <span className="text-primary font-mono text-sm">➜</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          className="flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-text-muted/40"
          placeholder="type `help` or `all`..."
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  )
}

function wrap(text: string, cols: number): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let cur = ""
  for (const w of words) {
    if ((cur + " " + w).trim().length > cols) {
      lines.push(cur.trim())
      cur = w
    } else {
      cur = (cur + " " + w).trim()
    }
  }
  if (cur) lines.push(cur)
  return lines
}
