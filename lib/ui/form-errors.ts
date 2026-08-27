import toast from "react-hot-toast"
import type { FieldErrors } from "react-hook-form"

/**
 * react-hook-form blocks submit when validation fails, which otherwise looks
 * like a dead Save button: no request, no feedback, and the field message can
 * be off-screen (or on another tab). Surface the first error instead.
 */
export function notifyInvalidForm(errors: FieldErrors) {
  const firstMessage = Object.values(errors).find(
    (error) => error && "message" in error && error.message,
  )?.message

  toast.error(
    firstMessage
      ? String(firstMessage)
      : "Please fix the highlighted fields before saving.",
    { id: "form-invalid" },
  )
}
