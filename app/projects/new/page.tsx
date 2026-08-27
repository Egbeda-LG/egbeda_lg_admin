import * as React from "react"

import { AdminShell } from "@/components/layout/admin-shell"
import { FormPageSkeleton } from "@/components/ui/loading-skeletons"

import { ProjectFormPage } from "@/features/projects/components/project-form-page"

export default function NewProjectRoute() {
  return (
    <React.Suspense fallback={<AdminShell><FormPageSkeleton /></AdminShell>}>
      <ProjectFormPage mode="create" />
    </React.Suspense>
  )
}
