"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { RiCloseLine, RiSaveLine } from "@remixicon/react"
import { useForm } from "react-hook-form"

import { AdminShell } from "@/components/layout/admin-shell"
import { BackLink } from "@/components/layout/back-link"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  useCreateDepartment,
  useDepartment,
  useUpdateDepartment,
} from "@/features/departments/departments.hooks"
import {
  departmentFormDefaults,
  departmentFormSchema,
  type DepartmentFormValues,
} from "@/features/departments/departments.form"
import {
  fromDepartment,
  toDepartmentPayload,
} from "@/features/departments/departments.transformers"
import { ACTIVE_STATUS_OPTIONS, selectItems } from "@/lib/api/enums"
import { notifyInvalidForm } from "@/lib/ui/form-errors"
import {
  FORM_INPUT_CLASS,
  FORM_LABEL_CLASS,
  FORM_SELECT_CLASS,
  FORM_TEXTAREA_CLASS,
  PRIMARY_ACTION_CLASS,
  SECONDARY_ACTION_CLASS,
} from "@/lib/ui/form-styles"

export function DepartmentFormPage() {
  const router = useRouter()
  const id = useSearchParams().get("id")
  const department = useDepartment(id)
  const createDepartment = useCreateDepartment()
  const updateDepartment = useUpdateDepartment()

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: departmentFormDefaults,
  })

  React.useEffect(() => {
    if (department.data) form.reset(fromDepartment(department.data))
  }, [department.data, form])

  function onSubmit(values: DepartmentFormValues) {
    const payload = toDepartmentPayload(values)
    const onSuccess = () => router.push("/department")

    if (id) {
      updateDepartment.mutate({ id, payload }, { onSuccess })
      return
    }

    createDepartment.mutate(payload, { onSuccess })
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, notifyInvalidForm)}
            className="space-y-8"
          >
            <PageHeader
              title="Add department"
              actions={
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={SECONDARY_ACTION_CLASS}
                    onClick={() => router.push("/department")}
                  >
                    <RiCloseLine className="mr-1.5 size-4" />
                    Discard
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      createDepartment.isPending || updateDepartment.isPending
                    }
                    size="sm"
                    className={PRIMARY_ACTION_CLASS}
                  >
                    <RiSaveLine className="mr-1.5 size-4" />
                    Save department
                  </Button>
                </>
              }
            />

            <BackLink href="/department">Back to department</BackLink>

            <div className="bg-card space-y-6 rounded-2xl border p-6 shadow-sm sm:p-10">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={FORM_LABEL_CLASS}>
                      DEPARTMENT NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter department name"
                        {...field}
                        className={FORM_INPUT_CLASS}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={FORM_LABEL_CLASS}>
                      HEAD OF DEPARTMENT
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter head of department"
                        {...field}
                        className={FORM_INPUT_CLASS}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="staffStrength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={FORM_LABEL_CLASS}>
                        STAFF STRENGTH
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          inputMode="numeric"
                          min={0}
                          step={1}
                          placeholder="Enter number of staff"
                          {...field}
                          className={FORM_INPUT_CLASS}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={FORM_LABEL_CLASS}>STATUS</FormLabel>
                      <Select
                        items={selectItems(ACTIVE_STATUS_OPTIONS)}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={FORM_SELECT_CLASS}>
                            <SelectValue placeholder="Select department status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ACTIVE_STATUS_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={FORM_LABEL_CLASS}>
                      DESCRIPTION
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter department description"
                        rows={6}
                        {...field}
                        className={FORM_TEXTAREA_CLASS}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </AdminShell>
  )
}
