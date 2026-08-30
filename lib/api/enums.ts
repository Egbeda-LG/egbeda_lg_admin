/**
 * Canonical option values accepted by the Egbeda LG API.
 *
 * The backend runs a NestJS ValidationPipe with `forbidNonWhitelisted: true`
 * and strict `@IsEnum` checks, so any other value (or any extra property) is
 * rejected with HTTP 400. Every value below was verified against the live dev
 * API by submitting a deliberately invalid value and reading the enum list back
 * out of the validation error.
 *
 * `value` is what goes on the wire; `label` is what the admin UI displays.
 */
export type SelectOption = { value: string; label: string }

/** news, projects, landmarks, services */
export const PUBLISH_STATUS_OPTIONS: SelectOption[] = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
]

/** departments */
export const ACTIVE_STATUS_OPTIONS: SelectOption[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
]

/** councillors, NULGE */
export const SEAT_STATUS_OPTIONS: SelectOption[] = [
  { value: "active", label: "Active" },
  { value: "vacant", label: "Vacant" },
]

/** past government - verified from the API's own validation error */
export const ELECTION_TYPE_OPTIONS: SelectOption[] = [
  { value: "elected", label: "Elected" },
  { value: "caretaker", label: "Caretaker" },
  { value: "sole_administrator", label: "Sole Administrator" },
]

export const NEWS_CATEGORY_OPTIONS: SelectOption[] = [
  { value: "all_news", label: "All News" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
  { value: "security", label: "Security" },
  { value: "environment", label: "Environment" },
  { value: "events_and_ceremonies", label: "Events & Ceremonies" },
  {
    value: "government_and_administration",
    label: "Government & Administration",
  },
  { value: "community_development", label: "Community Development" },
  { value: "arts_culture_and_tourism", label: "Arts, Culture & Tourism" },
  { value: "public_notice", label: "Public Notice" },
  { value: "economy", label: "Economy" },
]

export const LANDMARK_CATEGORY_OPTIONS: SelectOption[] = [
  { value: "landmark", label: "Landmark" },
  { value: "industry", label: "Industry" },
  { value: "e_commerce", label: "E-commerce" },
  { value: "hospitality", label: "Hospitality" },
]

export const MANAGEMENT_OFFICE_OPTIONS: SelectOption[] = [
  {
    value: "head_of_local_government_administration",
    label: "Head of Local Government Administration",
  },
  {
    value: "director_of_finance_and_supplies",
    label: "Director of Finance & Supplies",
  },
  {
    value: "director_of_admin_and_general_services",
    label: "Director of Admin & General Services",
  },
  {
    value: "director_of_finance_and_budget",
    label: "Director of Finance & Budget",
  },
  {
    value: "director_of_works_and_housing",
    label: "Director of Works & Housing",
  },
  {
    value: "director_of_primary_healthcare",
    label: "Director of Primary Healthcare",
  },
  {
    value: "director_of_education_and_social_services",
    label: "Director of Education & Social Services",
  },
  { value: "internal_auditor", label: "Internal Auditor" },
  { value: "information_officer", label: "Information Officer" },
]

export const NULGE_OFFICE_OPTIONS: SelectOption[] = [
  { value: "chairman", label: "Chairman" },
  { value: "vice_chairman", label: "Vice Chairman" },
  { value: "secretary", label: "Secretary" },
  { value: "treasurer", label: "Treasurer" },
  { value: "woman_chairperson", label: "Woman Chairperson" },
  { value: "assistant_chairperson", label: "Assistant Chairperson" },
  { value: "trustee", label: "Trustee" },
  { value: "auditor", label: "Auditor" },
  {
    value: "young_worker_representative",
    label: "Young Worker Representative",
  },
]

/** social_media[].platform */
export const SOCIAL_PLATFORMS = [
  "tiktok",
  "facebook",
  "twitter",
  "instagram",
] as const
export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number]

/** POST /uploads/presigned-url accepts only these content types. */
export const UPLOAD_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const

/** Turns an API value such as `community_development` into "Community Development". */
export function optionLabel(options: SelectOption[], value?: string | null) {
  if (!value) return "—"
  const match = options.find((option) => option.value === value)
  if (match) return match.label
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

/**
 * Keeps a stored value selectable when the fetched option list does not
 * contain it (e.g. a department that was renamed or removed).
 */
export function withSelectedOption(options: SelectOption[], value?: string) {
  if (!value || options.some((option) => option.value === value)) return options

  return [...options, { value, label: value }]
}

/**
 * base-ui's `<Select.Value>` renders the raw option value unless `Select.Root`
 * is given an `items` map - which is why selects were showing `draft` and
 * `community_development` instead of their labels. Pass this to `items`.
 */
export function selectItems(options: SelectOption[]): Record<string, string> {
  return Object.fromEntries(
    options.map((option) => [option.value, option.label]),
  )
}
