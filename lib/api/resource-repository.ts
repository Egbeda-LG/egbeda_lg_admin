import { request } from "@/lib/api/request"
import type {
  ListQuery,
  MessageResponse,
  PaginatedResponse,
} from "@/lib/api/types"

export function createResourceRepository<TItem, TPayload, TStats = never>(
  path: string,
) {
  return {
    create: (payload: TPayload) => request.post<TItem>(path, payload),
    getAll: (query?: ListQuery) =>
      request.get<PaginatedResponse<TItem, TStats>>(path, { params: query }),
    getById: (id: string) => request.get<TItem>(`${path}/${id}`),
    update: (id: string, payload: Partial<TPayload>) =>
      request.patch<TItem>(`${path}/${id}`, payload),
    remove: (id: string) => request.delete<MessageResponse>(`${path}/${id}`),
  }
}
