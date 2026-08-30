import { ELECTION_TYPE_OPTIONS, optionLabel } from "@/lib/api/enums"
import type { PastGovernmentItem } from "@/lib/api/types"

/** Flattened shape the past government table renders. */
export type PastGovernmentRow = {
  id: string
  name: string
  date: string
  year: string
  electionType: string
  electionTypeLabel: string
}

export function toPastGovernmentRow(
  item: PastGovernmentItem,
): PastGovernmentRow {
  return {
    id: item._id,
    name: item.name?.trim() || "Unnamed administration",
    date: item.date?.trim() || "—",
    year: String(item.sort_order),
    electionType: item.election_type,
    electionTypeLabel: optionLabel(ELECTION_TYPE_OPTIONS, item.election_type),
  }
}

/** Newest administration first, using the explicit order from the API. */
export function toPastGovernmentRows(
  items: PastGovernmentItem[] = [],
): PastGovernmentRow[] {
  return items
    .filter((item) => typeof item.date === "string")
    .sort((a, b) => (b.sort_order ?? 0) - (a.sort_order ?? 0))
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
