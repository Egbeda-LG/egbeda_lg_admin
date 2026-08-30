import type { ListQuery } from "@/lib/api/types"

/**
 * Builds a list query, omitting empty values and the "all" sentinel the filter
 * pills use - sending `status=all` would be treated as a real (unmatched) value
 * by the API.
 */
export function listQuery(query: ListQuery): ListQuery {
  const cleaned: ListQuery = {}

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue
    if (typeof value === "string" && (value.trim() === "" || value === "all"))
      continue

    cleaned[key as keyof ListQuery] = value as never
  }

  return cleaned
}
