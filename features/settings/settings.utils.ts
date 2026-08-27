import {
  RiBuilding4Line,
  RiGlobeLine,
  RiMailLine,
  RiUser3Line,
} from "@remixicon/react"

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
