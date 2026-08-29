import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PaginationFooterProps = {
  page?: number
  totalPages?: number
  className?: string
  /** Omit to keep the controls inert, as the not-yet-paginated pages do. */
  onPageChange?: (page: number) => void
  isBusy?: boolean
}

export function PaginationFooter({
  page = 1,
  totalPages = 1,
  className,
  onPageChange,
  isBusy,
}: PaginationFooterProps) {
  const canGoBack = Boolean(onPageChange) && page > 1
  const canGoForward = Boolean(onPageChange) && page < totalPages
  return (
    <div
      className={cn(
        "text-muted-foreground flex items-center justify-between border-t pt-4 text-xs",
        className,
      )}
    >
      <div>
        Showing {page} of {totalPages} pages
      </div>
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          disabled={!canGoBack || isBusy}
          onClick={() => onPageChange?.(page - 1)}
          className="h-8 px-3 text-xs shadow-none"
        >
          Prev
        </Button>
        <div className="flex size-7 items-center justify-center rounded-full bg-[#701a2e] text-xs font-bold text-white">
          {page}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={!canGoForward || isBusy}
          onClick={() => onPageChange?.(page + 1)}
          className="h-8 px-3 text-xs shadow-none"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
