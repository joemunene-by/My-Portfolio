import { type ElementType } from "react"

interface Props {
  text: string
  className?: string
  as?: "span" | "h1" | "h2" | "h3" | "div"
  duration?: number
  scrambleOnHover?: boolean
  delay?: number
}

// Plain text. The character-scramble animation was removed for a calmer,
// less gimmicky feel; the component stays so call sites are unchanged.
export default function ScrambleText({ text, className = "", as = "span" }: Props) {
  const Tag: ElementType = as
  return <Tag className={className}>{text}</Tag>
}
