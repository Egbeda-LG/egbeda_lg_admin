import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

/**
 * Placeholders shown while a list query is still loading.
 *
 * Without these a page renders its "no records" empty state for the duration of
 * the first fetch, because an in-flight query has no data yet - so the user sees
 * "No projects found" flash before the real rows arrive.
 */

export function TableSkeleton({
  rows = 6,
  columns = 5,
  className,
}: {
  rows?: number
  columns?: number
  className?: string
}) {
  return (
    <div
      className={cn("bg-card overflow-hidden rounded-2xl border", className)}
      aria-busy="true"
      aria-label="Loading records"
    >
      <div className="bg-muted/40 flex items-center gap-4 border-b px-4 py-3">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton
            key={index}
            className={cn("h-3", index === 0 ? "w-1/3" : "flex-1")}
          />
        ))}
      </div>

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-4 border-b px-4 py-4 last:border-b-0">
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <Skeleton
              key={columnIndex}
              className={cn("h-4", columnIndex === 0 ? "w-1/3" : "flex-1")}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export function CardGridSkeleton({
  count = 6,
  withMedia = false,
  className,
}: {
  count?: number
  /** Adds a 16:9 image block, for cards that lead with a photo. */
  withMedia?: boolean
  className?: string
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn("bg-card space-y-3 rounded-2xl border p-5", className)}
          aria-busy="true"
        >
          {withMedia ? <Skeleton className="aspect-video w-full rounded-xl" /> : null}
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <div className="flex items-center gap-2 pt-1">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="ml-auto size-7 rounded-md" />
            <Skeleton className="size-7 rounded-md" />
          </div>
        </div>
      ))}
    </>
  )
}

export function ListSkeleton({
  rows = 5,
  className,
}: {
  rows?: number
  className?: string
}) {
  return (
    <div className={cn("space-y-2", className)} aria-busy="true">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="bg-card flex items-start gap-3 rounded-xl border p-4">
          <Skeleton className="size-9 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-1/3" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Fallback for the Suspense boundary each form route needs.
 *
 * These boundaries exist because the form components call `useSearchParams()`,
 * which Next.js requires to be wrapped in Suspense. `fallback={null}` satisfies
 * that requirement but paints a blank screen while the boundary is suspended -
 * this shows the page's shape instead.
 */
export function FormPageSkeleton() {
  return (
    <div className="w-full space-y-8" aria-busy="true" aria-label="Loading form">
      <div className="space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-3 w-96" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="bg-card space-y-6 rounded-2xl border p-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="bg-card space-y-3 rounded-2xl border p-5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
