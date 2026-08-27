"use client"

import { createResourceHooks } from "@/lib/query/create-resource-hooks"
import type {
  CouncillorItem,
  CouncillorPayload,
  PaginatedResponse,
} from "@/lib/api/types"
import { councillorsRepository } from "@/features/councillors/councillors.repository"

const hooks = createResourceHooks<
  CouncillorItem,
  CouncillorPayload,
  PaginatedResponse<CouncillorItem>
>("councillors", councillorsRepository)

export const councillorKeys = hooks.keys
export const useCouncillors = hooks.useList
export const useCouncillor = hooks.useDetail
export const useCreateCouncillor = () => hooks.useCreate("Councillor created")
export const useUpdateCouncillor = () => hooks.useUpdate("Councillor updated")
export const useDeleteCouncillor = () => hooks.useRemove("Councillor deleted")
