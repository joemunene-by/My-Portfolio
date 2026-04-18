"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { navLinks } from "@/data"
import NavLink from "./NavLink"
import MagneticLink from "./MagneticLink"
import AnimatedLogo from "./AnimatedLogo"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-dark/90 backdrop-blur-xl border-b border-border-color shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" data-tour="command" className="flex items-center gap-2 group">
            <AnimatedLogo size={26} />
            <span className="font-mono text-lg font-bold text-gradient">Ghost</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
              >
                <NavLink href={link.href} index={i}>
                  {link.name}
                </NavLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <MagneticLink>
                <a
                  href="https://github.com/joemunene-by"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-primary/40 text-primary font-mono text-sm rounded-lg hover:bg-primary/10 hover:border-primary/70 transition-all duration-300"
                >
                  GitHub
                </a>
              </MagneticLink>
            </motion.div>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-bg-card/95 backdrop-blur-xl border-t border-border-color overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="block font-mono text-sm text-text-muted hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-primary">0{i + 1}.</span> {link.name}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                href="https://github.com/joemunene-by"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-4 py-2 border border-primary text-primary font-mono text-sm rounded-lg hover:bg-primary/10 transition-all"
                onClick={() => setIsOpen(false)}
              >
                GitHub
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
