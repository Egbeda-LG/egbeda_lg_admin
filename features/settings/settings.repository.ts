import { request } from "@/lib/api/request"
import type {
  MessageResponse,
  OrganizationSettings,
  OrganizationSettingsResponse,
} from "@/lib/api/types"

export const settingsRepository = {
  get: () =>
    request.get<OrganizationSettingsResponse>("/api/v1/organization-settings"),
  update: (payload: OrganizationSettings) =>
    request.patch<MessageResponse>("/api/v1/organization-settings", payload),
}
