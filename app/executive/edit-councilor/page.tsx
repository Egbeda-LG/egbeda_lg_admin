import * as React from "react"

import { AdminShell } from "@/components/layout/admin-shell"
import { FormPageSkeleton } from "@/components/ui/loading-skeletons"

import { CouncillorFormPage } from "@/features/councillors/components/councillor-form-page"

export default function EditCouncilorRoute() {
  return (
    <React.Suspense fallback={<AdminShell><FormPageSkeleton /></AdminShell>}>
      <CouncillorFormPage mode="edit" />
    </React.Suspense>
  )
}
