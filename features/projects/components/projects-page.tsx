"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { RiAddLine, RiDownloadLine } from "@remixicon/react"

import { AdminShell } from "@/components/layout/admin-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog"
import { EmptyState } from "@/components/ui/empty-state"
import { CardGridSkeleton } from "@/components/ui/loading-skeletons"
import { PaginationFooter } from "@/components/ui/pagination-footer"
import { SearchField } from "@/components/ui/search-field"
import { StatCard } from "@/components/ui/stat-card"
import { ViewModeToggle, type ViewMode } from "@/components/ui/view-mode-toggle"
import { ProjectsEmptyIcon } from "@/components/icons/empty-states"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/loading-skeletons"
import { ProjectCard } from "@/features/projects/components/project-card"
import { projectColumns } from "@/features/projects/components/project-columns"
import { ProjectWardFilter } from "@/features/projects/components/project-ward-filter"
import {
  useDeleteProject,
  useProjects,
} from "@/features/projects/projects.hooks"
import {
  toProjectRows,
  toProjectStats,
  toWardLabels,
} from "@/features/projects/projects.utils"
import { useWards } from "@/features/wards/wards.hooks"
import {
  PRIMARY_ACTION_CLASS,
  SECONDARY_ACTION_CLASS,
} from "@/lib/ui/form-styles"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { listQuery } from "@/lib/api/list-query"

export function ProjectsPage() {
  const router = useRouter()
  const deleteProject = useDeleteProject()
  const wardsQuery = useWards()

  const [search, setSearch] = React.useState("")
  const [wardId, setWardId] = React.useState("all")
  const debouncedSearch = useDebouncedValue(search)

  // Filtering is applied server-side by the list endpoint.
  const projectsQuery = useProjects(
    listQuery({
      page: 1,
      limit: 100,
      search: debouncedSearch,
      ward_id: wardId,
    }),
  )
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid")
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(
    null,
  )

  const projects = React.useMemo(
    () =>
      toProjectRows(projectsQuery.data?.data, toWardLabels(wardsQuery.data)),
    [projectsQuery.data, wardsQuery.data],
  )
  const stats = React.useMemo(
    () => toProjectStats(projectsQuery.data),
    [projectsQuery.data],
  )

  const columns = React.useMemo(
    () =>
      projectColumns({
        onEdit: (id) => router.push(`/projects/edit?id=${id}`),
        onDelete: setDeleteTargetId,
      }),
    [router],
  )

  const confirmDelete = () => {
    if (!deleteTargetId) return

    deleteProject.mutate(deleteTargetId, {
      onSettled: () => setDeleteTargetId(null),
    })
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title="Projects"
          description="Completed capital and community projects delivered across Egbeda's 11 wards."
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
                onClick={() => router.push("/projects/new")}
              >
                <RiAddLine className="mr-1.5 size-4" />
                New project
              </Button>
            </>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchField
            value={search}
            onValueChange={setSearch}
            placeholder="Search projects..."
          />

          <div className="flex items-center gap-3">
            <ProjectWardFilter value={wardId} onValueChange={setWardId} />
            <ViewModeToggle value={viewMode} onValueChange={setViewMode} />
          </div>
        </div>

        {projectsQuery.isLoading ? (
          viewMode === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <CardGridSkeleton withMedia />
            </div>
          ) : (
            <TableSkeleton columns={7} />
          )
        ) : projects.length === 0 ? (
          <EmptyState
            icon={<ProjectsEmptyIcon className="size-28" />}
            title="No projects found"
            description="Capital and community infrastructure projects delivered across Egbeda will appear here."
            action={
              <Button
                size="sm"
                className="h-9 rounded-xl bg-[#701a2e] text-xs font-medium text-white shadow-sm hover:bg-[#571323]"
                onClick={() => router.push("/projects/new")}
              >
                <RiAddLine className="mr-1.5 size-4" />
                New project
              </Button>
            }
          />
        ) : viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={(id) => router.push(`/projects/edit?id=${id}`)}
                onDelete={setDeleteTargetId}
              />
            ))}
          </div>
        ) : (
          <DataTable columns={columns} data={projects} />
        )}

        {projects.length > 0 && <PaginationFooter />}

        <ConfirmDeleteDialog
          open={Boolean(deleteTargetId)}
          onOpenChange={(open) => !open && setDeleteTargetId(null)}
          title="Delete project?"
          description="This project entry will be permanently removed from the infrastructure catalog."
          onConfirm={confirmDelete}
          disabled={deleteProject.isPending}
        />
      </div>
    </AdminShell>
  )
}
