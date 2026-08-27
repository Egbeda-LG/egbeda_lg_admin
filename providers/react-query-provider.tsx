"use client"

import { useState } from "react"
import type { AxiosError } from "axios"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
              const status = (error as AxiosError).response?.status

              if (status !== undefined && status >= 400 && status < 500) {
                return false
              }

              return failureCount < 1
            },
          },
          mutations: {
            retry: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
