import * as z from "zod"

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Official email address is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean(),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>

export const loginFormDefaults: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: true,
}

export const OTP_LENGTH = 6

export const otpFormSchema = z.object({
  pin: z
    .string()
    .min(OTP_LENGTH, { message: "Please enter the complete 6-digit OTP code" }),
})

export type OtpFormValues = z.infer<typeof otpFormSchema>

export const otpFormDefaults: OtpFormValues = { pin: "" }

export const profileFormSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  workEmail: z.string().email("Valid work email required"),
  phoneNumber: z.string().min(5, "Phone number required"),
  staffId: z.string().min(2, "Staff ID required"),
  department: z.string().min(2, "Department required"),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

export const profileFormDefaults: ProfileFormValues = {
  firstName: "",
  lastName: "",
  workEmail: "",
  phoneNumber: "",
  staffId: "",
  department: "",
}

export const changePasswordFormSchema = z
  .object({
    otp: z.string().min(4, "OTP is required"),
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>

export const changePasswordFormDefaults: ChangePasswordFormValues = {
  otp: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}
