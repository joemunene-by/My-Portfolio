import { type ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  max?: number
  glare?: boolean
}

// Plain card. The 3D-tilt and glare effects were removed for a calmer feel;
// the component stays so call sites are unchanged.
export default function TiltCard({ children, className = "" }: Props) {
  return <div className={className}>{children}</div>
}
