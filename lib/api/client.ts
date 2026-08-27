import axios from "axios"

import { getAccessToken } from "@/lib/api/session"

const defaultApiBaseUrl = "https://egbeda-api-dev.jumpingcrab.com"

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
    defaultApiBaseUrl,
  timeout: 60_000,
  headers: {
    Accept: "application/json",
  },
})

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken()

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`)
  }

  return config
})
