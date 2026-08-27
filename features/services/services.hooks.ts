"use client"

import { createResourceHooks } from "@/lib/query/create-resource-hooks"
import type {
  PaginatedResponse,
  ServiceItem,
  ServicePayload,
} from "@/lib/api/types"
import { servicesRepository } from "@/features/services/services.repository"

const hooks = createResourceHooks<
  ServiceItem,
  ServicePayload,
  PaginatedResponse<ServiceItem>
>("services", servicesRepository)

export const serviceKeys = hooks.keys
export const useServices = hooks.useList
export const useService = hooks.useDetail
export const useCreateService = () => hooks.useCreate("Service created")
export const useUpdateService = () => hooks.useUpdate("Service updated")
export const useDeleteService = () => hooks.useRemove("Service deleted")
