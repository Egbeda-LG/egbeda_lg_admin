import type { ProfileFormValues } from "@/features/auth/auth.form"
import type {
  AdminProfile,
  ConfirmChangePasswordPayload,
} from "@/lib/api/types"
import type { ChangePasswordFormValues } from "@/features/auth/auth.form"

/** The API stores one `name`; the form edits it as first and last name. */
export function fromAdminProfile(profile: AdminProfile): ProfileFormValues {
  const [firstName = "", ...rest] = profile.name.split(" ")

  return {
    firstName,
    lastName: rest.join(" ") || firstName,
    workEmail: profile.work_email ?? profile.email,
    phoneNumber: profile.phone_number ?? "",
    staffId: profile.staff_id ?? "",
    department: profile.department ?? "",
  }
}

export function toChangePasswordPayload(
  values: ChangePasswordFormValues,
  email: string,
): ConfirmChangePasswordPayload {
  return {
    email,
    otp: values.otp,
    current_password: values.currentPassword,
    new_password: values.newPassword,
  }
}
