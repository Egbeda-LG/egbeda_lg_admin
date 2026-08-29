import * as z from "zod"

import { optionalUrl } from "@/lib/validation"

export const nulgeFormSchema = z.object({
  name: z.string().min(2, "Official name must be at least 2 characters"),
  office: z.string().min(1, "Please select an office"),
  status: z.string().min(1, "Please select a status"),
  // Social links are optional - the form labels them as such, and an official
  // may only use one platform. Still validated as URLs when filled in.
  tiktok: optionalUrl("TikTok"),
  facebook: optionalUrl("Facebook"),
  twitter: optionalUrl("Twitter"),
  instagram: optionalUrl("Instagram"),
})

export type NulgeFormValues = z.infer<typeof nulgeFormSchema>

export const nulgeFormDefaults: NulgeFormValues = {
  name: "",
  office: "",
  status: "active",
  tiktok: "",
  facebook: "",
  twitter: "",
  instagram: "",
}
