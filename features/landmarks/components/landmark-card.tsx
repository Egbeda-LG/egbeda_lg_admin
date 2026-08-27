"use client"

import { RiDeleteBinLine, RiEditLine, RiMapPinLine } from "@remixicon/react"

import type { LandmarkRow } from "@/features/landmarks/landmarks.utils"

type LandmarkCardProps = {
  landmark: LandmarkRow
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function LandmarkCard({
  landmark,
  onEdit,
  onDelete,
}: LandmarkCardProps) {
  return (
    <div className="bg-card group flex flex-col justify-between overflow-hidden rounded-2xl border shadow-sm transition-all hover:border-[#701a2e]/30">
      <div
        className={`relative h-44 w-full bg-gradient-to-br ${landmark.bgGradient} flex flex-col justify-between overflow-hidden p-5 text-white`}
      >
        {landmark.photoUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={landmark.photoUrl}
              alt={landmark.title}
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
            {/* Scrim only where the title sits, so the photo stays visible. */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />
          </>
        ) : null}

        <div className="relative z-10 flex items-start justify-between">
          <span className="inline-flex items-center rounded-full border border-white/25 bg-black/45 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-amber-200 uppercase backdrop-blur-md">
            {landmark.categoryLabel}
          </span>
          <span className="inline-flex items-center rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
            {landmark.statusLabel}
          </span>
        </div>
        <div className="relative z-10">
          <h3 className="font-serif text-lg leading-snug font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] transition-colors group-hover:text-amber-200">
            {landmark.title}
          </h3>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="text-muted-foreground flex items-start gap-2 text-xs">
          <RiMapPinLine className="mt-0.5 size-4 shrink-0 text-[#701a2e]" />
          <span className="line-clamp-2">{landmark.location}</span>
        </div>

        <div className="flex items-center justify-between border-t pt-3 text-xs">
          <button
            onClick={() => onEdit(landmark.id)}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1 font-medium transition-colors"
          >
            <RiEditLine className="size-3.5" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(landmark.id)}
            className="text-muted-foreground hover:text-destructive flex items-center gap-1 font-medium transition-colors"
          >
            <RiDeleteBinLine className="size-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}
