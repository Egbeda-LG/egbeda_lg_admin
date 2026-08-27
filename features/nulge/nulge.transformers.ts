import type { NulgeFormValues } from "@/features/nulge/nulge.form"
import { SOCIAL_PLATFORMS } from "@/lib/api/enums"
import type { NulgeItem, NulgePayload, SocialMediaLink } from "@/lib/api/types"

function socialMedia(values: NulgeFormValues): SocialMediaLink[] {
  return SOCIAL_PLATFORMS.flatMap((platform) => {
    const url = values[platform]?.trim()
    return url ? [{ platform, url }] : []
  })
}

export function toNulgePayload(
  values: NulgeFormValues,
  photoUrl = "",
): NulgePayload {
  return {
    name: values.name,
    office: values.office,
    status: values.status,
    social_media: socialMedia(values),
    images: photoUrl
      ? [
          {
            photo_url: photoUrl,
            is_in_homepage: false,
            is_in_government: true,
            is_in_about: false,
          },
        ]
      : [],
  }
}

export function fromNulge(item: NulgeItem): NulgeFormValues {
  const links = Object.fromEntries(
    item.social_media.map((link) => [link.platform.toLowerCase(), link.url]),
  )

  return {
    name: item.name,
    office: item.office,
    status: item.status,
    tiktok: links.tiktok ?? "",
    facebook: links.facebook ?? "",
    twitter: links.twitter ?? "",
    instagram: links.instagram ?? "",
  }
}
