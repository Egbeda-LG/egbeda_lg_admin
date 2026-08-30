"use client"

import { useQuery } from "@tanstack/react-query"

import { landmarksRepository } from "@/features/landmarks/landmarks.repository"
import { landmarkKeys } from "@/features/landmarks/landmarks.hooks"
import { messagesRepository } from "@/features/messages/messages.repository"
import { messageKeys } from "@/features/messages/messages.hooks"
import { newsRepository } from "@/features/news/news.repository"
import { newsKeys } from "@/features/news/news.hooks"
import { projectsRepository } from "@/features/projects/projects.repository"
import { projectKeys } from "@/features/projects/projects.hooks"
import { buildDashboardOverview } from "@/features/dashboard/dashboard.service"

const newsQuery = { page: 1, limit: 5 } as const
const projectsQuery = { page: 1, limit: 4 } as const
const landmarksQuery = { page: 1, limit: 1 } as const
const messagesQuery = { page: 1, limit: 1 } as const
const dashboardStaleTime = 5 * 60_000

export function useDashboardOverview(enabled = true) {
  const news = useQuery({
    queryKey: newsKeys.list(newsQuery),
    queryFn: () => newsRepository.getAll(newsQuery),
    enabled,
    staleTime: dashboardStaleTime,
    retry: false,
  })
  const projects = useQuery({
    queryKey: projectKeys.list(projectsQuery),
    queryFn: () => projectsRepository.getAll(projectsQuery),
    enabled,
    staleTime: dashboardStaleTime,
    retry: false,
  })
  const landmarks = useQuery({
    queryKey: landmarkKeys.list(landmarksQuery),
    queryFn: () => landmarksRepository.getAll(landmarksQuery),
    enabled,
    staleTime: dashboardStaleTime,
    retry: false,
  })
  const messages = useQuery({
    queryKey: messageKeys.list(messagesQuery),
    queryFn: () => messagesRepository.getAll(messagesQuery),
    enabled,
    staleTime: dashboardStaleTime,
    retry: false,
  })

  const queries = { news, projects, landmarks, messages }

  return {
    data: buildDashboardOverview({
      news: news.data,
      projects: projects.data,
      landmarks: landmarks.data,
      messages: messages.data,
    }),
    queries,
    isError: Object.values(queries).some((query) => query.isError),
    refetch: () =>
      Promise.all(Object.values(queries).map((query) => query.refetch())),
  }
}
