import type { ManagementFormValues } from "@/features/management/management.form"
import { SOCIAL_PLATFORMS } from "@/lib/api/enums"
import type {
  ManagementItem,
  ManagementPayload,
  SocialMediaLink,
} from "@/lib/api/types"

function socialMedia(values: ManagementFormValues): SocialMediaLink[] {
  return SOCIAL_PLATFORMS.flatMap((platform) => {
    const url = values[platform]?.trim()
    return url ? [{ platform, url }] : []
  })
}

/** `photo_url` is required by the API and must be a valid URL. */
export function toManagementPayload(
  values: ManagementFormValues,
  photoUrl: string,
): ManagementPayload {
  return {
    name: values.name,
    office: values.office,
    status: values.status,
    description: values.officeDescription ?? "",
    photo_url: photoUrl,
    social_media: socialMedia(values),
  }
}

export function fromManagement(item: ManagementItem): ManagementFormValues {
  const links = Object.fromEntries(
    item.social_media.map((link) => [link.platform.toLowerCase(), link.url]),
  )
  return {
    name: item.name,
    office: item.office,
    status: item.status,
    officeDescription: item.description,
    tiktok: links.tiktok ?? "",
    facebook: links.facebook ?? "",
    twitter: links.twitter ?? "",
    instagram: links.instagram ?? "",
  }
}
