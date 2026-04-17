"use client"

import { useEffect, useRef, useState } from "react"

type Pt = { x: number; y: number; life: number }

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Pt[]>([])
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    setEnabled(mq.matches && !reduce.matches)
    const onChange = () => setEnabled(mq.matches && !reduce.matches)
    mq.addEventListener("change", onChange)
    reduce.addEventListener("change", onChange)
    return () => {
      mq.removeEventListener("change", onChange)
      reduce.removeEventListener("change", onChange)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
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

    const onMove = (e: MouseEvent) => {
      pointsRef.current.push({ x: e.clientX, y: e.clientY, life: 1 })
      if (pointsRef.current.length > 60) pointsRef.current.shift()
    }
    window.addEventListener("mousemove", onMove)

    const readColor = () => {
      const s = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim()
      return s || "108 156 255"
    }
    let color = readColor()
    const themeObserver = new MutationObserver(() => {
      color = readColor()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    })

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      const pts = pointsRef.current
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i]
        const b = pts[i + 1]
        const alpha = a.life * 0.35
        const w = a.life * 4
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(${color.replace(/ /g, ", ")}, ${alpha})`
        ctx.lineWidth = w
        ctx.lineCap = "round"
        ctx.stroke()
        a.life *= 0.94
      }
      while (pts.length && pts[0].life < 0.05) pts.shift()
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      themeObserver.disconnect()
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9993]"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
