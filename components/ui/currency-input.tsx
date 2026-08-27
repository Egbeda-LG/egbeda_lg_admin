"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/** Strips everything except digits and a single decimal point (max 2 places). */
export function sanitizeAmount(raw: string) {
  const digitsOnly = raw.replace(/[^\d.]/g, "")

  // Nothing but separators is not a number.
  if (!/\d/.test(digitsOnly)) return ""

  const [whole, ...rest] = digitsOnly.split(".")

  if (rest.length === 0) return whole

  return `${whole}.${rest.join("").slice(0, 2)}`
}

/** 1234567.5 -> "1,234,567.5" */
export function formatAmount(value: string) {
  if (!value) return ""

  const [whole, decimals] = value.split(".")
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return decimals === undefined ? grouped : `${grouped}.${decimals}`
}

type CurrencyInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "value" | "onChange" | "type"
> & {
  /** Raw numeric string, e.g. "15000.50". */
  value?: string
  onValueChange: (value: string) => void
  currencySymbol?: string
}

/**
 * Digits-only money field. Letters and symbols are rejected as they are typed,
 * the displayed value is grouped with thousand separators, and the value handed
 * back to the form stays a plain numeric string.
 */
export function CurrencyInput({
  value = "",
  onValueChange,
  currencySymbol = "₦",
  className,
  ...props
}: CurrencyInputProps) {
  return (
    <div className="relative">
      <span className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-xs font-medium">
        {currencySymbol}
      </span>
      <Input
        {...props}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={formatAmount(value)}
        onChange={(event) => onValueChange(sanitizeAmount(event.target.value))}
        onKeyDown={(event) => {
          // Block letters outright so nothing flickers into the field first.
          if (event.key.length === 1 && !/[\d.]/.test(event.key) && !event.metaKey && !event.ctrlKey) {
            event.preventDefault()
          }
        }}
        onPaste={(event) => {
          event.preventDefault()
          onValueChange(sanitizeAmount(event.clipboardData.getData("text")))
        }}
        className={cn("pl-7", className)}
      />
    </div>
  )
}
