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
import { PaginationFooter } from "@/components/ui/pagination-footer"
import { SearchField } from "@/components/ui/search-field"
import { ViewModeToggle, type ViewMode } from "@/components/ui/view-mode-toggle"
import { DepartmentEmptyIcon } from "@/components/icons/empty-states"
import { DepartmentCard } from "@/features/departments/components/department-card"
import { departmentColumns } from "@/features/departments/components/department-columns"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { listQuery } from "@/lib/api/list-query"
import {
  useDeleteDepartment,
  useDepartments,
} from "@/features/departments/departments.hooks"
import { toDepartmentRows } from "@/features/departments/departments.utils"
import { PRIMARY_ACTION_CLASS } from "@/lib/ui/form-styles"

export function DepartmentsPage() {
  const router = useRouter()
  const deleteDepartment = useDeleteDepartment()

  const [search, setSearch] = React.useState("")
  const debouncedSearch = useDebouncedValue(search)
  const departmentsQuery = useDepartments(
    listQuery({ page: 1, limit: 100, search: debouncedSearch }),
  )
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid")
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(
    null,
  )

  const departments = React.useMemo(
    () => toDepartmentRows(departmentsQuery.data?.data),
    [departmentsQuery.data],
  )

  const goToForm = (id?: string) =>
    router.push(id ? `/department/new?id=${id}` : "/department/new")

  const handleDeleteConfirm = () => {
    if (!deleteTargetId) return

    deleteDepartment.mutate(deleteTargetId, {
      onSettled: () => setDeleteTargetId(null),
    })
  }

  const columns = departmentColumns({
    onEdit: goToForm,
    onDelete: setDeleteTargetId,
  })

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title="Department"
          description="Manage the career civil service departments and their leadership."
          actions={
            <Button
              size="sm"
              className={PRIMARY_ACTION_CLASS}
              onClick={() => goToForm()}
            >
              <RiAddLine className="mr-1.5 size-4" />
              Add new department
            </Button>
          }
        />

        <div className="flex items-center justify-between gap-4">
          <SearchField
            value={search}
            onValueChange={setSearch}
            placeholder="Search department..."
          />
          <ViewModeToggle value={viewMode} onValueChange={setViewMode} />
        </div>

        {departmentsQuery.isLoading ? (
          <TableSkeleton columns={5} />
        ) : departments.length === 0 ? (
          <EmptyState
            icon={<DepartmentEmptyIcon />}
            title="No departments found"
            description="Career civil service departments and their assigned leadership will appear here once created."
            action={
              <Button
                size="sm"
                className="h-9 rounded-xl bg-[#701a2e] text-xs font-medium text-white shadow-sm hover:bg-[#571323]"
                onClick={() => goToForm()}
              >
                <RiAddLine className="mr-1.5 size-4" />
                Add new department
              </Button>
            }
          />
        ) : viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => (
              <DepartmentCard
                key={department.id}
                department={department}
                onEdit={goToForm}
                onDelete={setDeleteTargetId}
              />
            ))}
          </div>
        ) : (
          <DataTable columns={columns} data={departments} />
        )}

        {departments.length > 0 && <PaginationFooter />}

        <ConfirmDeleteDialog
          open={Boolean(deleteTargetId)}
          onOpenChange={(open) => !open && setDeleteTargetId(null)}
          title="Delete department?"
          description="This will remove the department from the public directory."
          onConfirm={handleDeleteConfirm}
          disabled={deleteDepartment.isPending}
        />
      </div>
    </AdminShell>
  )
}
