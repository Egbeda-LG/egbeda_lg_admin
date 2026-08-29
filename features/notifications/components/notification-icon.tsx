"use client"

import {
  RiArticleLine,
  RiBuilding4Line,
  RiChatQuoteLine,
  RiCompass3Line,
  RiMessage3Line,
  RiUser3Line,
} from "@remixicon/react"

import type { NotificationIconType } from "@/features/notifications/notifications.utils"
import { cn } from "@/lib/utils"

const ICONS: Record<
  NotificationIconType,
  { Icon: React.ElementType; className: string }
> = {
  message: {
    Icon: RiMessage3Line,
    className:
      "border border-[#701a2e]/15 bg-gradient-to-br from-[#701a2e]/10 to-[#701a2e]/5 text-[#701a2e]",
  },
  feedback: {
    Icon: RiChatQuoteLine,
    className:
      "border border-[#701a2e]/15 bg-gradient-to-br from-[#701a2e]/10 to-[#701a2e]/5 text-[#701a2e]",
  },
  article: {
    Icon: RiArticleLine,
    className:
      "border border-[#701a2e]/15 bg-gradient-to-br from-[#701a2e]/10 to-[#701a2e]/5 text-[#701a2e]",
  },
  project: {
    Icon: RiBuilding4Line,
    className:
      "border border-[#701a2e]/15 bg-gradient-to-br from-[#701a2e]/10 to-[#701a2e]/5 text-[#701a2e]",
  },
  profile: {
    Icon: RiUser3Line,
    className:
      "border border-[#701a2e]/15 bg-gradient-to-br from-[#701a2e]/10 to-[#701a2e]/5 text-[#701a2e]",
  },
  landmark: {
    Icon: RiCompass3Line,
    className:
      "border border-amber-200/80 bg-amber-50/90 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-400",
  },
}

const FALLBACK = {
  Icon: RiMessage3Line,
  className:
    "border border-[#701a2e]/15 bg-gradient-to-br from-[#701a2e]/10 to-[#701a2e]/5 text-[#701a2e]",
}

export function NotificationIcon({ type }: { type: NotificationIconType }) {
  const { Icon, className } = ICONS[type] ?? FALLBACK

  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-xl shadow-2xs transition-colors",
        className,
      )}
    >
      <Icon className="size-5" />
    </div>
  )
}
