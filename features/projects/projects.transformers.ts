import type { ProjectFormValues } from "@/features/projects/projects.form"
import type { ProjectItem, ProjectPayload } from "@/lib/api/types"

/**
 * `photo_url` is required by the API and must be a valid URL - an empty string
 * is rejected with 400, so callers must upload an image first.
 */
export function toProjectPayload(
  values: ProjectFormValues,
  photoUrl: string,
): ProjectPayload {
  return {
    name: values.name,
    ward_id: values.wardId,
    location: values.location,
    start_date: values.startDate,
    end_date: values.endDate,
    contractor: values.contractor ?? "",
    description: values.description ?? "",
    photo_url: photoUrl,
    status: values.status,
    is_featured: false,
  }
}

export function fromProject(item: ProjectItem): ProjectFormValues {
  return {
    name: item.name,
    wardId: item.ward_id,
    location: item.location,
    // The API returns full ISO; the date picker works in yyyy-MM-dd.
    startDate: item.start_date?.slice(0, 10) ?? "",
    endDate: item.end_date?.slice(0, 10) ?? "",
    contractor: item.contractor,
    description: item.description,
    status: item.status,
  }
}
