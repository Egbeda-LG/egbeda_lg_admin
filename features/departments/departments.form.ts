import * as z from "zod"

export const departmentFormSchema = z.object({
  name: z.string().min(2, "Department name is required"),
  hod: z.string().min(2, "Head of department is required"),
  staffStrength: z
    .string()
    .min(1, "Staff strength is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Staff strength must be a valid number",
    ),
  status: z.string().min(1, "Status is required"),
  description: z.string().min(10, "Description is required"),
})

export type DepartmentFormValues = z.infer<typeof departmentFormSchema>

export const departmentFormDefaults: DepartmentFormValues = {
  name: "",
  hod: "",
  staffStrength: "",
  status: "active",
  description: "",
}
