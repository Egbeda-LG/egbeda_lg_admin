"use client"

import { RiDeleteBinLine, RiEditLine } from "@remixicon/react"

import type { NulgeRow } from "@/features/nulge/nulge.utils"

type NulgeOfficialCardProps = {
  official: NulgeRow
  onEdit: (id: string) => void
  onDelete: (official: NulgeRow) => void
}

export function NulgeOfficialCard({
  official,
  onEdit,
  onDelete,
}: NulgeOfficialCardProps) {
  return (
    <div className="bg-card flex flex-col justify-between space-y-4 rounded-2xl border p-5 shadow-sm transition-all hover:border-[#701a2e]/30">
      <div className="space-y-4">
        <div className="bg-muted relative h-60 w-full overflow-hidden rounded-xl border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={official.image}
            alt={official.name}
            className="size-full object-cover object-top"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-full bg-emerald-500/90 px-3 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
              {official.statusLabel}
            </span>
          </div>
        </div>

        <div className="space-y-0.5">
          <h3 className="text-foreground font-serif text-base leading-snug font-bold">
            {official.name}
          </h3>
          <p className="text-xs font-semibold text-[#701a2e]">
            {official.officeLabel}
          </p>
        </div>
      </div>

      <div className="text-muted-foreground border-border/50 flex items-center justify-end gap-3 border-t pt-3 text-xs">
        <button
          onClick={() => onEdit(official.id)}
          className="hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <RiEditLine className="size-3.5" />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(official)}
          className="hover:text-destructive flex items-center gap-1 transition-colors"
        >
          <RiDeleteBinLine className="size-3.5" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}
