import {
  NULGE_OFFICE_OPTIONS,
  SEAT_STATUS_OPTIONS,
  optionLabel,
} from "@/lib/api/enums"
import type { NulgeItem } from "@/lib/api/types"

/** Flattened NULGE member shape the executive cards render. */
export type NulgeRow = {
  id: string
  name: string
  office: string
  officeLabel: string
  image: string
  status: string
  statusLabel: string
  isActive: boolean
}

const PLACEHOLDER_PHOTO = "/placeholder-user.jpg"

export function toNulgeRow(item: NulgeItem): NulgeRow {
  return {
    id: item._id,
    name: item.name,
    office: item.office,
    officeLabel: optionLabel(NULGE_OFFICE_OPTIONS, item.office),
    image: item.images[0]?.photo_url || PLACEHOLDER_PHOTO,
    status: item.status,
    statusLabel: optionLabel(SEAT_STATUS_OPTIONS, item.status),
    isActive: item.status?.toLowerCase() === "active",
  }
}

export function toNulgeRows(items: NulgeItem[] = []): NulgeRow[] {
  return items.map(toNulgeRow)
}
