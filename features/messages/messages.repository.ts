import { createResourceRepository } from "@/lib/api/resource-repository"
import type { ContactMessage, ContactMessagePayload } from "@/lib/api/types"

export const messagesRepository = createResourceRepository<
  ContactMessage,
  ContactMessagePayload
>("/api/v1/messages")
