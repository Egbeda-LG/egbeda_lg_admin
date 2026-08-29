"use client"

import Link from "next/link"
import {
  RiAddLine,
  RiBuilding4Line,
  RiCalendarEventLine,
  RiCommunityLine,
  RiCompass3Line,
  RiFundsLine,
  RiGovernmentLine,
  RiGraduationCapLine,
  RiHeartPulseLine,
  RiLeafLine,
  RiMegaphoneLine,
  RiNewspaperLine,
  RiShieldCheckLine,
} from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { Skeleton } from "@/components/ui/skeleton"
import { NewsroomEmptyIcon } from "@/components/icons/empty-states"
import { toNewsSummary } from "@/features/dashboard/dashboard.utils"
import type { NewsItem } from "@/lib/api/types"

type LatestNewsCardProps = {
  articles: NewsItem[]
  isLoading: boolean
  onNewArticle: () => void
}

function getCategoryIcon(category?: string) {
  switch (category) {
    case "health":
      return RiHeartPulseLine
    case "education":
      return RiGraduationCapLine
    case "security":
      return RiShieldCheckLine
    case "environment":
      return RiLeafLine
    case "infrastructure":
      return RiBuilding4Line
    case "events_and_ceremonies":
      return RiCalendarEventLine
    case "government_and_administration":
      return RiGovernmentLine
    case "community_development":
      return RiCommunityLine
    case "arts_culture_and_tourism":
      return RiCompass3Line
    case "public_notice":
      return RiMegaphoneLine
    case "economy":
      return RiFundsLine
    default:
      return RiNewspaperLine
  }
}

export function LatestNewsCard({
  articles,
  isLoading,
  onNewArticle,
}: LatestNewsCardProps) {
  const rows = articles.map(toNewsSummary)

  return (
    <div className="bg-card space-y-5 rounded-2xl border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-sm font-bold">Latest news</h2>
        <Link
          href="/newsroom"
          className="text-xs font-semibold text-[#701a2e] hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="size-9 shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                  <Skeleton className="h-3 w-32 rounded-md" />
                </div>
              </div>
            ))
          : rows.map((article) => {
              const CategoryIcon = getCategoryIcon(article.category)
              return (
                <div
                  key={article.id}
                  className="flex items-center gap-3 text-xs"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#701a2e]/15 bg-gradient-to-br from-[#701a2e]/10 to-[#701a2e]/5 text-[#701a2e] shadow-2xs">
                    <CategoryIcon className="size-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-xs leading-relaxed font-semibold transition-colors hover:text-[#701a2e]">
                      {article.title}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-[11px] capitalize">
                      {article.meta}
                    </p>
                  </div>
                </div>
              )
            })}

        {!isLoading && rows.length === 0 && (
          <EmptyState
            icon={<NewsroomEmptyIcon className="size-24" />}
            title="No news articles found"
            description="Draft, schedule or publish official news announcements for the Egbeda local government website."
            className="border-0 bg-transparent py-8"
            action={
              <Button
                size="sm"
                className="h-9 rounded-xl bg-[#701a2e] text-xs font-medium text-white shadow-sm hover:bg-[#571323]"
                onClick={onNewArticle}
              >
                <RiAddLine className="mr-1.5 size-4" />
                New article
              </Button>
            }
          />
        )}
      </div>
    </div>
  )
}
