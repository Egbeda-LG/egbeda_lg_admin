"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { RiEyeLine, RiEyeOffLine, RiFingerprintLine } from "@remixicon/react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ForgotPasswordDialog } from "@/features/auth/components/forgot-password-dialog"
import { AuthLayout } from "@/features/auth/components/auth-layout"
import { AuthLoadingScreen } from "@/features/auth/components/auth-loading-screen"
import {
  loginFormDefaults,
  loginFormSchema,
  type LoginFormValues,
} from "@/features/auth/auth.form"
import { AUTH_ERRORS, ICT_SUPPORT_EMAIL } from "@/features/auth/auth.utils"
import { useAuth } from "@/lib/auth/auth-context"
import { notifyInvalidForm } from "@/lib/ui/form-errors"

const FIELD_CLASS =
  "border-input h-11 rounded-lg text-sm shadow-none focus-visible:ring-1 focus-visible:ring-[#701a2e]"

export function LoginPage() {
  const router = useRouter()
  const {
    login,
    loginWithSSO,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth()

  const [showPassword, setShowPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [authError, setAuthError] = React.useState<string | null>(null)
  const [showForgotModal, setShowForgotModal] = React.useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormDefaults,
  })

  React.useEffect(() => {
    if (isAuthenticated) router.push("/")
  }, [isAuthenticated, router])

  async function onSubmit(values: LoginFormValues) {
    setIsSubmitting(true)
    setAuthError(null)

    try {
      await login(values.email, values.password, values.rememberMe)
      router.push("/login/2fa")
    } catch {
      setAuthError(AUTH_ERRORS.login)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleSSOLogin() {
    setIsSubmitting(true)
    setAuthError(null)

    try {
      if (await loginWithSSO()) router.push("/")
    } catch {
      setAuthError(AUTH_ERRORS.sso)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading) {
    return <AuthLoadingScreen message="Verifying session..." />
  }

  return (
    <>
      <AuthLayout
        title="Sign in to the console"
        description="Use your official Egbeda LG staff account to continue."
        error={authError}
        footer={
          <>
            <div className="relative flex items-center justify-center py-1">
              <div className="border-border w-full border-t" />
              <span className="bg-background text-muted-foreground absolute px-3 text-[11px] font-medium uppercase">
                OR
              </span>
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={handleSSOLogin}
              className="border-input bg-background hover:bg-muted text-foreground h-11 w-full rounded-lg text-xs font-medium shadow-none"
            >
              <RiFingerprintLine className="mr-2 size-4 text-[#701a2e] dark:text-rose-400" />
              Sign in with Government SSO
            </Button>

            <p className="text-muted-foreground pt-2 text-center text-xs">
              Need help?{" "}
              <a
                href={`mailto:${ICT_SUPPORT_EMAIL}`}
                className="font-semibold text-[#701a2e] hover:underline dark:text-rose-400"
              >
                Contact ICT support
              </a>
            </p>
          </>
        }
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, notifyInvalidForm)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-xs font-semibold">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="segunoladapo@egbedalg.gov.ng"
                      className={FIELD_CLASS}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-foreground text-xs font-semibold">
                      Password
                    </FormLabel>
                    <Link
                      href="#"
                      className="text-xs font-medium text-[#701a2e] hover:underline dark:text-rose-400"
                      onClick={(event) => {
                        event.preventDefault()
                        setShowForgotModal(true)
                      }}
                    >
                      Forgot?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        className={`${FIELD_CLASS} pr-10`}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <RiEyeOffLine className="size-4" />
                        ) : (
                          <RiEyeLine className="size-4" />
                        )}
                        <span className="sr-only">
                          Toggle password visibility
                        </span>
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 space-y-0 pt-1">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="size-4 rounded border-amber-500 bg-amber-500 text-white data-[state=checked]:bg-amber-500 data-[state=checked]:text-white"
                    />
                  </FormControl>
                  <FormLabel className="text-muted-foreground cursor-pointer text-xs font-medium">
                    Keep me signed in on this device
                  </FormLabel>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 h-11 w-full rounded-lg bg-[#701a2e] text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#571323] dark:bg-rose-700 dark:hover:bg-rose-800"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>
      </AuthLayout>

      <ForgotPasswordDialog
        open={showForgotModal}
        onOpenChange={setShowForgotModal}
      />
    </>
  )
}
