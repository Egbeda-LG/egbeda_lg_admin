"use client"

import Link from "next/link"
import { RiAddLine, RiBuilding4Line } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { Skeleton } from "@/components/ui/skeleton"
import { StatusBadge } from "@/components/ui/status-badge"
import { ProjectsEmptyIcon } from "@/components/icons/empty-states"
import { toProjectSummary } from "@/features/dashboard/dashboard.utils"
import type { ProjectItem } from "@/lib/api/types"

type RecentProjectsCardProps = {
  projects: ProjectItem[]
  isLoading: boolean
  onAddProject: () => void
}

export function RecentProjectsCard({
  projects,
  isLoading,
  onAddProject,
}: RecentProjectsCardProps) {
  const rows = projects.map(toProjectSummary)

  return (
    <div className="bg-card overflow-hidden rounded-2xl border shadow-sm">
      <div className="flex items-center justify-between border-b px-6 py-5">
        <div>
          <h2 className="text-foreground text-base font-bold">
            Recent Projects
          </h2>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Latest capital and community projects across all wards
          </p>
        </div>
        <Link
          href="/projects"
          className="text-xs font-semibold text-[#701a2e] hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="divide-y">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="size-10 shrink-0 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-44 rounded-md" />
                  <Skeleton className="h-3 w-32 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))
        ) : (
          rows.map((project) => (
            <div
              key={project.id}
              className="hover:bg-muted/30 flex items-center justify-between px-6 py-4 transition"
            >
              <div className="flex items-center gap-4">
                {project.photo_url ? (
                  <img
                    src={project.photo_url}
                    alt={project.name}
                    className="size-10 shrink-0 rounded-xl object-cover border"
                  />
                ) : (
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#701a2e]/10 to-[#701a2e]/5 border border-[#701a2e]/15 text-[#701a2e] shadow-2xs">
                    <RiBuilding4Line className="size-5" />
                  </div>
                )}
                <div>
                  <h3 className="text-foreground text-sm font-bold">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    {project.location} •{" "}
                    <span className="text-foreground/80 font-medium">
                      {project.ward}
                    </span>
                  </p>
                </div>
              </div>

              <StatusBadge
                label={project.status}
                tone="success"
                className="px-3 py-1 font-medium"
              />
            </div>
          ))
        )}

        {!isLoading && rows.length === 0 && (
          <EmptyState
            icon={<ProjectsEmptyIcon className="size-24" />}
            title="No projects found"
            description="Capital and community infrastructure projects delivered across Egbeda will appear here."
            className="border-0 bg-transparent py-10"
            action={
              <Button
                size="sm"
                className="h-9 rounded-xl bg-[#701a2e] text-xs font-medium text-white shadow-sm hover:bg-[#571323]"
                onClick={onAddProject}
              >
                <RiAddLine className="mr-1.5 size-4" />
                Add project
              </Button>
            }
          />
        )}
      </div>
    </div>
  )
}
