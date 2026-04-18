"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Bot, Send, Sparkles, X } from "lucide-react"

type Msg = { role: "user" | "bot"; text: string; suggestions?: string[] }

const SUGGESTIONS = [
  "Who is Joe?",
  "What is GhostLM?",
  "What stack do you use?",
  "Are you open to work?",
  "Favorite project?",
  "How do I contact you?",
]

type Rule = {
  match: (q: string) => boolean
  reply: string
  suggestions?: string[]
}

const RULES: Rule[] = [
  {
    match: (q) => /who.*(joe|you|this)|about you|who are you/.test(q),
    reply:
      "Joe Munene — full-stack developer & cybersecurity researcher in Nairobi. CS at Moi University. I build tools that hack, think, and automate.",
    suggestions: ["What is GhostLM?", "What stack do you use?"],
  },
  {
    match: (q) => /ghost.?lm|language model|llm/.test(q),
    reply:
      "GhostLM is a cybersecurity-focused LLM I'm building from scratch in PyTorch. Decoder-only transformer, hand-written attention, ~14.5M params. Phase 1 (10K steps) done on CPU; Phase 2 (100K) is up next on Mac Mini M4.",
    suggestions: ["Why from scratch?", "What training data?"],
  },
  {
    match: (q) => /why.*(scratch|from the ground|pytorch)/.test(q),
    reply:
      "Fine-tuning someone else's model means inheriting their architectural decisions. Building from zero forces real understanding of attention, schedulers, weight tying, everything. The learning is the point.",
  },
  {
    match: (q) => /training.*data|dataset|data.*for/.test(q),
    reply:
      "Curated corpus: CVE descriptions from the NVD, CTF writeups, security research papers. Deduplicated, quality-filtered, tokenized with a GPT-2 BPE extended with security-specific tokens.",
  },
  {
    match: (q) => /stack|tech|tools?|use/.test(q),
    reply:
      "Next.js 15 · React 19 · TypeScript · Tailwind · Framer Motion on the front. Python · PyTorch · FastAPI on AI/backend. Nmap · Wireshark · Burp Suite · Metasploit for security work.",
    suggestions: ["Favorite project?", "Are you open to work?"],
  },
  {
    match: (q) => /open.*(to|for).*work|hiring|available|job/.test(q),
    reply:
      "Yes — open to roles in full-stack, security engineering, or applied AI. Remote-friendly, Nairobi-based. Best to reach out via the contact form or email directly.",
    suggestions: ["How do I contact you?"],
  },
  {
    match: (q) => /contact|reach|email|dm/.test(q),
    reply:
      "joemunene984@gmail.com — or use the contact form at the bottom of the page. GitHub: joemunene-by.",
  },
  {
    match: (q) => /favorite|best|proud|signature/.test(q),
    reply:
      "GhostLM, by a mile. Writing a transformer from scratch with security as a first-class training goal is the project I've learned the most from.",
    suggestions: ["What is GhostLM?", "Show me projects"],
  },
  {
    match: (q) => /(show|list|all).*project|repos?/.test(q),
    reply:
      "Scroll to the Projects section — or open the Constellation further down to see every repo as a connected graph. Hit ⌘K → 'projects' to jump.",
    suggestions: ["Favorite project?"],
  },
  {
    match: (q) => /location|where|based|nairobi|kenya/.test(q),
    reply:
      "Nairobi, Kenya (1.2921° S · 36.8219° E). Live EAT time is shown at the bottom of the page.",
  },
  {
    match: (q) => /(hi|hey|hello|yo)\b/.test(q),
    reply: "Hey — I'm Ghost, a tiny bot that knows about Joe. Ask me anything.",
    suggestions: ["Who is Joe?", "What is GhostLM?"],
  },
]

const DEFAULT_REPLY =
  "Not sure about that one. Try asking about Joe, GhostLM, the stack, or how to get in touch — or scroll around, most things are already here."

function answer(q: string): Rule {
  const lower = q.toLowerCase()
  return (
    RULES.find((r) => r.match(lower)) ?? {
      match: () => true,
      reply: DEFAULT_REPLY,
      suggestions: SUGGESTIONS.slice(0, 3),
    }
  )
}

export default function AskGhost() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "Hi — I'm Ghost, Joe's assistant. Ask me anything about his work.",
      suggestions: SUGGESTIONS.slice(0, 4),
    },
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 1e9, behavior: "smooth" })
  }, [messages, typing])

  const send = async (text: string) => {
    const q = text.trim()
    if (!q) return
    setMessages((m) => [...m, { role: "user", text: q }])
    setInput("")
    setTyping(true)
    window.dispatchEvent(new CustomEvent("achievement", { detail: "chat" }))
    await new Promise((r) => setTimeout(r, 500 + Math.random() * 400))
    const rule = answer(q)
    setTyping(false)
    setMessages((m) => [
      ...m,
      { role: "bot", text: rule.reply, suggestions: rule.suggestions },
    ])
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        data-tour="chat"
        className="fixed bottom-24 left-5 z-40 p-3 bg-bg-card/80 backdrop-blur-xl border border-border-color rounded-full text-text-muted hover:text-primary hover:border-primary/40 transition-all shadow-lg hidden md:flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="hover"
        title="Ask Ghost"
      >
        <Bot className="w-5 h-5" />
        {!open && (
          <span className="font-mono text-xs text-white pr-1">Ask Ghost</span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 left-5 z-[45] w-[360px] max-w-[calc(100vw-2.5rem)] bg-bg-card/90 backdrop-blur-2xl border border-border-color rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col"
            style={{ height: 460 }}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-color bg-bg-dark/60">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-bg-card" />
                </div>
                <div>
                  <div className="font-mono text-sm text-white leading-none">Ghost</div>
                  <div className="font-mono text-[10px] text-text-muted/70 mt-0.5">
                    offline-bot · canned replies
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-bg-dark rounded-br-sm font-medium"
                        : "bg-bg-dark/60 text-white border border-border-color rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                    {m.suggestions && m.suggestions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => send(s)}
                            className="px-2 py-1 font-mono text-[10px] rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="bg-bg-dark/60 border border-border-color rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="border-t border-border-color p-3 flex items-center gap-2 bg-bg-dark/40"
            >
              <Sparkles className="w-4 h-4 text-text-muted/60" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-text-muted/40"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-1.5 rounded-lg bg-primary/15 text-primary hover:bg-primary/25 transition-colors disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
