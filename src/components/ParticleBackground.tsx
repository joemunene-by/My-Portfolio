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

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Soft multi-color palette
    const colors = [
      { r: 108, g: 156, b: 255 }, // blue
      { r: 196, g: 161, b: 255 }, // purple
      { r: 255, g: 176, b: 136 }, // warm
    ]

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: { r: number; g: number; b: number }

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.vx = (Math.random() - 0.5) * 0.2
        this.vy = (Math.random() - 0.5) * 0.2
        this.size = Math.random() * 1.2 + 0.3
        this.opacity = Math.random() * 0.25 + 0.05
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1
      }

      draw() {
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`
        ctx!.fill()
      }
    }

    const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000))
    particles = Array.from({ length: count }, () => new Particle())

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            const alpha = 0.04 * (1 - dist / 130)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(108, 156, 255, ${alpha})`
            ctx.lineWidth = 0.4
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
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  )
}
