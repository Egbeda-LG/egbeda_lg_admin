import { format, formatDistanceToNow, isValid, parseISO } from "date-fns"

import type { NotificationItem, NotificationMeta } from "@/lib/api/types"

export const NOTIFICATION_TABS = ["All", "Unread", "Read"] as const

export type NotificationTab = (typeof NOTIFICATION_TABS)[number]

export const ALL_CATEGORIES = "All categories"

export type NotificationIconType =
  "message" | "article" | "project" | "feedback" | "profile" | "landmark"

export type NotificationRow = {
  id: string
  title: string
  subtitle: string
  time: string
  category: string
  read: boolean
  iconType: NotificationIconType
  actionUrl?: string
}

type EntityRoute = {
  category: string
  iconType: NotificationIconType
  href: (meta: NotificationMeta) => string
}

/** Deep-links to the record when the notification names one, else the list. */
const entityHref = (edit: string, list: string) => (meta: NotificationMeta) =>
  meta.entity_id ? `${edit}?id=${meta.entity_id}` : list

/**
 * Notification types read as "<entity>_<action>" ("project_updated"), the one
 * exception being "user_feedback". Routing on the entity rather than the whole
 * type means a new action the backend starts emitting still lands correctly.
 */
const ENTITIES: Record<string, EntityRoute> = {
  user_feedback: {
    category: "Feedback",
    iconType: "feedback",
    href: () => "/messages",
  },
  project: {
    category: "Projects",
    iconType: "project",
    href: entityHref("/projects/edit", "/projects"),
  },
  management: {
    category: "Management",
    iconType: "profile",
    href: entityHref("/management/edit", "/management"),
  },
  news: {
    category: "News",
    iconType: "article",
    href: entityHref("/newsroom/edit", "/newsroom"),
  },
  landmark: {
    category: "Landmarks",
    iconType: "landmark",
    href: entityHref("/landmarks/new", "/landmarks"),
  },
  service: {
    category: "Services",
    iconType: "article",
    href: entityHref("/services/edit", "/services"),
  },
  department: {
    category: "Departments",
    iconType: "profile",
    href: entityHref("/department/new", "/department"),
  },
  councillor: {
    category: "Councillors",
    iconType: "profile",
    href: entityHref("/executive/edit-councilor", "/executive"),
  },
  nulge: {
    category: "NULGE",
    iconType: "profile",
    href: entityHref("/nulge/edit", "/nulge"),
  },
}

function titleCase(value: string) {
  return value
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")
}

/**
 * An unrecognised type still gets a readable category and a working row - the
 * backend adds notification types without the console shipping alongside it.
 */
function routeFor(type: string): EntityRoute {
  const key = type in ENTITIES ? type : type.split("_")[0]
  const known = ENTITIES[key]

  if (known) return known

  return {
    category: titleCase(key || "other") || "Other",
    iconType: "message",
    href: () => "",
  }
}

/** Relative while it is recent, an absolute date once that stops helping. */
function displayTime(value?: string) {
  if (!value) return "—"

  const parsed = parseISO(value)
  if (!isValid(parsed)) return "—"

  const ageInDays = (Date.now() - parsed.getTime()) / 86_400_000

  return ageInDays > 7
    ? format(parsed, "d MMM yyyy, HH:mm")
    : formatDistanceToNow(parsed, { addSuffix: true })
}

export function toNotificationRow(item: NotificationItem): NotificationRow {
  const route = routeFor(item.type)
  const actionUrl = route.href(item.meta ?? {})

  return {
    id: item._id,
    title: item.title || titleCase(item.type),
    // The feed's own `message` is a summary line written for exactly this row.
    subtitle: item.message || "",
    time: displayTime(item.createdAt),
    category: route.category,
    read: item.is_read,
    iconType: route.iconType,
    actionUrl: actionUrl || undefined,
  }
}

export function toNotificationRows(
  items: NotificationItem[] = [],
): NotificationRow[] {
  return items.map(toNotificationRow)
}

/** Category chips are built from the feed, so none of them is ever empty. */
export function notificationCategories(rows: NotificationRow[]) {
  const counts = new Map<string, number>()

  for (const row of rows) {
    counts.set(row.category, (counts.get(row.category) ?? 0) + 1)
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([category, count]) => ({ category, count }))
}

export function filterNotifications(
  rows: NotificationRow[],
  {
    tab,
    category,
    search,
  }: { tab: NotificationTab; category: string; search: string },
) {
  const term = search.trim().toLowerCase()

  return rows.filter((row) => {
    if (tab === "Read" && !row.read) return false
    if (tab === "Unread" && row.read) return false
    if (category !== ALL_CATEGORIES && row.category !== category) return false
    if (!term) return true

    return (
      row.title.toLowerCase().includes(term) ||
      row.subtitle.toLowerCase().includes(term)
    )
  })
}

export function unreadCount(rows: NotificationRow[]) {
  return rows.reduce((total, row) => total + (row.read ? 0 : 1), 0)
}
