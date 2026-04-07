"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, X } from "lucide-react"

const commands: Record<string, string> = {
  help: "Available commands: about, skills, projects, contact, github, clear, exit",
  about: "Joe Munene — Full-Stack Developer & Cybersecurity Researcher based in Nairobi, Kenya. CS @ Moi University.",
  skills: "TypeScript, Python, React, Next.js, PyTorch, Nmap, Wireshark, Burp Suite, Docker, Linux",
  projects: "26 repos | GhostLM, SentinelPulse, AI Coding Assistant, Port Scanner Pro, DNS Intelligence Tool...",
  contact: "Email: joemunene984@gmail.com | GitHub: github.com/joemunene-by",
  github: "Opening GitHub...",
  whoami: "ghost@joe-munene:~$ You found the easter egg. Nice.",
  sudo: "Nice try. Access denied.",
  "rm -rf": "I don't think so.",
  matrix: "Wake up, Neo...",
}

export default function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([
    { cmd: "", output: "Welcome to Ghost Terminal v1.0 — Type 'help' to get started." },
  ])
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()

    if (!cmd) return

    if (cmd === "clear") {
      setHistory([])
      setInput("")
      return
    }

    if (cmd === "exit") {
      setIsOpen(false)
      setInput("")
      return
    }

    if (cmd === "github") {
      window.open("https://github.com/joemunene-by", "_blank")
    }

    const output = commands[cmd] || `Command not found: ${cmd}. Type 'help' for available commands.`
    setHistory((prev) => [...prev, { cmd: input, output }])
    setInput("")
  }

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3 bg-bg-card border border-border-color rounded-xl text-text-muted hover:text-primary hover:border-primary/40 transition-all shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Open Terminal"
      >
        <Terminal className="w-5 h-5" />
      </motion.button>

      {/* Terminal modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Terminal window */}
            <motion.div
              className="relative w-full max-w-2xl bg-bg-dark border border-border-color rounded-xl overflow-hidden shadow-2xl"
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-bg-card border-b border-border-color">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-xs text-text-muted ml-2">ghost@joe-munene ~ </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-text-muted hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Output */}
              <div
                ref={scrollRef}
                className="p-4 h-72 overflow-y-auto font-mono text-sm"
              >
                {history.map((entry, i) => (
                  <div key={i} className="mb-2">
                    {entry.cmd && (
                      <div className="flex items-center gap-2">
                        <span className="text-primary">$</span>
                        <span className="text-white">{entry.cmd}</span>
                      </div>
                    )}
                    <div className="text-text-muted ml-4">{entry.output}</div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 px-4 py-3 border-t border-border-color bg-bg-card"
              >
                <span className="text-primary font-mono text-sm">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-text-muted/40"
                  placeholder="Type a command..."
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
