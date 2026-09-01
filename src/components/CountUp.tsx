interface Props {
  end: number | string
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  display?: (value: number) => string
}

// Static value. The count-up animation was removed for a calmer feel; the
// component stays so call sites are unchanged.
export default function CountUp({
  end,
  suffix = "",
  prefix = "",
  className = "",
  display,
}: Props) {
  const numericEnd =
    typeof end === "string" ? parseInt(end.replace(/[^0-9]/g, "")) || 0 : end
  const formatted = display
    ? display(numericEnd)
    : typeof end === "string"
      ? end
      : numericEnd.toLocaleString()

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
