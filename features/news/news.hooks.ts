"use client"

import { createResourceHooks } from "@/lib/query/create-resource-hooks"
import type {
  NewsItem,
  NewsPayload,
  NewsStats,
  PaginatedResponse,
} from "@/lib/api/types"
import { newsRepository } from "@/features/news/news.repository"

const hooks = createResourceHooks<
  NewsItem,
  NewsPayload,
  PaginatedResponse<NewsItem, NewsStats>
>("news", newsRepository)

export const newsKeys = hooks.keys
export const useNewsList = hooks.useList
export const useNewsItem = hooks.useDetail
export const useCreateNews = () => hooks.useCreate("News article created")
export const useUpdateNews = () => hooks.useUpdate("News article updated")
export const useDeleteNews = () => hooks.useRemove("News article deleted")
