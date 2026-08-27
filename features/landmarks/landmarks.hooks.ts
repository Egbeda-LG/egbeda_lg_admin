"use client"

import { createResourceHooks } from "@/lib/query/create-resource-hooks"
import type {
  LandmarkItem,
  LandmarkPayload,
  PaginatedResponse,
} from "@/lib/api/types"
import { landmarksRepository } from "@/features/landmarks/landmarks.repository"

const hooks = createResourceHooks<
  LandmarkItem,
  LandmarkPayload,
  PaginatedResponse<LandmarkItem>
>("landmarks", landmarksRepository)

export const landmarkKeys = hooks.keys
export const useLandmarks = hooks.useList
export const useLandmark = hooks.useDetail
export const useCreateLandmark = () => hooks.useCreate("Landmark created")
export const useUpdateLandmark = () => hooks.useUpdate("Landmark updated")
export const useDeleteLandmark = () => hooks.useRemove("Landmark deleted")
