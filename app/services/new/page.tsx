import * as React from "react"

import { AdminShell } from "@/components/layout/admin-shell"
import { FormPageSkeleton } from "@/components/ui/loading-skeletons"

import { ServiceFormPage } from "@/features/services/components/service-form-page"

export default function NewServiceRoute() {
  return (
    <React.Suspense fallback={<AdminShell><FormPageSkeleton /></AdminShell>}>
      <ServiceFormPage mode="create" />
    </React.Suspense>
  )
}
