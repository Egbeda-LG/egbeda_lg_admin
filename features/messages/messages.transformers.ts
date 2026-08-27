import type { MessageRow } from "@/features/messages/messages.utils"
import type { ContactMessagePayload } from "@/lib/api/types"

const REPLY_PREFIX = "Re:"

export function replySubject(subject: string) {
  return subject.startsWith(REPLY_PREFIX)
    ? subject
    : `${REPLY_PREFIX} ${subject}`.trim()
}

/**
 * The API has no dedicated reply route, so a reply is posted to the messages
 * collection against the original sender's details.
 */
export function toReplyPayload(
  message: MessageRow,
  reply: string,
): ContactMessagePayload {
  const [firstName = "", ...rest] = message.sender.split(" ")

  return {
    first_name: firstName,
    last_name: rest.join(" ") || firstName,
    email: message.email,
    phone: message.phone,
    subject: replySubject(message.subject),
    message: reply.trim(),
  }
}
