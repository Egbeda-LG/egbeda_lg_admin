import type { Metadata } from "next"

import { AuthProvider } from "@/lib/auth/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ApiProvider } from "@/providers/api-provider"

import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Egbeda Admin",
    template: "%s | Egbeda Admin",
  },
  description: "Administration portal for Egbeda Local Government",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <ApiProvider>
            <TooltipProvider>
              <AuthProvider>{children}</AuthProvider>
            </TooltipProvider>
          </ApiProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
