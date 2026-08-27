"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { SearchEmptyIcon } from "@/components/icons/empty-states/search-empty-icon"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  filterTabs?: { label: string; value: string }[]
  activeFilter?: string
  onFilterChange?: (value: string) => void
  emptyState?: React.ReactNode
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterTabs,
  activeFilter,
  onFilterChange,
  emptyState,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  })

  return (
    <div className="space-y-4">
      {/* Top Filter Bar if provided */}
      {filterTabs && filterTabs.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onFilterChange?.(tab.value)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeFilter === tab.value
                  ? "bg-[#701a2e] text-white"
                  : "bg-background text-muted-foreground hover:text-foreground border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Table Container */}
      <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-muted-foreground h-10 py-3 text-[11px] font-bold tracking-wider uppercase"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/30 border-b transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-foreground py-3.5 text-xs"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-64 py-8 text-center"
                >
                  {emptyState ?? (
                    <div className="flex flex-col items-center justify-center space-y-2 py-4">
                      <SearchEmptyIcon className="size-20" />
                      <p className="text-foreground font-serif text-sm font-bold">
                        No records found
                      </p>
                      <p className="text-muted-foreground max-w-xs text-xs">
                        Try adjusting your search criteria or filters to find
                        what you&apos;re looking for.
                      </p>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Table Footer Pagination */}
        <div className="bg-card text-muted-foreground flex items-center justify-between border-t px-6 py-4 text-xs">
          <div>Showing 1 of {Math.max(1, table.getPageCount())} pages</div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 px-3 text-xs shadow-none"
            >
              Prev
            </Button>
            <div className="flex size-7 items-center justify-center rounded-full bg-[#701a2e] text-xs font-bold text-white">
              {table.getState().pagination.pageIndex + 1}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 px-3 text-xs shadow-none"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
