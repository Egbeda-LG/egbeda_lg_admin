"use client"

import { RiSearchLine } from "@remixicon/react"

import { EmptyState } from "@/components/ui/empty-state"
import { Input } from "@/components/ui/input"
import { MessagesEmptyIcon } from "@/components/icons/empty-states"
import { ListSkeleton } from "@/components/ui/loading-skeletons"
import { MessageListItem } from "@/features/messages/components/message-list-item"
import {
  MESSAGE_TABS,
  type MessageRow,
  type MessageTab,
} from "@/features/messages/messages.utils"
import { cn } from "@/lib/utils"

type MessageInboxProps = {
  messages: MessageRow[]
  isLoading?: boolean
  selectedId: string
  onSelect: (id: string) => void
  search: string
  onSearchChange: (value: string) => void
  tab: MessageTab
  onTabChange: (tab: MessageTab) => void
}

export function MessageInbox({
  messages,
  isLoading,
  selectedId,
  onSelect,
  search,
  onSearchChange,
  tab,
  onTabChange,
}: MessageInboxProps) {
  return (
    <div className="bg-card space-y-4 rounded-2xl border p-4 shadow-sm lg:col-span-5">
      <div className="relative">
        <RiSearchLine className="text-muted-foreground absolute top-3 left-3 size-4" />
        <Input
          placeholder="Search inbox"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="bg-background border-input h-10 rounded-xl pl-9 text-xs"
        />
      </div>

      <div className="flex items-center gap-1 border-b pb-2">
        {MESSAGE_TABS.map((messageTab) => (
          <button
            key={messageTab}
            onClick={() => onTabChange(messageTab)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
              tab === messageTab
                ? "bg-[#701a2e] text-white"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
            )}
          >
            {messageTab}
          </button>
        ))}
      </div>

      <div className="max-h-[600px] space-y-2 overflow-y-auto pr-1">
        {isLoading && <ListSkeleton rows={5} />}

        {!isLoading && messages.length === 0 && (
          <EmptyState
            icon={<MessagesEmptyIcon className="size-24" />}
            title="No messages found"
            description="Citizen inquiries and public contact submissions will appear in your inbox."
            className="min-h-48 py-8"
          />
        )}

        {messages.map((message) => (
          <MessageListItem
            key={message.id}
            message={message}
            isSelected={message.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}
