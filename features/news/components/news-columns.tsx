"use client"

import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"
import {
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
} from "@remixicon/react"

import { StatusBadge } from "@/components/ui/status-badge"
import type { NewsRow } from "@/features/news/news.utils"

type NewsColumnActions = {
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function newsColumns({
  onView,
  onEdit,
  onDelete,
}: NewsColumnActions): ColumnDef<NewsRow>[] {
  return [
    {
      accessorKey: "title",
      header: "TITLE",
      cell: ({ row }) => (
        <div className="max-w-md space-y-1 py-1">
          <Link
            href={row.original.link}
            className="text-foreground line-clamp-2 leading-snug font-bold transition-colors hover:text-[#701a2e]"
          >
            {row.original.title}
          </Link>
          <p className="text-muted-foreground text-[11px]">
            Link:{" "}
            <span className="text-muted-foreground/80">
              {row.original.link}
            </span>
          </p>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => (
        <StatusBadge
          label={row.original.statusLabel}
          tone={row.original.isPublished ? "success" : "warning"}
        />
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
      id: "actions",
      header: "ACTIONS",
      cell: ({ row }) => (
        <div className="text-muted-foreground flex items-center gap-1.5">
          <button
            onClick={() => onView(row.original.id)}
            title="View article"
            className="hover:text-foreground p-1 transition-colors"
          >
            <RiEyeLine className="size-4" />
          </button>
          <button
            onClick={() => onEdit(row.original.id)}
            title="Edit article"
            className="hover:text-foreground p-1 transition-colors"
          >
            <RiEditLine className="size-4" />
          </button>
          <button
            onClick={() => onDelete(row.original.id)}
            title="Delete article"
            className="hover:text-destructive p-1 transition-colors"
          >
            <RiDeleteBinLine className="size-4" />
          </button>
        </div>
      ),
    },
  ]
}
