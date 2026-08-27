"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { RiArrowLeftLine, RiCloseLine, RiSaveLine } from "@remixicon/react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

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
import { ProfileImageField } from "@/components/ui/profile-image-field"
import { SocialLinksFields } from "@/components/ui/social-links-fields"
import { Textarea } from "@/components/ui/textarea"
import {
  useCreateManagementOfficial,
  useManagementOfficial,
  useUpdateManagementOfficial,
} from "@/features/management/management.hooks"
import {
  managementFormDefaults,
  managementFormSchema,
  type ManagementFormValues,
} from "@/features/management/management.form"
import {
  fromManagement,
  toManagementPayload,
} from "@/features/management/management.transformers"
import { useUploadFile } from "@/features/uploads/uploads.hooks"
import {
  ACTIVE_STATUS_OPTIONS,
  MANAGEMENT_OFFICE_OPTIONS,
  selectItems,
} from "@/lib/api/enums"
import { notifyInvalidForm } from "@/lib/ui/form-errors"
import {
  PRIMARY_ACTION_CLASS,
  SECONDARY_ACTION_CLASS,
} from "@/lib/ui/form-styles"

const LABEL_CLASS =
  "text-xs font-bold tracking-wider text-muted-foreground uppercase"
const FIELD_CLASS = "h-11 w-full rounded-xl bg-background border-input text-sm"

type ManagementFormPageProps = {
  mode: "create" | "edit"
  title: string
  /** Where Discard and the back link return to. */
  returnTo: string
  backLabel: string
  /** The executive variant of this form omits the office description. */
  showDescription?: boolean
}

export function ManagementFormPage({
  mode,
  title,
  returnTo,
  backLabel,
  showDescription = true,
}: ManagementFormPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = mode === "edit" ? searchParams.get("id") : null

  const official = useManagementOfficial(id)
  const createOfficial = useCreateManagementOfficial()
  const updateOfficial = useUpdateManagementOfficial()
  const uploadFile = useUploadFile()

  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)

  const form = useForm<ManagementFormValues>({
    resolver: zodResolver(managementFormSchema),
    defaultValues: managementFormDefaults,
  })

  React.useEffect(() => {
    if (official.data) form.reset(fromManagement(official.data))
  }, [form, official.data])

  const handleImageChange = (file: File) => {
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const isSaving =
    uploadFile.isPending || createOfficial.isPending || updateOfficial.isPending

  const onSubmit = async (values: ManagementFormValues) => {
    if (mode === "edit" && !id) return

    let photoUrl = official.data?.photo_url ?? ""

    if (imageFile) {
      try {
        photoUrl = await uploadFile.mutateAsync({
          file: imageFile,
          folder: "management",
        })
      } catch {
        return
      }
    }

    // photo_url must be a valid URL - the API rejects an empty string.
    if (!photoUrl) {
      toast.error("A photo is required.")
      return
    }

    const payload = toManagementPayload(values, photoUrl)
    const onSuccess = () => router.push(returnTo)

    if (mode === "edit" && id) {
      updateOfficial.mutate({ id, payload }, { onSuccess })
      return
    }

    createOfficial.mutate(payload, { onSuccess })
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
              title={title}
              actions={
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={SECONDARY_ACTION_CLASS}
                    onClick={() => router.push(returnTo)}
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
                    {isSaving ? "Saving..." : "Save official"}
                  </Button>
                </>
              }
            />

            <div>
              <button
                type="button"
                onClick={() => router.push(returnTo)}
                className="text-muted-foreground hover:text-foreground inline-flex items-center text-xs font-medium transition-colors"
              >
                <RiArrowLeftLine className="mr-1.5 size-3.5" />
                {backLabel}
              </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
              <div className="bg-card space-y-6 rounded-2xl border p-6 shadow-sm sm:p-8 lg:col-span-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LABEL_CLASS}>NAME</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter official name"
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
                  name="office"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LABEL_CLASS}>OFFICE</FormLabel>
                      <Select
                        items={selectItems(MANAGEMENT_OFFICE_OPTIONS)}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={FIELD_CLASS}>
                            <SelectValue placeholder="Select office" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MANAGEMENT_OFFICE_OPTIONS.map((option) => (
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
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LABEL_CLASS}>STATUS</FormLabel>
                      <Select
                        items={selectItems(ACTIVE_STATUS_OPTIONS)}
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

                {showDescription && (
                  <FormField
                    control={form.control}
                    name="officeDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={LABEL_CLASS}>
                          OFFICE DESCRIPTION
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter details"
                            rows={4}
                            className="bg-background border-input resize-none rounded-xl text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <SocialLinksFields control={form.control} />
              </div>

              <div className="space-y-4 lg:col-span-4">
                <ProfileImageField
                  previewUrl={imagePreview ?? official.data?.photo_url}
                  onFileChange={handleImageChange}
                  variant={mode === "edit" ? "filled" : "empty"}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </AdminShell>
  )
}
