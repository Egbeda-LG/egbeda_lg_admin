"use client"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import toast from "react-hot-toast"

import { pastGovernmentRepository } from "@/features/past-government/past-government.repository"
import type { ListQuery, PastGovernmentPayload } from "@/lib/api/types"

export const pastGovernmentKeys = {
  all: ["past-government"] as const,
  lists: () => ["past-government", "list"] as const,
  list: (query?: ListQuery) => ["past-government", "list", query] as const,
}

export function usePastGovernments(query?: ListQuery) {
  return useQuery({
    queryKey: pastGovernmentKeys.list(query),
    queryFn: () => pastGovernmentRepository.getAll(query),
    placeholderData: keepPreviousData,
  })
}

export function useCreatePastGovernment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: PastGovernmentPayload) =>
      pastGovernmentRepository.create(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: pastGovernmentKeys.all })
      toast.success("Past administration added")
    },
  })
}

export function useDeletePastGovernment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => pastGovernmentRepository.remove(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: pastGovernmentKeys.all })
      toast.success("Past administration removed")
    },
  })
}
