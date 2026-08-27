import Link from "next/link"
import { RiArrowRightSLine } from "@remixicon/react"

import { QUICK_ACTIONS } from "@/features/dashboard/dashboard.utils"

export function QuickActions() {
  return (
    <div className="space-y-3">
      <h2 className="text-foreground text-xs font-bold tracking-wider uppercase">
        Quick actions
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {QUICK_ACTIONS.map(({ title, href, icon: Icon }) => (
          <Link
            key={title}
            href={href}
            className="group bg-card flex items-center justify-between rounded-2xl border p-4 shadow-sm transition hover:border-[#701a2e]/30 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-rose-50 text-[#701a2e]">
                <Icon className="size-5" />
              </div>
              <span className="text-foreground text-sm font-semibold">
                {title}
              </span>
            </div>
            <div className="bg-muted/60 text-muted-foreground flex size-8 items-center justify-center rounded-full transition-colors group-hover:bg-[#701a2e] group-hover:text-white">
              <RiArrowRightSLine className="size-5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
