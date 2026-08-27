import type { CouncillorFormValues } from "@/features/councillors/councillors.form"
import type {
  CouncillorItem,
  CouncillorPayload,
  SocialMediaLink,
} from "@/lib/api/types"

type CouncillorPayloadExtras = {
  /** Kept from the stored record - the councillor form does not edit these. */
  photoUrl?: string
  socialMedia?: SocialMediaLink[]
}

export function toCouncillorPayload(
  values: CouncillorFormValues,
  { photoUrl = "", socialMedia = [] }: CouncillorPayloadExtras = {},
): CouncillorPayload {
  return {
    name: values.councilorName,
    ward_id: values.ward,
    status: values.status,
    social_media: socialMedia,
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

export function fromCouncillor(item: CouncillorItem): CouncillorFormValues {
  return {
    councilorName: item.name,
    ward: item.ward_id,
    // Neither field is stored by the API.
    area: "",
    dateAppointed: "",
    status: item.status,
  }
}
