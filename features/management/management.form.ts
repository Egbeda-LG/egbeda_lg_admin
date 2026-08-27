import * as z from "zod"

import { optionalUrl } from "@/lib/validation"

export const managementFormSchema = z.object({
  name: z.string().min(2, "Official name must be at least 2 characters"),
  office: z.string().min(1, "Please select an office"),
  status: z.string().min(1, "Please select a status"),
  officeDescription: z.string().min(10, "Office description is required"),
  // Social links are optional - the form labels them as such, and an official
  // may only use one platform. Still validated as URLs when filled in.
  tiktok: optionalUrl("TikTok"),
  facebook: optionalUrl("Facebook"),
  twitter: optionalUrl("Twitter"),
  instagram: optionalUrl("Instagram"),
})

export type ManagementFormValues = z.infer<typeof managementFormSchema>

export const managementFormDefaults: ManagementFormValues = {
  name: "",
  office: "",
  status: "active",
  officeDescription: "",
  tiktok: "",
  facebook: "",
  twitter: "",
  instagram: "",
}
