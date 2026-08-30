export type PaginationQuery = {
  page?: number
  limit?: number
}

/**
 * Server-side filters supported by the list endpoints. Comma-separated values
 * are accepted for the multi-value filters (e.g. `category=announcement,health`).
 */
export type ListQuery = PaginationQuery & {
  search?: string
  status?: string
  category?: string
  is_featured?: boolean
  ward?: string
  ward_id?: string
  department?: string
  office?: string
  email?: string
  subject?: string
  type?: string
}

export type PaginationMeta = {
  page: number
  limit: number
  total: number
  total_pages: number
}

export type PaginatedResponse<T, TStats = never> = {
  data: T[]
  meta: PaginationMeta
  stats?: TStats
}

export type MessageResponse = {
  message: string
}

export type AdminProfile = {
  id: string
  name: string
  email: string
  work_email?: string
  phone_number?: string
  staff_id?: string
  department?: string
  photo_url?: string
  role: string
}

export type RequestLoginOtpPayload = {
  email: string
}

export type ConfirmLoginPayload = {
  email: string
  password: string
  otp: string
}

export type ConfirmLoginResponse = {
  access_token: string
}

export type ConfirmChangePasswordPayload = {
  email: string
  otp: string
  current_password: string
  new_password: string
}

export type PresignedUploadPayload = {
  file_name: string
  content_type: string
  folder: string
}

export type PresignedUploadResponse = {
  upload_url: string
  file_url: string
  key: string
  expires_in: number
}

export type NewsItem = {
  _id: string
  title: string
  content: string
  status: string
  is_featured: boolean
  category: string
  createdAt?: string
  updatedAt?: string
}

export type NewsPayload = Omit<NewsItem, "_id" | "createdAt" | "updatedAt">

export type NewsStats = {
  published: number
  completed_projects: number
  landmarks_and_culture: number
}

export type ProjectItem = {
  _id: string
  name: string
  ward_id: string
  /** Returned by the API. Must NOT be sent on create/update - it is rejected. */
  ward_number?: string
  location: string
  start_date: string
  end_date: string
  contractor: string
  description: string
  photo_url: string
  status: string
  is_featured: boolean
}

export type ProjectPayload = Omit<ProjectItem, "_id" | "ward_number">

export type ProjectStats = {
  total_wards: number
  wards_covered: number
}

export type LandmarkItem = {
  _id: string
  name: string
  category: string
  description: string
  location: string
  photo_url: string
  status: string
  is_featured: boolean
}

export type LandmarkPayload = Omit<LandmarkItem, "_id">

export type ServiceItem = {
  _id: string
  name: string
  short_description: string
  department: string
  /**
   * The service fee. Sent as a plain numeric string ("500"); tolerated as a
   * number, null or absent on the way back, since records created before the
   * field existed carry no price at all.
   */
  price?: string | number | null
  timeline: string
  description: string
  eligibility: string[]
  required_documents: string[]
  application_process: string[]
  status: string
  is_featured: boolean
}

export type ServicePayload = Omit<ServiceItem, "_id">

export type DepartmentItem = {
  _id: string
  name: string
  head_of_department: string
  staff_no: number
  status: string
  description: string
}

export type DepartmentPayload = Omit<DepartmentItem, "_id">

export type PastGovernmentItem = {
  _id: string
  name: string
  date: string
  sort_order: number
  election_type: string
  createdAt: string
  updatedAt: string
}

export type PastGovernmentPayload = {
  name: string
  date: string
  sort_order: number
  election_type: string
}

export type WardItem = {
  ward_id: string
  ward_number: string
  name: string
}

export type SocialMediaLink = {
  platform: string
  url: string
}

export type PlacementImage = {
  photo_url: string
  is_in_homepage: boolean
  is_in_government: boolean
  is_in_about: boolean
}

export type CouncillorItem = {
  _id: string
  name: string
  ward_id: string
  /** Returned by the API. Must NOT be sent on create/update - it is rejected. */
  ward_number?: string
  status: string
  social_media: SocialMediaLink[]
  images: PlacementImage[]
}

export type CouncillorPayload = Omit<CouncillorItem, "_id" | "ward_number">

export type ManagementItem = {
  _id: string
  name: string
  office: string
  status: string
  description: string
  photo_url: string
  social_media: SocialMediaLink[]
}

export type ManagementPayload = Omit<ManagementItem, "_id">

export type NulgeItem = {
  _id: string
  name: string
  office: string
  status: string
  social_media: SocialMediaLink[]
  images: PlacementImage[]
}

export type NulgePayload = Omit<NulgeItem, "_id">

/**
 * Payload attached to a notification. Which keys are present depends on the
 * notification's `type`: a "user_feedback" record carries the contact-form
 * submission, while entity activity ("project_updated", "management_updated",
 * ...) carries only the entity it refers to. Nothing here is guaranteed.
 */
export type NotificationMeta = {
  first_name?: string
  last_name?: string
  email?: string
  phone_number?: string
  subject?: string
  message?: string
  attachment_url?: string
  entity_id?: string
  entity_name?: string
}

/**
 * An entry in the notifications feed. `message` is a pre-rendered summary line
 * ("Amina Saliu sent feedback: Road maintenance request"), NOT the body a
 * sender wrote - that is meta.message on a "user_feedback" record.
 */
export type NotificationItem = {
  _id: string
  type: string
  title: string
  message: string
  is_read: boolean
  meta?: NotificationMeta
  createdAt: string
  updatedAt: string
}

export type MarkAllReadResponse = {
  message: string
  modified_count: number
}

/**
 * GET /messages returns the notifications feed on this backend - the same
 * records, byte for byte, not the flat shape the API docs still show. The
 * inbox narrows it to type=user_feedback.
 */
export type ContactMessage = NotificationItem

export type OrganizationDetails = {
  official_name: string
  lg_name: string
  state: string
  region: string
  year_of_establishment: number
  landmass_per_sq_km: number
  population: number
  no_of_wards: number
  no_of_schools: number
  no_of_health_centres: number
  no_of_staffs: number
  about: string
}

export type ChairmanInfo = {
  official_name: string
  short_name: string
  years_in_service: string
  projects_delivered: string
  town_halls_hosted: string
  no_of_staffs: string
  biography: string
  message: string
  social_media: SocialMediaLink[]
  images: PlacementImage[]
}

export type ContactAndSupport = {
  official_email: string
  support_email: string
  emergency_line_1: string
  emergency_line_2: string
  headquater_address: string
  google_map_link: string
  latitude: number
  longitude: number
  weekdays: string
  hours: string
}

export type OrganizationSettings = {
  organization: OrganizationDetails
  chairman_info: ChairmanInfo
  /** Same shape as the chairman; omitted until a vice chairman is recorded. */
  vice_chairman_info?: ChairmanInfo
  contact_and_support: ContactAndSupport
  social_media: SocialMediaLink[]
}

/**
 * Shape returned by GET /organization-settings. The backend creates the
 * document lazily, so every section (and every field inside it) can be
 * absent until the settings have been saved at least once.
 */
export type OrganizationSettingsResponse = {
  organization?: Partial<OrganizationDetails>
  chairman_info?: Partial<ChairmanInfo>
  vice_chairman_info?: Partial<ChairmanInfo>
  contact_and_support?: Partial<ContactAndSupport>
  social_media?: SocialMediaLink[]
}
