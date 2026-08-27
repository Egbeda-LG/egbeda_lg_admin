import { createResourceRepository } from "@/lib/api/resource-repository"
import type { LandmarkItem, LandmarkPayload } from "@/lib/api/types"

export const landmarksRepository = createResourceRepository<
  LandmarkItem,
  LandmarkPayload
>("/api/v1/landmarks")
