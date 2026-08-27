import { format, isValid, parseISO } from "date-fns"

import { PUBLISH_STATUS_OPTIONS, optionLabel } from "@/lib/api/enums"
import type {
  PaginatedResponse,
  ProjectItem,
  ProjectStats,
  WardItem,
} from "@/lib/api/types"

/** Flattened project shape the project cards render. */
export type ProjectRow = {
  id: string
  title: string
  wardId: string
  ward: string
  started: string
  delivered: string
  contractor: string
  status: string
  statusLabel: string
  isPublished: boolean
  photoUrl: string
}

export type ProjectStat = {
  label: string
  value: number
}

/** The API returns full ISO timestamps; cards and tables want a short date. */
function formatDisplayDate(value?: string) {
  if (!value) return "—"

  const parsed = parseISO(value)

  return isValid(parsed) ? format(parsed, "d MMM yyyy") : value
}

export const wardLabel = (ward: WardItem) =>
  `Ward ${ward.ward_number} - ${ward.name}`

/** ward_id -> display label, used to name the ward on each project card. */
export function toWardLabels(wards: WardItem[] = []): Record<string, string> {
  return Object.fromEntries(
    wards.map((ward) => [ward.ward_id, wardLabel(ward)]),
  )
}

export function toProjectRow(
  item: ProjectItem,
  index: number,
  wardLabels: Record<string, string> = {},
): ProjectRow {
  return {
    id: item._id,
    title: item.name,
    wardId: item.ward_id,
    ward: wardLabels[item.ward_id] ?? "—",
    started: formatDisplayDate(item.start_date),
    delivered: formatDisplayDate(item.end_date),
    contractor: item.contractor,
    status: item.status,
    statusLabel: optionLabel(PUBLISH_STATUS_OPTIONS, item.status),
    photoUrl: item.photo_url ?? "",
    isPublished: item.status?.toLowerCase() === "published",
  }
}

export function toProjectRows(
  items: ProjectItem[] = [],
  wardLabels: Record<string, string> = {},
): ProjectRow[] {
  return items.map((item, index) => toProjectRow(item, index, wardLabels))
}

export function filterProjects(
  rows: ProjectRow[],
  { search, wardId }: { search: string; wardId: string },
) {
  const term = search.trim().toLowerCase()

  return rows.filter((row) => {
    const matchesSearch = !term || row.title.toLowerCase().includes(term)
    const matchesWard = wardId === "all" || row.wardId === wardId

    return matchesSearch && matchesWard
  })
}

export function toProjectStats(
  response?: PaginatedResponse<ProjectItem, ProjectStats>,
): ProjectStat[] {
  return [
    { label: "TOTAL PROJECTS", value: response?.meta.total ?? 0 },
    { label: "TOTAL WARDS", value: response?.stats?.total_wards ?? 0 },
    { label: "WARDS COVERED", value: response?.stats?.wards_covered ?? 0 },
  ]
}
