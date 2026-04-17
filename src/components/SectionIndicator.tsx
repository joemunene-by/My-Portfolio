"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
]

export default function SectionIndicator() {
  const [active, setActive] = useState("home")

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -40% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {sections.map((s) => {
        const isActive = s.id === active
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group relative flex items-center justify-end gap-3"
            data-cursor="hover"
          >
            <motion.span
              className="font-mono text-[10px] uppercase tracking-widest text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
            >
              {s.label}
            </motion.span>
            <motion.span
              className="relative block rounded-full"
              animate={{
                width: isActive ? 22 : 8,
                height: 8,
                backgroundColor: isActive ? "#6C9CFF" : "rgba(138, 143, 168, 0.4)",
              }}
              transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            />
          </a>
        )
      })}
    </div>
  )
}
