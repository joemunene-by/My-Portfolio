interface Props {
  text: string
  align?: "left" | "right"
  className?: string
}

// The oversized decorative background label was removed for a cleaner look.
// The component stays (rendering nothing visible) so call sites are unchanged.
export default function GiantLabel({ text }: Props) {
  return <span hidden aria-hidden data-label={text} />
}
