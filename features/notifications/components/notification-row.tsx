"use client"

import { RiDeleteBinLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { NotificationIcon } from "@/features/notifications/components/notification-icon"
import type { NotificationRow as NotificationRowData } from "@/features/notifications/notifications.utils"

type NotificationRowProps = {
  notification: NotificationRowData
  onOpen: (notification: NotificationRowData) => void
  onMarkRead: (id: string) => void
  onDelete: (id: string) => void
  isBusy?: boolean
}

export function NotificationRow({
  notification,
  onOpen,
  onMarkRead,
  onDelete,
  isBusy,
}: NotificationRowProps) {
  return (
    <div className="hover:bg-muted/10 flex flex-col justify-between gap-4 rounded-xl px-2 py-4 transition-colors first:pt-0 last:pb-0 sm:flex-row sm:items-center">
      <div className="flex min-w-0 items-start gap-3.5">
        <NotificationIcon type={notification.iconType} />
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-foreground font-serif text-sm font-bold">
              {notification.title}
            </h3>
            {!notification.read && (
              <span className="size-2 shrink-0 rounded-full bg-[#701a2e]" />
            )}
          </div>
          <p className="text-muted-foreground truncate text-xs leading-relaxed sm:whitespace-normal">
            {notification.subtitle}
          </p>
          <p className="text-muted-foreground/70 text-[10px]">
            {notification.time}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 self-end sm:self-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-input h-8 rounded-xl px-3 text-xs font-medium shadow-none"
          onClick={() => onOpen(notification)}
        >
          Open
        </Button>

        {!notification.read && (
          <button
            type="button"
            onClick={() => onMarkRead(notification.id)}
            disabled={isBusy}
            className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors disabled:opacity-50"
          >
            Mark read
          </button>
        )}

        <button
          type="button"
          onClick={() => onDelete(notification.id)}
          disabled={isBusy}
          title="Delete notification"
          className="p-1 text-rose-500 transition-colors hover:text-rose-700 disabled:opacity-50"
        >
          <RiDeleteBinLine className="size-4" />
        </button>
      </div>
    </div>
  )
}
