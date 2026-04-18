"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Sparkles, X } from "lucide-react"

type Step = {
  selector: string
  title: string
  body: string
  placement?: "top" | "bottom" | "left" | "right"
}

const STEPS: Step[] = [
  {
    selector: "[data-tour='command']",
    title: "Command palette",
    body: "Press ⌘K (or Ctrl+K) anytime to jump anywhere, trigger actions, or open secret panels.",
    placement: "right",
  },
  {
    selector: "[data-tour='cursor']",
    title: "Everything reacts",
    body: "The cursor, background shader, and hover states all respond to you. Try moving around.",
    placement: "top",
  },
  {
    selector: "[data-tour='palette']",
    title: "Re-color the site",
    body: "Switch accents live. Aurora, Matrix, Ember, Plasma, Sol — the whole site re-themes instantly.",
    placement: "left",
  },
  {
    selector: "[data-tour='chat']",
    title: "Ask Ghost",
    body: "Tiny bot that knows about Joe. Canned replies, but the answers are real.",
    placement: "right",
  },
  {
    selector: "[data-tour='trophy']",
    title: "Secrets exist",
    body: "Press ? for shortcuts, ⌘⇧T for achievements, try the Konami code. There's more than you'll find on one pass.",
    placement: "bottom",
  },
]

const STORAGE_KEY = "portfolio-tour-seen"

export default function OnboardingTour() {
  const [active, setActive] = useState(false)
  const [step, setStep] = useState(0)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onStart = () => {
      setStep(0)
      setActive(true)
    }
    window.addEventListener("tour:start", onStart)

    // Auto-start the first time
    try {
      const seen = localStorage.getItem(STORAGE_KEY)
      if (!seen) {
        const t = setTimeout(() => {
          setStep(0)
          setActive(true)
        }, 3500)
        return () => {
          clearTimeout(t)
          window.removeEventListener("tour:start", onStart)
        }
      }
    } catch {}

    return () => window.removeEventListener("tour:start", onStart)
  }, [])

  useLayoutEffect(() => {
    if (!active) return
    const measure = () => {
      const sel = STEPS[step].selector
      const el = document.querySelector(sel) as HTMLElement | null
      if (!el) {
        setRect(null)
        return
      }
      el.scrollIntoView({ behavior: "smooth", block: "center" })
      // Give smooth scroll a beat, then read the rect
      setTimeout(() => {
        const r = el.getBoundingClientRect()
        setRect(r)
      }, 350)
    }
    measure()
    window.addEventListener("resize", measure)
    window.addEventListener("scroll", measure, { passive: true })
    return () => {
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", measure)
    }
  }, [active, step])

  const finish = () => {
    setActive(false)
    try {
      localStorage.setItem(STORAGE_KEY, "1")
    } catch {}
  }

  const next = () => {
    if (step >= STEPS.length - 1) {
      finish()
    } else {
      setStep((s) => s + 1)
    }
  }

  const prev = () => setStep((s) => Math.max(0, s - 1))

  // Calculate tooltip position near the highlighted element
  const current = STEPS[step]
  const tooltipPos = (() => {
    if (!rect) return { left: "50%", top: "20%", transform: "translate(-50%, 0)" }
    const pad = 16
    const vw = typeof window !== "undefined" ? window.innerWidth : 1200
    const vh = typeof window !== "undefined" ? window.innerHeight : 800
    const placement = current.placement || "bottom"
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    switch (placement) {
      case "top":
        return {
          left: clamp(cx, 180, vw - 180) + "px",
          top: Math.max(20, rect.top - pad) + "px",
          transform: "translate(-50%, -100%)",
        }
      case "right":
        return {
          left: Math.min(vw - 340, rect.right + pad) + "px",
          top: clamp(cy, 100, vh - 180) + "px",
          transform: "translate(0, -50%)",
        }
      case "left":
        return {
          left: Math.max(20, rect.left - pad) + "px",
          top: clamp(cy, 100, vh - 180) + "px",
          transform: "translate(-100%, -50%)",
        }
      default:
        return {
          left: clamp(cx, 180, vw - 180) + "px",
          top: Math.min(vh - 180, rect.bottom + pad) + "px",
          transform: "translate(-50%, 0)",
        }
    }
  })()

  const holeR = rect ? Math.max(rect.width, rect.height) * 0.7 + 16 : 0
  const holeX = rect ? rect.left + rect.width / 2 : -1000
  const holeY = rect ? rect.top + rect.height / 2 : -1000

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[9991] pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Mask with a hole cut where the target is */}
          <svg className="absolute inset-0 w-full h-full" aria-hidden>
            <defs>
              <mask id="tour-mask">
                <rect width="100%" height="100%" fill="white" />
                <motion.circle
                  cx={holeX}
                  cy={holeY}
                  animate={{ r: holeR }}
                  initial={{ r: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="rgba(12, 14, 20, 0.72)"
              mask="url(#tour-mask)"
            />
          </svg>

          {/* Glow ring around the target */}
          {rect && (
            <motion.div
              key={step}
              className="absolute pointer-events-none rounded-full border-2 border-primary"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              style={{
                left: holeX - holeR,
                top: holeY - holeR,
                width: holeR * 2,
                height: holeR * 2,
                boxShadow:
                  "0 0 40px rgb(var(--primary) / 0.4), inset 0 0 40px rgb(var(--primary) / 0.25)",
              }}
            />
          )}

          {/* Tooltip */}
          <motion.div
            key={`tip-${step}`}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.4, 0.25, 1] }}
            className="absolute max-w-sm w-[320px] bg-bg-card/95 backdrop-blur-2xl border border-primary/40 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            style={tooltipPos}
          >
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-color bg-bg-dark/60">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="font-mono text-[11px] text-white uppercase tracking-widest">
                  tour · {step + 1} / {STEPS.length}
                </span>
              </div>
              <button
                onClick={finish}
                className="text-text-muted hover:text-white transition-colors"
                aria-label="Skip tour"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-4">
              <div className="font-bold text-white text-base mb-1.5">
                {current.title}
              </div>
              <div className="text-text-muted text-sm leading-relaxed">
                {current.body}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border-color px-4 py-2.5 bg-bg-card/40">
              <button
                onClick={prev}
                disabled={step === 0}
                className="flex items-center gap-1 font-mono text-[11px] text-text-muted hover:text-white transition-colors disabled:opacity-30"
              >
                <ArrowLeft className="w-3 h-3" />
                back
              </button>
              <div className="flex gap-1">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === step ? "w-6 bg-primary" : "w-1.5 bg-text-muted/40"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="flex items-center gap-1 font-mono text-[11px] text-primary hover:text-white transition-colors"
              >
                {step === STEPS.length - 1 ? "done" : "next"}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n))
}
