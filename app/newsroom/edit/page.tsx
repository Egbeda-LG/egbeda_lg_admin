import * as React from "react"

import { AdminShell } from "@/components/layout/admin-shell"
import { FormPageSkeleton } from "@/components/ui/loading-skeletons"

import { NewsFormPage } from "@/features/news/components/news-form-page"

export default function EditArticleRoute() {
  return (
    <React.Suspense fallback={<AdminShell><FormPageSkeleton /></AdminShell>}>
      <NewsFormPage mode="edit" />
    </React.Suspense>
  )
}
