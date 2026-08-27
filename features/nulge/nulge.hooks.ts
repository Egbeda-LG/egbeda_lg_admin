"use client"

import { createResourceHooks } from "@/lib/query/create-resource-hooks"
import type {
  NulgeItem,
  NulgePayload,
  PaginatedResponse,
} from "@/lib/api/types"
import { nulgeRepository } from "@/features/nulge/nulge.repository"

const hooks = createResourceHooks<
  NulgeItem,
  NulgePayload,
  PaginatedResponse<NulgeItem>
>("nulge", nulgeRepository)

export const nulgeKeys = hooks.keys
export const useNulgeList = hooks.useList
export const useNulgeMember = hooks.useDetail
export const useCreateNulgeMember = () =>
  hooks.useCreate("NULGE member created")
export const useUpdateNulgeMember = () =>
  hooks.useUpdate("NULGE member updated")
export const useDeleteNulgeMember = () =>
  hooks.useRemove("NULGE member deleted")
