import * as z from "zod"

export const pastGovernmentFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  date: z.string().min(1, "Date is required"),
  sortOrder: z
    .string()
    .min(1, "Sort order is required")
    .regex(/^\d+$/, "Sort order must be a whole number"),
  electionType: z.string().min(1, "Election type is required"),
})

export type PastGovernmentFormValues = z.infer<typeof pastGovernmentFormSchema>

export const pastGovernmentFormDefaults: PastGovernmentFormValues = {
  name: "",
  date: "",
  sortOrder: "0",
  electionType: "elected",
}
