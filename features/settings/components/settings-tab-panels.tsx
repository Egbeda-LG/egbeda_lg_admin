"use client"

import {
  RiBuilding4Line,
  RiGlobeLine,
  RiMailLine,
  RiMapPinLine,
  RiUser3Line,
  RiUserStarLine,
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
  VICE_CHAIRMAN_FIELDS,
  VICE_CHAIRMAN_SOCIAL_FIELDS,
  VICE_CHAIRMAN_TEXT_AREAS,
  type SettingsField,
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

type OfficialPanelProps = PanelProps & {
  images: ChairmanImageDraft[]
  onImagesChange: (images: ChairmanImageDraft[]) => void
  isSaving?: boolean
}

type OfficialInfoPanelProps = OfficialPanelProps & {
  icon: typeof RiUser3Line
  title: string
  description: string
  socialLabel: string
  fields: SettingsField[]
  textAreas: SettingsField[]
  socialFields: SettingsField[]
}

/** Shared by the two offices, which carry an identical section on the API. */
function OfficialInfoPanel({
  control,
  images,
  onImagesChange,
  isSaving,
  icon,
  title,
  description,
  socialLabel,
  fields,
  textAreas,
  socialFields,
}: OfficialInfoPanelProps) {
  return (
    <div className="space-y-6">
      <SettingsSectionHeader
        icon={icon}
        title={title}
        description={description}
      />
      <ChairmanImagesField
        images={images}
        onChange={onImagesChange}
        disabled={isSaving}
      />

      <SettingsTextFields control={control} fields={fields} />
      {textAreas.map((field) => (
        <SettingsTextArea key={field.name} control={control} field={field} />
      ))}

      <div className="space-y-4 pt-2">
        <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
          {socialLabel}
        </p>
        <SettingsUrlFields control={control} fields={socialFields} />
      </div>
    </div>
  )
}

export function ChairmanPanel(props: OfficialPanelProps) {
  return (
    <OfficialInfoPanel
      {...props}
      icon={RiUser3Line}
      title="Chairman Information"
      description="Displayed on the public site as chairman details"
      socialLabel="Chairman social media (optional)"
      fields={CHAIRMAN_FIELDS}
      textAreas={CHAIRMAN_TEXT_AREAS}
      socialFields={CHAIRMAN_SOCIAL_FIELDS}
    />
  )
}

export function ViceChairmanPanel(props: OfficialPanelProps) {
  return (
    <OfficialInfoPanel
      {...props}
      icon={RiUserStarLine}
      title="Vice Chairman Information"
      description="Optional - leave the name blank while the office is vacant"
      socialLabel="Vice chairman social media (optional)"
      fields={VICE_CHAIRMAN_FIELDS}
      textAreas={VICE_CHAIRMAN_TEXT_AREAS}
      socialFields={VICE_CHAIRMAN_SOCIAL_FIELDS}
    />
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
