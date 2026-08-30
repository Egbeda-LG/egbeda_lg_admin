import type {
  ContactMessage,
  LandmarkItem,
  NewsItem,
  NewsStats,
  PaginatedResponse,
  ProjectItem,
  ProjectStats,
} from "@/lib/api/types"

type DashboardResponses = {
  news?: PaginatedResponse<NewsItem, NewsStats>
  projects?: PaginatedResponse<ProjectItem, ProjectStats>
  landmarks?: PaginatedResponse<LandmarkItem>
  messages?: PaginatedResponse<ContactMessage>
}

export function buildDashboardOverview({
  news,
  projects,
  landmarks,
  messages,
}: DashboardResponses) {
  const completedProjects =
    projects?.data.filter(
      (project) => project.status.toLowerCase() === "completed",
    ) ?? []

  return {
    stats: {
      publishedNews: news?.stats?.published ?? news?.meta.total ?? 0,
      completedProjects:
        news?.stats?.completed_projects ?? completedProjects.length,
      landmarks:
        news?.stats?.landmarks_and_culture ?? landmarks?.meta.total ?? 0,
      messages: messages?.meta.total ?? 0,
    },
    projects: projects?.data.slice(0, 4) ?? [],
    latestNews: news?.data.slice(0, 5) ?? [],
  }
}
