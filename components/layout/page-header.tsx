import * as React from "react"

import { cn } from "@/lib/utils"

type PageHeaderProps = {
  title: string
  eyebrow?: string
  description?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

/** Shared console page heading: brand eyebrow, serif title, blurb and actions. */
export function PageHeader({
  title,
  eyebrow = "Admin Console",
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div>
        <span className="text-xs font-bold tracking-widest text-[#701a2e] uppercase">
          {eyebrow}
        </span>
        <h1 className="text-foreground mt-1 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex shrink-0 items-center gap-3">{actions}</div>
      ) : null}
    </div>
  )
}
