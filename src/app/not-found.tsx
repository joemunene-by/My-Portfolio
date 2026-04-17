"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Terminal, Home, ArrowLeft } from "lucide-react"
import ScrambleText from "@/components/ScrambleText"
import MagneticLink from "@/components/MagneticLink"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="bg-bg-card/60 backdrop-blur-xl border border-border-color rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
        >
          <div className="flex items-center gap-2 border-b border-border-color px-4 py-3 bg-bg-dark/50">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 font-mono text-xs text-text-muted flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" /> zsh — not-found
            </span>
          </div>

          <div className="p-6 sm:p-10 font-mono text-sm space-y-4">
            <div className="text-text-muted">
              <span className="text-primary">$</span> cd{" "}
              <span className="text-accent-warm">/the-page-you-wanted</span>
            </div>
            <div className="text-red-400">
              zsh: no such file or directory: /the-page-you-wanted
            </div>

            <div className="text-text-muted">
              <span className="text-primary">$</span> ls errors/
            </div>
            <ScrambleText
              as="div"
              text="ERR_404_LOST_IN_THE_NET"
              className="text-accent text-lg sm:text-2xl font-bold tracking-tight"
              duration={1800}
              delay={300}
              scrambleOnHover={false}
            />

            <div className="pt-2 text-text-muted leading-relaxed">
              The resource you&apos;re looking for isn&apos;t indexed here.
              Maybe it moved, maybe it never existed. Either way — there&apos;s
              plenty more to see.
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <MagneticLink>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary border border-primary/30 rounded-lg hover:bg-primary/20 hover:border-primary/60 transition-all"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
              </MagneticLink>
              <MagneticLink>
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 text-white border border-white/15 rounded-lg hover:bg-white/10 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  View Projects
                </Link>
              </MagneticLink>
            </div>

            <div className="pt-4 text-text-muted/60 text-xs">
              Tip: press{" "}
              <kbd className="px-1.5 py-0.5 rounded border border-border-color">
                ⌘
              </kbd>{" "}
              <kbd className="px-1.5 py-0.5 rounded border border-border-color">
                K
              </kbd>{" "}
              to search anything
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
