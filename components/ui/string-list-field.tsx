"use client"

import * as React from "react"
import { RiAddLine, RiCloseLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type StringListFieldProps = {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  addLabel?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
}

/**
 * Edits an array of strings as one input per entry, with add / remove controls.
 *
 * Replaces the old "type everything in a textarea, split on newlines or commas"
 * approach, which silently broke any entry containing a comma.
 */
export function StringListField({
  value,
  onChange,
  placeholder = "Add an entry",
  addLabel = "Add entry",
  disabled,
  className,
  inputClassName,
}: StringListFieldProps) {
  // Always render at least one row so the field never looks empty/unusable.
  const rows = value.length > 0 ? value : [""]
  const lastInputRef = React.useRef<HTMLInputElement>(null)
  const shouldFocusLast = React.useRef(false)

  React.useEffect(() => {
    if (shouldFocusLast.current) {
      shouldFocusLast.current = false
      lastInputRef.current?.focus()
    }
  })

  const update = (index: number, next: string) => {
    const copy = [...rows]
    copy[index] = next
    onChange(copy)
  }

  const add = () => {
    shouldFocusLast.current = true
    onChange([...rows, ""])
  }

  const removeAt = (index: number) => {
    const copy = rows.filter((_, i) => i !== index)
    onChange(copy)
  }

  return (
    <div className={cn("space-y-2", className)}>
      {rows.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-muted-foreground w-5 shrink-0 text-right text-[11px] font-medium tabular-nums">
            {index + 1}.
          </span>

          <Input
            ref={index === rows.length - 1 ? lastInputRef : undefined}
            value={entry}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(event) => update(index, event.target.value)}
            onKeyDown={(event) => {
              // Enter adds the next entry instead of submitting the form.
              if (event.key === "Enter") {
                event.preventDefault()
                if (entry.trim()) add()
              }
            }}
            className={cn("flex-1", inputClassName)}
          />

          <button
            type="button"
            onClick={() => removeAt(index)}
            disabled={disabled || (rows.length === 1 && !entry)}
            title="Remove entry"
            className={cn(
              "text-muted-foreground hover:text-destructive shrink-0 rounded-md p-1.5 transition-colors",
              "disabled:cursor-not-allowed disabled:opacity-30",
            )}
          >
            <RiCloseLine className="size-4" />
          </button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={add}
        disabled={disabled}
        className="border-input ml-7 h-8 rounded-lg border-dashed text-xs font-medium shadow-none"
      >
        <RiAddLine className="mr-1 size-3.5" />
        {addLabel}
      </Button>
    </div>
  )
}

/** Drops blank rows before the value goes to the API. */
export function compactStringList(value: string[]) {
  return value.map((entry) => entry.trim()).filter(Boolean)
}
