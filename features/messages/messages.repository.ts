import { request } from "@/lib/api/request"
import type {
  ContactMessage,
  ListQuery,
  MessageResponse,
  PaginatedResponse,
} from "@/lib/api/types"

const path = "/api/v1/messages"

/**
 * Read-only by design. Contact messages are authored by the public through the
 * website's contact form; POST /messages is that form's endpoint. The console
 * reads the inbox and can clear an entry out of it, but it never creates or
 * edits a message, so those methods are deliberately absent rather than
 * inherited from createResourceRepository.
 */
export const messagesRepository = {
  getAll: (query?: ListQuery) =>
    request.get<PaginatedResponse<ContactMessage>>(path, { params: query }),
  getById: (id: string) => request.get<ContactMessage>(`${path}/${id}`),
  remove: (id: string) => request.delete<MessageResponse>(`${path}/${id}`),
}
