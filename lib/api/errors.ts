import axios from "axios"

const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again."

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function readErrorMessage(payload: unknown) {
  if (typeof payload === "string" && payload.trim()) {
    return payload.trim()
  }

  if (!isRecord(payload)) {
    return undefined
  }

  for (const key of ["message", "error"] as const) {
    const value = payload[key]

    if (typeof value === "string" && value.trim()) {
      return value.trim()
    }

    if (Array.isArray(value)) {
      const message = value
        .filter((item): item is string => typeof item === "string")
        .join(", ")

      if (message) {
        return message
      }
    }
  }

  return undefined
}

export function getApiErrorMessage(
  error: unknown,
  fallback = DEFAULT_ERROR_MESSAGE,
) {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : fallback
  }

  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
    return "The request timed out. Please try again."
  }

  if (!error.response) {
    return "Unable to connect to the server. Check your internet connection."
  }

  return readErrorMessage(error.response.data) ?? fallback
}
