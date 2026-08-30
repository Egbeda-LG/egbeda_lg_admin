import * as z from "zod"

export const pastGovernmentFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  /**
   * yyyy-MM-dd from the date picker, split into year/month/day on the way out.
   * Required: the API validator does not check it, but the service returns a
   * 500 when it is missing.
   */
  date: z.string().min(1, "Date is required"),
  electionType: z.string().min(1, "Election type is required"),
})

export type PastGovernmentFormValues = z.infer<typeof pastGovernmentFormSchema>

export const pastGovernmentFormDefaults: PastGovernmentFormValues = {
  name: "",
  date: "",
  electionType: "elected",
}
