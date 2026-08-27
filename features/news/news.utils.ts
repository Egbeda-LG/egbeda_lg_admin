import {
  NEWS_CATEGORY_OPTIONS,
  PUBLISH_STATUS_OPTIONS,
  optionLabel,
  type SelectOption,
} from "@/lib/api/enums"
import type { NewsItem, NewsStats, PaginatedResponse } from "@/lib/api/types"

/** Flattened article shape the newsroom table renders. */
export type NewsRow = {
  id: string
  title: string
  link: string
  status: string
  statusLabel: string
  isPublished: boolean
  category: string
  categoryLabel: string
  date: string
}

export type NewsStat = {
  label: string
  value: number
}

export const NEWS_FILTER_OPTIONS: SelectOption[] = [
  { value: "all", label: "All" },
  ...PUBLISH_STATUS_OPTIONS,
]

/** Toolbar handed to the Quill editor. Defined once so it stays referentially stable. */
export const NEWS_EDITOR_MODULES = {
  toolbar: [
    [{ header: [2, false] }],
    ["bold", "italic", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
  ],
}

/** Public website slug previewed while composing. */
export function toArticleSlug(title?: string, fallback = "untitled") {
  const slug = title
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  return slug || fallback
}

export function toNewsRow(item: NewsItem): NewsRow {
  return {
    id: item._id,
    title: item.title,
    link: `/newsroom/view?id=${item._id}`,
    status: item.status,
    statusLabel: optionLabel(PUBLISH_STATUS_OPTIONS, item.status),
    isPublished: item.status?.toLowerCase() === "published",
    category: item.category,
    categoryLabel: optionLabel(NEWS_CATEGORY_OPTIONS, item.category),
    date: item.createdAt?.slice(0, 10) ?? "—",
  }
}

export function toNewsRows(items: NewsItem[] = []): NewsRow[] {
  return items.map(toNewsRow)
}

export function filterNews(
  rows: NewsRow[],
  { search, status }: { search: string; status: string },
) {
  const term = search.trim().toLowerCase()

  return rows.filter((row) => {
    const matchesSearch = !term || row.title.toLowerCase().includes(term)
    const matchesStatus = status === "all" || row.status === status

    return matchesSearch && matchesStatus
  })
}

export function toNewsStats(
  response?: PaginatedResponse<NewsItem, NewsStats>,
): NewsStat[] {
  return [
    { label: "TOTAL NEWS", value: response?.meta.total ?? 0 },
    { label: "PUBLISHED NEWS", value: response?.stats?.published ?? 0 },
    {
      label: "COMPLETED PROJECTS",
      value: response?.stats?.completed_projects ?? 0,
    },
    {
      label: "LANDMARKS & CULTURE",
      value: response?.stats?.landmarks_and_culture ?? 0,
    },
  ]
}
