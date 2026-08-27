import { request } from "@/lib/api/request"
import type { WardItem } from "@/lib/api/types"

export const wardsRepository = {
  getAll: () => request.get<WardItem[]>("/api/v1/wards"),
  getById: (id: string) => request.get<WardItem>(`/api/v1/wards/${id}`),
}
