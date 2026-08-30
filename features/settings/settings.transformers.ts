import type { OrganizationSettingsFormValues } from "@/features/settings/settings.form"
import type {
  PlacementImage,
  OrganizationSettings,
  OrganizationSettingsResponse,
  SocialMediaLink,
} from "@/lib/api/types"

const numberValue = (value?: string) =>
  Number(value?.replace(/[^\d.-]/g, "")) || 0

const stringValue = (value?: string) => value?.trim() ?? ""

function toLinks(
  entries: [platform: string, url: string | undefined][],
): SocialMediaLink[] {
  return entries.flatMap(([platform, url]) =>
    url?.trim() ? [{ platform, url }] : [],
  )
}

/** The organisation's own social accounts. */
function links(values: OrganizationSettingsFormValues) {
  return toLinks([
    ["tiktok", values.tiktokUrl],
    ["facebook", values.facebookUrl],
    ["twitter", values.twitterUrl],
    ["instagram", values.instagramUrl],
  ])
}

/** The chairman's personal accounts - a separate array on the API. */
function chairmanLinks(values: OrganizationSettingsFormValues) {
  return toLinks([
    ["tiktok", values.chairmanTiktokUrl],
    ["facebook", values.chairmanFacebookUrl],
    ["twitter", values.chairmanTwitterUrl],
    ["instagram", values.chairmanInstagramUrl],
  ])
}

/** The vice chairman's personal accounts, kept apart from the chairman's. */
function viceChairmanLinks(values: OrganizationSettingsFormValues) {
  return toLinks([
    ["tiktok", values.viceChairmanTiktokUrl],
    ["facebook", values.viceChairmanFacebookUrl],
    ["twitter", values.viceChairmanTwitterUrl],
    ["instagram", values.viceChairmanInstagramUrl],
  ])
}

export function toOrganizationSettings(
  values: OrganizationSettingsFormValues,
  chairmanImages: PlacementImage[] = [],
  viceChairmanImages: PlacementImage[] = [],
): OrganizationSettings {
  const viceChairmanName = values.viceChairmanName?.trim() ?? ""

  return {
    organization: {
      official_name: values.officialName,
      lg_name: values.localGovName,
      state: values.state,
      region: values.region,
      year_of_establishment: numberValue(values.established),
      landmass_per_sq_km: numberValue(values.landmass),
      population: numberValue(values.estimatedPopulation),
      no_of_wards: numberValue(values.numberOfWards),
      no_of_schools: numberValue(values.numberOfSchools),
      no_of_health_centres: numberValue(values.numberOfHealthCenters),
      no_of_staffs: numberValue(values.numberOfStaffs),
      about: values.about,
    },
    chairman_info: {
      official_name: values.chairmanName,
      short_name: values.shortName,
      years_in_service: stringValue(values.yearsInService),
      projects_delivered: stringValue(values.projectsDelivered),
      town_halls_hosted: stringValue(values.townHallsHosted),
      no_of_staffs: stringValue(values.chairmanStaffsCount),
      biography: values.chairmanBio ?? "",
      message: values.chairmanMessage ?? "",
      social_media: chairmanLinks(values),
      images: chairmanImages,
    },
    // Only sent once a vice chairman is named, so saving the other tabs on a
    // document that has none does not write an empty section over it.
    ...(viceChairmanName
      ? {
          vice_chairman_info: {
            official_name: viceChairmanName,
            short_name: values.viceShortName ?? "",
            years_in_service: stringValue(values.viceYearsInService),
            projects_delivered: stringValue(values.viceProjectsDelivered),
            town_halls_hosted: stringValue(values.viceTownHallsHosted),
            no_of_staffs: stringValue(values.viceChairmanStaffsCount),
            biography: values.viceChairmanBio ?? "",
            message: values.viceChairmanMessage ?? "",
            social_media: viceChairmanLinks(values),
            images: viceChairmanImages,
          },
        }
      : {}),
    contact_and_support: {
      official_email: values.emailAddress ?? "",
      support_email: values.supportEmail ?? "",
      emergency_line_1: values.emergencyLine1 ?? "",
      emergency_line_2: values.emergencyLine2 ?? "",
      headquater_address: values.headquartersAddress ?? "",
      google_map_link: values.googleMapLink ?? "",
      latitude: numberValue(values.latitude),
      longitude: numberValue(values.longitude),
      weekdays: values.weekdays ?? "",
      hours: values.hours ?? "",
    },
    social_media: links(values),
  }
}

