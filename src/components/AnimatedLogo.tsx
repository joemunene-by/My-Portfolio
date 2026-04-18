"use client"

import { useEffect, useRef } from "react"

// Animated ghost glyph — canvas-driven, theme-aware, reacts to cursor.
export default function AnimatedLogo({ size = 28 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = size + "px"
    canvas.style.height = size + "px"
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const readColor = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim() || "108 156 255"
      return v.replace(/ /g, ", ")
    }
    let color = readColor()
    const mo = new MutationObserver(() => {
      color = readColor()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] })

    let hover = false
    const onEnter = () => {
      hover = true
    }
    const onLeave = () => {
      hover = false
    }
    canvas.addEventListener("mouseenter", onEnter)
    canvas.addEventListener("mouseleave", onLeave)

    let raf = 0
    const start = performance.now()

    const draw = () => {
      const t = (performance.now() - start) / 1000
      ctx.clearRect(0, 0, size, size)

      const cx = size / 2
      const cy = size / 2
      const r = size * 0.38
      const bob = Math.sin(t * 1.6) * 1.2

      // Soft glow
      const grad = ctx.createRadialGradient(cx, cy + bob, 0, cx, cy + bob, r * 1.8)
      grad.addColorStop(0, `rgba(${color}, ${hover ? 0.35 : 0.18})`)
      grad.addColorStop(1, `rgba(${color}, 0)`)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, size, size)

      // Ghost body — rounded bell with a wavy bottom
      ctx.beginPath()
      ctx.moveTo(cx - r, cy + bob + r * 0.3)
      ctx.quadraticCurveTo(cx - r, cy + bob - r, cx, cy + bob - r)
      ctx.quadraticCurveTo(cx + r, cy + bob - r, cx + r, cy + bob + r * 0.3)

      // Wavy bottom
      const bumps = 3
      const bw = (r * 2) / bumps
      const wave = Math.sin(t * 3) * 0.6
      for (let i = 0; i < bumps; i++) {
        const x = cx + r - i * bw
        const y = cy + bob + r * 0.3 + (i % 2 === 0 ? wave + 1.5 : -wave)
        ctx.lineTo(x - bw / 2, y + 1.5)
        ctx.lineTo(x - bw, y)
      }
      ctx.closePath()

      const bodyGrad = ctx.createLinearGradient(cx, cy + bob - r, cx, cy + bob + r)
      bodyGrad.addColorStop(0, `rgba(${color}, ${hover ? 1 : 0.9})`)
      bodyGrad.addColorStop(1, `rgba(${color}, ${hover ? 0.75 : 0.6})`)
      ctx.fillStyle = bodyGrad
      ctx.fill()

      // Eyes
      const eyeY = cy + bob - r * 0.15
      ctx.fillStyle = "rgba(12, 14, 20, 0.95)"
      ctx.beginPath()
      ctx.arc(cx - r * 0.32, eyeY, Math.max(1.2, size * 0.06), 0, Math.PI * 2)
      ctx.arc(cx + r * 0.32, eyeY, Math.max(1.2, size * 0.06), 0, Math.PI * 2)
      ctx.fill()

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      mo.disconnect()
      canvas.removeEventListener("mouseenter", onEnter)
      canvas.removeEventListener("mouseleave", onLeave)
    }
  }, [size])

  return <canvas ref={canvasRef} aria-hidden />
}
