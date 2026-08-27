import { createResourceRepository } from "@/lib/api/resource-repository"
import type { ProjectItem, ProjectPayload, ProjectStats } from "@/lib/api/types"

export const projectsRepository = createResourceRepository<
  ProjectItem,
  ProjectPayload,
  ProjectStats
>("/api/v1/projects")
