"use client"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import toast from "react-hot-toast"

import { notificationsRepository } from "@/features/notifications/notifications.repository"
import type { ListQuery } from "@/lib/api/types"

export const notificationKeys = {
  all: ["notifications"] as const,
  lists: () => ["notifications", "list"] as const,
  list: (query?: ListQuery) => ["notifications", "list", query] as const,
  detail: (id: string) => ["notifications", "detail", id] as const,
}

export function useNotifications(query?: ListQuery) {
  return useQuery({
    queryKey: notificationKeys.list(query),
    queryFn: () => notificationsRepository.getAll(query),
    // Paging and tab switches change the key; keep the current rows on screen
    // rather than collapsing the list back to an empty state.
    placeholderData: keepPreviousData,
  })
}

/**
 * Opening a notification marks it read, so this stays quiet on success - a
 * toast for something the admin did not explicitly ask for is just noise.
 */
export function useMarkNotificationRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => notificationsRepository.markRead(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: notificationKeys.all })
    },
  })
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => notificationsRepository.markAllRead(),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: notificationKeys.all })
      toast.success(
        response.modified_count > 0
          ? `${response.modified_count} notification${response.modified_count === 1 ? "" : "s"} marked as read`
          : "No unread notifications",
      )
    },
  })
}

export function useDeleteNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => notificationsRepository.remove(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: notificationKeys.all })
      toast.success("Notification deleted")
    },
  })
}
