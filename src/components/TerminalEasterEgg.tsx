"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, X } from "lucide-react"
import { projects, skills } from "@/data"

type Line = { cmd: string; output: string | string[] }

const BANNER = [
  "   _____ _               _   _     __  __ ",
  "  / ____| |             | | | |   |  \\/  |",
  " | |  __| |__   ___  ___| |_| |   | \\  / |",
  " | | |_ | '_ \\ / _ \\/ __| __| |   | |\\/| |",
  " | |__| | | | | (_) \\__ \\ |_| |___| |  | |",
  "  \\_____|_| |_|\\___/|___/\\__|_____|_|  |_|",
  "",
  "   ghost terminal  •  v2.0  •  type `help`",
]

const HELP = [
  "available commands:",
  "  about       — short bio",
  "  whoami      — who is this",
  "  skills      — technical arsenal",
  "  projects    — list featured projects",
  "  open <name> — jump to a section (home, about, projects, blog, contact)",
  "  cat resume  — print the resume link",
  "  github      — open github profile",
  "  email       — compose an email",
  "  date        — current server time",
  "  uname       — stack info",
  "  neofetch    — system-style portfolio summary",
  "  theme <id>  — switch accent (aurora, matrix, ember, plasma, sol)",
  "  banner      — print banner",
  "  history     — command history",
  "  clear       — clear terminal",
  "  exit        — close terminal",
]

const SECTION_IDS: Record<string, string> = {
  home: "home",
  about: "about",
  experience: "experience",
  projects: "projects",
  highlights: "highlights",
  blog: "blog",
  contact: "contact",
}

const THEMES = ["aurora", "matrix", "ember", "plasma", "sol"]

