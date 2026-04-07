"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { testimonials } from "@/data"
import AnimatedSection from "./AnimatedSection"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

export default function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((a) => (a + 1) % testimonials.length)

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="font-mono text-primary text-sm mb-2 text-center">What People Say</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center">
            <span className="text-white">Testimonials</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="relative">
            <div className="bg-bg-card border border-border-color rounded-2xl p-8 sm:p-12 min-h-[280px] flex flex-col justify-center">
              <Quote className="w-10 h-10 text-primary/20 mb-6" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-white/90 text-lg sm:text-xl leading-relaxed mb-8 italic">
                    &ldquo;{testimonials[active].text}&rdquo;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-white font-bold text-lg">
                      {testimonials[active].name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{testimonials[active].name}</p>
                      <p className="text-text-muted text-sm">{testimonials[active].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prev}
                className="p-2 rounded-lg border border-border-color text-text-muted hover:text-primary hover:border-primary/50 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === active ? "bg-primary w-6" : "bg-border-color hover:bg-text-muted"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2 rounded-lg border border-border-color text-text-muted hover:text-primary hover:border-primary/50 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
