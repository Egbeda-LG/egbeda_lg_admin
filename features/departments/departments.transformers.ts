import type { DepartmentFormValues } from "@/features/departments/departments.form"
import type { DepartmentItem, DepartmentPayload } from "@/lib/api/types"

export function toDepartmentPayload(
  values: DepartmentFormValues,
): DepartmentPayload {
  return {
    name: values.name,
    head_of_department: values.hod,
    staff_no: Number(values.staffStrength) || 0,
    status: values.status,
    description: values.description ?? "",
  }
}

export function fromDepartment(item: DepartmentItem): DepartmentFormValues {
  return {
    name: item.name,
    hod: item.head_of_department,
    staffStrength: String(item.staff_no),
    status: item.status,
    description: item.description,
  }
}
