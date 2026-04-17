"use client"

import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState, type ReactNode } from "react"

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [key, setKey] = useState(pathname)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setKey(pathname)
  }, [pathname])

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          key={`curtain-${key}`}
          className="fixed inset-0 z-[9995] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-bg-dark border-b border-border-color"
            initial={{ y: "-100%" }}
            animate={{ y: ["0%", "-100%"] }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], times: [0, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-bg-dark border-t border-border-color"
            initial={{ y: "100%" }}
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], times: [0, 1] }}
          />
        </motion.div>
      </AnimatePresence>
    </>
  )
}
