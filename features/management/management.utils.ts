import {
  ACTIVE_STATUS_OPTIONS,
  MANAGEMENT_OFFICE_OPTIONS,
  optionLabel,
} from "@/lib/api/enums"
import type { ManagementItem } from "@/lib/api/types"

/** Flattened official shape the management cards render. */
export type ManagementRow = {
  id: string
  name: string
  office: string
  officeLabel: string
  description: string
  image: string
  status: string
  statusLabel: string
  isActive: boolean
}

const PLACEHOLDER_PHOTO = "/placeholder-user.jpg"

export function toManagementRow(item: ManagementItem): ManagementRow {
  return {
    id: item._id,
    name: item.name,
    office: item.office,
    officeLabel: optionLabel(MANAGEMENT_OFFICE_OPTIONS, item.office),
    description: item.description,
    image: item.photo_url || PLACEHOLDER_PHOTO,
    status: item.status,
    statusLabel: optionLabel(ACTIVE_STATUS_OPTIONS, item.status),
    isActive: item.status?.toLowerCase() === "active",
  }
}

export function toManagementRows(
  items: ManagementItem[] = [],
): ManagementRow[] {
  return items.map(toManagementRow)
}
