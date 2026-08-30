import * as z from "zod"

import { optionalUrl } from "@/lib/validation"

/** These reach the API as numbers, so reject anything non-numeric here. */
const numeric = (label: string) =>
  z
    .string()
    .min(1, `${label} is required`)
    .regex(/^\d+(\.\d+)?$/, `${label} must be a number`)

const coordinate = (label: string) =>
  z
    .string()
    .min(1, `${label} is required`)
    .regex(/^-?\d+(\.\d+)?$/, `${label} must be a number`)

export const organizationSettingsFormSchema = z.object({
  // Organization
  officialName: z.string().min(2, "Official name required"),
  localGovName: z.string().min(2, "Local Government name required"),
  state: z.string().min(2, "State required"),
  region: z.string().min(2, "Region required"),
  established: numeric("Year established"),
  landmass: numeric("Landmass"),
  estimatedPopulation: numeric("Population"),
  numberOfWards: numeric("Number of wards"),
  numberOfSchools: numeric("Number of schools"),
  numberOfHealthCenters: numeric("Health centres count"),
  numberOfStaffs: numeric("Staffs count"),
  about: z.string().min(10, "About section description required"),
  // Chairman information
  chairmanName: z.string().min(2, "Chairman name required"),
  shortName: z.string().min(2, "Short name required"),
  yearsInService: z.string().min(1, "Years in service is required"),
  projectsDelivered: z.string().min(1, "Projects delivered is required"),
  townHallsHosted: z.string().min(1, "Town halls hosted is required"),
  chairmanStaffsCount: z.string().min(1, "Staffs count is required"),
  chairmanBio: z.string().min(10, "Chairman biography is required"),
  chairmanMessage: z.string().min(10, "Chairman message is required"),
  // chairman_info.social_media - separate from the organisation's own links.
  chairmanTiktokUrl: optionalUrl("TikTok"),
  chairmanFacebookUrl: optionalUrl("Facebook"),
  chairmanTwitterUrl: optionalUrl("Twitter"),
  chairmanInstagramUrl: optionalUrl("Instagram"),
  // Vice chairman information - every field optional.
  viceChairmanName: z.string(),
  viceShortName: z.string(),
  viceYearsInService: z.string(),
  viceProjectsDelivered: z.string(),
  viceTownHallsHosted: z.string(),
  viceChairmanStaffsCount: z.string(),
  viceChairmanBio: z.string(),
  viceChairmanMessage: z.string(),
  viceChairmanTiktokUrl: optionalUrl("TikTok"),
  viceChairmanFacebookUrl: optionalUrl("Facebook"),
  viceChairmanTwitterUrl: optionalUrl("Twitter"),
  viceChairmanInstagramUrl: optionalUrl("Instagram"),
  // Contact & support
  emailAddress: z
    .string()
    .min(1, "Email address is required")
    .email("Enter a valid email address"),
  supportEmail: z
    .string()
    .min(1, "Support email is required")
    .email("Enter a valid email address"),
  emergencyLine1: z.string().min(7, "Emergency line 1 is required"),
  emergencyLine2: z.string().min(7, "Emergency line 2 is required"),
  headquartersAddress: z.string().min(5, "Headquarters address is required"),
  googleMapLink: z
    .string()
    .min(1, "Google map link is required")
    .url("Enter a valid URL"),
  longitude: coordinate("Longitude"),
  latitude: coordinate("Latitude"),
  weekdays: z.string().min(2, "Weekdays are required"),
  hours: z.string().min(2, "Hours are required"),
  // Social & web
  // Optional, as the form labels them - validated as URLs when filled in.
  tiktokUrl: optionalUrl("TikTok"),
  facebookUrl: optionalUrl("Facebook"),
  twitterUrl: optionalUrl("Twitter"),
  instagramUrl: optionalUrl("Instagram"),
})

export type OrganizationSettingsFormValues = z.infer<
  typeof organizationSettingsFormSchema
>

/** Keys whose value is a string - everything the text/URL inputs can bind to. */
type StringFieldName = {
  [
    K in keyof OrganizationSettingsFormValues
  ]: OrganizationSettingsFormValues[K] extends string ? K : never
}[keyof OrganizationSettingsFormValues]

export type SettingsField = {
  name: StringFieldName
  label: string
}

export const organizationSettingsFormDefaults: OrganizationSettingsFormValues =
  Object.fromEntries(
    Object.keys(organizationSettingsFormSchema.shape).map((key) => [key, ""]),
  ) as OrganizationSettingsFormValues

