"use client"

import { createResourceHooks } from "@/lib/query/create-resource-hooks"
import type {
  ContactMessage,
  ContactMessagePayload,
  PaginatedResponse,
} from "@/lib/api/types"
import { messagesRepository } from "@/features/messages/messages.repository"

const hooks = createResourceHooks<
  ContactMessage,
  ContactMessagePayload,
  PaginatedResponse<ContactMessage>
>("messages", messagesRepository)

export const messageKeys = hooks.keys
export const useMessages = hooks.useList
export const useMessage = hooks.useDetail
export const useCreateMessage = () => hooks.useCreate("Message created")
/** Replies are posted through the same create endpoint. */
export const useSendReply = () => hooks.useCreate("Reply sent")
export const useUpdateMessage = () => hooks.useUpdate("Message updated")
export const useDeleteMessage = () => hooks.useRemove("Message deleted")
