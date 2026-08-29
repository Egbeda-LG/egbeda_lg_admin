import { format, isValid, parseISO } from "date-fns"

import type { ContactMessage } from "@/lib/api/types"

export const MESSAGE_TABS = ["Inbox", "Unread"] as const

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
  // The submission lives under `meta`; the envelope's own `message` is just a
  // summary line ("<name> sent feedback: <subject>").
  const meta = item.meta ?? {}
  const firstName = text(meta.first_name)
  const lastName = text(meta.last_name)
  const sender = `${firstName} ${lastName}`.trim()
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase()
  const submitted = item.createdAt ? parseISO(item.createdAt) : null
  const submittedAt = submitted && isValid(submitted) ? submitted : null

  return {
    id: item._id,
    // The form does not require a name, so a submission can genuinely have
    // none. Fall back rather than rendering a blank row.
    sender: sender || "Unknown sender",
    initials: initials || "?",
    email: text(meta.email) || "—",
    phone: text(meta.phone_number) || "—",
    date: submittedAt ? format(submittedAt, "d MMM yyyy") : "—",
    time: submittedAt ? format(submittedAt, "HH:mm") : "—",
    subject: text(meta.subject) || "(no subject)",
    body: text(meta.message) || "(no message)",
    channel: "Web",
    unread: !item.is_read,
  }
}

export function toMessageRows(items: ContactMessage[] = []): MessageRow[] {
  return items.map(toMessageRow)
}

/**
 * Only the tab is applied here - text search is handled server-side by
 * GET /messages?search=.
 */
export function filterMessages(
  rows: MessageRow[],
  { tab }: { tab: MessageTab },
) {
  if (tab === "Unread") return rows.filter((row) => row.unread)

  return rows
}

export function selectMessage(rows: MessageRow[], selectedId: string) {
  return rows.find((row) => row.id === selectedId) ?? rows[0] ?? EMPTY_MESSAGE
}
