"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { RiAddLine, RiDownloadLine, RiFilterLine } from "@remixicon/react"

import { AdminShell } from "@/components/layout/admin-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog"
import { DataTable } from "@/components/ui/data-table"
import { EmptyState } from "@/components/ui/empty-state"
import { TableSkeleton } from "@/components/ui/loading-skeletons"
import { FilterPills } from "@/components/ui/filter-pills"
import { SearchField } from "@/components/ui/search-field"
import { StatCard } from "@/components/ui/stat-card"
import { NewsroomEmptyIcon } from "@/components/icons/empty-states"
import { newsColumns } from "@/features/news/components/news-columns"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { listQuery } from "@/lib/api/list-query"
import { useDeleteNews, useNewsList } from "@/features/news/news.hooks"
import {
  NEWS_FILTER_OPTIONS,
  toNewsRows,
  toNewsStats,
} from "@/features/news/news.utils"
import {
  PRIMARY_ACTION_CLASS,
  SECONDARY_ACTION_CLASS,
} from "@/lib/ui/form-styles"

export function NewsroomPage() {
  const router = useRouter()
  const [search, setSearch] = React.useState("")
  const [status, setStatus] = React.useState("all")
  const debouncedSearch = useDebouncedValue(search)

  // Filtering happens server-side; see GET /news?search=&status=
  const newsQuery = useNewsList(
    listQuery({ page: 1, limit: 100, search: debouncedSearch, status }),
  )
  const deleteNews = useDeleteNews()
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(
    null,
  )

  const articles = React.useMemo(
    () => toNewsRows(newsQuery.data?.data),
    [newsQuery.data],
  )
  const stats = React.useMemo(
    () => toNewsStats(newsQuery.data),
    [newsQuery.data],
  )

  const handleDeleteConfirm = () => {
    if (!deleteTargetId) return

    deleteNews.mutate(deleteTargetId, {
      onSettled: () => setDeleteTargetId(null),
    })
  }

  const columns = newsColumns({
    onView: (id) => router.push(`/newsroom/view?id=${id}`),
    onEdit: (id) => router.push(`/newsroom/edit?id=${id}`),
    onDelete: setDeleteTargetId,
  })

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title="News & Articles"
          description="Draft, schedule and publish official news for the Egbeda LG website."
          actions={
            <>
              <Button
                variant="outline"
                size="sm"
                className={SECONDARY_ACTION_CLASS}
                disabled
                title="Report export is not available yet"
              >
                <RiDownloadLine className="text-muted-foreground mr-2 size-4" />
                Export report
              </Button>
              <Button
                size="sm"
                className={PRIMARY_ACTION_CLASS}
                onClick={() => router.push("/newsroom/compose")}
              >
                <RiAddLine className="mr-1.5 size-4" />
                New article
              </Button>
            </>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <SearchField
            value={search}
            onValueChange={setSearch}
            placeholder="Search articles..."
          />

          <div className="flex flex-wrap items-center gap-2">
            <FilterPills
              options={NEWS_FILTER_OPTIONS}
              value={status}
              onValueChange={setStatus}
            />

            <Button
              variant="outline"
              size="sm"
              className="border-input ml-auto h-9 rounded-full px-4 text-xs font-medium shadow-none sm:ml-0"
            >
              <RiFilterLine className="mr-1.5 size-3.5" />
              Filter
            </Button>
          </div>
        </div>

        {newsQuery.isLoading ? (
          <TableSkeleton columns={6} />
        ) : articles.length > 0 ? (
          <DataTable columns={columns} data={articles} />
        ) : (
          <EmptyState
            icon={<NewsroomEmptyIcon />}
            title="No news articles found"
            description="Official news releases, articles, and community announcements will appear here once drafted or published."
            action={
              <Button
                size="sm"
                className="h-9 rounded-xl bg-[#701a2e] text-xs font-medium text-white shadow-sm hover:bg-[#571323]"
                onClick={() => router.push("/newsroom/compose")}
              >
                <RiAddLine className="mr-1.5 size-4" />
                New article
              </Button>
            }
          />
        )}

        <ConfirmDeleteDialog
          open={Boolean(deleteTargetId)}
          onOpenChange={(open) => !open && setDeleteTargetId(null)}
          title="Delete Article?"
          description="This article will be permanently removed from the news feed. This action cannot be undone."
          onConfirm={handleDeleteConfirm}
          disabled={deleteNews.isPending}
        />
      </div>
    </AdminShell>
  )
}
