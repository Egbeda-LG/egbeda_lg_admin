import { createResourceRepository } from "@/lib/api/resource-repository"
import type { ServiceItem, ServicePayload } from "@/lib/api/types"

export const servicesRepository = createResourceRepository<
  ServiceItem,
  ServicePayload
>("/api/v1/services")
