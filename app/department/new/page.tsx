import * as React from "react"

import { AdminShell } from "@/components/layout/admin-shell"
import { FormPageSkeleton } from "@/components/ui/loading-skeletons"

import { DepartmentFormPage } from "@/features/departments/components/department-form-page"

export default function DepartmentFormRoute() {
  return (
    <React.Suspense fallback={<AdminShell><FormPageSkeleton /></AdminShell>}>
      <DepartmentFormPage />
    </React.Suspense>
  )
}
