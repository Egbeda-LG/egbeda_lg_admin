"use client"

import * as React from "react"

import { AdminShell } from "@/components/layout/admin-shell"
import { PageHeader } from "@/components/layout/page-header"
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog"
import { MessageConversation } from "@/features/messages/components/message-conversation"
import { MessageInbox } from "@/features/messages/components/message-inbox"
import {
  useDeleteMessage,
  useMessage,
  useMessages,
} from "@/features/messages/messages.hooks"
import {
  filterMessages,
  selectMessage,
  toMessageRow,
  toMessageRows,
  type MessageTab,
} from "@/features/messages/messages.utils"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { listQuery } from "@/lib/api/list-query"

export function MessagesPage() {
  const [selectedId, setSelectedId] = React.useState("")
  const [tab, setTab] = React.useState<MessageTab>("Inbox")
  const [search, setSearch] = React.useState("")
  const debouncedSearch = useDebouncedValue(search)

  // GET /messages is an alias of the notifications feed, so it also carries
  // entity activity ("project_updated", ...) that has no sender or subject.
  // type=user_feedback narrows it to actual contact-form submissions.
  // Search runs server-side; the Unread tab filters client-side on is_read.
  const messagesQuery = useMessages(
    listQuery({
      page: 1,
      limit: 100,
      search: debouncedSearch,
      type: "user_feedback",
    }),
  )
  const deleteMessage = useDeleteMessage()
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(
    null,
  )

  const messages = React.useMemo(
    () => toMessageRows(messagesQuery.data?.data),
    [messagesQuery.data],
  )
  const filteredMessages = React.useMemo(
    () => filterMessages(messages, { tab }),
    [messages, tab],
  )
  // Fall back to the list row so the pane has something to show while the
  // detail request is in flight (and before a row has been picked).
  const fallbackMessage = selectMessage(messages, selectedId)

  // GET /messages/:id - the list is a summary; the detail endpoint is the
  // source of truth for the message being read.
  const messageDetail = useMessage(fallbackMessage.id || null)
  const selectedMessage = messageDetail.data
    ? toMessageRow(messageDetail.data)
    : fallbackMessage

  const confirmDelete = () => {
    if (!deleteTargetId) return

    deleteMessage.mutate(deleteTargetId, {
      onSettled: () => setDeleteTargetId(null),
    })
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title="Messages"
          description="Read-only inbox of enquiries submitted through the public website's contact form."
        />

        <div className="grid items-start gap-6 lg:grid-cols-12">
          <MessageInbox
            messages={filteredMessages}
            isLoading={messagesQuery.isLoading}
            selectedId={selectedId}
            onSelect={setSelectedId}
            search={search}
            onSearchChange={setSearch}
            tab={tab}
            onTabChange={setTab}
          />

          <MessageConversation
            message={selectedMessage}
            isEmpty={!messagesQuery.isLoading && messages.length === 0}
            isLoading={messageDetail.isLoading}
            onDelete={setDeleteTargetId}
          />
        </div>

        <ConfirmDeleteDialog
          open={Boolean(deleteTargetId)}
          onOpenChange={(open) => !open && setDeleteTargetId(null)}
          title="Delete message?"
          description="This action will remove the conversation from your admin inbox."
          onConfirm={confirmDelete}
          disabled={deleteMessage.isPending}
        />
      </div>
    </AdminShell>
  )
}
