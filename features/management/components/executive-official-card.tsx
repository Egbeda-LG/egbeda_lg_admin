"use client"

import { RiEditLine } from "@remixicon/react"

import type { ManagementRow } from "@/features/management/management.utils"

type ExecutiveOfficialCardProps = {
  official: ManagementRow
  onEdit: (id: string) => void
}

/** Larger portrait card used for the featured officials on the executive page. */
export function ExecutiveOfficialCard({
  official,
  onEdit,
}: ExecutiveOfficialCardProps) {
  return (
    <div className="bg-card space-y-4 rounded-2xl border p-5 shadow-sm transition-all hover:border-[#701a2e]/30">
      <div className="bg-muted relative h-60 w-full overflow-hidden rounded-xl border">
        {official.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={official.image}
            alt={official.name}
            className="size-full object-cover object-top"
          />
        )}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-full bg-emerald-500/90 px-3 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
            {official.statusLabel}
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between pt-1">
        <div>
          <h3 className="text-foreground font-serif text-lg leading-snug font-bold">
            {official.name}
          </h3>
          <p className="mt-0.5 text-xs font-semibold text-[#701a2e]">
            {official.officeLabel}
          </p>
        </div>
        <button
          onClick={() => onEdit(official.id)}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs transition-colors"
        >
          <RiEditLine className="size-3.5" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  )
}
