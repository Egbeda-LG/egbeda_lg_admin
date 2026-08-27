import * as React from "react"

import { AdminShell } from "@/components/layout/admin-shell"
import { FormPageSkeleton } from "@/components/ui/loading-skeletons"

import { LandmarkFormPage } from "@/features/landmarks/components/landmark-form-page"

export default function LandmarkFormRoute() {
  return (
    <React.Suspense fallback={<AdminShell><FormPageSkeleton /></AdminShell>}>
      <LandmarkFormPage />
    </React.Suspense>
  )
}
