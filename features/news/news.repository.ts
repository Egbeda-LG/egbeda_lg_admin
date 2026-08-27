import { createResourceRepository } from "@/lib/api/resource-repository"
import type { NewsItem, NewsPayload, NewsStats } from "@/lib/api/types"

export const newsRepository = createResourceRepository<
  NewsItem,
  NewsPayload,
  NewsStats
>("/api/v1/news")
