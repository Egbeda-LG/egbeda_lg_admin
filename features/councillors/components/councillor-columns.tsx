"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { RiDeleteBinLine, RiEditLine } from "@remixicon/react"

import { cn } from "@/lib/utils"
import type { CouncillorRow } from "@/features/councillors/councillors.utils"

type CouncillorColumnActions = {
  onEdit: (id: string) => void
  onDelete: (councillor: CouncillorRow) => void
}

export function councillorColumns({
  onEdit,
  onDelete,
}: CouncillorColumnActions): ColumnDef<CouncillorRow>[] {
  return [
    {
      accessorKey: "name",
      header: "COUNCILOR NAME",
      cell: ({ row }) => (
        <span className="text-foreground text-xs font-bold">
          {row.original.name}
        </span>
      ),
    },
    {
      accessorKey: "ward",
      header: "WARD",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs">
          {row.original.ward}
        </span>
      ),
    },
    {
      accessorKey: "area",
      header: "AREA",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs">
          {row.original.area}
        </span>
      ),
    },
    {
      accessorKey: "date",
      header: "DATE",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs">
          {row.original.date}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            row.original.isActive
              ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border border-red-200 bg-red-50 text-red-700",
          )}
        >
          {row.original.statusLabel}
        </span>
      ),
    },
    {
      id: "actions",
      header: "ACTIONS",
      cell: ({ row }) => (
        <div className="text-muted-foreground flex items-center gap-2">
          <button
            onClick={() => onEdit(row.original.id)}
            title="Edit councilor"
            className="hover:text-foreground p-1 transition-colors"
          >
            <RiEditLine className="size-4" />
          </button>
          <button
            onClick={() => onDelete(row.original)}
            title="Delete councilor"
            className="hover:text-destructive p-1 transition-colors"
          >
            <RiDeleteBinLine className="size-4" />
          </button>
        </div>
      ),
    },
  ]
}
