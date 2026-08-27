"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { RiDeleteBinLine, RiEditLine } from "@remixicon/react"

import { StatusBadge } from "@/components/ui/status-badge"
import type { ProjectRow } from "@/features/projects/projects.utils"

type ProjectColumnActions = {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function projectColumns({
  onEdit,
  onDelete,
}: ProjectColumnActions): ColumnDef<ProjectRow>[] {
  return [
    {
      accessorKey: "title",
      header: "PROJECT",
      cell: ({ row }) => (
        <span className="text-foreground line-clamp-2 max-w-xs py-1 text-xs font-bold">
          {row.original.title}
        </span>
      ),
    },
    {
      accessorKey: "ward",
      header: "WARD",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs">{row.original.ward}</span>
      ),
    },
    {
      accessorKey: "started",
      header: "STARTED",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs">
          {row.original.started}
        </span>
      ),
    },
    {
      accessorKey: "delivered",
      header: "DELIVERED",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs">
          {row.original.delivered}
        </span>
      ),
    },
    {
      accessorKey: "contractor",
      header: "CONTRACTOR",
      cell: ({ row }) => (
        <span className="text-foreground text-xs font-medium">
          {row.original.contractor}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => (
        <StatusBadge
          label={row.original.statusLabel}
          tone={row.original.isPublished ? "success" : "muted"}
        />
      ),
    },
    {
      id: "actions",
      header: "ACTIONS",
      cell: ({ row }) => (
        <div className="text-muted-foreground flex items-center gap-1.5">
          <button
            onClick={() => onEdit(row.original.id)}
            title="Edit project"
            className="hover:text-foreground p-1 transition-colors"
          >
            <RiEditLine className="size-4" />
          </button>
          <button
            onClick={() => onDelete(row.original.id)}
            title="Delete project"
            className="hover:text-destructive p-1 transition-colors"
          >
            <RiDeleteBinLine className="size-4" />
          </button>
        </div>
      ),
    },
  ]
}
