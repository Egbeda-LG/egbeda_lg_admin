"use client"

import {
  RiBuilding4Line,
  RiGlobeLine,
  RiMailLine,
  RiMapPinLine,
  RiUser3Line,
} from "@remixicon/react"
import type { Control } from "react-hook-form"

import {
  ChairmanImagesField,
  type ChairmanImageDraft,
} from "@/features/settings/components/chairman-images-field"
import { SettingsSectionHeader } from "@/features/settings/components/settings-section-header"
import {
  SettingsTextArea,
  SettingsTextFields,
  SettingsUrlFields,
} from "@/features/settings/components/settings-fields"
import {
  CHAIRMAN_FIELDS,
  CHAIRMAN_SOCIAL_FIELDS,
  CHAIRMAN_TEXT_AREAS,
  CONTACT_FIELDS,
  LOCATION_FIELDS,
  ORGANIZATION_FIELDS,
  SOCIAL_FIELDS,
  type OrganizationSettingsFormValues,
} from "@/features/settings/settings.form"

type PanelProps = {
  control: Control<OrganizationSettingsFormValues>
}

export function OrganizationPanel({ control }: PanelProps) {
  return (
    <div className="space-y-6">
      <SettingsSectionHeader
        icon={RiBuilding4Line}
        title="Organization identity"
        description="Displayed on the public site as organization details"
      />
      <SettingsTextFields control={control} fields={ORGANIZATION_FIELDS} />
      <SettingsTextArea
        control={control}
        field={{ name: "about", label: "ABOUT" }}
      />
    </div>
  )
}

type ChairmanPanelProps = PanelProps & {
  chairmanImages: ChairmanImageDraft[]
  onChairmanImagesChange: (images: ChairmanImageDraft[]) => void
  isSaving?: boolean
}

export function ChairmanPanel({
  control,
  chairmanImages,
  onChairmanImagesChange,
  isSaving,
}: ChairmanPanelProps) {
  return (
    <div className="space-y-6">
      <SettingsSectionHeader
        icon={RiUser3Line}
        title="Chairman Information"
        description="Displayed on the public site as chairman details"
      />
      <ChairmanImagesField
        images={chairmanImages}
        onChange={onChairmanImagesChange}
        disabled={isSaving}
      />

      <SettingsTextFields control={control} fields={CHAIRMAN_FIELDS} />
      {CHAIRMAN_TEXT_AREAS.map((field) => (
        <SettingsTextArea key={field.name} control={control} field={field} />
      ))}

      <div className="space-y-4 pt-2">
        <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
          Chairman social media (optional)
        </p>
        <SettingsUrlFields control={control} fields={CHAIRMAN_SOCIAL_FIELDS} />
      </div>
    </div>
  )
}

export function ContactPanel({ control }: PanelProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <SettingsSectionHeader
          icon={RiMailLine}
          title="Contact & Support"
          description="Contacts where citizens reach the council"
        />
        <SettingsTextFields control={control} fields={CONTACT_FIELDS} />
      </div>

      <div className="space-y-6 border-t pt-4">
        <SettingsSectionHeader
          icon={RiMapPinLine}
          title="Physical location"
          description="Egbeda local government physical address"
        />
        <SettingsTextFields control={control} fields={LOCATION_FIELDS} />
      </div>
    </div>
  )
}

export function SocialPanel({ control }: PanelProps) {
  return (
    <div className="space-y-6">
      <SettingsSectionHeader
        icon={RiGlobeLine}
        title="Website & Social"
        description="Egbeda social media links"
      />
      <SettingsUrlFields control={control} fields={SOCIAL_FIELDS} />
    </div>
  )
}
