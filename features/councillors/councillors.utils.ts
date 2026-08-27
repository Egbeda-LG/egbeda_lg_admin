import { SEAT_STATUS_OPTIONS, optionLabel } from "@/lib/api/enums"
import type { CouncillorItem, WardItem } from "@/lib/api/types"

/** Flattened councillor shape the executive table renders. */
export type CouncillorRow = {
  id: string
  name: string
  ward: string
  area: string
  date: string
  status: string
  statusLabel: string
  isActive: boolean
}

export function toCouncillorRow(
  item: CouncillorItem,
  wardLabels: Record<string, string> = {},
): CouncillorRow {
  return {
    id: item._id,
    name: item.name,
    ward:
      wardLabels[item.ward_id] ??
      (item.ward_number ? `Ward ${item.ward_number}` : "—"),
    // The API stores neither an area nor an appointment date.
    area: "—",
    date: "—",
    status: item.status,
    statusLabel: optionLabel(SEAT_STATUS_OPTIONS, item.status),
    isActive: item.status?.toLowerCase() === "active",
  }
}

export function toCouncillorRows(
  items: CouncillorItem[] = [],
  wards: WardItem[] = [],
): CouncillorRow[] {
  const wardLabels = Object.fromEntries(
    wards.map((ward) => [
      ward.ward_id,
      `Ward ${ward.ward_number} - ${ward.name}`,
    ]),
  )

  return items.map((item) => toCouncillorRow(item, wardLabels))
}
