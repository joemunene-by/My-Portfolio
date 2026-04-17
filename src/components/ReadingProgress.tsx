"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    mass: 0.2,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-[9998] h-[3px] bg-gradient-to-r from-primary via-accent to-accent-warm"
    />
  )
}
