"use client"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import toast from "react-hot-toast"

import { messagesRepository } from "@/features/messages/messages.repository"
import type { ListQuery } from "@/lib/api/types"

// Hand-rolled rather than createResourceHooks: that factory requires a full
// CRUD repository, and the inbox has no create or update to expose.
export const messageKeys = {
  all: ["messages"] as const,
  lists: () => ["messages", "list"] as const,
  list: (query?: ListQuery) => ["messages", "list", query] as const,
  details: () => ["messages", "detail"] as const,
  detail: (id: string) => ["messages", "detail", id] as const,
}

export function useMessages(query?: ListQuery) {
  return useQuery({
    queryKey: messageKeys.list(query),
    queryFn: () => messagesRepository.getAll(query),
    placeholderData: keepPreviousData,
  })
}

export function useMessage(id?: string | null) {
  return useQuery({
    queryKey: messageKeys.detail(id ?? ""),
    queryFn: () => messagesRepository.getById(id as string),
    enabled: Boolean(id),
  })
}

export function useDeleteMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => messagesRepository.remove(id),
    onSuccess: async (_response, id) => {
      queryClient.removeQueries({ queryKey: messageKeys.detail(id) })
      await queryClient.invalidateQueries({ queryKey: messageKeys.lists() })
      toast.success("Message deleted")
    },
  })
}
