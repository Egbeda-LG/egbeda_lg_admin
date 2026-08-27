import * as z from "zod"

export const landmarkFormSchema = z.object({
  name: z.string().min(2, "Landmark name is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(2, "Location is required"),
  description: z.string().min(10, "Description is required"),
  status: z.string().min(1, "Status is required"),
})

export type LandmarkFormValues = z.infer<typeof landmarkFormSchema>

export const landmarkFormDefaults: LandmarkFormValues = {
  name: "",
  category: "",
  location: "",
  description: "",
  status: "draft",
}
