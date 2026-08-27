"use client"

import * as React from "react"
import {
  RiAttachment2,
  RiAttachmentLine,
  RiDeleteBinLine,
  RiReplyLine,
  RiSendPlaneFill,
} from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { Textarea } from "@/components/ui/textarea"
import { MessageSelectIcon } from "@/components/icons/empty-states"
import type { MessageRow } from "@/features/messages/messages.utils"

import { Skeleton } from "@/components/ui/skeleton"
type MessageConversationProps = {
  message: MessageRow
  isEmpty: boolean
  isLoading?: boolean
  replyText: string
  onReplyTextChange: (value: string) => void
  onSendReply: () => void
  isSendingReply?: boolean
  onDelete: (id: string) => void
}

export function MessageConversation({
  message,
  isEmpty,
  isLoading,
  replyText,
  onReplyTextChange,
  onSendReply,
  isSendingReply,
  onDelete,
}: MessageConversationProps) {
  const replyRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!replyText.trim()) return

    onSendReply()
  }

  return (
    <div className="bg-card space-y-6 rounded-2xl border p-6 shadow-sm lg:col-span-7">
      {isLoading ? (
        <div className="space-y-4" aria-busy="true">
          <div className="flex items-center gap-3 border-b pb-4">
            <Skeleton className="size-11 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
            </div>
          </div>
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      ) : isEmpty ? (
        <EmptyState
          icon={<MessageSelectIcon />}
          title="Select a message"
          description="Choose an incoming inquiry from the conversation list to read the full body and send a reply."
          className="border-0 py-16 shadow-none"
        />
      ) : (
        <>
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#701a2e] font-serif text-sm font-bold text-white">
                {message.initials}
              </div>
              <div>
                <h3 className="text-foreground font-serif text-base font-bold">
                  {message.sender}
                </h3>
                <p className="text-muted-foreground text-xs">
                  {message.email} · {message.phone}
                </p>
              </div>
            </div>

            <div className="text-muted-foreground flex items-center gap-1">
              <button
                onClick={() => onDelete(message.id)}
                title="Delete message"
                className="hover:bg-muted hover:text-destructive rounded-lg p-2 transition-colors"
              >
                <RiDeleteBinLine className="size-4" />
              </button>
              <button
                onClick={() => replyRef.current?.focus()}
                title="Reply"
                className="hover:bg-muted rounded-lg p-2 transition-colors"
              >
                <RiReplyLine className="size-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-foreground font-serif text-xl font-bold">
                {message.subject}
              </h2>
              <p className="text-muted-foreground mt-1 text-xs">
                Submitted via {message.channel.toLowerCase()} form ·{" "}
                {message.date} · {message.time}
              </p>
            </div>

            <div className="text-foreground/90 space-y-2 pt-2 text-xs leading-relaxed whitespace-pre-line">
              <p>{message.body}</p>
              <p className="text-foreground pt-2 font-semibold">
                — {message.sender}
              </p>
            </div>

            {message.attachment && (
              <div className="border-border/50 space-y-2 border-t pt-4">
                <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                  ATTACHMENTS
                </span>
                <div>
                  <span className="bg-muted/30 text-foreground hover:bg-muted/60 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors">
                    <RiAttachment2 className="text-muted-foreground size-4" />
                    <span>
                      {message.attachment.name} ·{" "}
                      <span className="text-muted-foreground">
                        {message.attachment.size}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 border-t pt-4">
            <div className="bg-background space-y-3 rounded-2xl border p-3 focus-within:ring-1 focus-within:ring-[#701a2e]">
              <Textarea
                ref={replyRef}
                placeholder="Write a reply..."
                value={replyText}
                onChange={(event) => onReplyTextChange(event.target.value)}
                rows={4}
                className="w-full resize-none border-0 bg-transparent p-0 text-xs shadow-none focus-visible:ring-0"
              />

              <div className="border-border/40 flex items-center justify-between border-t pt-2">
                <button
                  type="button"
                  title="Attach file"
                  className="text-muted-foreground hover:text-foreground p-1.5 transition-colors"
                >
                  <RiAttachmentLine className="size-4" />
                </button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSendingReply || !replyText.trim()}
                  className="h-9 rounded-xl bg-[#701a2e] px-4 text-xs font-medium text-white shadow-sm hover:bg-[#571323]"
                >
                  <RiSendPlaneFill className="mr-1.5 size-3.5" />
                  {isSendingReply ? "Sending..." : "Send reply"}
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
