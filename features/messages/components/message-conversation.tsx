"use client"

import { RiDeleteBinLine } from "@remixicon/react"

import { EmptyState } from "@/components/ui/empty-state"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSelectIcon } from "@/components/icons/empty-states"
import type { MessageRow } from "@/features/messages/messages.utils"

type MessageConversationProps = {
  message: MessageRow
  isEmpty: boolean
  isLoading?: boolean
  onDelete: (id: string) => void
}

export function MessageConversation({
  message,
  isEmpty,
  isLoading,
  onDelete,
}: MessageConversationProps) {
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
          description="Choose an incoming inquiry from the conversation list to read the full message."
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
          </div>
        </>
      )}
    </div>
  )
}
