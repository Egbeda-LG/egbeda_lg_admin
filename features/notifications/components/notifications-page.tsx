"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  RiCheckDoubleLine,
  RiFilter3Line,
  RiSearchLine,
} from "@remixicon/react"

import { AdminShell } from "@/components/layout/admin-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { Input } from "@/components/ui/input"
import { PaginationFooter } from "@/components/ui/pagination-footer"
import { NotificationsEmptyIcon } from "@/components/icons/empty-states"
import { NotificationRow } from "@/features/notifications/components/notification-row"
import {
  filterNotifications,
  markAllRead,
  markRead,
  NOTIFICATION_TABS,
  removeNotification,
  type NotificationRow as NotificationRowData,
  type NotificationTab,
} from "@/features/notifications/notifications.utils"
import { cn } from "@/lib/utils"

export function NotificationsPage() {
  const router = useRouter()
  // No notifications endpoint exists yet, so the list lives in local state.
  const [items, setItems] = React.useState<NotificationRowData[]>([])
  const [tab, setTab] = React.useState<NotificationTab>("All")
  const [search, setSearch] = React.useState("")

  const filteredItems = filterNotifications(items, { tab, search })

  const handleOpen = (notification: NotificationRowData) => {
    setItems((previous) => markRead(previous, notification.id))
    if (notification.actionUrl) router.push(notification.actionUrl)
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title="Notification"
          description="Everything that needs your attention across the admin console."
          actions={
            <Button
              type="button"
              size="sm"
              onClick={() => setItems(markAllRead)}
              className="h-10 self-start rounded-xl bg-[#701a2e] px-4 text-xs font-medium text-white shadow-sm hover:bg-[#571323] sm:self-auto"
            >
              <RiCheckDoubleLine className="mr-1.5 size-4" />
              Mark all read
            </Button>
          }
        />

        <div className="bg-card flex flex-col gap-4 rounded-2xl border p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <RiSearchLine className="text-muted-foreground absolute top-2.5 left-3 size-4" />
            <Input
              placeholder="Search notification"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="bg-background border-input h-9 rounded-xl pl-9 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {NOTIFICATION_TABS.map((notificationTab) => (
              <button
                key={notificationTab}
                type="button"
                onClick={() => setTab(notificationTab)}
                className={cn(
                  "rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all",
                  tab === notificationTab
                    ? "bg-[#701a2e] text-white"
                    : "border-input bg-background text-muted-foreground hover:text-foreground hover:bg-muted/40 border",
                )}
              >
                {notificationTab}
              </button>
            ))}

            <Button
              variant="outline"
              size="sm"
              className="border-input ml-1 h-8 rounded-xl text-xs font-semibold shadow-none"
            >
              <RiFilter3Line className="text-muted-foreground mr-1 size-3.5" />
              Filter
            </Button>
          </div>
        </div>

        <div className="bg-card divide-border/60 space-y-0 divide-y rounded-2xl border p-6 shadow-sm">
          {filteredItems.length === 0 ? (
            <EmptyState
              icon={<NotificationsEmptyIcon />}
              title="All caught up!"
              description="There are no pending alerts or notifications requiring your attention."
              className="border-0 py-12 shadow-none"
            />
          ) : (
            filteredItems.map((item) => (
              <NotificationRow
                key={item.id}
                notification={item}
                onOpen={handleOpen}
                onMarkRead={(id) =>
                  setItems((previous) => markRead(previous, id))
                }
                onDelete={(id) =>
                  setItems((previous) => removeNotification(previous, id))
                }
              />
            ))
          )}
        </div>

        <PaginationFooter className="flex-col items-center gap-4 border-t-0 pt-0 sm:flex-row" />
      </div>
    </AdminShell>
  )
}
