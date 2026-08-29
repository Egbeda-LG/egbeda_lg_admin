import * as z from "zod"

import { isValidDateRange } from "@/components/ui/date-range-picker"

/** At least one non-blank entry in a repeatable list. */
const requiredList = (message: string) =>
  z
    .array(z.string())
    .refine(
      (entries) => entries.some((entry) => entry.trim().length > 0),
      message,
    )

export const serviceFormSchema = z.object({
  name: z.string().min(2, "Service name is required"),
  shortDescription: z.string().min(2, "Short description is required"),
  department: z.string().min(1, "Department is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
  timeline: z
    .string()
    .min(1, "Timeline is required")
    .refine(isValidDateRange, "Select both a start and an end date"),
  description: z.string().min(10, "Description is required"),
  // Edited as repeatable entries, so these travel as arrays end to end.
  eligibility: requiredList("Add at least one eligibility requirement"),
  requiredDocument: requiredList("Add at least one required document"),
  applicationProcess: requiredList("Add at least one application step"),
  status: z.string().min(1, "Status is required"),
})

export type ServiceFormValues = z.infer<typeof serviceFormSchema>

export const serviceFormDefaults: ServiceFormValues = {
  name: "",
  shortDescription: "",
  department: "",
  amount: "",
  timeline: "",
  description: "",
  eligibility: [],
  requiredDocument: [],
  applicationProcess: [],
  status: "draft",
}
