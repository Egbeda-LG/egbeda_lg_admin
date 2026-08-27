import { createResourceRepository } from "@/lib/api/resource-repository"
import type { CouncillorItem, CouncillorPayload } from "@/lib/api/types"

export const councillorsRepository = createResourceRepository<
  CouncillorItem,
  CouncillorPayload
>("/api/v1/councillors")
