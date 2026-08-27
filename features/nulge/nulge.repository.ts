import { createResourceRepository } from "@/lib/api/resource-repository"
import type { NulgeItem, NulgePayload } from "@/lib/api/types"

export const nulgeRepository = createResourceRepository<
  NulgeItem,
  NulgePayload
>("/api/v1/nulge")
