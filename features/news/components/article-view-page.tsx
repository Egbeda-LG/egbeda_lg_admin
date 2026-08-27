"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
import { RiDeleteBinLine, RiEditLine, RiFileCopyLine } from "@remixicon/react"

import { AdminShell } from "@/components/layout/admin-shell"
import { BackLink } from "@/components/layout/back-link"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog"
import { ArticleDetailsSidebar } from "@/features/news/components/article-details-sidebar"
import { ArticlePreview } from "@/features/news/components/article-preview"
import { useDeleteNews, useNewsItem } from "@/features/news/news.hooks"
import {
  extractFeaturedImage,
  stripFeaturedImage,
} from "@/features/news/news.form"
import { toArticleSlug, toNewsRow } from "@/features/news/news.utils"
import {
  NEWS_CATEGORY_OPTIONS,
  PUBLISH_STATUS_OPTIONS,
  optionLabel,
} from "@/lib/api/enums"
import {
  PRIMARY_ACTION_CLASS,
  SECONDARY_ACTION_CLASS,
} from "@/lib/ui/form-styles"

export function ArticleViewPage() {
  const router = useRouter()
  const id = useSearchParams().get("id")
  const article = useNewsItem(id)
  const deleteNews = useDeleteNews()
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)

  const content = article.data?.content ?? ""
  const featuredImage = extractFeaturedImage(content)
  const body = stripFeaturedImage(content)
  const slug = toArticleSlug(article.data?.title, "article")
  const row = article.data ? toNewsRow(article.data) : null

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/news/${slug}`,
    )
    toast.success("Article link copied")
  }

  const handleDelete = () => {
    if (!id) return

    deleteNews.mutate(id, {
      onSuccess: () => router.push("/newsroom"),
      onSettled: () => setIsDeleteOpen(false),
    })
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title="View article"
          description="Read-only preview of how this article appears on the public website."
          actions={
            <div className="flex flex-wrap items-center gap-2.5">
              <Button
                variant="outline"
                size="sm"
                className={SECONDARY_ACTION_CLASS}
                onClick={handleCopyLink}
              >
                <RiFileCopyLine className="text-muted-foreground mr-1.5 size-4" />
                Copy link
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive border-destructive/30 hover:bg-destructive/10 h-10 rounded-lg text-xs font-medium shadow-none"
                onClick={() => setIsDeleteOpen(true)}
              >
                <RiDeleteBinLine className="mr-1.5 size-4" />
                Delete
              </Button>
              <Button
                size="sm"
                className={PRIMARY_ACTION_CLASS}
                onClick={() => router.push(`/newsroom/edit?id=${id}`)}
              >
                <RiEditLine className="mr-1.5 size-4" />
                Edit news
              </Button>
            </div>
          }
        />

        <BackLink href="/newsroom">Back to news</BackLink>

        <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
          <ArticlePreview
            title={article.data?.title ?? "Loading article..."}
            statusLabel={
              article.data
                ? optionLabel(PUBLISH_STATUS_OPTIONS, article.data.status)
                : "Loading..."
            }
            isPublished={row?.isPublished ?? false}
            date={row?.date ?? "—"}
            body={body}
          />

          <ArticleDetailsSidebar
            title={article.data?.title ?? "Featured image"}
            featuredImage={featuredImage}
            statusLabel={optionLabel(
              PUBLISH_STATUS_OPTIONS,
              article.data?.status,
            )}
            featuredLabel={article.data?.is_featured ? "Yes" : "No"}
            categoryLabel={optionLabel(
              NEWS_CATEGORY_OPTIONS,
              article.data?.category,
            )}
            slug={slug}
          />
        </div>

        <ConfirmDeleteDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          title="Delete article?"
          description="This news article will be permanently removed from the public website."
          onConfirm={handleDelete}
          disabled={deleteNews.isPending}
        />
      </div>
    </AdminShell>
  )
}
