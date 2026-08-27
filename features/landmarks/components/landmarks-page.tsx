"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { RiAddLine } from "@remixicon/react"

import { AdminShell } from "@/components/layout/admin-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog"
import { EmptyState } from "@/components/ui/empty-state"
import { CardGridSkeleton } from "@/components/ui/loading-skeletons"
import { FilterPills } from "@/components/ui/filter-pills"
import { PaginationFooter } from "@/components/ui/pagination-footer"
import { SearchField } from "@/components/ui/search-field"
import { LandmarksEmptyIcon } from "@/components/icons/empty-states"
import { LandmarkCard } from "@/features/landmarks/components/landmark-card"
import {
  useDeleteLandmark,
  useLandmarks,
} from "@/features/landmarks/landmarks.hooks"
import {
  LANDMARK_FILTER_OPTIONS,
  toLandmarkRows,
} from "@/features/landmarks/landmarks.utils"
import { PRIMARY_ACTION_CLASS } from "@/lib/ui/form-styles"

import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { listQuery } from "@/lib/api/list-query"
export function LandmarksPage() {
  const router = useRouter()
  const deleteLandmark = useDeleteLandmark()

  const [search, setSearch] = React.useState("")
  const [category, setCategory] = React.useState("all")
  const debouncedSearch = useDebouncedValue(search)

  // Filtering is applied server-side by the list endpoint.
  const landmarksQuery = useLandmarks(
    listQuery({ page: 1, limit: 100, search: debouncedSearch, category }),
  )
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(
    null,
  )

  const landmarks = React.useMemo(
    () => toLandmarkRows(landmarksQuery.data?.data),
    [landmarksQuery.data],
  )

  const goToForm = (id?: string) =>
    router.push(id ? `/landmarks/new?id=${id}` : "/landmarks/new")

  const handleDeleteConfirm = () => {
    if (!deleteTargetId) return

    deleteLandmark.mutate(deleteTargetId, {
      onSettled: () => setDeleteTargetId(null),
    })
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title="Landmarks & Culture"
          description="Promote cultural heritage, industrial hubs, commercial centers, and hospitality destinations across Egbeda."
          actions={
            <Button
              size="sm"
              className={PRIMARY_ACTION_CLASS}
              onClick={() => goToForm()}
            >
              <RiAddLine className="mr-1.5 size-4" />
              Add new landmark
            </Button>
          }
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchField
            value={search}
            onValueChange={setSearch}
            placeholder="Search landmarks..."
          />
          <FilterPills
            options={LANDMARK_FILTER_OPTIONS}
            value={category}
            onValueChange={setCategory}
          />
        </div>

        {landmarksQuery.isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CardGridSkeleton withMedia={true} />
          </div>
        ) : landmarks.length === 0 ? (
          <EmptyState
            icon={<LandmarksEmptyIcon className="size-28" />}
            title="No landmarks found"
            description="Promoted cultural heritage sites, commercial centers, and hospitality destinations will appear here."
            action={
              <Button
                size="sm"
                className="h-9 rounded-xl bg-[#701a2e] text-xs font-medium text-white shadow-sm hover:bg-[#571323]"
                onClick={() => goToForm()}
              >
                <RiAddLine className="mr-1.5 size-4" />
                Add new landmark
              </Button>
            }
          />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {landmarks.map((landmark) => (
                <LandmarkCard
                  key={landmark.id}
                  landmark={landmark}
                  onEdit={goToForm}
                  onDelete={setDeleteTargetId}
                />
              ))}
            </div>
            <PaginationFooter />
          </>
        )}

        <ConfirmDeleteDialog
          open={Boolean(deleteTargetId)}
          onOpenChange={(open) => !open && setDeleteTargetId(null)}
          title="Delete Landmark?"
          description="It will be removed from the public Landmarks & Culture directory."
          onConfirm={handleDeleteConfirm}
          disabled={deleteLandmark.isPending}
        />
      </div>
    </AdminShell>
  )
}
