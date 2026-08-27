"use client"

import type { UseFormReturn } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { CurrencyInput } from "@/components/ui/currency-input"
import { StringListField } from "@/components/ui/string-list-field"
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
import { useDepartmentOptions } from "@/features/departments/departments.hooks"
import type { ServiceFormValues } from "@/features/services/services.form"
import { selectItems, withSelectedOption } from "@/lib/api/enums"
import {
  FORM_INPUT_CLASS,
  FORM_LABEL_CLASS,
  FORM_SELECT_CLASS,
  FORM_TEXTAREA_CLASS,
} from "@/lib/ui/form-styles"

type ServiceFormFieldsProps = {
  form: UseFormReturn<ServiceFormValues>
}

/** Long-form text fields shown one under another on the service editor. */
const TEXT_AREAS = [
  {
    name: "description",
    label: "DESCRIPTION",
    placeholder: "Enter service description",
  },
] as const

/** Repeatable entries - the API stores each of these as a string array. */
const LIST_FIELDS = [
  {
    name: "eligibility",
    label: "ELIGIBILITY",
    placeholder: "e.g. Registered business owner",
    addLabel: "Add requirement",
  },
  {
    name: "requiredDocument",
    label: "REQUIRED DOCUMENTS",
    placeholder: "e.g. CAC certificate",
    addLabel: "Add document",
  },
  {
    name: "applicationProcess",
    label: "APPLICATION PROCESS",
    placeholder: "e.g. Submit documents at the revenue office",
    addLabel: "Add step",
  },
] as const

export function ServiceFormFields({ form }: ServiceFormFieldsProps) {
  const { options: departmentOptions, isLoading: isLoadingDepartments } =
    useDepartmentOptions()
  const department = form.watch("department")

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="bg-card space-y-6 rounded-2xl border p-6 shadow-sm sm:p-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={FORM_LABEL_CLASS}>SERVICE NAME</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Marriage Registration"
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
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={FORM_LABEL_CLASS}>
                SHORT DESCRIPTION
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a short description of the services"
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
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={FORM_LABEL_CLASS}>DEPARTMENT</FormLabel>
                <Select
                  items={selectItems(
                    withSelectedOption(departmentOptions, department),
                  )}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={FORM_SELECT_CLASS}>
                      <SelectValue
                        placeholder={
                          isLoadingDepartments
                            ? "Loading departments..."
                            : "Select department"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {withSelectedOption(departmentOptions, department).map(
                      (option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={FORM_LABEL_CLASS}>AMOUNT</FormLabel>
                <FormControl>
                  <CurrencyInput
                    placeholder="0.00"
                    value={field.value}
                    onValueChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
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
          name="timeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={FORM_LABEL_CLASS}>TIMELINE</FormLabel>
              <FormControl>
                <DateRangePicker
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select timeline"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {TEXT_AREAS.map((textArea) => (
          <FormField
            key={textArea.name}
            control={form.control}
            name={textArea.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={FORM_LABEL_CLASS}>
                  {textArea.label}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={textArea.placeholder}
                    rows={4}
                    {...field}
                    className={FORM_TEXTAREA_CLASS}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {LIST_FIELDS.map((listField) => (
          <FormField
            key={listField.name}
            control={form.control}
            name={listField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={FORM_LABEL_CLASS}>
                  {listField.label}
                </FormLabel>
                <FormControl>
                  <StringListField
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={listField.placeholder}
                    addLabel={listField.addLabel}
                    inputClassName={FORM_INPUT_CLASS}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>

      <div className="space-y-6">
        <PublishingCard control={form.control} name="status" />
      </div>
    </div>
  )
}
