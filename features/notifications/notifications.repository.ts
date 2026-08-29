import { request } from "@/lib/api/request"
import type {
  ListQuery,
  MarkAllReadResponse,
  MessageResponse,
  NotificationItem,
  PaginatedResponse,
} from "@/lib/api/types"

const path = "/api/v1/notifications"

/**
 * Notifications are emitted by the backend, never authored here, so there is
 * no create or update - only reads and the read/dismiss actions.
 */
export const notificationsRepository = {
  getAll: (query?: ListQuery) =>
    request.get<PaginatedResponse<NotificationItem>>(path, { params: query }),
  getById: (id: string) => request.get<NotificationItem>(`${path}/${id}`),
  markRead: (id: string) =>
    request.patch<NotificationItem>(`${path}/${id}/read`),
  markAllRead: () => request.patch<MarkAllReadResponse>(`${path}/read-all`),
  remove: (id: string) => request.delete<MessageResponse>(`${path}/${id}`),
}
