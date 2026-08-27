import { RiArticleLine, RiCompass3Line, RiHammerLine } from "@remixicon/react"

import { PUBLISH_STATUS_OPTIONS, optionLabel } from "@/lib/api/enums"
import type { NewsItem, ProjectItem } from "@/lib/api/types"

type DashboardOverview = {
  stats: {
    publishedNews: number
    completedProjects: number
    landmarks: number
    messages: number
  }
}

export type DashboardStat = {
  label: string
  value: number | string
}

/** Shortcuts shown under the dashboard header. */
export const QUICK_ACTIONS = [
  { title: "New article", href: "/newsroom/compose", icon: RiArticleLine },
  { title: "Add project", href: "/projects/new", icon: RiHammerLine },
  { title: "Add landmark", href: "/landmarks/new", icon: RiCompass3Line },
]

const EM_DASH = "—"

export function toDashboardStats(
  overview?: DashboardOverview,
): DashboardStat[] {
  return [
    {
      label: "PUBLISHED NEWS",
      value: overview?.stats.publishedNews ?? EM_DASH,
    },
    {
      label: "COMPLETED PROJECTS",
      value: overview?.stats.completedProjects ?? EM_DASH,
    },
    {
      label: "LANDMARKS & CULTURE",
      value: overview?.stats.landmarks ?? EM_DASH,
    },
    { label: "MESSAGES", value: overview?.stats.messages ?? EM_DASH },
  ]
}

export function greetingName(fullName?: string, fallback = "Segun") {
  return fullName?.split(" ")[0] ?? fallback
}

export function toProjectSummary(project: ProjectItem) {
  return {
    id: project._id,
    name: project.name,
    location: project.location,
    ward: project.ward_number ? `Ward ${project.ward_number}` : EM_DASH,
    status: optionLabel(PUBLISH_STATUS_OPTIONS, project.status),
    photo_url: project.photo_url,
  }
}

export function toNewsSummary(article: NewsItem) {
  return {
    id: article._id,
    title: article.title,
    category: article.category,
    status: article.status,
    meta: `${article.category?.replaceAll("_", " ")} • ${article.status}`,
  }
}
