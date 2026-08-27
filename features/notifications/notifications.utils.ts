/**
 * Notifications are not backed by an API endpoint yet, so the page keeps its
 * own list in local state and these helpers describe its shape.
 */
export const NOTIFICATION_TABS = [
  "All",
  "Read",
  "Unread",
  "Security",
  "Project",
  "News",
] as const

export type NotificationTab = (typeof NOTIFICATION_TABS)[number]

export type NotificationCategory = "Security" | "Project" | "News" | "Messages"

export type NotificationIconType =
  "message" | "article" | "project" | "feedback" | "profile" | "landmark"

export type NotificationRow = {
  id: string
  title: string
  subtitle: string
  time: string
  category: NotificationCategory
  read: boolean
  iconType: NotificationIconType
  actionUrl?: string
}

export function filterNotifications(
  rows: NotificationRow[],
  { tab, search }: { tab: NotificationTab; search: string },
) {
  if (tab === "Read") return rows.filter((row) => row.read)
  if (tab === "Unread") return rows.filter((row) => !row.read)
  if (tab !== "All") return rows.filter((row) => row.category === tab)

  const term = search.trim().toLowerCase()
  if (!term) return rows

  return rows.filter(
    (row) =>
      row.title.toLowerCase().includes(term) ||
      row.subtitle.toLowerCase().includes(term),
  )
}

export function markAllRead(rows: NotificationRow[]): NotificationRow[] {
  return rows.map((row) => ({ ...row, read: true }))
}

export function markRead(
  rows: NotificationRow[],
  id: string,
): NotificationRow[] {
  return rows.map((row) => (row.id === id ? { ...row, read: true } : row))
}

export function removeNotification(
  rows: NotificationRow[],
  id: string,
): NotificationRow[] {
  return rows.filter((row) => row.id !== id)
}