const str = (value?: string | number | null) =>
  value == null ? "" : String(value)

export function fromOrganizationSettings(
  settings: OrganizationSettingsResponse,
): OrganizationSettingsFormValues {
  // The API returns a sparse document until settings are saved for the first
  // time, so every section and field must be treated as optional here.
  const org = settings.organization ?? {}
  const chairman = settings.chairman_info ?? {}
  const vice = settings.vice_chairman_info ?? {}
  const contact = settings.contact_and_support ?? {}
  const byPlatform = (list?: SocialMediaLink[]) =>
    Object.fromEntries(
      (list ?? []).map((link) => [link.platform.toLowerCase(), link.url]),
    )

  const social = byPlatform(settings.social_media)
  const chairmanSocial = byPlatform(chairman.social_media)
  const viceSocial = byPlatform(vice.social_media)
  return {
    officialName: str(org.official_name),
    localGovName: str(org.lg_name),
    state: str(org.state),
    region: str(org.region),
    established: str(org.year_of_establishment),
    landmass: str(org.landmass_per_sq_km),
    estimatedPopulation: str(org.population),
    numberOfWards: str(org.no_of_wards),
    numberOfSchools: str(org.no_of_schools),
    numberOfHealthCenters: str(org.no_of_health_centres),
    numberOfStaffs: str(org.no_of_staffs),
    about: str(org.about),
    chairmanName: str(chairman.official_name),
    shortName: str(chairman.short_name),
    yearsInService: str(chairman.years_in_service),
    projectsDelivered: str(chairman.projects_delivered),
    townHallsHosted: str(chairman.town_halls_hosted),
    chairmanStaffsCount: str(chairman.no_of_staffs),
    chairmanBio: str(chairman.biography),
    chairmanMessage: str(chairman.message),
    viceChairmanName: str(vice.official_name),
    viceShortName: str(vice.short_name),
    viceYearsInService: str(vice.years_in_service),
    viceProjectsDelivered: str(vice.projects_delivered),
    viceTownHallsHosted: str(vice.town_halls_hosted),
    viceChairmanStaffsCount: str(vice.no_of_staffs),
    viceChairmanBio: str(vice.biography),
    viceChairmanMessage: str(vice.message),
    viceChairmanTiktokUrl: viceSocial.tiktok ?? "",
    viceChairmanFacebookUrl: viceSocial.facebook ?? "",
    viceChairmanTwitterUrl: viceSocial.twitter ?? "",
    viceChairmanInstagramUrl: viceSocial.instagram ?? "",
    emailAddress: str(contact.official_email),
    supportEmail: str(contact.support_email),
    emergencyLine1: str(contact.emergency_line_1),
    emergencyLine2: str(contact.emergency_line_2),
    headquartersAddress: str(contact.headquater_address),
    googleMapLink: str(contact.google_map_link),
    longitude: str(contact.longitude),
    latitude: str(contact.latitude),
    weekdays: str(contact.weekdays),
    hours: str(contact.hours),
    chairmanTiktokUrl: chairmanSocial.tiktok ?? "",
    chairmanFacebookUrl: chairmanSocial.facebook ?? "",
    chairmanTwitterUrl: chairmanSocial.twitter ?? "",
    chairmanInstagramUrl: chairmanSocial.instagram ?? "",
    tiktokUrl: social.tiktok ?? "",
    facebookUrl: social.facebook ?? "",
    twitterUrl: social.twitter ?? "",
    instagramUrl: social.instagram ?? "",
  }
}
