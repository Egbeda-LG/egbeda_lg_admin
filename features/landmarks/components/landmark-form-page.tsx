"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { RiCloseLine, RiSendPlaneLine } from "@remixicon/react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

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
import { PublishingCard } from "@/components/ui/publishing-card"
import { ImageDropzone } from "@/components/ui/image-dropzone"
import {
  useCreateLandmark,
  useLandmark,
  useUpdateLandmark,
} from "@/features/landmarks/landmarks.hooks"
import {
  landmarkFormDefaults,
  landmarkFormSchema,
  type LandmarkFormValues,
} from "@/features/landmarks/landmarks.form"
import {
  fromLandmark,
  toLandmarkPayload,
} from "@/features/landmarks/landmarks.transformers"
import { useUploadFile } from "@/features/uploads/uploads.hooks"
import {
  LANDMARK_CATEGORY_OPTIONS,
  selectItems,
} from "@/lib/api/enums"
import { notifyInvalidForm } from "@/lib/ui/form-errors"
import {
  FORM_INPUT_CLASS,
  FORM_LABEL_CLASS,
  FORM_SELECT_CLASS,
  FORM_TEXTAREA_CLASS,
  PRIMARY_ACTION_CLASS,
  SECONDARY_ACTION_CLASS,
} from "@/lib/ui/form-styles"

export function LandmarkFormPage() {
  const router = useRouter()
  const id = useSearchParams().get("id")
  const landmark = useLandmark(id)
  const createLandmark = useCreateLandmark()
  const updateLandmark = useUpdateLandmark()
  const uploadFile = useUploadFile()
  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [imageCleared, setImageCleared] = React.useState(false)

  const form = useForm<LandmarkFormValues>({
    resolver: zodResolver(landmarkFormSchema),
    defaultValues: landmarkFormDefaults,
  })

  React.useEffect(() => {
    if (landmark.data) form.reset(fromLandmark(landmark.data))
  }, [form, landmark.data])

  const isSaving =
    createLandmark.isPending || updateLandmark.isPending || uploadFile.isPending

  async function onSubmit(values: LandmarkFormValues) {
    let photoUrl = imageCleared ? "" : (landmark.data?.photo_url ?? "")

    if (imageFile) {
      try {
        photoUrl = await uploadFile.mutateAsync({
          file: imageFile,
          folder: "landmarks",
        })
      } catch {
        return
      }
    }

    // photo_url must be a valid URL - the API rejects an empty string.
    if (!photoUrl) {
      toast.error("A landmark image is required.")
      return
    }

    const payload = toLandmarkPayload(values, photoUrl)
    const onSuccess = () => router.push("/landmarks")

    if (id) {
      updateLandmark.mutate({ id, payload }, { onSuccess })
      return
    }

    createLandmark.mutate(payload, { onSuccess })
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
              title="Add Landmarks or Cultural sites"
              description="Read-only preview of how this article appears on the public website."
              actions={
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={SECONDARY_ACTION_CLASS}
                    onClick={() => router.push("/landmarks")}
                  >
                    <RiCloseLine className="mr-1.5 size-4" />
                    Discard
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSaving}
                    size="sm"
                    className={PRIMARY_ACTION_CLASS}
                  >
                    <RiSendPlaneLine className="mr-1.5 size-4" />
                    {isSaving
                      ? "Saving..."
                      : id
                        ? "Save landmark"
                        : "Publish landmark"}
                  </Button>
                </>
              }
            />

            <BackLink href="/landmarks">Back to landmark</BackLink>

            <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
              <div className="bg-card space-y-6 rounded-2xl border p-6 shadow-sm sm:p-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={FORM_LABEL_CLASS}>
                        LANDMARK NAME
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Nigeria Bottling Company"
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
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={FORM_LABEL_CLASS}>
                          CATEGORY
                        </FormLabel>
                        <Select
                          items={selectItems(LANDMARK_CATEGORY_OPTIONS)}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className={FORM_SELECT_CLASS}>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {LANDMARK_CATEGORY_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
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
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={FORM_LABEL_CLASS}>
                          LOCATION
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter landmark location"
                            {...field}
                            className={FORM_INPUT_CLASS}
                          />
                        </FormControl>
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
                          placeholder="Enter landmark description"
                          rows={5}
                          {...field}
                          className={FORM_TEXTAREA_CLASS}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <ImageDropzone
                  label="COVER IMAGE (REQUIRED)"
                  value={imageCleared ? null : landmark.data?.photo_url}
                  file={imageFile}
                  onFileChange={setImageFile}
                  onClear={() => setImageCleared(true)}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-6">
                <PublishingCard control={form.control} name="status" />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </AdminShell>
  )
}
