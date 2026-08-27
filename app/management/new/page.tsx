import * as React from "react"

import { AdminShell } from "@/components/layout/admin-shell"
import { FormPageSkeleton } from "@/components/ui/loading-skeletons"

import { ManagementFormPage } from "@/features/management/components/management-form-page"

export default function NewManagementRoute() {
  return (
    <React.Suspense fallback={<AdminShell><FormPageSkeleton /></AdminShell>}>
      <ManagementFormPage
        mode="create"
        title="Add management team"
        returnTo="/management"
        backLabel="Back to management"
      />
    </React.Suspense>
  )
}
