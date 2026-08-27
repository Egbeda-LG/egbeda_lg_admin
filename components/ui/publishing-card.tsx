"use client"

import type * as React from "react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

import { FormField } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PUBLISH_STATUS_OPTIONS, selectItems } from "@/lib/api/enums"

type PublishingCardProps<TValues extends FieldValues> = {
  control: Control<TValues>
  name: FieldPath<TValues>
  visibility?: string
  scheduled?: string
  /** Optional slot rendered above the status rows (e.g. an image dropzone). */
  children?: React.ReactNode
}

/** Publishing sidebar shared by the content editors. */
export function PublishingCard<TValues extends FieldValues>({
  control,
  name,
  visibility = "Public",
  scheduled = "Now",
  children,
}: PublishingCardProps<TValues>) {
  return (
    <div className="bg-card space-y-4 rounded-2xl border p-5 shadow-sm">
      <h3 className="text-foreground text-xs font-bold tracking-wider uppercase">
        Publishing
      </h3>

      {children}

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between py-1">
          <span className="text-muted-foreground">Status</span>
          <FormField
            control={control}
            name={name}
            render={({ field }) => (
              <Select
                items={selectItems(PUBLISH_STATUS_OPTIONS)}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="border-input h-11 w-28 text-xs shadow-none">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {PUBLISH_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex items-center justify-between border-t py-1">
          <span className="text-muted-foreground">Visibility</span>
          <span className="text-foreground font-semibold">{visibility}</span>
        </div>

        <div className="flex items-center justify-between border-t py-1">
          <span className="text-muted-foreground">Scheduled</span>
          <span className="font-semibold text-rose-600">{scheduled}</span>
        </div>
      </div>
    </div>
  )
}
