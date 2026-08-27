"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { RiArrowLeftLine, RiCloseLine, RiSaveLine } from "@remixicon/react"
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
import { ProfileImageField } from "@/components/ui/profile-image-field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SocialLinksFields } from "@/components/ui/social-links-fields"
import {
  nulgeFormDefaults,
  nulgeFormSchema,
  type NulgeFormValues,
} from "@/features/nulge/nulge.form"
import {
  useCreateNulgeMember,
  useNulgeMember,
  useUpdateNulgeMember,
} from "@/features/nulge/nulge.hooks"
import { fromNulge, toNulgePayload } from "@/features/nulge/nulge.transformers"
import { useUploadFile } from "@/features/uploads/uploads.hooks"
import {
  NULGE_OFFICE_OPTIONS,
  SEAT_STATUS_OPTIONS,
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

type NulgeFormPageProps = {
  mode: "create" | "edit"
}

export function NulgeFormPage({ mode }: NulgeFormPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = mode === "edit" ? searchParams.get("id") : null

  const member = useNulgeMember(id)
  const createMember = useCreateNulgeMember()
  const updateMember = useUpdateNulgeMember()
  const uploadFile = useUploadFile()

  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)

  const form = useForm<NulgeFormValues>({
    resolver: zodResolver(nulgeFormSchema),
    defaultValues: nulgeFormDefaults,
  })

  React.useEffect(() => {
    if (member.data) form.reset(fromNulge(member.data))
  }, [form, member.data])

  const storedPhoto = member.data?.images[0]?.photo_url
  const isSaving =
    uploadFile.isPending || createMember.isPending || updateMember.isPending

  const handleImageChange = (file: File) => {
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const onSubmit = async (values: NulgeFormValues) => {
    if (mode === "edit" && !id) return

    let photoUrl = storedPhoto ?? ""

    if (imageFile) {
      try {
        photoUrl = await uploadFile.mutateAsync({
          file: imageFile,
          folder: "nulge",
        })
      } catch {
        return
      }
    }

    const payload = toNulgePayload(values, photoUrl)
    const onSuccess = () => router.push("/nulge")

    if (mode === "edit" && id) {
      updateMember.mutate({ id, payload }, { onSuccess })
      return
    }

    createMember.mutate(payload, { onSuccess })
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
              title={mode === "edit" ? "Edit NULGE team" : "Add NULGE team"}
              actions={
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={SECONDARY_ACTION_CLASS}
                    onClick={() => router.push("/nulge")}
                  >
                    <RiCloseLine className="text-muted-foreground mr-1.5 size-4" />
                    Discard
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isSaving || (mode === "edit" && !id)}
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
                onClick={() => router.push("/nulge")}
                className="text-muted-foreground hover:text-foreground inline-flex items-center text-xs font-medium transition-colors"
              >
                <RiArrowLeftLine className="mr-1.5 size-3.5" />
                Back to NULGE team
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
                        items={selectItems(NULGE_OFFICE_OPTIONS)}
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
                          {NULGE_OFFICE_OPTIONS.map((option) => (
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

                <SocialLinksFields control={form.control} />
              </div>

              <div className="space-y-4 lg:col-span-4">
                <ProfileImageField
                  previewUrl={imagePreview ?? storedPhoto}
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
