"use client"

import { useQuery } from "@tanstack/react-query"

import { getDashboardOverview } from "@/features/dashboard/dashboard.service"

export const dashboardQueryKeys = {
  all: ["dashboard"] as const,
  overview: () => [...dashboardQueryKeys.all, "overview"] as const,
}

export function useDashboardOverview(enabled = true) {
  return useQuery({
    queryKey: dashboardQueryKeys.overview(),
    queryFn: getDashboardOverview,
    enabled,
  })
}
