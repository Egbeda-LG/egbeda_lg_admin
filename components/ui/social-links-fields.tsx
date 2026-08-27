"use client"

import type { Control, FieldPath, FieldValues } from "react-hook-form"

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SOCIAL_PLATFORMS } from "@/lib/api/enums"

/** Social rows rendered on the official forms, in display order. */
export const SOCIAL_LINK_FIELDS = SOCIAL_PLATFORMS.map((platform) => ({
  name: platform,
  label: platform.charAt(0).toUpperCase() + platform.slice(1),
}))

type SocialLinksFieldsProps<TValues extends FieldValues> = {
  control: Control<TValues>
  label?: string
}

/**
 * Optional social URL rows. Every form using this must name its fields after
 * the platforms in `SOCIAL_PLATFORMS`, which is what the cast below assumes.
 */
export function SocialLinksFields<TValues extends FieldValues>({
  control,
  label = "SOCIAL MEDIA (optional)",
}: SocialLinksFieldsProps<TValues>) {
  return (
    <div className="space-y-4 pt-2">
      <FormLabel className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
        {label}
      </FormLabel>

      {SOCIAL_LINK_FIELDS.map((social) => (
        <FormField
          key={social.name}
          control={control}
          name={social.name as FieldPath<TValues>}
          render={({ field }) => (
            <FormItem>
              <div className="border-input bg-background flex overflow-hidden rounded-xl border focus-within:ring-1 focus-within:ring-[#701a2e]">
                <span className="text-muted-foreground bg-muted/40 inline-flex min-w-28 items-center border-r px-4 text-xs font-semibold">
                  {social.label}
                </span>
                <span className="text-muted-foreground inline-flex items-center px-2 text-xs font-medium">
                  URL:
                </span>
                <input
                  type="url"
                  inputMode="url"
                  placeholder="https://..."
                  className="flex-1 bg-transparent px-2 py-2.5 text-sm outline-none"
                  {...field}
                />
              </div>
              {/* Without this, an invalid URL blocked submission silently. */}
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  )
}
