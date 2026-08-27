"use client"

import { RiCalendarLine, RiTimeLine } from "@remixicon/react"

import { RichText } from "@/components/ui/rich-text"
import { StatusBadge } from "@/components/ui/status-badge"

/** Derived from the body text at ~200 words per minute. */
function readingTime(html: string) {
  const words = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return `${Math.max(1, Math.round(words / 200))} min read`
}

type ArticlePreviewProps = {
  title: string
  statusLabel: string
  isPublished: boolean
  date: string
  body: string
}

export function ArticlePreview({
  title,
  statusLabel,
  isPublished,
  date,
  body,
}: ArticlePreviewProps) {
  return (
    <div className="bg-card space-y-6 rounded-2xl border p-6 shadow-sm sm:p-10">
      <StatusBadge
        label={statusLabel}
        tone={isPublished ? "success" : "warning"}
        className="px-3 py-1"
      />

      <h1 className="text-foreground font-serif text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>

      {/*
        Author and view count are deliberately absent: the news API returns
        neither, and showing invented values here made the preview look like it
        was reporting real figures. Read time is derived from the article body.
      */}
      <div className="text-muted-foreground flex flex-wrap items-center gap-4 border-b pb-6 text-xs">
        <div className="flex items-center gap-1.5">
          <RiCalendarLine className="size-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <RiTimeLine className="size-4" />
          <span>{readingTime(body)}</span>
        </div>
      </div>

      <RichText html={body} className="pt-2" />
    </div>
  )
}
