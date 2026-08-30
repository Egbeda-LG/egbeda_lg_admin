"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  RiCloseLine,
  RiEyeLine,
  RiSaveLine,
  RiSendPlaneLine,
} from "@remixicon/react"
import { useForm, useWatch } from "react-hook-form"

import { AdminShell } from "@/components/layout/admin-shell"
import { BackLink } from "@/components/layout/back-link"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { NewsEditorCard } from "@/features/news/components/news-editor-card"
import { NewsSettingsSidebar } from "@/features/news/components/news-settings-sidebar"
import {
  useCreateNews,
  useNewsItem,
  useUpdateNews,
} from "@/features/news/news.hooks"
import {
  extractFeaturedImage,
  fromNews,
  newsFormDefaults,
  newsFormSchema,
  toNewsPayload,
  type NewsFormValues,
} from "@/features/news/news.form"
import { toArticleSlug } from "@/features/news/news.utils"
import { useUploadFile } from "@/features/uploads/uploads.hooks"
import { notifyInvalidForm } from "@/lib/ui/form-errors"
import {
  PRIMARY_ACTION_CLASS,
  SECONDARY_ACTION_CLASS,
} from "@/lib/ui/form-styles"

type NewsFormPageProps = {
  mode: "create" | "edit"
}

export function NewsFormPage({ mode }: NewsFormPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = mode === "edit" ? searchParams.get("id") : null

  const newsItem = useNewsItem(id)
  const createNews = useCreateNews()
  const updateNews = useUpdateNews()
  const uploadFile = useUploadFile()

  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [imageCleared, setImageCleared] = React.useState(false)

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: newsFormDefaults,
  })
  const [title, content, date, status, featured, category] = useWatch({
    control: form.control,
    name: ["title", "content", "date", "status", "featured", "category"],
  })

  React.useEffect(() => {
    if (newsItem.data) form.reset(fromNews(newsItem.data))
  }, [form, newsItem.data])

  // Derived rather than stored, so loading the article never triggers a second
  // render pass. Clearing is tracked with a flag instead.
  const existingImage = imageCleared
    ? null
    : extractFeaturedImage(newsItem.data?.content ?? "")

  const isSaving =
    uploadFile.isPending || createNews.isPending || updateNews.isPending
  const isDisabled = isSaving || (mode === "edit" && !id)

  const save = async (values: NewsFormValues, nextStatus: string) => {
    if (mode === "edit" && !id) return

    // A newly picked file replaces the current image; otherwise keep whatever
    // is already embedded in the article body. Upload first: if S3 rejects the
    // file we must not save a half-finished article. useUploadFile toasts the
    // failure.
    let featuredImageUrl = existingImage

    if (imageFile) {
      try {
        featuredImageUrl = await uploadFile.mutateAsync({
          file: imageFile,
          folder: "news",
        })
      } catch {
        return
      }
    }

    const payload = toNewsPayload(
      { ...values, status: nextStatus },
      featuredImageUrl,
    )
    const onSuccess = () => router.push("/newsroom")

    if (mode === "edit" && id) {
      updateNews.mutate({ id, payload }, { onSuccess })
      return
    }

    createNews.mutate(payload, { onSuccess })
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title={mode === "edit" ? "Edit article" : "Compose new article"}
          description="Draft an article for the Egbeda LG news feed. All published content is public."
          actions={
            <div className="flex flex-wrap items-center gap-2.5">
              <Button
                variant="outline"
                size="sm"
                className={SECONDARY_ACTION_CLASS}
                onClick={() => router.push("/newsroom")}
              >
                <RiCloseLine className="mr-1.5 size-4" />
                Discard
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={SECONDARY_ACTION_CLASS}
                onClick={() =>
                  router.push(id ? `/newsroom/view?id=${id}` : "/newsroom/view")
                }
              >
                <RiEyeLine className="mr-1.5 size-4" />
                Preview
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={SECONDARY_ACTION_CLASS}
                disabled={isDisabled}
                onClick={form.handleSubmit(
                  (values) => save(values, "draft"),
                  notifyInvalidForm,
                )}
              >
                <RiSaveLine className="mr-1.5 size-4" />
                {isSaving ? "Saving..." : "Save draft"}
              </Button>
              <Button
                size="sm"
                className={PRIMARY_ACTION_CLASS}
                disabled={isDisabled}
                onClick={form.handleSubmit(
                  (values) => save(values, "published"),
                  notifyInvalidForm,
                )}
              >
                <RiSendPlaneLine className="mr-1.5 size-4" />
                {isSaving
                  ? "Saving..."
                  : mode === "edit"
                    ? "Update"
                    : "Publish"}
              </Button>
            </div>
          }
        />

        <BackLink href="/newsroom">Back to news</BackLink>

        <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
          <NewsEditorCard
            title={title}
            slug={toArticleSlug(title)}
            content={content}
            titleInputProps={form.register("title")}
            onContentChange={(value) =>
              form.setValue("content", value, { shouldValidate: true })
            }
          />

          <NewsSettingsSidebar
            imageFile={imageFile}
            onImageChange={setImageFile}
            currentImageUrl={existingImage}
            onImageClear={() => setImageCleared(true)}
            status={status}
            onStatusChange={(value) => form.setValue("status", value)}
            date={date}
            onDateChange={(value) => form.setValue("date", value)}
            featured={featured}
            onFeaturedChange={(value) => form.setValue("featured", value)}
            category={category}
            onCategoryChange={(value) => form.setValue("category", value)}
            disabled={isSaving}
          />
        </div>
      </div>
    </AdminShell>
  )
}
