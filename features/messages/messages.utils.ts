import type { ContactMessage } from "@/lib/api/types"

export const MESSAGE_TABS = ["Inbox", "Unread", "Archived"] as const

export type MessageTab = (typeof MESSAGE_TABS)[number]

/** Flattened message shape the inbox and conversation panes render. */
export type MessageRow = {
  id: string
  sender: string
  initials: string
  email: string
  phone: string
  time: string
  date: string
  subject: string
  body: string
  channel: string
  unread: boolean
  attachment?: { name: string; size: string }
}

export const EMPTY_MESSAGE: MessageRow = {
  id: "",
  sender: "",
  initials: "",
  email: "",
  phone: "",
  time: "",
  date: "",
  subject: "",
  body: "",
  channel: "Web",
  unread: false,
}

/** Anything the API left off the record reads as an empty string. */
function text(value?: string | null) {
  return typeof value === "string" ? value.trim() : ""
}

export function toMessageRow(item: ContactMessage): MessageRow {
  const firstName = text(item.first_name)
  const lastName = text(item.last_name)
  const sender = `${firstName} ${lastName}`.trim()
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase()

  return {
    id: item._id,
    // Senders come from a public form, so a record can arrive with no name at
    // all. Fall back rather than rendering "undefined undefined" or a blank
    // avatar.
    sender: sender || "Unknown sender",
    initials: initials || "?",
    email: text(item.email) || "—",
    phone: text(item.phone) || "—",
    // The API returns no timestamps or read state on messages.
    time: "—",
    date: "—",
    subject: text(item.subject) || "(no subject)",
    body: text(item.message),
    channel: "Web",
    unread: false,
  }
}

export function toMessageRows(items: ContactMessage[] = []): MessageRow[] {
  return items.map(toMessageRow)
}

/**
 * Only the tabs are applied here - text search is handled server-side by
 * GET /messages?search=. Unread / Archived have no backing fields on the API,
 * so they filter against values that are always false.
 */
export function filterMessages(
  rows: MessageRow[],
  { tab }: { tab: MessageTab },
) {
  if (tab === "Unread") return rows.filter((row) => row.unread)
  if (tab === "Archived") return []

  return rows
}

export function selectMessage(rows: MessageRow[], selectedId: string) {
  return rows.find((row) => row.id === selectedId) ?? rows[0] ?? EMPTY_MESSAGE
}
