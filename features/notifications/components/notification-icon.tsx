"use client"

import {
  RiArticleLine,
  RiCompass3Line,
  RiHammerLine,
  RiMessage3Line,
  RiUser3Line,
} from "@remixicon/react"

import type { NotificationIconType } from "@/features/notifications/notifications.utils"
import { cn } from "@/lib/utils"

const ICONS: Record<
  NotificationIconType,
  { Icon: typeof RiMessage3Line; className: string }
> = {
  message: {
    Icon: RiMessage3Line,
    className: "border border-sky-100 bg-sky-50 text-sky-600",
  },
  feedback: {
    Icon: RiMessage3Line,
    className: "border border-sky-100 bg-sky-50 text-sky-600",
  },
  article: {
    Icon: RiArticleLine,
    className: "border border-rose-100 bg-rose-50 text-rose-600",
  },
  project: {
    Icon: RiHammerLine,
    className: "border border-emerald-100 bg-emerald-50 text-emerald-600",
  },
  profile: {
    Icon: RiUser3Line,
    className: "border border-slate-200 bg-slate-100 text-slate-600",
  },
  landmark: {
    Icon: RiCompass3Line,
    className: "border border-amber-100 bg-amber-50 text-amber-600",
  },
}

const FALLBACK = {
  Icon: RiMessage3Line,
  className: "bg-muted text-muted-foreground",
}

export function NotificationIcon({ type }: { type: NotificationIconType }) {
  const { Icon, className } = ICONS[type] ?? FALLBACK

  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-xl",
        className,
      )}
    >
      <Icon className="size-5" />
    </div>
  )
}
