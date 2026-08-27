"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { RiAddLine, RiDownloadLine } from "@remixicon/react"

import { AdminShell } from "@/components/layout/admin-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog"
import { EmptyState } from "@/components/ui/empty-state"
import { CardGridSkeleton } from "@/components/ui/loading-skeletons"
import { PaginationFooter } from "@/components/ui/pagination-footer"
import { ManagementEmptyIcon } from "@/components/icons/empty-states"
import { ManagementOfficialCard } from "@/features/management/components/management-official-card"
import {
  useDeleteManagementOfficial,
  useManagement,
} from "@/features/management/management.hooks"
import {
  toManagementRows,
  type ManagementRow,
} from "@/features/management/management.utils"
import {
  PRIMARY_ACTION_CLASS,
  SECONDARY_ACTION_CLASS,
} from "@/lib/ui/form-styles"

export function ManagementPage() {
  const router = useRouter()
  const managementQuery = useManagement({ page: 1, limit: 100 })
  const deleteOfficial = useDeleteManagementOfficial()

  const [officialToDelete, setOfficialToDelete] =
    React.useState<ManagementRow | null>(null)

  const officials = React.useMemo(
    () => toManagementRows(managementQuery.data?.data),
    [managementQuery.data],
  )

  const confirmDelete = () => {
    if (!officialToDelete) return

    deleteOfficial.mutate(officialToDelete.id, {
      onSettled: () => setOfficialToDelete(null),
    })
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title="Management"
          description="Manage the career civil service departments and their leadership."
          actions={
            <>
              <Button
                variant="outline"
                size="sm"
                className={SECONDARY_ACTION_CLASS}
                onClick={() => toast.success("Management report prepared")}
              >
                <RiDownloadLine className="text-muted-foreground mr-2 size-4" />
                Export report
              </Button>
              <Button
                size="sm"
                className={PRIMARY_ACTION_CLASS}
                onClick={() => router.push("/management/new")}
              >
                <RiAddLine className="mr-1.5 size-4" />
                Add new official
              </Button>
            </>
          }
        />

        {managementQuery.isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CardGridSkeleton withMedia={true} />
          </div>
        ) : officials.length === 0 ? (
          <EmptyState
            icon={<ManagementEmptyIcon className="size-28" />}
            title="No management officials"
            description="Management officials and career civil service leaders will appear here after they are added."
            action={
              <Button
                size="sm"
                className="h-9 rounded-xl bg-[#701a2e] text-xs font-medium text-white shadow-sm hover:bg-[#571323]"
                onClick={() => router.push("/management/new")}
              >
                <RiAddLine className="mr-1.5 size-4" />
                Add new official
              </Button>
            }
          />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {officials.map((official) => (
                <ManagementOfficialCard
                  key={official.id}
                  official={official}
                  onEdit={(id) => router.push(`/management/edit?id=${id}`)}
                  onDelete={setOfficialToDelete}
                />
              ))}
            </div>
            <PaginationFooter />
          </>
        )}

        <ConfirmDeleteDialog
          open={Boolean(officialToDelete)}
          onOpenChange={(open) => !open && setOfficialToDelete(null)}
          title="Remove official?"
          description="Their profile will be removed from the public Government page."
          onConfirm={confirmDelete}
          disabled={deleteOfficial.isPending}
        />
      </div>
    </AdminShell>
  )
}
