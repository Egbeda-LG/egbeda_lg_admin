import { createResourceRepository } from "@/lib/api/resource-repository"
import type { DepartmentItem, DepartmentPayload } from "@/lib/api/types"

export const departmentsRepository = createResourceRepository<
  DepartmentItem,
  DepartmentPayload
>("/api/v1/departments")
