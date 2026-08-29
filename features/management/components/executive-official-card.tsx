"use client"

import { RiEditLine, RiUser3Line } from "@remixicon/react"

type ExecutiveOfficialCardProps = {
  name: string
  officeLabel: string
  image?: string
  /** Omitted for the chairman, whose record carries no status. */
  statusLabel?: string
  onEdit: () => void
  editLabel?: string
}

/** Larger portrait card used for the featured officials on the executive page. */
export function ExecutiveOfficialCard({
  name,
  officeLabel,
  image,
  statusLabel,
  onEdit,
  editLabel = "Edit",
}: ExecutiveOfficialCardProps) {
  return (
    <div className="bg-card space-y-4 rounded-2xl border p-5 shadow-sm transition-all hover:border-[#701a2e]/30">
      <div className="bg-muted relative h-60 w-full overflow-hidden rounded-xl border">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            className="size-full object-cover object-top"
          />
        ) : (
          <div className="text-muted-foreground/40 flex size-full items-center justify-center">
            <RiUser3Line className="size-12" />
          </div>
        )}
        {statusLabel && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-full bg-emerald-500/90 px-3 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
              {statusLabel}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-end justify-between pt-1">
        <div>
          <h3 className="text-foreground font-serif text-lg leading-snug font-bold">
            {name}
          </h3>
          <p className="mt-0.5 text-xs font-semibold text-[#701a2e]">
            {officeLabel}
          </p>
        </div>
        <button
          onClick={onEdit}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs transition-colors"
        >
          <RiEditLine className="size-3.5" />
          <span>{editLabel}</span>
        </button>
      </div>
    </div>
  )
}
