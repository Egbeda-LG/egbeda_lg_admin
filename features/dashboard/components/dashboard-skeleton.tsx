import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="animate-in fade-in w-full space-y-8 duration-300">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 rounded-xl" />
          <Skeleton className="h-4 w-80 rounded-lg" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-28 rounded-xl" />
          <Skeleton className="h-9 w-28 rounded-xl" />
        </div>
      </div>

      {/* 4 Stat Cards Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-card flex flex-col justify-between space-y-4 rounded-2xl border p-6 shadow-sm"
          >
            <Skeleton className="h-3.5 w-28 rounded-md" />
            <Skeleton className="h-9 w-16 rounded-xl" />
          </div>
        ))}
      </div>

      {/* Quick Actions Skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-3.5 w-24 rounded-md" />
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-card flex items-center justify-between rounded-2xl border p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-xl" />
                <Skeleton className="h-4 w-28 rounded-md" />
              </div>
              <Skeleton className="size-8 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Projects Card Skeleton */}
      <div className="bg-card overflow-hidden rounded-2xl border shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-36 rounded-md" />
            <Skeleton className="h-3.5 w-64 rounded-md" />
          </div>
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>

        <div className="divide-y">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="size-10 shrink-0 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-44 rounded-md" />
                  <Skeleton className="h-3 w-32 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Latest News Card Skeleton */}
      <div className="bg-card space-y-5 rounded-2xl border p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-28 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton className="size-7 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-1.5">
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-3 w-32 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