export const ORGANIZATION_FIELDS: SettingsField[] = [
  { name: "officialName", label: "OFFICIAL NAME" },
  { name: "localGovName", label: "LOCAL GOVERNMENT NAME" },
  { name: "state", label: "STATE" },
  { name: "region", label: "REGION" },
  { name: "established", label: "ESTABLISHED" },
  { name: "landmass", label: "LANDMASS (SQ KM)" },
  { name: "estimatedPopulation", label: "ESTIMATED POPULATION" },
  { name: "numberOfWards", label: "NUMBER OF WARD" },
  { name: "numberOfSchools", label: "NUMBER OF SCHOOLS" },
  { name: "numberOfStaffs", label: "NUMBER OF STAFFS" },
  { name: "numberOfHealthCenters", label: "NUMBER OF HEALTH CENTERS" },
]

export const CHAIRMAN_FIELDS: SettingsField[] = [
  { name: "chairmanName", label: "CHAIRMAN NAME" },
  { name: "shortName", label: "SHORT NAME" },
  { name: "yearsInService", label: "NUMBER OF YEARS IN SERVICE" },
  { name: "projectsDelivered", label: "NUMBER OF PROJECTS DELIVERED" },
  { name: "townHallsHosted", label: "NUMBER OF TOWN HALLS HOSTED" },
  { name: "chairmanStaffsCount", label: "NUMBER OF STAFFS" },
]

export const CHAIRMAN_SOCIAL_FIELDS: SettingsField[] = [
  { name: "chairmanTiktokUrl", label: "TIKTOK" },
  { name: "chairmanFacebookUrl", label: "FACEBOOK" },
  { name: "chairmanTwitterUrl", label: "TWITTER" },
  { name: "chairmanInstagramUrl", label: "INSTAGRAM" },
]

export const CHAIRMAN_TEXT_AREAS: SettingsField[] = [
  { name: "chairmanBio", label: "BIOGRAPHY OF THE CHAIRMAN" },
  { name: "chairmanMessage", label: "EXECUTIVE CHAIRMAN MESSAGE" },
]

export const VICE_CHAIRMAN_FIELDS: SettingsField[] = [
  { name: "viceChairmanName", label: "VICE CHAIRMAN NAME" },
  { name: "viceShortName", label: "SHORT NAME" },
  { name: "viceYearsInService", label: "NUMBER OF YEARS IN SERVICE" },
  { name: "viceProjectsDelivered", label: "NUMBER OF PROJECTS DELIVERED" },
  { name: "viceTownHallsHosted", label: "NUMBER OF TOWN HALLS HOSTED" },
  { name: "viceChairmanStaffsCount", label: "NUMBER OF STAFFS" },
]

export const VICE_CHAIRMAN_SOCIAL_FIELDS: SettingsField[] = [
  { name: "viceChairmanTiktokUrl", label: "TIKTOK" },
  { name: "viceChairmanFacebookUrl", label: "FACEBOOK" },
  { name: "viceChairmanTwitterUrl", label: "TWITTER" },
  { name: "viceChairmanInstagramUrl", label: "INSTAGRAM" },
]

export const VICE_CHAIRMAN_TEXT_AREAS: SettingsField[] = [
  { name: "viceChairmanBio", label: "BIOGRAPHY OF THE VICE CHAIRMAN" },
  { name: "viceChairmanMessage", label: "VICE CHAIRMAN MESSAGE" },
]

export const CONTACT_FIELDS: SettingsField[] = [
  { name: "emailAddress", label: "EMAIL ADDRESS" },
  { name: "supportEmail", label: "SUPPORT EMAIL" },
  { name: "emergencyLine1", label: "EMERGENCY LINE 1" },
  { name: "emergencyLine2", label: "EMERGENCY LINE 2" },
]

export const LOCATION_FIELDS: SettingsField[] = [
  { name: "headquartersAddress", label: "HEADQUARTERS ADDRESS" },
  { name: "googleMapLink", label: "GOOGLE MAP LINK" },
  { name: "longitude", label: "LONGITUDE" },
  { name: "latitude", label: "LATITUDE" },
  { name: "weekdays", label: "WEEKDAYS" },
  { name: "hours", label: "HOURS" },
]

export const SOCIAL_FIELDS: SettingsField[] = [
  { name: "tiktokUrl", label: "TIKTOK" },
  { name: "facebookUrl", label: "FACEBOOK" },
  { name: "twitterUrl", label: "TWITTER" },
  { name: "instagramUrl", label: "INSTAGRAM" },
]
