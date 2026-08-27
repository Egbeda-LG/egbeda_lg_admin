"use client"

import type { Control } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type {
  OrganizationSettingsFormValues,
  SettingsField,
} from "@/features/settings/settings.form"
import { socialPrefixLabel } from "@/features/settings/settings.utils"

type SettingsControl = Control<OrganizationSettingsFormValues>

const LABEL_CLASS =
  "text-xs font-bold tracking-wider text-muted-foreground uppercase"
const INPUT_CLASS = "h-11 rounded-xl bg-background border-input text-sm"
const TEXTAREA_CLASS =
  "rounded-xl bg-background border-input text-sm resize-none"

/** Two-column grid of plain text settings fields. */
export function SettingsTextFields({
  control,
  fields,
}: {
  control: SettingsControl
  fields: SettingsField[]
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {fields.map((settingsField) => (
        <FormField
          key={settingsField.name}
          control={control}
          name={settingsField.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL_CLASS}>
                {settingsField.label}
              </FormLabel>
              <FormControl>
                <Input className={INPUT_CLASS} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  )
}

export function SettingsTextArea({
  control,
  field: settingsField,
  rows = 4,
}: {
  control: SettingsControl
  field: SettingsField
  rows?: number
}) {
  return (
    <FormField
      control={control}
      name={settingsField.name}
      render={({ field }) => (
        <FormItem className="pt-2">
          <FormLabel className={LABEL_CLASS}>{settingsField.label}</FormLabel>
          <FormControl>
            <Textarea rows={rows} className={TEXTAREA_CLASS} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

/** Two-column grid of URL fields with a platform prefix. */
export function SettingsUrlFields({
  control,
  fields,
}: {
  control: SettingsControl
  fields: SettingsField[]
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {fields.map((settingsField) => (
        <FormField
          key={settingsField.name}
          control={control}
          name={settingsField.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL_CLASS}>
                {settingsField.label}
              </FormLabel>
              <FormControl>
                <div className="border-input bg-background flex overflow-hidden rounded-xl border focus-within:ring-1 focus-within:ring-[#701a2e]">
                  <span className="text-muted-foreground bg-muted/40 inline-flex min-w-28 items-center border-r px-4 text-xs font-semibold">
                    {socialPrefixLabel(settingsField.label)}
                  </span>
                  <span className="text-muted-foreground inline-flex items-center px-2 text-xs font-medium">
                    URL:
                  </span>
                  <input
                    type="text"
                    className="flex-1 bg-transparent px-2 py-2.5 text-sm outline-none"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  )
}

