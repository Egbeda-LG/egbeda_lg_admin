import { format, isValid } from "date-fns"

import { ELECTION_TYPE_OPTIONS, optionLabel } from "@/lib/api/enums"
import type { PastGovernmentDate, PastGovernmentItem } from "@/lib/api/types"

/** Flattened shape the past government table renders. */
export type PastGovernmentRow = {
  id: string
  name: string
  date: string
  year: string
  electionType: string
  electionTypeLabel: string
}

/**
 * {year: 2020, month: 5, day: 29} -> "29 May 2020". The parts are stored
 * separately and a record can carry none, so this never assumes a valid date.
 */
export function formatGovernmentDate(date?: PastGovernmentDate) {
  if (!date) return "—"

  const { year, month, day } = date
  if (![year, month, day].every((part) => Number.isFinite(part))) return "—"

  const parsed = new Date(year, month - 1, day)

  return isValid(parsed) ? format(parsed, "d MMM yyyy") : "—"
}

export function toPastGovernmentRow(
  item: PastGovernmentItem,
): PastGovernmentRow {
  return {
    id: item._id,
    name: item.name?.trim() || "Unnamed administration",
    date: formatGovernmentDate(item.date),
    year: Number.isFinite(item.date?.year) ? String(item.date?.year) : "—",
    electionType: item.election_type,
    electionTypeLabel: optionLabel(ELECTION_TYPE_OPTIONS, item.election_type),
  }
}

/** Newest administration first, so the list reads as a reverse timeline. */
export function toPastGovernmentRows(
  items: PastGovernmentItem[] = [],
): PastGovernmentRow[] {
  return [...items]
    .sort((a, b) => (b.date?.year ?? 0) - (a.date?.year ?? 0))
    .map(toPastGovernmentRow)
}

export function filterPastGovernments(
  rows: PastGovernmentRow[],
  { search, electionType }: { search: string; electionType: string },
) {
  const term = search.trim().toLowerCase()

  return rows.filter((row) => {
    if (electionType !== "all" && row.electionType !== electionType)
      return false
    if (!term) return true

    return (
      row.name.toLowerCase().includes(term) ||
      row.date.toLowerCase().includes(term)
    )
  })
}
