import * as z from "zod"

import type { SelectOption } from "@/lib/api/enums"

export const departmentFormSchema = z.object({
  name: z.string().min(2, "Department name is required"),
  hod: z.string().min(2, "Head of department is required"),
  staffStrength: z.string().min(1, "Staff strength is required"),
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

/** Buckets offered in the form; the API stores a plain staff count. */
export const STAFF_STRENGTH_OPTIONS: SelectOption[] = [
  { value: "10-20", label: "10-20 Staffs" },
  { value: "24", label: "24 Staffs" },
  { value: "25-50", label: "25-50 Staffs" },
  { value: "50+", label: "50+ Staffs" },
]
