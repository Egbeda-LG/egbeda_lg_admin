import type { AxiosError } from "axios"
import toast from "react-hot-toast"

import { apiClient } from "@/lib/api/client"
import { getApiErrorMessage } from "@/lib/api/errors"
import { clearStoredAuthSession } from "@/lib/api/session"

/**
 * Endpoints where a 401 means "these credentials are wrong", not "your session
 * expired". Signing the admin out of those would be backwards - change-password
 * answers 401 "Invalid credentials" for an unrecognised email, which used to
 * end the session the moment someone mistyped it.
 */
const CREDENTIAL_PATHS = ["/auth/login/", "/auth/change-password/"]

let initialized = false

export function setupApiInterceptors() {
  if (initialized) {
    return
  }

  initialized = true

  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const status = error.response?.status
      const url = error.config?.url ?? ""
      const isCredentialRequest = CREDENTIAL_PATHS.some((path) =>
        url.includes(path),
      )

      if (
        status === 401 &&
        !isCredentialRequest &&
        typeof window !== "undefined"
      ) {
        clearStoredAuthSession()
        toast.error("Your session has expired. Please sign in again.", {
          id: "session-expired",
        })

        if (!window.location.pathname.startsWith("/login")) {
          window.location.assign("/login")
        }
      } else {
        toast.error(getApiErrorMessage(error), {
          id: status ? `api-error-${status}` : "api-network-error",
        })
      }

      return Promise.reject(error)
    },
  )
}
