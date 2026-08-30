"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { RiAddLine, RiDownloadLine } from "@remixicon/react"

import { AdminShell } from "@/components/layout/admin-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/ui/stat-card"
import { LatestNewsCard } from "@/features/dashboard/components/latest-news-card"
import { QuickActions } from "@/features/dashboard/components/quick-actions"
import { RecentProjectsCard } from "@/features/dashboard/components/recent-projects-card"
import { useDashboardOverview } from "@/features/dashboard/dashboard.hooks"
import {
  greetingName,
  toDashboardStats,
} from "@/features/dashboard/dashboard.utils"
import { useAuth } from "@/lib/auth/auth-context"
import {
  PRIMARY_ACTION_CLASS,
  SECONDARY_ACTION_CLASS,
} from "@/lib/ui/form-styles"

export function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const dashboardQuery = useDashboardOverview(isAuthenticated)

  const stats = toDashboardStats(dashboardQuery.data)
  const statLoading = [
    dashboardQuery.queries.news.isLoading,
    dashboardQuery.queries.news.isLoading ||
      dashboardQuery.queries.projects.isLoading,
    dashboardQuery.queries.news.isLoading ||
      dashboardQuery.queries.landmarks.isLoading,
    dashboardQuery.queries.messages.isLoading,
  ]

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/login")
  }, [isLoading, isAuthenticated, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-4 border-[#701a2e] border-t-transparent" />
          <p className="text-muted-foreground text-xs font-medium">
            Loading Egbeda Admin Console...
          </p>
        </div>
      </div>
    )
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title={`Welcome back, ${greetingName(user?.name)}`}
          description="Here's what's happening across Egbeda LG today."
          actions={
            <>
              <Button
                variant="outline"
                size="sm"
                className={SECONDARY_ACTION_CLASS}
                disabled
                title="Report export is not available yet"
              >
                <RiDownloadLine className="text-muted-foreground mr-2 size-4" />
                Export report
              </Button>
              <Button
                size="sm"
                className={PRIMARY_ACTION_CLASS}
                onClick={() => router.push("/newsroom/compose")}
              >
                <RiAddLine className="mr-1.5 size-4" />
                New article
              </Button>
            </>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              isLoading={statLoading[index]}
            />
          ))}
        </div>

        <QuickActions />

        {dashboardQuery.isError && (
          <div className="border-destructive/20 bg-destructive/5 text-destructive flex items-center justify-between rounded-xl border px-4 py-3 text-xs">
            <span>Dashboard data could not be loaded.</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => dashboardQuery.refetch()}
            >
              Try again
            </Button>
          </div>
        )}

        <RecentProjectsCard
          projects={dashboardQuery.data?.projects ?? []}
          isLoading={dashboardQuery.queries.projects.isLoading}
          onAddProject={() => router.push("/projects/new")}
        />

        <LatestNewsCard
          articles={dashboardQuery.data?.latestNews ?? []}
          isLoading={dashboardQuery.queries.news.isLoading}
          onNewArticle={() => router.push("/newsroom/compose")}
        />
      </div>
    </AdminShell>
  )
}