export default function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<Line[]>([{ cmd: "", output: BANNER }])
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [histIndex, setHistIndex] = useState(-1)
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const append = (cmd: string, output: string | string[]) =>
    setHistory((prev) => [...prev, { cmd, output }])

  const run = (raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return

    setCmdHistory((p) => [...p, cmd])
    setHistIndex(-1)

    const [head, ...rest] = cmd.split(/\s+/)
    const arg = rest.join(" ").toLowerCase()

    switch (head.toLowerCase()) {
      case "help":
        append(cmd, HELP)
        break
      case "about":
        append(
          cmd,
          "Joe Munene — full-stack developer & cybersecurity researcher. Nairobi, Kenya. CS @ Moi University.",
        )
        break
      case "whoami":
        append(cmd, "ghost@joe-munene:~$ you found the easter egg. Ctrl+` to toggle.")
        break
      case "skills": {
        const flat = [
          `Languages: ${skills.languages.join(", ")}`,
          `Frameworks: ${skills.frameworks.join(", ")}`,
          `Cybersecurity: ${skills.cybersecurity.join(", ")}`,
          `AI/ML: ${skills.ai.join(", ")}`,
          `Tools: ${skills.tools.join(", ")}`,
        ]
        append(cmd, flat)
        break
      }
      case "projects": {
        const featured = projects.filter((p) => p.featured)
        append(
          cmd,
          featured.map((p) => `• ${p.name} — ${p.description.slice(0, 64)}...`),
        )
        break
      }
      case "open": {
        const id = SECTION_IDS[arg]
        if (id) {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          append(cmd, `scrolling to #${id} ...`)
          setTimeout(() => setIsOpen(false), 400)
        } else {
          append(cmd, `unknown section: ${arg}. try: ${Object.keys(SECTION_IDS).join(", ")}`)
        }
        break
      }
      case "cat":
        if (arg === "resume") {
          append(cmd, "→ opening /resume ...")
          setTimeout(() => {
            window.location.href = "/resume"
          }, 400)
        } else {
          append(cmd, `cat: ${arg}: no such file`)
        }
        break
      case "github":
        append(cmd, "→ opening github.com/joemunene-by")
        window.open("https://github.com/joemunene-by", "_blank")
        break
      case "email":
        append(cmd, "→ opening mailto:joemunene984@gmail.com")
        window.location.href = "mailto:joemunene984@gmail.com"
        break
      case "date":
        append(cmd, new Date().toString())
        break
      case "uname":
        append(cmd, "Next.js 15 • React 19 • TypeScript • Tailwind • Framer Motion")
        break
      case "neofetch":
        append(cmd, [
          "ghost@portfolio",
          "----------------",
          "OS:        Next.js 15 (App Router)",
          "Shell:     zsh-like",
          "Theme:     dark / user-selectable accent",
          "Resolution: 100vw × ∞",
          "Uptime:    since 2025",
          "Location:  Nairobi, KE (1.2921° S  36.8219° E)",
          "Status:    Available for work",
        ])
        break
      case "theme":
        if (THEMES.includes(arg)) {
          localStorage.setItem("portfolio-accent", arg)
          append(cmd, `theme set to '${arg}'. reload for full effect or use the palette button.`)
          window.dispatchEvent(new CustomEvent("theme:set", { detail: arg }))
        } else {
          append(cmd, `theme: unknown '${arg}'. choose: ${THEMES.join(", ")}`)
        }
        break
      case "banner":
        append(cmd, BANNER)
        break
      case "history":
        append(cmd, cmdHistory.map((c, i) => `${i + 1}  ${c}`))
        break
      case "clear":
        setHistory([])
        break
      case "exit":
        setIsOpen(false)
        break
      case "sudo":
        append(cmd, "nice try. permission denied.")
        break
      case "rm":
        append(cmd, "not on my watch.")
        break
      case "matrix":
        append(cmd, "wake up, neo ...")
        break
      case "ls":
        append(cmd, Object.keys(SECTION_IDS).join("  "))
        break
      case "pwd":
        append(cmd, "/home/joemunene/portfolio")
        break
      default:
        append(cmd, `command not found: ${head}. type 'help' for options.`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    run(input)
    setInput("")
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (!cmdHistory.length) return
      const next = histIndex === -1 ? cmdHistory.length - 1 : Math.max(0, histIndex - 1)
      setHistIndex(next)
      setInput(cmdHistory[next])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (histIndex === -1) return
      const next = histIndex + 1
      if (next >= cmdHistory.length) {
        setHistIndex(-1)
        setInput("")
      } else {
        setHistIndex(next)
        setInput(cmdHistory[next])
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      const head = input.split(/\s+/)[0]
      if (!head) return
      const all = [
        "help", "about", "whoami", "skills", "projects", "open", "cat",
        "github", "email", "date", "uname", "neofetch", "theme", "banner",
        "history", "clear", "exit", "ls", "pwd",
      ]
      const match = all.find((c) => c.startsWith(head))
      if (match) setInput(match + (input.includes(" ") ? input.slice(input.indexOf(" ")) : ""))
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 p-3 bg-bg-card border border-border-color rounded-xl text-text-muted hover:text-primary hover:border-primary/40 transition-all shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Open Terminal (Ctrl+`)"
        data-cursor="hover"
      >
        <Terminal className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[55] flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="relative w-full max-w-2xl bg-bg-dark/95 backdrop-blur-xl border border-border-color rounded-xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
              initial={{ y: 40, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-bg-card/80 border-b border-border-color">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-xs text-text-muted ml-2">
                    ghost@joe-munene — zsh
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-text-muted hover:text-white transition-colors"
                  aria-label="Close terminal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div
                ref={scrollRef}
                className="p-4 h-80 overflow-y-auto font-mono text-[13px] leading-relaxed"
              >
                {history.map((entry, i) => (
                  <div key={i} className="mb-2">
                    {entry.cmd && (
                      <div className="flex items-center gap-2">
                        <span className="text-primary">➜</span>
                        <span className="text-white">{entry.cmd}</span>
                      </div>
                    )}
                    <div className="text-text-muted whitespace-pre-wrap">
                      {Array.isArray(entry.output)
                        ? entry.output.map((l, j) => <div key={j}>{l}</div>)
                        : entry.output}
                    </div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 px-4 py-3 border-t border-border-color bg-bg-card/60"
              >
                <span className="text-primary font-mono text-sm">➜</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  className="flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-text-muted/40"
                  placeholder="type a command... (↑/↓ history, Tab complete)"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
