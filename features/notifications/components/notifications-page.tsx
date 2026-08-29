"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  RiCheckDoubleLine,
  RiRefreshLine,
  RiSearchLine,
} from "@remixicon/react"

import { AdminShell } from "@/components/layout/admin-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { Input } from "@/components/ui/input"
import { ListSkeleton } from "@/components/ui/loading-skeletons"
import { PaginationFooter } from "@/components/ui/pagination-footer"
import { NotificationsEmptyIcon } from "@/components/icons/empty-states"
import { NotificationRow } from "@/features/notifications/components/notification-row"
import {
  useDeleteNotification,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
} from "@/features/notifications/notifications.hooks"
import {
  ALL_CATEGORIES,
  filterNotifications,
  NOTIFICATION_TABS,
  notificationCategories,
  toNotificationRows,
  unreadCount,
  type NotificationRow as NotificationRowData,
  type NotificationTab,
} from "@/features/notifications/notifications.utils"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 20

export function NotificationsPage() {
  const router = useRouter()
  const [page, setPage] = React.useState(1)
  const [tab, setTab] = React.useState<NotificationTab>("All")
  const [category, setCategory] = React.useState(ALL_CATEGORIES)
  const [search, setSearch] = React.useState("")
  const debouncedSearch = useDebouncedValue(search)

  const notificationsQuery = useNotifications({ page, limit: PAGE_SIZE })
  const markRead = useMarkNotificationRead()
  const markAllRead = useMarkAllNotificationsRead()
  const deleteNotification = useDeleteNotification()

  const rows = React.useMemo(
    () => toNotificationRows(notificationsQuery.data?.data),
    [notificationsQuery.data],
  )
  // Built from the page in hand, so a chip is only ever offered when it
  // matches something. The endpoint exposes no search, so both the chips and
  // the search box narrow the rows already loaded.
  const categories = React.useMemo(() => notificationCategories(rows), [rows])
  // A chip can stop existing when the page changes. Derive the one actually in
  // force rather than storing it, so the list never filters down to nothing.
  const activeCategory = categories.some((entry) => entry.category === category)
    ? category
    : ALL_CATEGORIES
  const filteredRows = React.useMemo(
    () =>
      filterNotifications(rows, {
        tab,
        category: activeCategory,
        search: debouncedSearch,
      }),
    [rows, tab, activeCategory, debouncedSearch],
  )

  const unread = unreadCount(rows)
  const totalPages = notificationsQuery.data?.meta.total_pages ?? 1

  const handleOpen = (notification: NotificationRowData) => {
    if (!notification.read) markRead.mutate(notification.id)
    if (notification.actionUrl) router.push(notification.actionUrl)
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title="Notification"
          description={
            unread > 0
              ? `${unread} unread of ${notificationsQuery.data?.meta.total ?? rows.length} notifications.`
              : "Everything that needs your attention across the admin console."
          }
          actions={
            <Button
              type="button"
              size="sm"
              onClick={() => markAllRead.mutate()}
              disabled={markAllRead.isPending || unread === 0}
              className="h-10 self-start rounded-xl bg-[#701a2e] px-4 text-xs font-medium text-white shadow-sm hover:bg-[#571323] sm:self-auto"
            >
              <RiCheckDoubleLine className="mr-1.5 size-4" />
              {markAllRead.isPending ? "Marking..." : "Mark all read"}
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
                {notificationTab === "Unread" && unread > 0 && ` (${unread})`}
              </button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => notificationsQuery.refetch()}
              disabled={notificationsQuery.isFetching}
              className="border-input ml-1 h-8 rounded-xl text-xs font-semibold shadow-none"
            >
              <RiRefreshLine
                className={cn(
                  "text-muted-foreground mr-1 size-3.5",
                  notificationsQuery.isFetching && "animate-spin",
                )}
              />
              Refresh
            </Button>
          </div>
        </div>

        {categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { category: ALL_CATEGORIES, count: rows.length },
              ...categories,
            ].map((entry) => (
              <button
                key={entry.category}
                type="button"
                onClick={() => setCategory(entry.category)}
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-medium transition-all",
                  activeCategory === entry.category
                    ? "bg-[#701a2e]/10 text-[#701a2e] ring-1 ring-[#701a2e]/30"
                    : "bg-muted/60 text-muted-foreground hover:text-foreground",
                )}
              >
                {entry.category} ({entry.count})
              </button>
            ))}
          </div>
        )}

        <div className="bg-card divide-border/60 space-y-0 divide-y rounded-2xl border p-6 shadow-sm">
          {notificationsQuery.isLoading ? (
            <ListSkeleton rows={5} />
          ) : notificationsQuery.isError ? (
            <EmptyState
              icon={<NotificationsEmptyIcon />}
              title="Could not load notifications"
              description="Something went wrong reaching the server. Try again in a moment."
              className="border-0 py-12 shadow-none"
            />
          ) : filteredRows.length === 0 ? (
            <EmptyState
              icon={<NotificationsEmptyIcon />}
              title={rows.length === 0 ? "All caught up!" : "Nothing matches"}
              description={
                rows.length === 0
                  ? "There are no pending alerts or notifications requiring your attention."
                  : "No notification matches the current search and filters."
              }
              className="border-0 py-12 shadow-none"
            />
          ) : (
            filteredRows.map((item) => (
              <NotificationRow
                key={item.id}
                notification={item}
                onOpen={handleOpen}
                onMarkRead={(id) => markRead.mutate(id)}
                onDelete={(id) => deleteNotification.mutate(id)}
                isBusy={
                  markRead.isPending && markRead.variables === item.id
                    ? true
                    : deleteNotification.isPending &&
                      deleteNotification.variables === item.id
                }
              />
            ))
          )}
        </div>

        <PaginationFooter
          className="flex-col items-center gap-4 border-t-0 pt-0 sm:flex-row"
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isBusy={notificationsQuery.isFetching}
        />
      </div>
    </AdminShell>
  )
}
