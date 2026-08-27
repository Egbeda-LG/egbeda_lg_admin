import { ACTIVE_STATUS_OPTIONS, optionLabel } from "@/lib/api/enums"
import type { DepartmentItem } from "@/lib/api/types"

/** Flattened department shape the department views render. */
export type DepartmentRow = {
  id: string
  name: string
  hod: string
  staffs: number
  dateAdded: string
  status: string
  isActive: boolean
}

export function toDepartmentRow(item: DepartmentItem): DepartmentRow {
  return {
    id: item._id,
    name: item.name,
    hod: item.head_of_department,
    staffs: item.staff_no,
    // The API does not return a creation date on departments yet.
    dateAdded: "—",
    status: optionLabel(ACTIVE_STATUS_OPTIONS, item.status),
    isActive: item.status?.toLowerCase() === "active",
  }
}

export function toDepartmentRows(
  items: DepartmentItem[] = [],
): DepartmentRow[] {
  return items.map(toDepartmentRow)
}

export function filterDepartments(rows: DepartmentRow[], search: string) {
  const term = search.trim().toLowerCase()
  if (!term) return rows

  return rows.filter(
    (row) =>
      row.name.toLowerCase().includes(term) ||
      row.hod.toLowerCase().includes(term),
  )
}
