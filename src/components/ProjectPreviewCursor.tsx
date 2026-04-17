"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion"

type Preview = {
  name: string
  language?: string
  tint: string
}

const palettes = [
  "from-[#6C9CFF] to-[#C4A1FF]",
  "from-[#C4A1FF] to-[#FFB088]",
  "from-[#FFB088] to-[#6C9CFF]",
  "from-[#6C9CFF] to-[#FFB088]",
]

export default function ProjectPreviewCursor() {
  const [visible, setVisible] = useState(false)
  const [preview, setPreview] = useState<Preview | null>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 250, damping: 22, mass: 0.4 })
  const y = useSpring(my, { stiffness: 250, damping: 22, mass: 0.4 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest(
        "[data-project-preview]",
      ) as HTMLElement | null
      if (el) {
        const name = el.getAttribute("data-project-preview") || ""
        const language = el.getAttribute("data-project-lang") || undefined
        const idx = name.length % palettes.length
        setPreview({ name, language, tint: palettes[idx] })
        setVisible(true)
        mx.set(e.clientX + 24)
        my.set(e.clientY + 24)
      } else {
        setVisible(false)
      }
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [mx, my])

  return (
    <AnimatePresence>
      {visible && preview && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[9994] hidden md:block"
          style={{ x, y }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.18, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div
            className={`relative w-[260px] h-[170px] rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br ${preview.tint} shadow-[0_20px_60px_rgba(0,0,0,0.5)]`}
          >
            <div className="absolute inset-0 bg-bg-dark/60" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative h-full w-full flex flex-col justify-between p-4">
              <div className="flex items-center justify-between font-mono text-[10px] text-white/80">
                <span className="uppercase tracking-widest">Preview</span>
                {preview.language && (
                  <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15">
                    {preview.language}
                  </span>
                )}
              </div>
              <div>
                <div className="font-bold text-white text-base leading-tight">
                  {preview.name}
                </div>
                <div className="font-mono text-[10px] text-white/60 mt-1">
                  ↗ view project
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
