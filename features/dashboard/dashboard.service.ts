import { landmarksRepository } from "@/features/landmarks/landmarks.repository"
import { messagesRepository } from "@/features/messages/messages.repository"
import { newsRepository } from "@/features/news/news.repository"
import { projectsRepository } from "@/features/projects/projects.repository"

export async function getDashboardOverview() {
  const [news, projects, landmarks, messages] = await Promise.all([
    newsRepository.getAll({ page: 1, limit: 10 }),
    projectsRepository.getAll({ page: 1, limit: 10 }),
    landmarksRepository.getAll({ page: 1, limit: 10 }),
    messagesRepository.getAll({ page: 1, limit: 10 }),
  ])

  const completedProjects = projects.data.filter(
    (project) => project.status.toLowerCase() === "completed",
  )

  return {
    stats: {
      publishedNews: news.stats?.published ?? news.meta.total,
      completedProjects:
        news.stats?.completed_projects ?? completedProjects.length,
      landmarks: news.stats?.landmarks_and_culture ?? landmarks.meta.total,
      messages: messages.meta.total,
    },
    projects: projects.data.slice(0, 4),
    latestNews: news.data.slice(0, 5),
  }
}
