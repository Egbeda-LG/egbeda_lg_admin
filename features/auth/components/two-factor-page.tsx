"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { AuthLayout } from "@/features/auth/components/auth-layout"
import { AuthLoadingScreen } from "@/features/auth/components/auth-loading-screen"
import {
  OTP_LENGTH,
  otpFormDefaults,
  otpFormSchema,
  type OtpFormValues,
} from "@/features/auth/auth.form"
import {
  AUTH_ERRORS,
  errorMessage,
  OTP_RESEND_SECONDS,
} from "@/features/auth/auth.utils"
import { useAuth } from "@/lib/auth/auth-context"
import { notifyInvalidForm } from "@/lib/ui/form-errors"

const OTP_SLOT_CLASS =
  "border-input size-11 rounded-xl text-base font-bold shadow-none focus-visible:ring-1 focus-visible:ring-[#701a2e] sm:size-12"

export function TwoFactorPage() {
  const router = useRouter()
  const {
    verify2FA,
    resendLoginOtp,
    isAuthenticated,
    pendingEmail,
    isLoading: authLoading,
  } = useAuth()

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [resendCountdown, setResendCountdown] = React.useState(0)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: otpFormDefaults,
  })

  React.useEffect(() => {
    if (isAuthenticated) router.push("/")
  }, [isAuthenticated, router])

  React.useEffect(() => {
    if (resendCountdown <= 0) return

    const timer = setTimeout(
      () => setResendCountdown(resendCountdown - 1),
      1000,
    )
    return () => clearTimeout(timer)
  }, [resendCountdown])

  async function onSubmit(values: OtpFormValues) {
    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      await verify2FA(values.pin)
      router.push("/")
    } catch {
      setErrorMsg(AUTH_ERRORS.otp)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleResend() {
    setErrorMsg(null)

    try {
      await resendLoginOtp()
      setResendCountdown(OTP_RESEND_SECONDS)
    } catch (error) {
      setErrorMsg(errorMessage(error, AUTH_ERRORS.resend))
    }
  }

  if (authLoading) {
    return <AuthLoadingScreen message="Verifying code..." />
  }

  return (
    <AuthLayout
      title="2FA Authentication"
      description={`Enter the 6-digit OTP code sent to ${pendingEmail ?? "your email"}`}
      error={errorMsg}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, notifyInvalidForm)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-foreground text-xs font-semibold">
                    OTP Code
                  </span>
                </div>
                <FormControl>
                  <InputOTP
                    maxLength={OTP_LENGTH}
                    value={field.value}
                    onChange={field.onChange}
                    containerClassName="justify-center gap-2 sm:gap-3"
                  >
                    <InputOTPGroup className="gap-2 sm:gap-3">
                      {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className={OTP_SLOT_CLASS}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendCountdown > 0}
                    className="text-xs font-medium text-[#701a2e] hover:underline disabled:no-underline disabled:opacity-50"
                  >
                    {resendCountdown > 0
                      ? `Resend code in ${resendCountdown}s`
                      : "Resend code"}
                  </button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full rounded-lg bg-[#701a2e] text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#571323]"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Verifying...</span>
              </div>
            ) : (
              "Verify code"
            )}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  )
}
