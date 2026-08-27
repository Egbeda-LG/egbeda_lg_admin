"use client"

import { RiDeleteBinLine, RiEditLine, RiMapPinLine } from "@remixicon/react"

import { StatusBadge } from "@/components/ui/status-badge"
import type { ProjectRow } from "@/features/projects/projects.utils"

type ProjectCardProps = {
  project: ProjectRow
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <div className="bg-card flex flex-col justify-between overflow-hidden rounded-2xl border shadow-sm transition-colors hover:border-[#701a2e]/30">
      {project.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.photoUrl}
          alt={project.title}
          loading="lazy"
          className="bg-muted aspect-video w-full object-cover"
        />
      ) : null}

      <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
        <div>
          <div className="flex items-center justify-end">
            <StatusBadge
              label={project.statusLabel}
              tone={project.isPublished ? "success" : "muted"}
            />
          </div>

          <h3 className="text-foreground mt-3 font-serif text-lg leading-snug font-bold">
            {project.title}
          </h3>

          <div className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
            <RiMapPinLine className="size-3.5" />
            <span>{project.ward}</span>
          </div>
        </div>

        <div className="space-y-3 border-t pt-4">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground block text-[10px] font-bold uppercase">
                STARTED
              </span>
              <span className="text-foreground font-semibold">
                {project.started}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] font-bold uppercase">
                DELIVERED
              </span>
              <span className="text-foreground font-semibold">
                {project.delivered}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-3 text-xs">
            <span className="text-muted-foreground">
              Contractor:{" "}
              <strong className="text-foreground">{project.contractor}</strong>
            </span>
            <div className="text-muted-foreground flex items-center gap-2">
              <button
                onClick={() => onEdit(project.id)}
                className="hover:text-foreground flex items-center gap-1 text-xs transition-colors"
              >
                <RiEditLine className="size-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDelete(project.id)}
                className="hover:text-destructive p-1 transition-colors"
              >
                <RiDeleteBinLine className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
