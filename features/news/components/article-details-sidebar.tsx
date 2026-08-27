"use client"

import { RiExternalLinkLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"

type ArticleDetailsSidebarProps = {
  title: string
  featuredImage: string | null
  statusLabel: string
  featuredLabel: string
  categoryLabel: string
  slug: string
}

const PUBLIC_SITE_URL = "https://egbedalg.gov.ng"

export function ArticleDetailsSidebar({
  title,
  featuredImage,
  statusLabel,
  featuredLabel,
  categoryLabel,
  slug,
}: ArticleDetailsSidebarProps) {
  const details = [
    { label: "Status", value: statusLabel, className: "text-emerald-600" },
    { label: "Featured news", value: featuredLabel },
    { label: "Visibility", value: "Public" },
    { label: "Scheduled", value: "Now", className: "text-rose-600" },
    { label: "Category", value: categoryLabel },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-card space-y-3 rounded-2xl border p-5 shadow-sm">
        <h3 className="text-foreground text-xs font-bold tracking-wider uppercase">
          Featured image
        </h3>
        <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-xl border">
          {featuredImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={featuredImage}
              alt={title}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center p-4 text-center">
              <p className="text-muted-foreground text-[11px]">
                No featured image
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-card space-y-4 rounded-2xl border p-5 shadow-sm">
        <h3 className="text-foreground text-xs font-bold tracking-wider uppercase">
          Publishing
        </h3>
        <div className="space-y-3 text-xs">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="flex items-center justify-between border-b py-1 last:border-b-0"
            >
              <span className="text-muted-foreground">{detail.label}</span>
              <span
                className={`font-semibold ${detail.className ?? "text-foreground"}`}
              >
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card space-y-3 rounded-2xl border p-5 shadow-sm">
        <h3 className="text-foreground text-xs font-bold tracking-wider uppercase">
          Live URL
        </h3>
        <div className="bg-muted/60 text-muted-foreground rounded-lg border p-2.5 font-mono text-[11px] break-all">
          /news/{slug}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-input h-9 w-full rounded-lg text-xs font-medium shadow-none"
          onClick={() => window.open(PUBLIC_SITE_URL, "_blank")}
        >
          <RiExternalLinkLine className="mr-1.5 size-3.5" />
          Open on website
        </Button>
      </div>
    </div>
  )
}
