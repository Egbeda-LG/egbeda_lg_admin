import * as z from "zod"

import { NEWS_CATEGORY_OPTIONS, PUBLISH_STATUS_OPTIONS } from "@/lib/api/enums"
import type { NewsItem, NewsPayload } from "@/lib/api/types"

const statusValues = PUBLISH_STATUS_OPTIONS.map((option) => option.value)
const categoryValues = NEWS_CATEGORY_OPTIONS.map((option) => option.value)

export const newsFormSchema = z.object({
  title: z.string().min(2, "Article title is required"),
  content: z.string().min(10, "Article content is required"),
  date: z.string().min(1, "Article date is required"),
  status: z
    .string()
    .refine((value) => statusValues.includes(value), "Select a valid status"),
  featured: z.enum(["Yes", "No"]),
  category: z
    .string()
    .refine(
      (value) => categoryValues.includes(value),
      "Select a valid category",
    ),
})

export type NewsFormValues = z.infer<typeof newsFormSchema>

export const newsFormDefaults: NewsFormValues = {
  title: "",
  content: "",
  date: "",
  status: "draft",
  featured: "No",
  category: "community_development",
}

/**
 * The News API has no image field - `photo_url` is rejected outright by the
 * backend's `forbidNonWhitelisted` validation. `content` is the only field that
 * persists, so the featured image is stored as a marked-up lead <figure> at the
 * top of the article body and read back out of it.
 *
 * If the backend later adds `photo_url` to the News DTO, drop these three
 * helpers and pass the URL straight through in `toNewsPayload`.
 */
const FEATURED_IMAGE_PATTERN =
  /^\s*<figure[^>]*data-featured-image[^>]*>[\s\S]*?<\/figure>\s*/i
const SRC_PATTERN = /<img[^>]*src="([^"]+)"/i

export function extractFeaturedImage(content: string): string | null {
  const figure = content.match(FEATURED_IMAGE_PATTERN)?.[0]
  if (!figure) return null

  return figure.match(SRC_PATTERN)?.[1] ?? null
}

export function stripFeaturedImage(content: string) {
  return content.replace(FEATURED_IMAGE_PATTERN, "")
}

export function withFeaturedImage(content: string, imageUrl: string | null) {
  const body = stripFeaturedImage(content)
  if (!imageUrl) return body

  const safeUrl = imageUrl.replace(/"/g, "&quot;")

  return `<figure data-featured-image="true"><img src="${safeUrl}" alt="" /></figure>${body}`
}

export function toNewsPayload(
  values: NewsFormValues,
  featuredImageUrl: string | null = null,
): NewsPayload {
  return {
    title: values.title,
    content: withFeaturedImage(values.content, featuredImageUrl),
    date: values.date.trim(),
    status: values.status,
    is_featured: values.featured === "Yes",
    category: values.category,
  }
}

export function fromNews(item: NewsItem): NewsFormValues {
  return {
    title: item.title,
    content: stripFeaturedImage(item.content ?? ""),
    date: item.date ?? "",
    status: item.status,
    featured: item.is_featured ? "Yes" : "No",
    category: item.category,
  }
}
