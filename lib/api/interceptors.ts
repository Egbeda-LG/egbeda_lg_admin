import type { AxiosError } from "axios"
import toast from "react-hot-toast"

import { apiClient } from "@/lib/api/client"
import { getApiErrorMessage } from "@/lib/api/errors"
import { clearStoredAuthSession } from "@/lib/api/session"

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
      const isLoginRequest = error.config?.url?.includes("/auth/login/")

      if (status === 401 && !isLoginRequest && typeof window !== "undefined") {
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
