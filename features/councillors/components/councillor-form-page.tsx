"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  RiArrowLeftLine,
  RiCalendarLine,
  RiCloseLine,
  RiSaveLine,
} from "@remixicon/react"
import { useForm } from "react-hook-form"

import { AdminShell } from "@/components/layout/admin-shell"
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
import {
  useCouncillor,
  useCreateCouncillor,
  useUpdateCouncillor,
} from "@/features/councillors/councillors.hooks"
import {
  councillorFormDefaults,
  councillorFormSchema,
  type CouncillorFormValues,
} from "@/features/councillors/councillors.form"
import {
  fromCouncillor,
  toCouncillorPayload,
} from "@/features/councillors/councillors.transformers"
import { useWardOptions } from "@/features/wards/wards.hooks"
import { SEAT_STATUS_OPTIONS, selectItems } from "@/lib/api/enums"
import { notifyInvalidForm } from "@/lib/ui/form-errors"
import {
  PRIMARY_ACTION_CLASS,
  SECONDARY_ACTION_CLASS,
} from "@/lib/ui/form-styles"

const LABEL_CLASS =
  "text-xs font-bold tracking-wider text-muted-foreground uppercase"
const FIELD_CLASS = "h-11 w-full rounded-xl bg-background border-input text-sm"

type CouncillorFormPageProps = {
  mode: "create" | "edit"
}

export function CouncillorFormPage({ mode }: CouncillorFormPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = mode === "edit" ? searchParams.get("id") : null

  const { options: wardOptions } = useWardOptions()
  const councillor = useCouncillor(id)
  const createCouncillor = useCreateCouncillor()
  const updateCouncillor = useUpdateCouncillor()

  const form = useForm<CouncillorFormValues>({
    resolver: zodResolver(councillorFormSchema),
    defaultValues: councillorFormDefaults,
  })

  React.useEffect(() => {
    if (councillor.data) form.reset(fromCouncillor(councillor.data))
  }, [councillor.data, form])

  const isSaving = createCouncillor.isPending || updateCouncillor.isPending

  const onSubmit = (values: CouncillorFormValues) => {
    const onSuccess = () => router.push("/executive")

    if (mode === "edit") {
      if (!id) return

      updateCouncillor.mutate(
        {
          id,
          payload: toCouncillorPayload(values, {
            photoUrl: councillor.data?.images[0]?.photo_url,
            socialMedia: councillor.data?.social_media,
          }),
        },
        { onSuccess },
      )
      return
    }

    createCouncillor.mutate(toCouncillorPayload(values), { onSuccess })
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, notifyInvalidForm)}
            className="max-w-4xl space-y-8"
          >
            <PageHeader
              title={mode === "edit" ? "Edit councilor" : "Add councilor"}
              actions={
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={SECONDARY_ACTION_CLASS}
                    onClick={() => router.push("/executive")}
                  >
                    <RiCloseLine className="text-muted-foreground mr-1.5 size-4" />
                    Discard
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSaving || (mode === "edit" && !id)}
                    size="sm"
                    className={PRIMARY_ACTION_CLASS}
                  >
                    <RiSaveLine className="mr-1.5 size-4" />
                    {isSaving ? "Saving..." : "Save councilor"}
                  </Button>
                </>
              }
            />

            <div>
              <button
                type="button"
                onClick={() => router.push("/executive")}
                className="text-muted-foreground hover:text-foreground inline-flex items-center text-xs font-medium transition-colors"
              >
                <RiArrowLeftLine className="mr-1.5 size-3.5" />
                Back to executive & appointed officials
              </button>
            </div>

            <div className="bg-card space-y-6 rounded-2xl border p-6 shadow-sm sm:p-8">
              <FormField
                control={form.control}
                name="councilorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={LABEL_CLASS}>
                      COUNCILOR NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter councilor name"
                        className={FIELD_CLASS}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={LABEL_CLASS}>WARD</FormLabel>
                    <Select
                      items={selectItems(wardOptions)}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={FIELD_CLASS}>
                          <SelectValue placeholder="Select ward" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {wardOptions.map((option) => (
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

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={LABEL_CLASS}>AREA</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter ward area"
                        className={FIELD_CLASS}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateAppointed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={LABEL_CLASS}>
                      DATE APPOINTED
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="date"
                          placeholder="Select date of appointment"
                          className={`${FIELD_CLASS} pr-10`}
                          {...field}
                        />
                        <RiCalendarLine className="text-muted-foreground pointer-events-none absolute top-3 right-3 size-5" />
                      </div>
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
                    <FormLabel className={LABEL_CLASS}>STATUS</FormLabel>
                    <Select
                      items={selectItems(SEAT_STATUS_OPTIONS)}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={FIELD_CLASS}>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SEAT_STATUS_OPTIONS.map((option) => (
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
          </form>
        </Form>
      </div>
    </AdminShell>
  )
}
