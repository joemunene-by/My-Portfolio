"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"

export default function HeroAvatar() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 })

  const rotY = useTransform(sx, [0, 1], [8, -8])
  const rotX = useTransform(sy, [0, 1], [-6, 6])

  // Parallax offsets for layered elements (px from mouse x/y)
  const glowX = useTransform(sx, [0, 1], [-30, 30])
  const glowY = useTransform(sy, [0, 1], [-20, 20])
  const photoX = useTransform(sx, [0, 1], [-8, 8])
  const photoY = useTransform(sy, [0, 1], [-6, 6])
  const frontX = useTransform(sx, [0, 1], [-16, 16])
  const frontY = useTransform(sy, [0, 1], [-10, 10])
  const bracketX = useTransform(sx, [0, 1], [4, -4])
  const bracketY = useTransform(sy, [0, 1], [3, -3])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative group"
      style={{
        perspective: 1200,
      }}
    >
      <motion.div
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Ambient glow behind */}
        <motion.div
          style={{ x: glowX, y: glowY, translateZ: -60 }}
          className="absolute -inset-8 bg-gradient-to-br from-primary/30 via-accent/20 to-accent-warm/15 rounded-[2.5rem] blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700"
        />

        {/* Photo layer */}
        <motion.div
          style={{ x: photoX, y: photoY, translateZ: 0 }}
          className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          <Image
            src="/joe-munene.jpg"
            alt="Joe Munene"
            width={420}
            height={520}
            className="object-cover w-[300px] h-[380px] sm:w-[360px] sm:h-[450px] lg:w-[420px] lg:h-[520px] grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/45 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
        </motion.div>

        {/* Decorative corner brackets (front layer) */}
        <motion.div
          style={{ x: bracketX, y: bracketY, translateZ: 20 }}
          className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-primary/60 rounded-tl-lg"
        />
        <motion.div
          style={{ x: bracketX, y: bracketY, translateZ: 20 }}
          className="absolute -top-2 -right-2 w-10 h-10 border-t-2 border-r-2 border-accent/60 rounded-tr-lg"
        />
        <motion.div
          style={{ x: bracketX, y: bracketY, translateZ: 20 }}
          className="absolute -bottom-2 -left-2 w-10 h-10 border-b-2 border-l-2 border-accent/60 rounded-bl-lg"
        />
        <motion.div
          style={{ x: bracketX, y: bracketY, translateZ: 20 }}
          className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-primary/60 rounded-br-lg"
        />

        {/* Floating HUD chip — name tag */}
        <motion.div
          style={{ x: frontX, y: frontY, translateZ: 40 }}
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-bg-card/90 backdrop-blur-xl border border-primary/30 rounded-full px-4 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-[11px] text-white uppercase tracking-widest">
            online · kenya
          </span>
        </motion.div>

        {/* Ghost call-out sticker */}
        <motion.div
          style={{ x: frontX, y: frontY, translateZ: 60 }}
          className="absolute -top-3 -right-3 bg-bg-dark/80 backdrop-blur-md border border-accent/40 rounded-xl px-2.5 py-1.5 rotate-6"
        >
          <div className="font-mono text-[10px] text-accent leading-none">v2</div>
          <div className="font-mono text-[8px] text-text-muted/80 mt-0.5">portfolio</div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
