import { createResourceRepository } from "@/lib/api/resource-repository"
import type { ManagementItem, ManagementPayload } from "@/lib/api/types"

export const managementRepository = createResourceRepository<
  ManagementItem,
  ManagementPayload
>("/api/v1/management")
