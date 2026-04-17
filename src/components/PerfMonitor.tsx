"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Cpu, Activity, Zap, Clock, X } from "lucide-react"

interface MemInfo {
  usedJSHeapSize: number
  totalJSHeapSize: number
}

export default function PerfMonitor() {
  const [visible, setVisible] = useState(false)
  const [fps, setFps] = useState(0)
  const [memMB, setMemMB] = useState<number | null>(null)
  const [uptime, setUptime] = useState(0)
  const fpsHistoryRef = useRef<number[]>([])
  const sparkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault()
        setVisible((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (!visible) return
    let raf = 0
    let last = performance.now()
    let frames = 0
    const started = performance.now()
    const loop = (t: number) => {
      frames++
      if (t - last >= 500) {
        const current = Math.round((frames * 1000) / (t - last))
        setFps(current)
        fpsHistoryRef.current = [...fpsHistoryRef.current.slice(-30), current]
        frames = 0
        last = t
        const perf = performance as unknown as { memory?: MemInfo }
        if (perf.memory) {
          setMemMB(Math.round(perf.memory.usedJSHeapSize / 1048576))
        }
        setUptime(Math.floor((t - started) / 1000))
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [visible])

  const fpsColor =
    fps >= 55 ? "text-green-400" : fps >= 30 ? "text-yellow-400" : "text-red-400"

  const sparkPoints = fpsHistoryRef.current
    .map((v, i) => {
      const x = (i / Math.max(1, fpsHistoryRef.current.length - 1)) * 100
      const y = 100 - Math.min(100, (v / 120) * 100)
      return `${x},${y}`
    })
    .join(" ")

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed top-4 right-4 z-[9996] w-[260px] bg-bg-card/90 backdrop-blur-2xl border border-border-color rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] pointer-events-auto"
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-border-color bg-bg-dark/60">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono text-[11px] text-white uppercase tracking-widest">
                perf
              </span>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-text-muted hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-3 space-y-2.5 font-mono text-[11px]">
            <Row
              label="FPS"
              icon={<Zap className="w-3 h-3" />}
              value={<span className={`${fpsColor} font-bold tabular-nums`}>{fps}</span>}
            />
            <Row
              label="MEM"
              icon={<Cpu className="w-3 h-3" />}
              value={
                <span className="text-white tabular-nums">
                  {memMB !== null ? `${memMB} MB` : "n/a"}
                </span>
              }
            />
            <Row
              label="UPTIME"
              icon={<Clock className="w-3 h-3" />}
              value={<span className="text-white tabular-nums">{fmt(uptime)}</span>}
            />

            <div ref={sparkRef} className="pt-1">
              <div className="flex items-center justify-between text-[10px] text-text-muted/70 mb-1 uppercase tracking-widest">
                <span>fps history</span>
                <span>last 15s</span>
              </div>
              <svg viewBox="0 0 100 100" className="w-full h-10" preserveAspectRatio="none">
                <line x1="0" y1="50" x2="100" y2="50" stroke="rgb(var(--primary) / 0.15)" strokeWidth="0.5" strokeDasharray="1 1" />
                {sparkPoints && (
                  <polyline
                    points={sparkPoints}
                    fill="none"
                    stroke="rgb(var(--primary))"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
              </svg>
            </div>
          </div>

          <div className="border-t border-border-color px-3 py-1.5 text-[10px] text-text-muted/60 font-mono flex items-center justify-between">
            <span>⌘+shift+p to toggle</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              live
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Row({
  label,
  icon,
  value,
}: {
  label: string
  icon: React.ReactNode
  value: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1.5 text-text-muted uppercase tracking-widest text-[10px]">
        {icon}
        {label}
      </span>
      {value}
    </div>
  )
}

function fmt(s: number) {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n: number) => String(n).padStart(2, "0")
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`
}
