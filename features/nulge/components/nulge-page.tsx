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
import { NulgeEmptyIcon } from "@/components/icons/empty-states"
import { NulgeOfficialCard } from "@/features/nulge/components/nulge-official-card"
import { NULGE_EXPORT_UNAVAILABLE_MESSAGE } from "@/features/nulge/nulge.form"
import {
  useDeleteNulgeMember,
  useNulgeList,
} from "@/features/nulge/nulge.hooks"
import { toNulgeRows, type NulgeRow } from "@/features/nulge/nulge.utils"
import {
  PRIMARY_ACTION_CLASS,
  SECONDARY_ACTION_CLASS,
} from "@/lib/ui/form-styles"

export function NulgePage() {
  const router = useRouter()
  const nulgeQuery = useNulgeList({ page: 1, limit: 100 })
  const deleteMember = useDeleteNulgeMember()

  const [memberToDelete, setMemberToDelete] = React.useState<NulgeRow | null>(
    null,
  )

  const executives = React.useMemo(
    () => toNulgeRows(nulgeQuery.data?.data),
    [nulgeQuery.data],
  )

  const confirmDelete = () => {
    if (!memberToDelete) return

    deleteMember.mutate(memberToDelete.id, {
      onSettled: () => setMemberToDelete(null),
    })
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title="NULGE Team"
          description="Manage the career civil service departments and their leadership."
          actions={
            <>
              <Button
                variant="outline"
                size="sm"
                className={SECONDARY_ACTION_CLASS}
                onClick={() => toast.error(NULGE_EXPORT_UNAVAILABLE_MESSAGE)}
              >
                <RiDownloadLine className="text-muted-foreground mr-2 size-4" />
                Export report
              </Button>
              <Button
                size="sm"
                className={PRIMARY_ACTION_CLASS}
                onClick={() => router.push("/nulge/new")}
              >
                <RiAddLine className="mr-1.5 size-4" />
                Add new official
              </Button>
            </>
          }
        />

        {nulgeQuery.isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CardGridSkeleton withMedia={true} />
          </div>
        ) : executives.length === 0 ? (
          <EmptyState
            icon={<NulgeEmptyIcon className="size-28" />}
            title="No NULGE officials found"
            description="NULGE executive members and employee union representatives will appear here once registered."
            action={
              <Button
                size="sm"
                className="h-9 rounded-xl bg-[#701a2e] text-xs font-medium text-white shadow-sm hover:bg-[#571323]"
                onClick={() => router.push("/nulge/new")}
              >
                <RiAddLine className="mr-1.5 size-4" />
                Add new official
              </Button>
            }
          />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {executives.map((executive) => (
                <NulgeOfficialCard
                  key={executive.id}
                  official={executive}
                  onEdit={(id) => router.push(`/nulge/edit?id=${id}`)}
                  onDelete={setMemberToDelete}
                />
              ))}
            </div>
            <PaginationFooter />
          </>
        )}

        <ConfirmDeleteDialog
          open={Boolean(memberToDelete)}
          onOpenChange={(open) => !open && setMemberToDelete(null)}
          title="Remove official?"
          description="Their profile will be removed from the public NULGE team page."
          onConfirm={confirmDelete}
          disabled={deleteMember.isPending}
        />
      </div>
    </AdminShell>
  )
}
