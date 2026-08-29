/** Where admins are sent for anything they cannot do themselves. */
export const ICT_SUPPORT_EMAIL = "ict@egbedalg.gov.ng"

/** Seconds the resend button stays disabled after sending a new code. */
export const OTP_RESEND_SECONDS = 30

export const AUTH_ERRORS = {
  login: "Invalid credentials or server error. Please try again.",
  sso: "SSO authentication failed. Contact ICT support.",
  otp: "Invalid OTP code. Please check your email and try again.",
  resend: "Unable to resend the verification code.",
} as const

/** No endpoint exists for editing the admin profile itself. */
export const PROFILE_UPDATE_UNAVAILABLE_MESSAGE =
  "The API documentation does not provide a profile-update endpoint"

export function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}
