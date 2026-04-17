"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

const DURATION_MS = 12000

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789[]{}<>/\\-_+*=?!#$"

export default function HackerMode() {
  const [active, setActive] = useState(false)
  const [savedTheme, setSavedTheme] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const sequenceRef = useRef<string[]>([])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      sequenceRef.current = [...sequenceRef.current, key].slice(-KONAMI.length)
      if (
        sequenceRef.current.length === KONAMI.length &&
        sequenceRef.current.every((k, i) => k === KONAMI[i])
      ) {
        trigger()
        sequenceRef.current = []
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const trigger = () => {
    if (active) return
    const prev = localStorage.getItem("portfolio-accent")
    setSavedTheme(prev)
    const root = document.documentElement
    root.style.setProperty("--primary", "0 255 136")
    root.style.setProperty("--primary-dark", "0 200 110")
    root.style.setProperty("--primary-light", "120 255 180")
    root.style.setProperty("--accent", "0 255 210")
    root.style.setProperty("--accent-warm", "120 255 210")
    setActive(true)
    setTimeout(restore, DURATION_MS)
  }

  const restore = () => {
    setActive(false)
    const evt = new CustomEvent("theme:restore", { detail: savedTheme })
    window.dispatchEvent(evt)
    const saved = savedTheme
    const root = document.documentElement
    if (saved === "matrix") {
      root.style.setProperty("--primary", "52 211 153")
      root.style.setProperty("--accent", "167 243 208")
      root.style.setProperty("--accent-warm", "253 230 138")
    } else if (saved === "ember") {
      root.style.setProperty("--primary", "251 146 60")
      root.style.setProperty("--accent", "244 114 182")
      root.style.setProperty("--accent-warm", "252 165 165")
    } else if (saved === "plasma") {
      root.style.setProperty("--primary", "192 132 252")
      root.style.setProperty("--accent", "240 171 252")
      root.style.setProperty("--accent-warm", "251 207 232")
    } else if (saved === "sol") {
      root.style.setProperty("--primary", "251 191 36")
      root.style.setProperty("--accent", "251 113 133")
      root.style.setProperty("--accent-warm", "248 113 113")
    } else {
      // aurora / default
      root.style.setProperty("--primary", "108 156 255")
      root.style.setProperty("--primary-dark", "90 133 224")
      root.style.setProperty("--primary-light", "139 180 255")
      root.style.setProperty("--accent", "196 161 255")
      root.style.setProperty("--accent-warm", "255 176 136")
    }
  }

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = window.innerHeight + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const fontSize = 16
    const columns = Math.floor(window.innerWidth / fontSize)
    const drops = Array(columns).fill(0).map(() => Math.random() * -50)
    let raf = 0

    const draw = () => {
      ctx.fillStyle = "rgba(12, 14, 20, 0.12)"
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.fillStyle = "rgb(0, 255, 136)"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const c = CHARS[Math.floor(Math.random() * CHARS.length)]
        ctx.fillText(c, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    // Progress bar countdown
    const bar = progressRef.current
    if (bar) {
      bar.style.transition = `transform ${DURATION_MS}ms linear`
      requestAnimationFrame(() => {
        bar.style.transform = "scaleX(0)"
      })
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [active])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9992] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          <motion.div
            className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2.5 bg-black/80 border border-[rgb(0_255_136)]/40 rounded-full shadow-[0_0_30px_rgba(0,255,136,0.35)]"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <span className="w-2 h-2 rounded-full bg-[rgb(0_255_136)] animate-pulse" />
            <span className="font-mono text-xs text-[rgb(0_255_136)] uppercase tracking-widest">
              hacker mode engaged
            </span>
          </motion.div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-56 h-[3px] rounded-full bg-[rgb(0_255_136)]/15 overflow-hidden">
            <div
              ref={progressRef}
              className="h-full w-full bg-[rgb(0_255_136)] origin-left"
              style={{ transform: "scaleX(1)" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
