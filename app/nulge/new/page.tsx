import * as React from "react"

import { AdminShell } from "@/components/layout/admin-shell"
import { FormPageSkeleton } from "@/components/ui/loading-skeletons"

import { NulgeFormPage } from "@/features/nulge/components/nulge-form-page"

export default function NewNulgeRoute() {
  return (
    <React.Suspense fallback={<AdminShell><FormPageSkeleton /></AdminShell>}>
      <NulgeFormPage mode="create" />
    </React.Suspense>
  )
}
