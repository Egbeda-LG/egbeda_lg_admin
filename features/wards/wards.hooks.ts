"use client"

import { useQuery } from "@tanstack/react-query"

import { wardsRepository } from "@/features/wards/wards.repository"

export const wardKeys = {
  all: ["wards"] as const,
  detail: (id: string) => ["wards", "detail", id] as const,
}

/**
 * The eleven Egbeda wards. `ward_id` is a MongoDB id and is the only value the
 * API accepts when creating projects and councillors - never the ward name.
 */
export function useWards() {
  return useQuery({
    queryKey: wardKeys.all,
    queryFn: wardsRepository.getAll,
    staleTime: 60 * 60 * 1000,
  })
}

/** GET /wards/:id - a single ward, when only its id is known. */
export function useWard(wardId?: string | null) {
  return useQuery({
    queryKey: wardKeys.detail(wardId ?? ""),
    queryFn: () => wardsRepository.getById(wardId as string),
    enabled: Boolean(wardId),
    staleTime: 60 * 60 * 1000,
  })
}

export function useWardOptions() {
  const wards = useWards()

  return {
    ...wards,
    options: (wards.data ?? []).map((ward) => ({
      value: ward.ward_id,
      label: `Ward ${ward.ward_number} - ${ward.name}`,
    })),
  }
}
