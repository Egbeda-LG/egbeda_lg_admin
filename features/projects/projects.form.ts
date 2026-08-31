import * as z from "zod"

export const projectFormSchema = z
  .object({
    name: z.string().min(2, "Project name is required"),
    /** MongoDB ward id from GET /wards - the API rejects ward names. */
    wardId: z.string().min(1, "Please select a ward"),
    location: z.string().min(2, "Location is required"),
    /** yyyy-MM-dd. Required - the API rejects an empty string. */
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    contractor: z.string().min(2, "Contractor is required"),
    description: z.string().min(10, "Description is required"),
    status: z.string().min(1, "Status is required"),
    featured: z.enum(["Yes", "No"]),
  })
  .refine((values) => values.endDate >= values.startDate, {
    message: "End date cannot be before the start date",
    path: ["endDate"],
  })

export type ProjectFormValues = z.infer<typeof projectFormSchema>

export const projectFormDefaults: ProjectFormValues = {
  name: "",
  wardId: "",
  location: "",
  startDate: "",
  endDate: "",
  contractor: "",
  description: "",
  status: "draft",
  featured: "No",
}
