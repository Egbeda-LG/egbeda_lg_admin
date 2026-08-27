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
  fee: string
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

export function toServiceRow(item: ServiceItem): ServiceRow {
  return {
    id: item._id,
    title: item.name,
    description: item.short_description,
    // The API has no fee field on services yet.
    fee: "—",
    department: item.department,
    timeline: item.timeline,
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
