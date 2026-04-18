"use client"

import { useEffect, useState } from "react"
import { Globe2 } from "lucide-react"

const HOST_TZ = "Africa/Nairobi"

function getHostOffsetMinutes(): number {
  const now = new Date()
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: HOST_TZ,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  const parts = dtf.formatToParts(now).reduce<Record<string, string>>((acc, p) => {
    if (p.type !== "literal") acc[p.type] = p.value
    return acc
  }, {})
  const hostMs = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  )
  return Math.round((hostMs - now.getTime()) / 60000)
}

export default function TimezoneWidget() {
  const [tz, setTz] = useState<string>("")
  const [delta, setDelta] = useState<number | null>(null)
  const [localTime, setLocalTime] = useState("")

  useEffect(() => {
    const visitor = Intl.DateTimeFormat().resolvedOptions().timeZone
    setTz(visitor || "Unknown")

    const hostOffset = getHostOffsetMinutes()
    const visitorOffset = -new Date().getTimezoneOffset()
    setDelta(visitorOffset - hostOffset)

    const tick = () => {
      setLocalTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      )
    }
    tick()
    const id = setInterval(tick, 1000 * 30)
    return () => clearInterval(id)
  }, [])

  if (!tz) return null

  const sign = delta === null ? "" : delta > 0 ? "+" : delta < 0 ? "−" : ""
  const absMin = delta === null ? 0 : Math.abs(delta)
  const hours = Math.floor(absMin / 60)
  const mins = absMin % 60
  const deltaLabel =
    delta === null
      ? ""
      : delta === 0
        ? "same timezone"
        : `${sign}${hours}${mins ? `:${String(mins).padStart(2, "0")}` : "h"} vs Nairobi`

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 font-mono text-[11px] text-text-muted/80 uppercase tracking-widest">
      <div className="flex items-center gap-2">
        <Globe2 className="w-3.5 h-3.5 text-primary" />
        <span>you: {tz.split("/").pop()?.replace(/_/g, " ")}</span>
      </div>
      <div className="tabular-nums text-text-muted">
        {localTime} local
      </div>
      <div className="text-primary">{deltaLabel}</div>
    </div>
  )
}
