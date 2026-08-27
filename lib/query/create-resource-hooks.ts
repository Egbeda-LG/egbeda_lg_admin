"use client"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import toast from "react-hot-toast"

import type { ListQuery, MessageResponse } from "@/lib/api/types"

type ResourceRepository<TItem, TPayload, TResponse> = {
  create: (payload: TPayload) => Promise<TItem>
  getAll: (query?: ListQuery) => Promise<TResponse>
  getById: (id: string) => Promise<TItem>
  update: (id: string, payload: Partial<TPayload>) => Promise<TItem>
  remove: (id: string) => Promise<MessageResponse>
}

export function createResourceHooks<TItem, TPayload, TResponse>(
  resource: string,
  repository: ResourceRepository<TItem, TPayload, TResponse>,
) {
  const keys = {
    all: [resource] as const,
    lists: () => [resource, "list"] as const,
    list: (query?: ListQuery) => [resource, "list", query] as const,
    details: () => [resource, "detail"] as const,
    detail: (id: string) => [resource, "detail", id] as const,
  }

  function useList(query?: ListQuery) {
    return useQuery({
      queryKey: keys.list(query),
      queryFn: () => repository.getAll(query),
      // Filters are applied server-side, so the query key changes whenever the
      // user switches a tab or types. Keeping the previous page's rows on screen
      // avoids collapsing the table back to a skeleton on every change.
      placeholderData: keepPreviousData,
    })
  }

  function useDetail(id?: string | null) {
    return useQuery({
      queryKey: keys.detail(id ?? ""),
      queryFn: () => repository.getById(id as string),
      enabled: Boolean(id),
    })
  }

  function useCreate(successMessage: string) {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: repository.create,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: keys.lists() })
        toast.success(successMessage)
      },
    })
  }

  function useUpdate(successMessage: string) {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: ({
        id,
        payload,
      }: {
        id: string
        payload: Partial<TPayload>
      }) => repository.update(id, payload),
      onSuccess: async (item, variables) => {
        queryClient.setQueryData(keys.detail(variables.id), item)
        await queryClient.invalidateQueries({ queryKey: keys.lists() })
        toast.success(successMessage)
      },
    })
  }

  function useRemove(successMessage: string) {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (id: string) => repository.remove(id),
      onSuccess: async (_response, id) => {
        queryClient.removeQueries({ queryKey: keys.detail(id) })
        await queryClient.invalidateQueries({ queryKey: keys.lists() })
        toast.success(successMessage)
      },
    })
  }

  return { keys, useList, useDetail, useCreate, useUpdate, useRemove }
}
