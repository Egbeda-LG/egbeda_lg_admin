import { format } from "date-fns"

import { formatAmount } from "@/components/ui/currency-input"
import { parseDateRangeValue } from "@/components/ui/date-range-picker"
import {
  PUBLISH_STATUS_OPTIONS,
  optionLabel,
  type SelectOption,
} from "@/lib/api/enums"
import type { ServiceItem } from "@/lib/api/types"

/** Flattened service shape the services table renders. */
export type ServiceRow = {
  id: string
  title: string
  description: string
  price: string
  department: string
  timeline: string
  status: string
  statusLabel: string
  isPublished: boolean
}

export const SERVICE_FILTER_OPTIONS: SelectOption[] = [
  { value: "all", label: "All" },
  ...PUBLISH_STATUS_OPTIONS,
]

/**
 * The stored price as the plain numeric string the form edits. Anything the
 * API cannot express as a number (absent, null, "") becomes an empty string,
 * which the amount field treats as "not set yet".
 */
export function priceToAmount(price?: string | number | null) {
  if (price === null || price === undefined) return ""

  const value = String(price).trim()

  return value && Number.isFinite(Number(value)) ? value : ""
}

/** "500" -> "₦500.00"; an unset price reads as a dash rather than "₦0". */
export function formatServicePrice(price?: string | number | null) {
  const amount = priceToAmount(price)
  if (!amount) return "\u2014"

  return `\u20a6${formatAmount(Number(amount).toFixed(2))}`
}

/**
 * `timeline` is free text on the API - a duration like "5 working days" - and
 * is shown as stored. Records created while the form used a date-range picker
 * hold "2026-08-05 to 2026-09-07"; those still read as "5 Aug - 7 Sep 2026",
 * dropping the repeated year when both ends share one.
 */
export function formatTimeline(value?: string | null) {
  const raw = value?.trim() ?? ""
  if (!raw) return "\u2014"

  const range = parseDateRangeValue(raw)
  if (!range?.from || !range.to) return raw

  const sameYear = range.from.getFullYear() === range.to.getFullYear()

  return `${format(range.from, sameYear ? "d MMM" : "d MMM yyyy")} \u2013 ${format(range.to, "d MMM yyyy")}`
}

export function toServiceRow(item: ServiceItem): ServiceRow {
  return {
    id: item._id,
    title: item.name,
    description: item.short_description,
    price: formatServicePrice(item.price),
    department: item.department,
    timeline: formatTimeline(item.timeline),
    status: item.status,
    statusLabel: optionLabel(PUBLISH_STATUS_OPTIONS, item.status),
    isPublished: item.status?.toLowerCase() === "published",
  }
}

export function toServiceRows(items: ServiceItem[] = []): ServiceRow[] {
  return items.map(toServiceRow)
}

export function filterServices(
  rows: ServiceRow[],
  { search, status }: { search: string; status: string },
) {
  const term = search.trim().toLowerCase()

  return rows.filter((row) => {
    const matchesSearch =
      !term ||
      row.title.toLowerCase().includes(term) ||
      row.description.toLowerCase().includes(term)
    const matchesStatus = status === "all" || row.status === status

    return matchesSearch && matchesStatus
  })
}
