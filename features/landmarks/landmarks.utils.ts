import {
  LANDMARK_CATEGORY_OPTIONS,
  PUBLISH_STATUS_OPTIONS,
  optionLabel,
  type SelectOption,
} from "@/lib/api/enums"
import type { LandmarkItem } from "@/lib/api/types"

/** Flattened landmark shape the landmark cards render. */
export type LandmarkRow = {
  id: string
  title: string
  category: string
  categoryLabel: string
  location: string
  status: string
  statusLabel: string
  isPublished: boolean
  photoUrl: string
  bgGradient: string
}

/** Fallback backdrop for landmarks that have no photo yet. */
const CARD_GRADIENTS = [
  "from-[#5c1424] to-amber-950",
  "from-rose-900 to-red-950",
  "from-cyan-950 to-slate-900",
]

export const LANDMARK_FILTER_OPTIONS: SelectOption[] = [
  { value: "all", label: "All" },
  ...LANDMARK_CATEGORY_OPTIONS,
]

export function toLandmarkRow(item: LandmarkItem, index: number): LandmarkRow {
  return {
    id: item._id,
    title: item.name,
    category: item.category,
    categoryLabel: optionLabel(LANDMARK_CATEGORY_OPTIONS, item.category),
    location: item.location,
    status: item.status,
    statusLabel: optionLabel(PUBLISH_STATUS_OPTIONS, item.status),
    isPublished: item.status?.toLowerCase() === "published",
    photoUrl: item.photo_url ?? "",
    bgGradient: CARD_GRADIENTS[index % CARD_GRADIENTS.length],
  }
}

export function toLandmarkRows(items: LandmarkItem[] = []): LandmarkRow[] {
  return items.map(toLandmarkRow)
}

export function filterLandmarks(
  rows: LandmarkRow[],
  { search, category }: { search: string; category: string },
) {
  const term = search.trim().toLowerCase()

  return rows.filter((row) => {
    const matchesSearch = !term || row.title.toLowerCase().includes(term)
    const matchesCategory = category === "all" || row.category === category

    return matchesSearch && matchesCategory
  })
}
