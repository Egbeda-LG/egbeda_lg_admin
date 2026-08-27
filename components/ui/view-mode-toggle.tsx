"use client"

import { RiGridFill, RiListCheck } from "@remixicon/react"

import { cn } from "@/lib/utils"

export type ViewMode = "grid" | "list"

type ViewModeToggleProps = {
  value: ViewMode
  onValueChange: (value: ViewMode) => void
  className?: string
}

/** Grid / list switch used by the card-and-table list views. */
export function ViewModeToggle({
  value,
  onValueChange,
  className,
}: ViewModeToggleProps) {
  return (
    <div
      className={cn(
        "bg-card flex items-center rounded-full border p-1",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onValueChange("grid")}
        title="Grid view"
        className={cn(
          "flex size-8 items-center justify-center rounded-full transition-colors",
          value === "grid"
            ? "bg-[#701a2e] text-white"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <RiGridFill className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => onValueChange("list")}
        title="List view"
        className={cn(
          "flex size-8 items-center justify-center rounded-full transition-colors",
          value === "list"
            ? "bg-[#701a2e] text-white"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <RiListCheck className="size-4" />
      </button>
    </div>
  )
}
