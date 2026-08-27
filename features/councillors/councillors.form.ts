import * as z from "zod"

/**
 * `area` and `dateAppointed` are captured for the admin's own reference - the
 * councillor API accepts neither, so they are validated here but never sent.
 */
export const councillorFormSchema = z.object({
  councilorName: z
    .string()
    .min(2, "Councilor name must be at least 2 characters"),
  /** MongoDB ward id from GET /wards - the API rejects ward names. */
  ward: z.string().min(1, "Please select a ward"),
  area: z.string().min(2, "Area is required"),
  dateAppointed: z.string().min(1, "Date appointed is required"),
  status: z.string().min(1, "Please select a status"),
})

export type CouncillorFormValues = z.infer<typeof councillorFormSchema>

export const councillorFormDefaults: CouncillorFormValues = {
  councilorName: "",
  ward: "",
  area: "",
  dateAppointed: "",
  status: "active",
}
