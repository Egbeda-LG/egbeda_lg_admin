"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { RiDeleteBinLine } from "@remixicon/react"

import { StatusBadge } from "@/components/ui/status-badge"
import type { PastGovernmentRow } from "@/features/past-government/past-government.utils"

/** Elected administrations read as the norm; the other two stand out. */
const TONE: Record<string, "success" | "warning" | "muted"> = {
  elected: "success",
  caretaker: "warning",
  sole_administrator: "muted",
}

type PastGovernmentColumnActions = {
  onDelete: (row: PastGovernmentRow) => void
}

export function pastGovernmentColumns({
  onDelete,
}: PastGovernmentColumnActions): ColumnDef<PastGovernmentRow>[] {
  return [
    {
      accessorKey: "name",
      header: "NAME",
      cell: ({ row }) => (
        <span className="text-foreground font-bold">{row.original.name}</span>
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
      accessorKey: "electionTypeLabel",
      header: "HOW THEY CAME IN",
      cell: ({ row }) => (
        <StatusBadge
          label={row.original.electionTypeLabel}
          tone={TONE[row.original.electionType] ?? "muted"}
        />
      ),
    },
    {
      id: "actions",
      header: "ACTIONS",
      cell: ({ row }) => (
        // No update route exists, so removing is the only action on a record.
        <button
          type="button"
          onClick={() => onDelete(row.original)}
          title="Delete record"
          className="text-muted-foreground hover:text-destructive rounded-lg p-1.5 transition-colors"
        >
          <RiDeleteBinLine className="size-4" />
        </button>
      ),
    },
  ]
}
