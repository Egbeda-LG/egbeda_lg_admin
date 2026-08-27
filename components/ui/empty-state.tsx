import * as React from "react"
import { RiInbox2Line } from "@remixicon/react"

import { cn } from "@/lib/utils"

export type EmptyStateProps = {
  title?: string
  description?: string
  className?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  layout?: "centered" | "horizontal"
}

export function EmptyState({
  title = "Nothing here yet",
  description = "New records will appear here when they are available.",
  className,
  icon,
  action,
  layout = "centered",
}: EmptyStateProps) {
  if (layout === "horizontal") {
    return (
      <div
        className={cn(
          "bg-card relative flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-border/80 p-6 sm:p-8 shadow-sm transition-all gap-6",
          className,
        )}
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="flex shrink-0 items-center justify-center">
            {icon ?? (
              <div className="bg-muted/60 text-muted-foreground flex size-14 items-center justify-center rounded-2xl border">
                <RiInbox2Line className="size-7" />
              </div>
            )}
          </div>
          <div className="space-y-1 max-w-md">
            <h3 className="text-foreground font-serif text-base font-bold sm:text-lg">
              {title}
            </h3>
            {description && (
              <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "bg-card flex flex-col items-center justify-center rounded-2xl border border-border/80 p-8 sm:p-12 text-center shadow-xs transition-all",
        className,
      )}
    >
      <div className="flex items-center justify-center mb-4">
        {icon ?? (
          <div className="bg-muted/60 text-muted-foreground flex size-14 items-center justify-center rounded-2xl border">
            <RiInbox2Line className="size-7" />
          </div>
        )}
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h3 className="text-foreground font-serif text-base sm:text-lg font-bold">
          {title}
        </h3>
        {description && (
          <p className="text-muted-foreground text-xs leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
