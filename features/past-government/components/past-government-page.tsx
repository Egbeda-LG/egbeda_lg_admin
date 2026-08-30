"use client"

import * as React from "react"
import { RiAddLine } from "@remixicon/react"

import { AdminShell } from "@/components/layout/admin-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog"
import { DataTable } from "@/components/ui/data-table"
import { EmptyState } from "@/components/ui/empty-state"
import { FilterPills } from "@/components/ui/filter-pills"
import { TableSkeleton } from "@/components/ui/loading-skeletons"
import { SearchField } from "@/components/ui/search-field"
import { ExecutiveEmptyIcon } from "@/components/icons/empty-states"
import { pastGovernmentColumns } from "@/features/past-government/components/past-government-columns"
import { PastGovernmentFormDialog } from "@/features/past-government/components/past-government-form-dialog"
import {
  useDeletePastGovernment,
  usePastGovernments,
} from "@/features/past-government/past-government.hooks"
import {
  filterPastGovernments,
  toPastGovernmentRows,
  type PastGovernmentRow,
} from "@/features/past-government/past-government.utils"
import { ELECTION_TYPE_OPTIONS } from "@/lib/api/enums"
import { PRIMARY_ACTION_CLASS } from "@/lib/ui/form-styles"

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  ...ELECTION_TYPE_OPTIONS,
]

export function PastGovernmentPage() {
  const [search, setSearch] = React.useState("")
  const [electionType, setElectionType] = React.useState("all")
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [deleteTarget, setDeleteTarget] =
    React.useState<PastGovernmentRow | null>(null)

  const pastGovernmentsQuery = usePastGovernments({ page: 1, limit: 100 })
  const deletePastGovernment = useDeletePastGovernment()

  const records = React.useMemo(
    () => toPastGovernmentRows(pastGovernmentsQuery.data?.data),
    [pastGovernmentsQuery.data],
  )
  // The endpoint takes no search or type parameter, so both narrow the loaded
  // rows rather than being pushed to the server.
  const filteredRecords = React.useMemo(
    () => filterPastGovernments(records, { search, electionType }),
    [records, search, electionType],
  )

  const confirmDelete = () => {
    if (!deleteTarget) return

    deletePastGovernment.mutate(deleteTarget.id, {
      onSettled: () => setDeleteTarget(null),
    })
  }

  const columns = pastGovernmentColumns({ onDelete: setDeleteTarget })

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title="Past government"
          description="Leaders who have governed Egbeda Local Government, and how each came into office."
          actions={
            <Button
              size="sm"
              className={PRIMARY_ACTION_CLASS}
              onClick={() => setIsFormOpen(true)}
            >
              <RiAddLine className="mr-1.5 size-4" />
              Add past administration
            </Button>
          }
        />

        <div className="bg-card flex flex-col gap-4 rounded-2xl border p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <SearchField
            value={search}
            onValueChange={setSearch}
            placeholder="Search by name or date"
          />
          <FilterPills
            options={FILTER_OPTIONS}
            value={electionType}
            onValueChange={setElectionType}
          />
        </div>

        {pastGovernmentsQuery.isLoading ? (
          <TableSkeleton columns={4} />
        ) : filteredRecords.length > 0 ? (
          <DataTable columns={columns} data={filteredRecords} />
        ) : (
          <EmptyState
            icon={<ExecutiveEmptyIcon />}
            title={
              records.length === 0
                ? "No past administrations yet"
                : "Nothing matches"
            }
            description={
              records.length === 0
                ? "Add the leaders who have governed Egbeda Local Government to build up the record."
                : "No past administration matches the current search and filter."
            }
          />
        )}

        <PastGovernmentFormDialog
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
        />

        <ConfirmDeleteDialog
          open={Boolean(deleteTarget)}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          title="Delete this record?"
          description={`${deleteTarget?.name ?? "This administration"} will be removed from the past government record. This cannot be undone.`}
          onConfirm={confirmDelete}
          disabled={deletePastGovernment.isPending}
        />
      </div>
    </AdminShell>
  )
}
