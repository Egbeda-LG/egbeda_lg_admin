"use client"

import * as React from "react"
import { RiArrowDownSLine, RiCheckLine } from "@remixicon/react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { SelectOption } from "@/lib/api/enums"
import { cn } from "@/lib/utils"

type FilterPopoverProps = {
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  /** Shown when nothing matches `value`. */
  placeholder?: string
  isLoading?: boolean
  className?: string
  align?: "start" | "center" | "end"
}

/**
 * Pill-shaped filter control.
 *
 * Used instead of Select because Select renders the raw option *value* in its
 * trigger - which for ward filters meant showing a MongoDB id, and "all"
 * instead of "All wards".
 */
export function FilterPopover({
  value,
  onValueChange,
  options,
  placeholder = "All",
  isLoading,
  className,
  align = "end",
}: FilterPopoverProps) {
  const [open, setOpen] = React.useState(false)
  const selected = options.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        type="button"
        className={cn(
          "border-input bg-card text-foreground flex h-10 min-w-36 items-center justify-between gap-2 rounded-full border px-4 text-xs font-medium shadow-none transition-colors",
          "hover:bg-muted/50 focus-visible:ring-1 focus-visible:ring-[#701a2e] focus-visible:outline-none",
          className,
        )}
      >
        <span className="truncate">
          {isLoading ? "Loading..." : (selected?.label ?? placeholder)}
        </span>
        <RiArrowDownSLine
          className={cn(
            "text-muted-foreground size-4 shrink-0 transition-transform",
            open && "rotate-180",
          )}
        />
      </PopoverTrigger>

      <PopoverContent align={align} className="max-h-72 w-56 overflow-y-auto p-1">
        {options.map((option) => {
          const isSelected = option.value === value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onValueChange(option.value)
                setOpen(false)
              }}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors",
                isSelected
                  ? "bg-[#701a2e]/10 font-semibold text-[#701a2e]"
                  : "hover:bg-muted text-foreground",
              )}
            >
              <span className="truncate">{option.label}</span>
              {isSelected ? <RiCheckLine className="size-3.5 shrink-0" /> : null}
            </button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
