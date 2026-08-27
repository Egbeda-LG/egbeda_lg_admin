"use client"

import type { SelectOption } from "@/lib/api/enums"
import { cn } from "@/lib/utils"

type FilterPillsProps = {
  options: SelectOption[]
  value: string
  onValueChange: (value: string) => void
  className?: string
}

/** Rounded pill filter row used above the list views. */
export function FilterPills({
  options,
  value,
  onValueChange,
  className,
}: FilterPillsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onValueChange(option.value)}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
            value === option.value
              ? "bg-[#701a2e] text-white"
              : "bg-card text-muted-foreground hover:text-foreground border",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
