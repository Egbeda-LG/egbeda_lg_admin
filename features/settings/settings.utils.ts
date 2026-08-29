import {
  RiBuilding4Line,
  RiGlobeLine,
  RiMailLine,
  RiUser3Line,
  RiUserStarLine,
} from "@remixicon/react"

import type {
  ChairmanInfo,
  OrganizationSettingsResponse,
  PlacementImage,
} from "@/lib/api/types"

export const SETTINGS_TABS = [
  { value: "Organization", icon: RiBuilding4Line },
  { value: "Chairman Information", icon: RiUser3Line },
  { value: "Vice Chairman", icon: RiUserStarLine },
  { value: "Contact & Support", icon: RiMailLine },
  { value: "Social & Web", icon: RiGlobeLine },
] as const

export type SettingsTab = (typeof SETTINGS_TABS)[number]["value"]

/** Label prefix shown inside the social URL inputs, e.g. "TIKTOK" -> "Tiktok". */
export function socialPrefixLabel(label: string) {
  return label.charAt(0) + label.slice(1).toLowerCase()
}

export type ChairmanProfile = {
  name: string
  shortName: string
  office: string
  image: string
  biography: string
  message: string
  yearsInService: number
  projectsDelivered: number
  townHallsHosted: number
}

/**
 * The chairman's portrait is stored once with a flag per placement. Prefer the
 * one chosen for the government page, since that is what this card mirrors.
 */
export function chairmanPortrait(images: PlacementImage[] = []) {
  return (
    images.find((image) => image.is_in_government)?.photo_url ??
    images.find((image) => image.is_in_homepage)?.photo_url ??
    images[0]?.photo_url ??
    ""
  )
}

/**
 * Neither office is a management record - each is held by one person and is
 * edited in organization settings, so both are read from there. Returns null
 * until the section carries a name, so a vacant office renders nothing.
 */
function toOfficialProfile(
  info: Partial<ChairmanInfo> | undefined,
  office: string,
): ChairmanProfile | null {
  if (!info?.official_name?.trim()) return null

  return {
    name: info.official_name.trim(),
    shortName: info.short_name?.trim() ?? "",
    office,
    image: chairmanPortrait(info.images),
    biography: info.biography ?? "",
    message: info.message ?? "",
    yearsInService: info.years_in_service ?? 0,
    projectsDelivered: info.projects_delivered ?? 0,
    townHallsHosted: info.town_halls_hosted ?? 0,
  }
}

export function toChairmanProfile(settings?: OrganizationSettingsResponse) {
  return toOfficialProfile(settings?.chairman_info, "Executive Chairman")
}

export function toViceChairmanProfile(settings?: OrganizationSettingsResponse) {
  return toOfficialProfile(settings?.vice_chairman_info, "Vice Chairman")
}
