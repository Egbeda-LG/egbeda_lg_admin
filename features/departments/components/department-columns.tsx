"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { RiDeleteBinLine, RiEditLine } from "@remixicon/react"

import { StatusBadge } from "@/components/ui/status-badge"
import type { DepartmentRow } from "@/features/departments/departments.utils"

type DepartmentColumnActions = {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function departmentColumns({
  onEdit,
  onDelete,
}: DepartmentColumnActions): ColumnDef<DepartmentRow>[] {
  return [
    {
      accessorKey: "name",
      header: "DEPARTMENT",
      cell: ({ row }) => (
        <span className="text-foreground text-xs font-bold">
          {row.original.name}
        </span>
      ),
    },
    {
      accessorKey: "hod",
      header: "HOD",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs">
          {row.original.hod}
        </span>
      ),
    },
    {
      accessorKey: "staffs",
      header: "STAFFS",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs">
          {row.original.staffs}
        </span>
      ),
    },
    {
      accessorKey: "dateAdded",
      header: "DATE ADDED",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs">
          {row.original.dateAdded}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => (
        <StatusBadge
          label={row.original.status}
          tone={row.original.isActive ? "success" : "muted"}
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
            title="Edit department"
            className="hover:text-foreground p-1 transition-colors"
          >
            <RiEditLine className="size-4" />
          </button>
          <button
            onClick={() => onDelete(row.original.id)}
            title="Delete department"
            className="hover:text-destructive p-1 transition-colors"
          >
            <RiDeleteBinLine className="size-4" />
          </button>
        </div>
      ),
    },
  ]
}
