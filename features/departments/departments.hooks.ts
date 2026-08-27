"use client"

import { createResourceHooks } from "@/lib/query/create-resource-hooks"
import type {
  DepartmentItem,
  DepartmentPayload,
  PaginatedResponse,
} from "@/lib/api/types"
import { departmentsRepository } from "@/features/departments/departments.repository"

const hooks = createResourceHooks<
  DepartmentItem,
  DepartmentPayload,
  PaginatedResponse<DepartmentItem>
>("departments", departmentsRepository)

export const departmentKeys = hooks.keys
export const useDepartments = hooks.useList
export const useDepartment = hooks.useDetail
export const useCreateDepartment = () => hooks.useCreate("Department created")
export const useUpdateDepartment = () => hooks.useUpdate("Department updated")
export const useDeleteDepartment = () => hooks.useRemove("Department deleted")

/**
 * Department names for the selects that reference a department. The services
 * API stores the department as a plain name, so that is the option value.
 */
export function useDepartmentOptions() {
  const departments = useDepartments({ page: 1, limit: 100 })

  return {
    ...departments,
    options: (departments.data?.data ?? []).map((department) => ({
      value: department.name,
      label: department.name,
    })),
  }
}
