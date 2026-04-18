"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Mic, MicOff, AudioLines, X } from "lucide-react"

type State = "idle" | "requesting" | "running" | "denied" | "error"

const BARS = 64

export default function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [state, setState] = useState<State>("idle")
  const [panelOpen, setPanelOpen] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number>(0)

  const stop = () => {
    cancelAnimationFrame(rafRef.current)
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    ctxRef.current?.close().catch(() => {})
    ctxRef.current = null
    analyserRef.current = null
    setState("idle")
  }

  useEffect(() => () => stop(), [])

  const start = async () => {
    setState("requesting")
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) {
        setState("error")
        return
      }
      const ctx = new AudioCtx()
      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.8
      source.connect(analyser)
      ctxRef.current = ctx
      analyserRef.current = analyser
      setState("running")
      setPanelOpen(true)
      draw()
    } catch (err) {
      const e = err as DOMException
      setState(e?.name === "NotAllowedError" ? "denied" : "error")
    }
  }

  const draw = () => {
    const canvas = canvasRef.current
    const analyser = analyserRef.current
    if (!canvas || !analyser) return
    const gl = canvas.getContext("2d")
    if (!gl) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    gl.setTransform(dpr, 0, 0, dpr, 0, 0)

    const data = new Uint8Array(analyser.frequencyBinCount)
    const cx = w / 2
    const cy = h / 2
    const radius = Math.min(w, h) * 0.32

    const readColor = () => {
      const s = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim() || "108 156 255"
      return s.replace(/ /g, ", ")
    }

    const tick = () => {
      analyser.getByteFrequencyData(data)
      gl.clearRect(0, 0, w, h)
      const color = readColor()

      // Smooth center glow
      const sum = data.reduce((s, v) => s + v, 0) / data.length
      const intensity = Math.min(1, sum / 140)
      const grad = gl.createRadialGradient(cx, cy, 4, cx, cy, radius * 1.3)
      grad.addColorStop(0, `rgba(${color}, ${0.25 * intensity})`)
      grad.addColorStop(1, `rgba(${color}, 0)`)
      gl.fillStyle = grad
      gl.fillRect(0, 0, w, h)

      // Bars radiating outward
      const step = Math.floor(data.length / BARS)
      for (let i = 0; i < BARS; i++) {
        const v = data[i * step] / 255
        const len = v * radius * 0.8
        const angle = (i / BARS) * Math.PI * 2 - Math.PI / 2
        const x1 = cx + Math.cos(angle) * radius
        const y1 = cy + Math.sin(angle) * radius
        const x2 = cx + Math.cos(angle) * (radius + len)
        const y2 = cy + Math.sin(angle) * (radius + len)
        gl.strokeStyle = `rgba(${color}, ${0.3 + v * 0.65})`
        gl.lineWidth = 2
        gl.lineCap = "round"
        gl.beginPath()
        gl.moveTo(x1, y1)
        gl.lineTo(x2, y2)
        gl.stroke()
      }

      // Inner ring
      gl.strokeStyle = `rgba(${color}, 0.3)`
      gl.lineWidth = 1
      gl.beginPath()
      gl.arc(cx, cy, radius - 2, 0, Math.PI * 2)
      gl.stroke()

      rafRef.current = requestAnimationFrame(tick)
    }

    tick()
  }

  const close = () => {
    stop()
    setPanelOpen(false)
  }

  return (
    <>
      <motion.button
        onClick={state === "running" ? close : start}
        className={`fixed bottom-5 right-[5.5rem] z-[60] p-3 backdrop-blur-xl border rounded-full transition-all shadow-lg hidden md:flex ${
          state === "running"
            ? "bg-primary/20 border-primary/60 text-primary"
            : "bg-bg-card/90 border-border-color text-text-muted hover:text-primary hover:border-primary/40"
        }`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="hover"
        title={state === "running" ? "Stop visualizer" : "Audio visualizer (mic)"}
        aria-label="Toggle audio visualizer"
      >
        {state === "running" ? (
          <AudioLines className="w-5 h-5" />
        ) : state === "denied" ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </motion.button>

      <AnimatePresence>
        {panelOpen && state === "running" && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed bottom-20 right-[5.5rem] z-[60] w-[320px] bg-bg-card/90 backdrop-blur-2xl border border-border-color rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-border-color bg-bg-dark/60">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="font-mono text-[11px] text-white uppercase tracking-widest">
                  listening
                </span>
              </div>
              <button
                onClick={close}
                className="text-text-muted hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <canvas ref={canvasRef} className="w-full h-[220px]" />
            <div className="border-t border-border-color px-3 py-2 font-mono text-[10px] text-text-muted/70 flex items-center justify-between">
              <span>mic · local · never transmitted</span>
              <span>fft 256</span>
            </div>
          </motion.div>
        )}

        {state === "denied" && (
          <motion.div
            key="denied"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-20 right-[5.5rem] z-[60] w-[260px] bg-bg-card/90 backdrop-blur-xl border border-red-500/30 rounded-xl p-3 font-mono text-[11px] text-text-muted"
          >
            Mic permission denied. You can still enjoy the rest.
            <button
              onClick={() => setState("idle")}
              className="block mt-2 text-red-400 hover:text-red-300"
            >
              dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
