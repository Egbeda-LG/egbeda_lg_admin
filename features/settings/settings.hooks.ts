"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { settingsRepository } from "@/features/settings/settings.repository"

export const settingsKeys = { detail: ["organization-settings"] as const }

export function useOrganizationSettings() {
  return useQuery({
    queryKey: settingsKeys.detail,
    queryFn: settingsRepository.get,
  })
}

export function useUpdateOrganizationSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: settingsRepository.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: settingsKeys.detail })
      toast.success("Organization settings updated")
    },
  })
}
