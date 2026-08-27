import axios from "axios"

import { request } from "@/lib/api/request"
import type {
  PresignedUploadPayload,
  PresignedUploadResponse,
} from "@/lib/api/types"

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024

/**
 * Validates a file before we burn a presigned URL on it.
 * Returns an error message, or null when the file is acceptable.
 */
export function validateImageFile(file: File) {
  if (
    !ACCEPTED_IMAGE_TYPES.includes(
      file.type as (typeof ACCEPTED_IMAGE_TYPES)[number],
    )
  ) {
    return "Unsupported file type. Use a JPG, PNG or WebP image."
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return `Image is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum size is ${MAX_IMAGE_BYTES / 1024 / 1024}MB.`
  }

  return null
}

export const uploadsRepository = {
  createPresignedUrl: (payload: PresignedUploadPayload) =>
    request.post<PresignedUploadResponse>(
      "/api/v1/uploads/presigned-url",
      payload,
    ),

  /**
   * Two-step S3 upload, per the API docs:
   *   1. POST /uploads/presigned-url -> { upload_url, file_url, key, expires_in }
   *   2. PUT the raw file to `upload_url` (no auth header - it would break the
   *      SigV4 signature), then persist the returned `file_url`.
   *
   * Step 2 requires a CORS policy on the S3 bucket that allows PUT from this
   * app's origin. Without it the browser refuses the request at preflight.
   */
  upload: async (file: File, folder: string) => {
    const contentType = file.type || "application/octet-stream"

    const presigned = await uploadsRepository.createPresignedUrl({
      file_name: file.name,
      content_type: contentType,
      folder,
    })

    // Bare axios on purpose: apiClient would attach the Authorization header
    // and invalidate the presigned signature.
    await axios.put(presigned.upload_url, file, {
      headers: { "Content-Type": contentType },
      timeout: 120_000,
    })

    return presigned.file_url
  },
}
