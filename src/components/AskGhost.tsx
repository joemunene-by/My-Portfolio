"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Bot, X, Sparkles, Clock } from "lucide-react"

export default function AskGhost() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        data-tour="chat"
        className="fixed bottom-24 left-5 z-40 p-3 bg-bg-card/80 backdrop-blur-xl border border-border-color rounded-full text-text-muted hover:text-primary hover:border-primary/40 transition-all shadow-lg hidden md:flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="hover"
        title="Ask Ghost (coming soon)"
      >
        <Bot className="w-5 h-5" />
        {!open && (
          <span className="font-mono text-xs text-white pr-1 flex items-center gap-1.5">
            Ask Ghost
            <span className="text-[9px] text-accent-warm uppercase tracking-widest">
              soon
            </span>
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 left-5 z-[45] w-[360px] max-w-[calc(100vw-2.5rem)] bg-bg-card/90 backdrop-blur-2xl border border-border-color rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-color bg-bg-dark/60">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-yellow-400 border-2 border-bg-card" />
                </div>
                <div>
                  <div className="font-mono text-sm text-white leading-none">
                    Ghost
                  </div>
                  <div className="font-mono text-[10px] text-accent-warm mt-0.5 uppercase tracking-widest">
                    training
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

            <div className="p-5 space-y-5">
              <div className="flex items-center justify-center">
                <motion.div
                  className="relative w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center"
                  animate={{ rotate: [0, 4, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-7 h-7 text-primary" />
                  <motion.span
                    className="absolute inset-0 rounded-2xl border border-primary/40"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                  />
                </motion.div>
              </div>

              <div className="text-center">
                <div className="font-bold text-white mb-1.5">
                  Ghost is still training
                </div>
                <p className="text-text-muted text-sm leading-relaxed">
                  The real assistant comes online once{" "}
                  <span className="text-primary">GhostLM</span> Phase 2 finishes
                  — a cybersecurity-focused LLM trained from scratch in PyTorch.
                  For now, please use the contact form or email directly.
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-text-muted/70 uppercase tracking-widest">
                <Clock className="w-3 h-3" />
                coming soon
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block text-center px-4 py-2.5 bg-primary/10 text-primary border border-primary/25 rounded-lg font-mono text-xs hover:bg-primary/20 transition-colors"
                >
                  Use the contact form →
                </a>
                <a
                  href="https://github.com/joemunene-by/GhostLM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-4 py-2.5 bg-white/5 text-white border border-white/10 rounded-lg font-mono text-xs hover:bg-white/10 transition-colors"
                >
                  Follow GhostLM on GitHub ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
