"use client"

import { createResourceHooks } from "@/lib/query/create-resource-hooks"
import type {
  PaginatedResponse,
  ProjectItem,
  ProjectPayload,
  ProjectStats,
} from "@/lib/api/types"
import { projectsRepository } from "@/features/projects/projects.repository"

const hooks = createResourceHooks<
  ProjectItem,
  ProjectPayload,
  PaginatedResponse<ProjectItem, ProjectStats>
>("projects", projectsRepository)

export const projectKeys = hooks.keys
export const useProjects = hooks.useList
export const useProject = hooks.useDetail
export const useCreateProject = () => hooks.useCreate("Project created")
export const useUpdateProject = () => hooks.useUpdate("Project updated")
export const useDeleteProject = () => hooks.useRemove("Project deleted")
