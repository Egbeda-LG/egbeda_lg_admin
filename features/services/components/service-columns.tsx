"use client"

import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"
import { RiDeleteBinLine, RiEditLine } from "@remixicon/react"

import { StatusBadge } from "@/components/ui/status-badge"
import type { ServiceRow } from "@/features/services/services.utils"

type ServiceColumnActions = {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function serviceColumns({
  onEdit,
  onDelete,
}: ServiceColumnActions): ColumnDef<ServiceRow>[] {
  return [
    {
      accessorKey: "title",
      header: "SERVICE",
      cell: ({ row }) => (
        <div className="max-w-md space-y-0.5 py-1">
          <Link
            href={`/services/edit?id=${row.original.id}`}
            className="text-foreground leading-snug font-bold transition-colors hover:text-[#701a2e]"
          >
            {row.original.title}
          </Link>
          <p className="text-muted-foreground line-clamp-1 text-[11px]">
            {row.original.description}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "fee",
      header: "FEE",
      cell: ({ row }) => (
        <span className="text-foreground text-xs font-semibold">
          {row.original.fee}
        </span>
      ),
    },
    {
      accessorKey: "department",
      header: "DEPARTMENT",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs capitalize">
          {row.original.department}
        </span>
      ),
    },
    {
      accessorKey: "timeline",
      header: "TIMELINE",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs">
          {row.original.timeline}
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
            title="Edit service"
            className="hover:text-foreground p-1 transition-colors"
          >
            <RiEditLine className="size-4" />
          </button>
          <button
            onClick={() => onDelete(row.original.id)}
            title="Delete service"
            className="hover:text-destructive p-1 transition-colors"
          >
            <RiDeleteBinLine className="size-4" />
          </button>
        </div>
      ),
    },
  ]
}
