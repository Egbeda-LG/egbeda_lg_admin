"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { RiCloseLine, RiSendPlaneLine } from "@remixicon/react"
import { useForm } from "react-hook-form"

import { AdminShell } from "@/components/layout/admin-shell"
import { BackLink } from "@/components/layout/back-link"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ServiceFormFields } from "@/features/services/components/service-form-fields"
import {
  useCreateService,
  useService,
  useUpdateService,
} from "@/features/services/services.hooks"
import {
  serviceFormDefaults,
  serviceFormSchema,
  type ServiceFormValues,
} from "@/features/services/services.form"
import {
  fromService,
  toServicePayload,
} from "@/features/services/services.transformers"
import { notifyInvalidForm } from "@/lib/ui/form-errors"
import {
  PRIMARY_ACTION_CLASS,
  SECONDARY_ACTION_CLASS,
} from "@/lib/ui/form-styles"

type ServiceFormPageProps = {
  mode: "create" | "edit"
}

export function ServiceFormPage({ mode }: ServiceFormPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = mode === "edit" ? searchParams.get("id") : null

  const service = useService(id)
  const createService = useCreateService()
  const updateService = useUpdateService()

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: serviceFormDefaults,
  })

  React.useEffect(() => {
    if (service.data) form.reset(fromService(service.data))
  }, [form, service.data])

  const isSaving = createService.isPending || updateService.isPending

  function onSubmit(values: ServiceFormValues) {
    const payload = toServicePayload(values)
    const onSuccess = () => router.push("/services")

    if (mode === "edit") {
      if (!id) return
      updateService.mutate({ id, payload }, { onSuccess })
      return
    }

    createService.mutate(payload, { onSuccess })
  }

  const submitLabel =
    mode === "edit"
      ? isSaving
        ? "Saving..."
        : "Save service"
      : isSaving
        ? "Publishing..."
        : "Publish"

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, notifyInvalidForm)}
            className="space-y-8"
          >
            <PageHeader
              title={mode === "edit" ? "Edit service" : "Add new service"}
              description="Configure details, required documents, and processing timelines for this public service."
              actions={
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={SECONDARY_ACTION_CLASS}
                    onClick={() => router.push("/services")}
                  >
                    <RiCloseLine className="mr-1.5 size-4" />
                    Discard
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSaving || (mode === "edit" && !id)}
                    size="sm"
                    className={PRIMARY_ACTION_CLASS}
                  >
                    <RiSendPlaneLine className="mr-1.5 size-4" />
                    {submitLabel}
                  </Button>
                </>
              }
            />

            <BackLink href="/services">Back to service</BackLink>

            <ServiceFormFields form={form} />
          </form>
        </Form>
      </div>
    </AdminShell>
  )
}
