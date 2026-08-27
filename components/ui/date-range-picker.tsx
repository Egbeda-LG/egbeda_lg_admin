"use client"

import * as React from "react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { RiCalendarLine, RiCloseLine } from "@remixicon/react"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { formatDateValue, parseDateValue } from "@/components/ui/date-picker"
import { cn } from "@/lib/utils"

/**
 * `timeline` is a free-text string on the API, so a range has to be serialised
 * into it. `yyyy-MM-dd to yyyy-MM-dd` is unambiguous, sorts correctly and is
 * trivial to parse back, while still reading sensibly if rendered raw.
 */
const RANGE_PATTERN = /^\s*(\d{4}-\d{2}-\d{2})\s+to\s+(\d{4}-\d{2}-\d{2})\s*$/

export function parseDateRangeValue(value?: string | null): DateRange | undefined {
  if (!value) return undefined

  const match = value.match(RANGE_PATTERN)
  if (!match) return undefined

  const from = parseDateValue(match[1])
  const to = parseDateValue(match[2])
  if (!from) return undefined

  return { from, to }
}

export function formatDateRangeValue(range?: DateRange) {
  if (!range?.from) return ""
  if (!range.to) return formatDateValue(range.from)

  return `${formatDateValue(range.from)} to ${formatDateValue(range.to)}`
}

/**
 * True when the value is a complete range whose end is not before its start.
 * Used by form schemas to validate the timeline field.
 */
export function isValidDateRange(value?: string | null) {
  const range = parseDateRangeValue(value)
  if (!range?.from || !range.to) return false

  return range.to.getTime() >= range.from.getTime()
}

/** True when a stored value exists but is not a range we can represent. */
export function isUnparsableRange(value?: string | null) {
  return Boolean(value?.trim()) && !RANGE_PATTERN.test(value ?? "")
}

type DateRangePickerProps = {
  value?: string | null
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Select date range",
  disabled,
  className,
  id,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)

  // react-day-picker reports `{from, to: from}` on the FIRST click of a range,
  // so "to is set" is not a reliable signal that the user is finished. Track the
  // clicks within one open session instead, restarting whenever a new `from` is
  // chosen (which happens when the user clicks before the current start).
  const clickCount = React.useRef(0)
  const activeFrom = React.useRef<number | null>(null)

  const selected = parseDateRangeValue(value)
  const legacyText = isUnparsableRange(value) ? value : null

  const label = selected?.from
    ? selected.to
      ? `${format(selected.from, "d MMM yyyy")} - ${format(selected.to, "d MMM yyyy")}`
      : `${format(selected.from, "d MMM yyyy")} - ...`
    : legacyText

  return (
    <div className={cn("space-y-1", className)}>
      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next)

          if (next) {
            clickCount.current = 0
            activeFrom.current = parseDateRangeValue(value)?.from?.getTime() ?? null
          }
        }}
      >
        <PopoverTrigger
          id={id}
          type="button"
          disabled={disabled}
          className={cn(
            "border-input flex h-11 w-full items-center justify-between rounded-lg border bg-transparent px-3 text-xs shadow-none transition-colors",
            "focus-visible:ring-1 focus-visible:ring-[#701a2e] focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            !label && "text-muted-foreground",
          )}
        >
          <span className="truncate">{label ?? placeholder}</span>

          <span className="ml-2 flex shrink-0 items-center gap-1">
            {value && !disabled ? (
              <span
                role="button"
                tabIndex={-1}
                aria-label="Clear date range"
                title="Clear date range"
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  onChange("")
                }}
                className="text-muted-foreground hover:text-foreground rounded p-0.5"
              >
                <RiCloseLine className="size-3.5" />
              </span>
            ) : null}
            <RiCalendarLine className="text-muted-foreground size-4" />
          </span>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={selected}
            defaultMonth={selected?.from}
            numberOfMonths={2}
            captionLayout="dropdown"
            startMonth={new Date(2000, 0)}
            endMonth={new Date(new Date().getFullYear() + 10, 11)}
            onSelect={(range) => {
              onChange(formatDateRangeValue(range))

              const from = range?.from?.getTime() ?? null

              if (from !== activeFrom.current) {
                // A new range just started - wait for the end date.
                activeFrom.current = from
                clickCount.current = 1
                return
              }

              clickCount.current += 1

              if (clickCount.current >= 2 && range?.to) setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>

      {legacyText ? (
        <p className="text-muted-foreground text-[10px]">
          Existing value is not a date range. Picking dates will replace it.
        </p>
      ) : null}
    </div>
  )
}
