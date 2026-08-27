"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { RiAddLine } from "@remixicon/react"

import { AdminShell } from "@/components/layout/admin-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog"
import { DataTable } from "@/components/ui/data-table"
import { EmptyState } from "@/components/ui/empty-state"
import { TableSkeleton } from "@/components/ui/loading-skeletons"
import { FilterPills } from "@/components/ui/filter-pills"
import { SearchField } from "@/components/ui/search-field"
import { ServicesEmptyIcon } from "@/components/icons/empty-states"
import { serviceColumns } from "@/features/services/components/service-columns"
import {
  useDeleteService,
  useServices,
} from "@/features/services/services.hooks"
import {
  SERVICE_FILTER_OPTIONS,
  toServiceRows,
} from "@/features/services/services.utils"
import { PRIMARY_ACTION_CLASS } from "@/lib/ui/form-styles"

import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { listQuery } from "@/lib/api/list-query"
export function ServicesPage() {
  const router = useRouter()
  const deleteService = useDeleteService()

  const [search, setSearch] = React.useState("")
  const [status, setStatus] = React.useState("all")
  const debouncedSearch = useDebouncedValue(search)

  // Filtering is applied server-side by the list endpoint.
  const servicesQuery = useServices(
    listQuery({ page: 1, limit: 100, search: debouncedSearch, status }),
  )
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(
    null,
  )

  const services = React.useMemo(
    () => toServiceRows(servicesQuery.data?.data),
    [servicesQuery.data],
  )

  const confirmDelete = () => {
    if (!deleteTargetId) return

    deleteService.mutate(deleteTargetId, {
      onSettled: () => setDeleteTargetId(null),
    })
  }

  const columns = serviceColumns({
    onEdit: (id) => router.push(`/services/edit?id=${id}`),
    onDelete: setDeleteTargetId,
  })

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title="Services"
          description="Configure and publish official LG services for public application."
          actions={
            <Button
              size="sm"
              className={PRIMARY_ACTION_CLASS}
              onClick={() => router.push("/services/new")}
            >
              <RiAddLine className="mr-1.5 size-4" />
              Add new service
            </Button>
          }
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchField
            value={search}
            onValueChange={setSearch}
            placeholder="Search services..."
          />
          <FilterPills
            options={SERVICE_FILTER_OPTIONS}
            value={status}
            onValueChange={setStatus}
          />
        </div>

        {servicesQuery.isLoading ? (
          <TableSkeleton columns={5} />
        ) : services.length > 0 ? (
          <DataTable columns={columns} data={services} />
        ) : (
          <EmptyState
            icon={<ServicesEmptyIcon />}
            title="No services found"
            description="Configured and published official government services for public application will appear here."
            action={
              <Button
                size="sm"
                className="h-9 rounded-xl bg-[#701a2e] text-xs font-medium text-white shadow-sm hover:bg-[#571323]"
                onClick={() => router.push("/services/new")}
              >
                <RiAddLine className="mr-1.5 size-4" />
                Add new service
              </Button>
            }
          />
        )}

        <ConfirmDeleteDialog
          open={Boolean(deleteTargetId)}
          onOpenChange={(open) => !open && setDeleteTargetId(null)}
          title="Delete service?"
          description="This public service item will be permanently removed from the website catalog."
          onConfirm={confirmDelete}
          disabled={deleteService.isPending}
        />
      </div>
    </AdminShell>
  )
}
