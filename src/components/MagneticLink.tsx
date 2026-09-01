import { type ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
  as?: "div" | "span"
}

// Plain wrapper. The magnetic cursor effect was removed for a calmer, less
// gimmicky feel; the component stays so call sites are unchanged.
export default function MagneticLink({ children, className = "", as = "div" }: Props) {
  if (as === "span") {
    return (
      <span className={className} style={{ display: "inline-block" }}>
        {children}
      </span>
    )
  }
  return <div className={className}>{children}</div>
}
