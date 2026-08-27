import * as React from "react"

import { AdminShell } from "@/components/layout/admin-shell"
import { FormPageSkeleton } from "@/components/ui/loading-skeletons"

import { ManagementFormPage } from "@/features/management/components/management-form-page"

export default function NewExecutiveOfficialRoute() {
  return (
    <React.Suspense fallback={<AdminShell><FormPageSkeleton /></AdminShell>}>
      <ManagementFormPage
        mode="create"
        title="Add executive council"
        returnTo="/executive"
        backLabel="Back to executive & appointed officials"
        showDescription={false}
      />
    </React.Suspense>
  )
}
