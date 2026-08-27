"use client"

import { useEffect } from "react"
import { Toaster } from "react-hot-toast"

import { setupApiInterceptors } from "@/lib/api"
import { ReactQueryProvider } from "@/providers/react-query-provider"

export function ApiProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupApiInterceptors()
  }, [])

  return (
    <ReactQueryProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4_000,
          style: {
            background: "var(--card)",
            color: "var(--card-foreground)",
            border: "1px solid var(--border)",
          },
        }}
      />
    </ReactQueryProvider>
  )
}
