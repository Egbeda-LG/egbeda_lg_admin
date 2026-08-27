import Link from "next/link"

import { AuthBrandingPanel } from "@/features/auth/components/auth-branding-panel"

const PUBLIC_SITE_URL = "https://egbedalg.gov.ng"

type AuthLayoutProps = {
  eyebrow?: string
  title: string
  description: React.ReactNode
  error?: string | null
  children: React.ReactNode
  footer?: React.ReactNode
}

/** Split-screen shell used by the sign-in and 2FA screens. */
export function AuthLayout({
  eyebrow = "Admin Access",
  title,
  description,
  error,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <AuthBrandingPanel />

      <div className="bg-background flex min-h-screen flex-col justify-between p-6 sm:p-12 lg:p-14">
        <div className="flex justify-end">
          <Link
            href={PUBLIC_SITE_URL}
            target="_blank"
            className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
          >
            ← Back to LG website
          </Link>
        </div>

        <div className="mx-auto w-full max-w-sm space-y-7 py-8">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#701a2e] uppercase dark:text-rose-400">
              {eyebrow}
            </span>
            <h1 className="text-foreground mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h1>
            <p className="text-muted-foreground mt-1.5 text-xs sm:text-sm">
              {description}
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-lg border p-3.5 text-xs font-medium">
              {error}
            </div>
          )}

          {children}

          {footer}
        </div>

        <div className="text-muted-foreground text-center text-[11px]">
          © 2026 Egbeda Local Government - Secured by Oyo State ICT Directorate
        </div>
      </div>
    </div>
  )
}
