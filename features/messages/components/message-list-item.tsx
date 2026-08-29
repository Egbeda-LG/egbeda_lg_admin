"use client"

import type { MessageRow } from "@/features/messages/messages.utils"
import { cn } from "@/lib/utils"

type MessageListItemProps = {
  message: MessageRow
  isSelected: boolean
  onSelect: (id: string) => void
}

export function MessageListItem({
  message,
  isSelected,
  onSelect,
}: MessageListItemProps) {
  return (
    <div
      onClick={() => onSelect(message.id)}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all",
        isSelected
          ? "border-l-4 border-[#701a2e]/30 border-l-[#701a2e] bg-[#701a2e]/5"
          : "hover:bg-muted/30 border-transparent",
      )}
    >
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold",
          isSelected ? "bg-[#701a2e] text-white" : "bg-muted text-foreground",
        )}
      >
        {message.initials}
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-foreground truncate text-xs font-bold">
            {message.sender}
          </p>
          <span className="text-muted-foreground shrink-0 text-[10px]">
            {message.time}
          </span>
        </div>
        <p className="text-foreground/90 truncate text-xs font-medium">
          {message.subject}
        </p>
        <div className="flex items-center gap-2 pt-0.5">
          <span className="bg-muted/60 text-muted-foreground inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium">
            {message.date}
          </span>
        </div>
      </div>
    </div>
  )
}
