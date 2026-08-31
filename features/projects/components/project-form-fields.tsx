"use client"

import type { UseFormReturn } from "react-hook-form"

import { DatePicker, parseDateValue } from "@/components/ui/date-picker"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ImageDropzone } from "@/components/ui/image-dropzone"
import { Input } from "@/components/ui/input"
import { PublishingCard } from "@/components/ui/publishing-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { ProjectFormValues } from "@/features/projects/projects.form"
import { useWardOptions } from "@/features/wards/wards.hooks"
import {
  FORM_INPUT_CLASS,
  FORM_LABEL_CLASS,
  FORM_SELECT_CLASS,
  FORM_TEXTAREA_CLASS,
} from "@/lib/ui/form-styles"
import { selectItems } from "@/lib/api/enums"

type ProjectFormFieldsProps = {
  form: UseFormReturn<ProjectFormValues>
  imageFile: File | null
  onImageChange: (file: File | null) => void
  currentImageUrl?: string
  isSaving: boolean
}

export function ProjectFormFields({
  form,
  imageFile,
  onImageChange,
  currentImageUrl,
  isSaving,
}: ProjectFormFieldsProps) {
  const { options: wardOptions } = useWardOptions()
  const startDate = form.watch("startDate")

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="bg-card space-y-6 rounded-2xl border p-6 shadow-sm sm:p-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={FORM_LABEL_CLASS}>PROJECT NAME</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Egbeda Dual Carriageway"
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
            name="wardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={FORM_LABEL_CLASS}>WARD</FormLabel>
                <Select
                  items={selectItems(wardOptions)}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={FORM_SELECT_CLASS}>
                      <SelectValue placeholder="Select ward" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {wardOptions.map((option) => (
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={FORM_LABEL_CLASS}>LOCATION</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter project location"
                    {...field}
                    className={FORM_INPUT_CLASS}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={FORM_LABEL_CLASS}>FEATURED</FormLabel>
                <Select
                  items={{ Yes: "Yes", No: "No" }}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={FORM_SELECT_CLASS}>
                      <SelectValue placeholder="Featured" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={FORM_LABEL_CLASS}>START DATE</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSaving}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={FORM_LABEL_CLASS}>END DATE</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSaving}
                    fromDate={parseDateValue(startDate)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contractor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={FORM_LABEL_CLASS}>CONTRACTOR</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter contractor name"
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
                PROJECT DESCRIPTION
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter detailed project description"
                  rows={6}
                  {...field}
                  className={FORM_TEXTAREA_CLASS}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-6">
        <PublishingCard control={form.control} name="status">
          <ImageDropzone
            label="Project image (required)"
            file={imageFile}
            value={currentImageUrl}
            onFileChange={onImageChange}
            disabled={isSaving}
          />
        </PublishingCard>
      </div>
    </div>
  )
}
