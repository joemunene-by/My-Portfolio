"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Palette, Check } from "lucide-react"

type Theme = {
  id: string
  label: string
  primary: string
  primaryDark: string
  primaryLight: string
  accent: string
  accentWarm: string
}

// Values are RGB triplets consumed by tailwind `rgb(var(--primary) / <alpha-value>)`.
const themes: Theme[] = [
  {
    id: "aurora",
    label: "Aurora",
    primary: "108 156 255",
    primaryDark: "90 133 224",
    primaryLight: "139 180 255",
    accent: "196 161 255",
    accentWarm: "255 176 136",
  },
  {
    id: "matrix",
    label: "Matrix",
    primary: "52 211 153",
    primaryDark: "16 185 129",
    primaryLight: "110 231 183",
    accent: "167 243 208",
    accentWarm: "253 230 138",
  },
  {
    id: "ember",
    label: "Ember",
    primary: "251 146 60",
    primaryDark: "234 88 12",
    primaryLight: "253 186 116",
    accent: "244 114 182",
    accentWarm: "252 165 165",
  },
  {
    id: "plasma",
    label: "Plasma",
    primary: "192 132 252",
    primaryDark: "168 85 247",
    primaryLight: "216 180 254",
    accent: "240 171 252",
    accentWarm: "251 207 232",
  },
  {
    id: "sol",
    label: "Sol",
    primary: "251 191 36",
    primaryDark: "245 158 11",
    primaryLight: "252 211 77",
    accent: "251 113 133",
    accentWarm: "248 113 113",
  },
]

const STORAGE_KEY = "portfolio-accent"

function applyTheme(t: Theme) {
  const root = document.documentElement
  root.style.setProperty("--primary", t.primary)
  root.style.setProperty("--primary-dark", t.primaryDark)
  root.style.setProperty("--primary-light", t.primaryLight)
  root.style.setProperty("--accent", t.accent)
  root.style.setProperty("--accent-warm", t.accentWarm)
}

const rgb = (t: string) => `rgb(${t.split(" ").join(", ")})`

export default function AccentPicker() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>("aurora")

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    const theme = themes.find((t) => t.id === saved) || themes[0]
    applyTheme(theme)
    setActive(theme.id)
  }, [])

  const select = (t: Theme, ev?: React.MouseEvent) => {
    applyTheme(t)
    setActive(t.id)
    localStorage.setItem(STORAGE_KEY, t.id)
    window.dispatchEvent(new CustomEvent("achievement", { detail: "palette" }))
    window.dispatchEvent(
      new CustomEvent("theme:ripple", {
        detail: {
          x: ev?.clientX,
          y: ev?.clientY,
          color: t.primary,
        },
      }),
    )
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.25, 0.4, 0.25, 1] }}
            className="bg-bg-card/90 backdrop-blur-2xl border border-border-color rounded-2xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)] min-w-[220px]"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted/70 px-2 pt-1 pb-2">
              Accent
            </div>
            <div className="space-y-1">
              {themes.map((t) => {
                const selected = active === t.id
                return (
                  <button
                    key={t.id}
                    onClick={(ev) => select(t, ev)}
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-colors text-left ${
                      selected ? "bg-white/5" : "hover:bg-white/5"
                    }`}
                    data-cursor="hover"
                  >
                    <span className="flex -space-x-1">
                      <span
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ background: rgb(t.primary) }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ background: rgb(t.accent) }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ background: rgb(t.accentWarm) }}
                      />
                    </span>
                    <span className="flex-1 font-mono text-sm text-white">{t.label}</span>
                    {selected && <Check className="w-3.5 h-3.5 text-primary" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        data-tour="palette"
        className="p-3 bg-bg-card/90 backdrop-blur-xl border border-border-color rounded-full text-text-muted hover:text-primary hover:border-primary/40 transition-all shadow-lg"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="hover"
        title="Change accent color"
        aria-label="Change accent color"
      >
        <Palette className="w-5 h-5" />
      </motion.button>
    </div>
  )
}
