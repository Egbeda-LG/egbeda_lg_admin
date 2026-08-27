import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type StatCardProps = {
  label: string
  value?: React.ReactNode
  isLoading?: boolean
  className?: string
}

/** Summary tile used on the dashboard and the project list. */
export function StatCard({ label, value, isLoading, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-card flex flex-col justify-between rounded-2xl border p-6 shadow-sm",
        className,
      )}
    >
      <p className="text-muted-foreground text-[11px] font-bold tracking-wider uppercase">
        {label}
      </p>
      {isLoading ? (
        <Skeleton className="mt-4 h-9 w-20 rounded-xl" />
      ) : (
        <p className="text-foreground mt-4 font-serif text-4xl font-extrabold">
          {value}
        </p>
      )}
    </div>
  )
}
