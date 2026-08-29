"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { RiAddLine, RiDownloadLine } from "@remixicon/react"

import { AdminShell } from "@/components/layout/admin-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog"
import { DataTable } from "@/components/ui/data-table"
import { EmptyState } from "@/components/ui/empty-state"
import {
  CardGridSkeleton,
  TableSkeleton,
} from "@/components/ui/loading-skeletons"
import { ExecutiveEmptyIcon } from "@/components/icons/empty-states"
import { councillorColumns } from "@/features/councillors/components/councillor-columns"
import {
  useCouncillors,
  useDeleteCouncillor,
} from "@/features/councillors/councillors.hooks"
import {
  toCouncillorRows,
  type CouncillorRow,
} from "@/features/councillors/councillors.utils"
import { ExecutiveOfficialCard } from "@/features/management/components/executive-official-card"
import { useManagement } from "@/features/management/management.hooks"
import { toManagementRows } from "@/features/management/management.utils"
import { useOrganizationSettings } from "@/features/settings/settings.hooks"
import { toChairmanProfile } from "@/features/settings/settings.utils"
import { useWards } from "@/features/wards/wards.hooks"
import {
  PRIMARY_ACTION_CLASS,
  SECONDARY_ACTION_CLASS,
} from "@/lib/ui/form-styles"

export function ExecutivePage() {
  const router = useRouter()
  const councillorsQuery = useCouncillors({ page: 1, limit: 100 })
  const deleteCouncillor = useDeleteCouncillor()
  const managementQuery = useManagement({ page: 1, limit: 2 })
  const settingsQuery = useOrganizationSettings()
  const wardsQuery = useWards()

  const [councilorToDelete, setCouncilorToDelete] =
    React.useState<CouncillorRow | null>(null)

  const councilors = React.useMemo(
    () => toCouncillorRows(councillorsQuery.data?.data, wardsQuery.data),
    [councillorsQuery.data, wardsQuery.data],
  )
  const officials = React.useMemo(
    () => toManagementRows(managementQuery.data?.data),
    [managementQuery.data],
  )
  // The chairman is not a management record - the office is held by one person
  // and edited in organization settings, so it is read from there.
  const chairman = React.useMemo(
    () => toChairmanProfile(settingsQuery.data),
    [settingsQuery.data],
  )

  const confirmDelete = () => {
    if (!councilorToDelete) return

    deleteCouncillor.mutate(councilorToDelete.id, {
      onSettled: () => setCouncilorToDelete(null),
    })
  }

  const columns = councillorColumns({
    onEdit: (id) => router.push(`/executive/edit-councilor?id=${id}`),
    onDelete: setCouncilorToDelete,
  })

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title="Executive & appointed officials"
          description="The 11 elected councillors representing Egbeda LG wards."
          actions={
            <>
              <Button
                variant="outline"
                size="sm"
                className={SECONDARY_ACTION_CLASS}
                onClick={() =>
                  toast.success("Executive council report prepared")
                }
              >
                <RiDownloadLine className="text-muted-foreground mr-2 size-4" />
                Export report
              </Button>
              <Button
                size="sm"
                className={PRIMARY_ACTION_CLASS}
                onClick={() => router.push("/executive/add-councilor")}
              >
                <RiAddLine className="mr-1.5 size-4" />
                Add new councilor
              </Button>
            </>
          }
        />

        <div className="grid max-w-4xl gap-6 sm:grid-cols-2">
          {(managementQuery.isLoading || settingsQuery.isLoading) && (
            <CardGridSkeleton withMedia count={2} />
          )}

          {chairman && (
            <ExecutiveOfficialCard
              name={chairman.name}
              officeLabel={chairman.office}
              image={chairman.image}
              onEdit={() => router.push("/settings")}
              editLabel="Edit in settings"
            />
          )}

          {officials.map((official) => (
            <ExecutiveOfficialCard
              key={official.id}
              name={official.name}
              officeLabel={official.officeLabel}
              image={official.image}
              statusLabel={official.statusLabel}
              onEdit={() => router.push(`/management/edit?id=${official.id}`)}
            />
          ))}

          {!managementQuery.isLoading &&
            !settingsQuery.isLoading &&
            !chairman &&
            officials.length === 0 && (
              <EmptyState
                icon={<ExecutiveEmptyIcon />}
                title="No executive officials"
                description="Executive and appointed cabinet members will appear here."
                className="sm:col-span-2"
              />
            )}
        </div>

        {councillorsQuery.isLoading ? (
          <TableSkeleton columns={5} />
        ) : councilors.length > 0 ? (
          <DataTable columns={columns} data={councilors} />
        ) : (
          <EmptyState
            icon={<ExecutiveEmptyIcon />}
            title="No councillors"
            description="Councillors added to the ward roster will appear here."
            action={
              <Button
                size="sm"
                className="h-9 rounded-xl bg-[#701a2e] text-xs font-medium text-white shadow-sm hover:bg-[#571323]"
                onClick={() => router.push("/executive/add-councilor")}
              >
                <RiAddLine className="mr-1.5 size-4" />
                Add new councilor
              </Button>
            }
          />
        )}

        <ConfirmDeleteDialog
          open={Boolean(councilorToDelete)}
          onOpenChange={(open) => !open && setCouncilorToDelete(null)}
          title="Remove councilor?"
          description="They will be removed from the ward roster."
          onConfirm={confirmDelete}
          disabled={deleteCouncillor.isPending}
        />
      </div>
    </AdminShell>
  )
}
