import type { LandmarkFormValues } from "@/features/landmarks/landmarks.form"
import type { LandmarkItem, LandmarkPayload } from "@/lib/api/types"

/** `photo_url` is required by the API and must be a valid URL. */
export function toLandmarkPayload(
  values: LandmarkFormValues,
  photoUrl: string,
): LandmarkPayload {
  return {
    name: values.name,
    category: values.category,
    description: values.description ?? "",
    location: values.location,
    photo_url: photoUrl,
    status: values.status,
    is_featured: false,
  }
}

export function fromLandmark(item: LandmarkItem): LandmarkFormValues {
  return {
    name: item.name,
    category: item.category,
    location: item.location,
    description: item.description,
    status: item.status,
  }
}
