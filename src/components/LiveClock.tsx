"use client"

import { useEffect, useState } from "react"

export default function LiveClock() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    const format = () => {
      const d = new Date()
      const t = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Africa/Nairobi",
      }).format(d)
      setTime(t)
    }
    format()
    const id = setInterval(format, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-mono text-[11px] text-text-muted/70 uppercase tracking-widest">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span>Nairobi, KE</span>
      </div>
      <div className="tabular-nums text-text-muted">
        {time || "--:--:--"} <span className="text-text-muted/50">EAT</span>
      </div>
      <div className="text-text-muted/60">1.2921° S &nbsp; 36.8219° E</div>
    </div>
  )
}
