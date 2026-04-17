"use client"

import { useEffect, useRef } from "react"

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    const mouse = { x: -1000, y: -1000, active: false }

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
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    const onLeave = () => {
      mouse.active = false
      mouse.x = -1000
      mouse.y = -1000
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)

    const readVar = (name: string, fallback: string) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
      return v || fallback
    }
    const getColors = () => ({
      primary: readVar("--primary", "108 156 255"),
      accent: readVar("--accent", "196 161 255"),
      warm: readVar("--accent-warm", "255 176 136"),
    })
    let palette = getColors()
    const themeObserver = new MutationObserver(() => {
      palette = getColors()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    })

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      baseOpacity: number
      hue: "primary" | "accent" | "warm"

      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.size = Math.random() * 1.4 + 0.4
        this.baseOpacity = Math.random() * 0.3 + 0.1
        const hues = ["primary", "accent", "warm"] as const
        this.hue = hues[Math.floor(Math.random() * hues.length)]
      }

      update() {
        if (mouse.active) {
          const dx = this.x - mouse.x
          const dy = this.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < 140 && dist > 0) {
            const force = (140 - dist) / 140
            this.vx += (dx / dist) * force * 0.5
            this.vy += (dy / dist) * force * 0.5
          }
        }
        this.vx *= 0.96
        this.vy *= 0.96
        this.vx += (Math.random() - 0.5) * 0.02
        this.vy += (Math.random() - 0.5) * 0.02

        this.x += this.vx
        this.y += this.vy

        if (this.x < 0) this.x = window.innerWidth
        if (this.x > window.innerWidth) this.x = 0
        if (this.y < 0) this.y = window.innerHeight
        if (this.y > window.innerHeight) this.y = 0
      }

      draw() {
        const c = palette[this.hue]
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${c.replace(/ /g, ", ")}, ${this.baseOpacity})`
        ctx!.fill()
      }
    }

    const count = Math.min(75, Math.floor((window.innerWidth * window.innerHeight) / 18000))
    particles = Array.from({ length: count }, () => new Particle())

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 130) {
            const alpha = 0.08 * (1 - dist / 130)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${palette.primary.replace(/ /g, ", ")}, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        if (mouse.active) {
          const p = particles[i]
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < 180) {
            const alpha = 0.18 * (1 - dist / 180)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(${palette.accent.replace(/ /g, ", ")}, ${alpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        p.update()
        p.draw()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
      themeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.65 }}
    />
  )
}
