"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { RiSaveLine } from "@remixicon/react"
import { useForm } from "react-hook-form"

import { AdminShell } from "@/components/layout/admin-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  toImageDrafts,
  type ChairmanImageDraft,
} from "@/features/settings/components/chairman-images-field"
import { SettingsTabs } from "@/features/settings/components/settings-tabs"
import {
  ChairmanPanel,
  ContactPanel,
  OrganizationPanel,
  SocialPanel,
  ViceChairmanPanel,
} from "@/features/settings/components/settings-tab-panels"
import {
  organizationSettingsFormDefaults,
  organizationSettingsFormSchema,
  type OrganizationSettingsFormValues,
} from "@/features/settings/settings.form"
import {
  useOrganizationSettings,
  useUpdateOrganizationSettings,
} from "@/features/settings/settings.hooks"
import {
  fromOrganizationSettings,
  toOrganizationSettings,
} from "@/features/settings/settings.transformers"
import type { SettingsTab } from "@/features/settings/settings.utils"
import type { PlacementImage } from "@/lib/api/types"
import { useUploadFile } from "@/features/uploads/uploads.hooks"
import { notifyInvalidForm } from "@/lib/ui/form-errors"

export function SettingsPage() {
  const settings = useOrganizationSettings()
  const updateSettings = useUpdateOrganizationSettings()
  const uploadFile = useUploadFile()

  const [activeTab, setActiveTab] = React.useState<SettingsTab>("Organization")
  const [chairmanImages, setChairmanImages] = React.useState<
    ChairmanImageDraft[]
  >([])
  const [viceChairmanImages, setViceChairmanImages] = React.useState<
    ChairmanImageDraft[]
  >([])
  // Tracks which fetched document the drafts were seeded from, so a refetch
  // does not discard photos the user has just added.
  const [seededFrom, setSeededFrom] = React.useState<unknown>(null)

  const form = useForm<OrganizationSettingsFormValues>({
    resolver: zodResolver(organizationSettingsFormSchema),
    defaultValues: organizationSettingsFormDefaults,
  })

  React.useEffect(() => {
    if (!settings.data) return

    form.reset(fromOrganizationSettings(settings.data))
  }, [form, settings.data])

  // Seeding during render (rather than in an effect) avoids the extra commit a
  // synchronous setState in useEffect would cause.
  if (settings.data && seededFrom !== settings.data) {
    setSeededFrom(settings.data)
    setChairmanImages(toImageDrafts(settings.data.chairman_info?.images))
    setViceChairmanImages(
      toImageDrafts(settings.data.vice_chairman_info?.images),
    )
  }

  const isSaving = updateSettings.isPending || uploadFile.isPending

  /**
   * Uploads any newly picked photos, keeping each one's placement flags. The
   * whole array is sent, so images already stored are passed through as-is.
   */
  const resolveImages = (drafts: ChairmanImageDraft[]) =>
    Promise.all(
      drafts.map(async (image) => {
        const photoUrl = image.file
          ? await uploadFile.mutateAsync({
              file: image.file,
              folder: "settings",
            })
          : (image.photoUrl ?? "")

        return {
          photo_url: photoUrl,
          is_in_homepage: image.isInHomepage,
          is_in_government: image.isInGovernment,
          is_in_about: image.isInAbout,
        }
      }),
    )

  const onSubmit = async (values: OrganizationSettingsFormValues) => {
    let images: PlacementImage[]
    let viceImages: PlacementImage[]

    try {
      ;[images, viceImages] = await Promise.all([
        resolveImages(chairmanImages),
        resolveImages(viceChairmanImages),
      ])
    } catch {
      return
    }

    updateSettings.mutate(
      toOrganizationSettings(
        values,
        images.filter((image) => image.photo_url),
        viceImages.filter((image) => image.photo_url),
      ),
    )
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title="Organization Settings"
          description="Organization details and settings for Egbeda Local Government."
        />

        <SettingsTabs value={activeTab} onValueChange={setActiveTab} />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, notifyInvalidForm)}
            className="space-y-8"
          >
            <div className="bg-card space-y-8 rounded-2xl border p-6 shadow-sm sm:p-8">
              {activeTab === "Organization" && (
                <OrganizationPanel control={form.control} />
              )}

              {activeTab === "Chairman Information" && (
                <ChairmanPanel
                  control={form.control}
                  images={chairmanImages}
                  onImagesChange={setChairmanImages}
                  isSaving={isSaving}
                />
              )}

              {activeTab === "Vice Chairman" && (
                <ViceChairmanPanel
                  control={form.control}
                  images={viceChairmanImages}
                  onImagesChange={setViceChairmanImages}
                  isSaving={isSaving}
                />
              )}

              {activeTab === "Contact & Support" && (
                <ContactPanel control={form.control} />
              )}

              {activeTab === "Social & Web" && (
                <SocialPanel control={form.control} />
              )}

              <div className="flex justify-end border-t pt-4">
                <Button
                  type="submit"
                  disabled={isSaving}
                  size="sm"
                  className="h-10 rounded-xl bg-[#701a2e] px-5 text-xs font-medium text-white shadow-sm hover:bg-[#571323]"
                >
                  <RiSaveLine className="mr-1.5 size-4" />
                  Save changes
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </AdminShell>
  )
}
