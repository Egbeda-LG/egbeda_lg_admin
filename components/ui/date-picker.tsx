"use client"

import * as React from "react"
import { format, isValid } from "date-fns"
import { RiCalendarLine, RiCloseLine } from "@remixicon/react"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

/**
 * Parses `yyyy-MM-dd` (or the leading date of a full ISO string) as a LOCAL
 * date. `new Date("2026-01-15")` parses as UTC midnight, which renders as the
 * 14th anywhere west of Greenwich - this avoids that off-by-one entirely.
 */
export function parseDateValue(value?: string | null) {
  if (!value) return undefined

  const [year, month, day] = value.slice(0, 10).split("-").map(Number)

  if (!year || !month || !day) return undefined

  const date = new Date(year, month - 1, day)

  return isValid(date) ? date : undefined
}

/** Serialises to `yyyy-MM-dd`, which the API accepts and stores as ISO. */
export function formatDateValue(date: Date) {
  return format(date, "yyyy-MM-dd")
}

type DatePickerProps = {
  value?: string | null
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  /** Earliest selectable day - used to keep an end date after its start date. */
  fromDate?: Date
  clearable?: boolean
  className?: string
  id?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  disabled,
  fromDate,
  clearable = true,
  className,
  id,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const selected = parseDateValue(value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        id={id}
        type="button"
        disabled={disabled}
        className={cn(
          "border-input flex h-11 w-full items-center justify-between rounded-lg border bg-transparent px-3 text-xs shadow-none transition-colors",
          "focus-visible:ring-1 focus-visible:ring-[#701a2e] focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !selected && "text-muted-foreground",
          className,
        )}
      >
        <span className="truncate">
          {selected ? format(selected, "d MMM yyyy") : placeholder}
        </span>

        <span className="ml-2 flex shrink-0 items-center gap-1">
          {selected && clearable && !disabled ? (
            <span
              role="button"
              tabIndex={-1}
              aria-label="Clear date"
              title="Clear date"
              onClick={(event) => {
                // Clear in place instead of opening the calendar.
                event.preventDefault()
                event.stopPropagation()
                onChange("")
              }}
              className="hover:text-foreground text-muted-foreground rounded p-0.5"
            >
              <RiCloseLine className="size-3.5" />
            </span>
          ) : null}
          <RiCalendarLine className="text-muted-foreground size-4" />
        </span>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected ?? fromDate}
          captionLayout="dropdown"
          startMonth={new Date(2000, 0)}
          endMonth={new Date(new Date().getFullYear() + 10, 11)}
          disabled={fromDate ? { before: fromDate } : undefined}
          onSelect={(date) => {
            if (date) onChange(formatDateValue(date))
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
