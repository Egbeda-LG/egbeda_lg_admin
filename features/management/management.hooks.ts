"use client"

import { createResourceHooks } from "@/lib/query/create-resource-hooks"
import type {
  ManagementItem,
  ManagementPayload,
  PaginatedResponse,
} from "@/lib/api/types"
import { managementRepository } from "@/features/management/management.repository"

const hooks = createResourceHooks<
  ManagementItem,
  ManagementPayload,
  PaginatedResponse<ManagementItem>
>("management", managementRepository)

export const managementKeys = hooks.keys
export const useManagement = hooks.useList
export const useManagementOfficial = hooks.useDetail
export const useCreateManagementOfficial = () =>
  hooks.useCreate("Management official created")
export const useUpdateManagementOfficial = () =>
  hooks.useUpdate("Management official updated")
export const useDeleteManagementOfficial = () =>
  hooks.useRemove("Management official deleted")
