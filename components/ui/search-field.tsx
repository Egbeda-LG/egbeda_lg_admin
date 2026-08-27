"use client"

import { RiSearchLine } from "@remixicon/react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type SearchFieldProps = {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
  inputClassName?: string
}

/** Rounded search box used across the list views. */
export function SearchField({
  value,
  onValueChange,
  placeholder = "Search...",
  className,
  inputClassName,
}: SearchFieldProps) {
  return (
    <div className={cn("relative max-w-md flex-1", className)}>
      <RiSearchLine className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        className={cn(
          "border-input bg-card h-10 rounded-full pl-10 text-xs shadow-none focus-visible:ring-1 focus-visible:ring-[#701a2e]",
          inputClassName,
        )}
      />
    </div>
  )
}
