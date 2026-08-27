import { cn } from "@/lib/utils"

export type StatusTone = "success" | "muted" | "warning"

const TONE_CLASS: Record<StatusTone, string> = {
  success: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  muted: "bg-muted text-muted-foreground border",
  warning: "border border-amber-200 bg-amber-50 text-amber-700",
}

type StatusBadgeProps = {
  label: string
  tone?: StatusTone
  className?: string
}

/** Pill used for record status across the list views. */
export function StatusBadge({
  label,
  tone = "muted",
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        TONE_CLASS[tone],
        className,
      )}
    >
      {label}
    </span>
  )
}
