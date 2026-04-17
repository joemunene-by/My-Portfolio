"use client"

import { motion } from "framer-motion"
import AnimatedSection from "./AnimatedSection"
import RevealText from "./RevealText"
import MagneticLink from "./MagneticLink"
import LiveClock from "./LiveClock"
import { Github, Mail, Terminal } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-32 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <p className="font-mono text-primary text-sm mb-4">06. What&apos;s Next?</p>
          <RevealText
            as="h2"
            text="Get In Touch"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
          />
          <p className="text-text-muted text-lg mb-12 leading-relaxed">
            I&apos;m always open to discussing new projects, cybersecurity research collaborations,
            or opportunities to contribute to your team. Whether you have a question or just want
            to say hello, my inbox is always open.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <MagneticLink>
            <motion.a
              href="mailto:joemunene984@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-bg-dark font-mono font-semibold rounded-lg transition-all duration-300 glow-box"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(108,156,255,0.35)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-5 h-5" />
              Say Hello
            </motion.a>
          </MagneticLink>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="mt-16 pt-12 border-t border-border-color">
            <div className="flex items-center justify-center gap-6 mb-8">
              <MagneticLink>
                <motion.a
                  href="https://github.com/joemunene-by"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-text-muted hover:text-primary transition-all duration-200 block"
                  title="GitHub"
                  whileHover={{ y: -4 }}
                >
                  <Github className="w-6 h-6" />
                </motion.a>
              </MagneticLink>
              <MagneticLink>
                <motion.a
                  href="mailto:joemunene984@gmail.com"
                  className="p-3 text-text-muted hover:text-primary transition-all duration-200 block"
                  title="Email"
                  whileHover={{ y: -4 }}
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
              </MagneticLink>
            </div>

            <div className="font-mono text-xs text-text-muted flex items-center justify-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              <span>Designed & built by Joe Munene</span>
            </div>
            <div className="font-mono text-xs text-text-muted/50 mt-2">
              Powered by Next.js, Tailwind CSS & Framer Motion
            </div>
            <LiveClock />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
