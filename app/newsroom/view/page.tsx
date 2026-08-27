import * as React from "react"

import { AdminShell } from "@/components/layout/admin-shell"
import { FormPageSkeleton } from "@/components/ui/loading-skeletons"

import { ArticleViewPage } from "@/features/news/components/article-view-page"

export default function ViewArticleRoute() {
  return (
    <React.Suspense fallback={<AdminShell><FormPageSkeleton /></AdminShell>}>
      <ArticleViewPage />
    </React.Suspense>
  )
}
