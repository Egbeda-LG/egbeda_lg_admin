import { request } from "@/lib/api/request"
import type {
  ListQuery,
  MessageResponse,
  PaginatedResponse,
  PastGovernmentItem,
  PastGovernmentPayload,
} from "@/lib/api/types"

const path = "/api/v1/past-government"

/**
 * The API offers no update or detail route for past administrations - a record
 * is added or removed, never edited - so this is not a full CRUD repository.
 */
export const pastGovernmentRepository = {
  getAll: (query?: ListQuery) =>
    request.get<PaginatedResponse<PastGovernmentItem>>(path, { params: query }),
  create: (payload: PastGovernmentPayload) =>
    request.post<PastGovernmentItem>(path, payload),
  remove: (id: string) => request.delete<MessageResponse>(`${path}/${id}`),
}
