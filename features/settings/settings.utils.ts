import {
  RiBuilding4Line,
  RiGlobeLine,
  RiMailLine,
  RiUser3Line,
} from "@remixicon/react"

import type {
  OrganizationSettingsResponse,
  PlacementImage,
} from "@/lib/api/types"

export const SETTINGS_TABS = [
  { value: "Organization", icon: RiBuilding4Line },
  { value: "Chairman Information", icon: RiUser3Line },
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
 * The chairman is not a management record - the office is held by one person
 * and is edited in organization settings, so it is read from there.
 * Returns null until the settings have been filled in with a name.
 */
export function toChairmanProfile(
  settings?: OrganizationSettingsResponse,
): ChairmanProfile | null {
  const chairman = settings?.chairman_info

  if (!chairman?.official_name?.trim()) return null

  return {
    name: chairman.official_name.trim(),
    shortName: chairman.short_name?.trim() ?? "",
    office: "Executive Chairman",
    image: chairmanPortrait(chairman.images),
    biography: chairman.biography ?? "",
    message: chairman.message ?? "",
    yearsInService: chairman.years_in_service ?? 0,
    projectsDelivered: chairman.projects_delivered ?? 0,
    townHallsHosted: chairman.town_halls_hosted ?? 0,
  }
}
